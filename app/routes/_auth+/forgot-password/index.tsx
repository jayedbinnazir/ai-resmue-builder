import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import {
	json,
	redirect,
	type DataFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import { Link, useFetcher } from '@remix-run/react'
import { z } from 'zod'
import { GeneralErrorBoundary } from '~/components/error-boundary.tsx'
import { ErrorList, Field } from '~/components/forms.tsx'
import { StatusButton } from '~/components/ui/status-button.tsx'
import {
	getRedirectToUrl,
	prepareVerification,
} from '~/routes/resources+/verify.tsx'
import { prisma } from '~/utils/db.server.ts'
import { sendEmail } from '~/utils/email.server.ts'
import { emailSchema, usernameSchema } from '~/utils/user-validation.ts'
import { ForgotPasswordEmail } from './email.server.tsx'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useCallback, useState } from 'react'
import { getRecaptchaScore } from '~/utils/recaptcha.server.ts'

const ForgotPasswordSchema = z.object({
	usernameOrEmail: z.union([emailSchema, usernameSchema]),
})

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const submission = await parse(formData, {
		schema: ForgotPasswordSchema.superRefine(async (data, ctx) => {
			if (data.usernameOrEmail.includes('@')) return

			// check the username exists. Usernames have to be unique anyway so anyone
			// signing up can check whether a username exists by trying to sign up
			// with it.
			const user = await prisma.user.findUnique({
				where: { username: data.usernameOrEmail },
				select: { id: true },
			})
			if (!user) {
				ctx.addIssue({
					path: ['usernameOrEmail'],
					code: z.ZodIssueCode.custom,
					message: 'No user exists with this username',
				})
				return
			}
		}),
		async: true,
		acceptMultipleErrors: () => true,
	})
	const token = formData.get('_captcha')
	if (!token) {
		return json({ status: 'error', submission } as const, { status: 401 })
	}
	if (token && typeof token === 'string') {
		const score = await getRecaptchaScore(
			token,
			process.env.RECAPTCHA_SECRET_KEY,
		)
		if (!score) {
			return json({ status: 'error', submission } as const, { status: 401 })
		}
	}
	if (submission.intent !== 'submit') {
		return json({ status: 'idle', submission } as const)
	}
	if (!submission.value) {
		return json({ status: 'error', submission } as const, { status: 400 })
	}
	const { usernameOrEmail } = submission.value
	const redirectTo = getRedirectToUrl({
		request,
		type: 'forgot-password',
		target: usernameOrEmail,
	})

	// fire, forget, and don't wait to combat timing attacks
	void sendVerifyEmail({ request, target: usernameOrEmail })

	return redirect(redirectTo.toString())
}

async function sendVerifyEmail({
	request,
	target,
}: {
	request: Request
	target: string
}) {
	const user = await prisma.user.findFirst({
		where: { OR: [{ email: target }, { username: target }] },
		select: { email: true, username: true },
	})
	if (!user) {
		// maybe they're trying to see whether a user exists? We're not gonna tell them...
		return
	}

	const { verifyUrl, otp } = await prepareVerification({
		period: 10 * 60,
		request,
		type: 'forgot-password',
		target,
	})

	await sendEmail({
		to: user.email,
		subject: `Resume Tailor Password Reset`,
		react: (
			<ForgotPasswordEmail onboardingUrl={verifyUrl.toString()} otp={otp} />
		),
	})
}

export const meta: MetaFunction = () => {
	return [{ title: 'Password Recovery for Resume Tailor' }]
}

export default function ForgotPasswordRoute() {
	const forgotPassword = useFetcher<typeof action>()
	const [token, setToken] = useState<string | null>(null)
	const onVerify = useCallback((token: string) => {
		setToken(token)
	}, [])

	const [form, fields] = useForm({
		id: 'forgot-password-form',
		constraint: getFieldsetConstraint(ForgotPasswordSchema),
		lastSubmission: forgotPassword.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: ForgotPasswordSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<div className="pb-32 pt-20 md:container">
			<div className="flex flex-col justify-center">
				<div className="text-center">
					<h1 className="text-h1">Forgot Password</h1>
					<p className="mt-3 text-body-md text-muted-foreground">
						No worries, we'll send you reset instructions.
					</p>
				</div>
				<forgotPassword.Form
					method="POST"
					{...form.props}
					className="mx-auto mt-16 min-w-[368px] max-w-sm"
				>
					{token ? <input type="hidden" name="_captcha" value={token} /> : null}
					<div>
						<Field
							labelProps={{
								htmlFor: fields.usernameOrEmail.id,
								children: 'Username or Email',
							}}
							inputProps={{
								autoFocus: true,
								...conform.input(fields.usernameOrEmail),
							}}
							errors={fields.usernameOrEmail.errors}
						/>
					</div>
					<ErrorList errors={form.errors} id={form.errorId} />

					<div className="mt-6">
						<StatusButton
							className="w-full"
							status={
								forgotPassword.state === 'submitting'
									? 'pending'
									: forgotPassword.data?.status ?? 'idle'
							}
							type="submit"
							disabled={forgotPassword.state !== 'idle' || !token}
						>
							Recover password
						</StatusButton>
					</div>
				</forgotPassword.Form>
				<Link to="/login" className="mt-11 text-center text-body-sm font-bold">
					Back to Login
				</Link>
			</div>
			<GoogleReCaptcha onVerify={onVerify} action="forgot_password" />
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
