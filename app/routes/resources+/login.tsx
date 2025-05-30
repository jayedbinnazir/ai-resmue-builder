import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { json, redirect, type DataFunctionArgs } from '@remix-run/node'
import { Link, useFetcher } from '@remix-run/react'
import { AuthorizationError } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import { safeRedirect } from 'remix-utils/safe-redirect'
import { z } from 'zod'
import { CheckboxField, ErrorList, Field } from '~/components/forms.tsx'
import { StatusButton } from '~/components/ui/status-button.tsx'
import { authenticator } from '~/utils/auth.server.ts'
import { prisma } from '~/utils/db.server.ts'
import { invariantResponse } from '~/utils/misc.ts'
import { commitSession, getSession } from '~/utils/session.server.ts'
import { passwordSchema, usernameSchema } from '~/utils/user-validation.ts'
import { checkboxSchema } from '~/utils/zod-extensions.ts'
import { type VerificationTypes, Verify } from './verify.tsx'
import SocialLogin from '~/components/social-login.tsx'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useCallback, useState } from 'react'
import { getRecaptchaScore } from '~/utils/recaptcha.server.ts'

const ROUTE_PATH = '/resources/login'
export const unverifiedSessionKey = 'unverified-sessionId'

export const LoginFormSchema = z.object({
	username: usernameSchema,
	password: passwordSchema,
	redirectTo: z.string().optional(),
	remember: checkboxSchema(),
})

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: LoginFormSchema,
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
	// get the password off the payload that's sent back
	delete submission.payload.password
	// @ts-expect-error - conform should probably have support for doing this
	delete submission.value?.password

	if (submission.intent !== 'submit') {
		return json({ status: 'idle', submission } as const)
	}
	if (!submission.value) {
		return json({ status: 'error', submission } as const, { status: 400 })
	}

	let sessionId: string | null = null
	try {
		sessionId = await authenticator.authenticate(FormStrategy.name, request, {
			throwOnError: true,
			context: { formData },
		})
	} catch (error) {
		if (error instanceof AuthorizationError) {
			return json(
				{
					status: 'error',
					submission: {
						...submission,
						error: {
							// show authorization error as a form level error message.
							'': error.message,
						},
					},
				} as const,
				{ status: 400 },
			)
		}
		throw error
	}

	const session = await prisma.session.findUnique({
		where: { id: sessionId },
		select: { userId: true, expirationDate: true },
	})
	invariantResponse(session, 'newly created session not found')

	const user2FA = await prisma.verification.findFirst({
		where: { type: '2fa' satisfies VerificationTypes, target: session.userId },
		select: { id: true },
	})

	const cookieSession = await getSession(request.headers.get('cookie'))
	const cookieToSet = user2FA ? unverifiedSessionKey : authenticator.sessionKey
	cookieSession.set(cookieToSet, sessionId)
	const { remember, redirectTo } = submission.value
	const userId = session?.userId
	let user
	if (userId) {
		user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		})
	}

	const responseInit = {
		headers: {
			'Set-Cookie': await commitSession(cookieSession, {
				// Cookies with no expiration are cleared when the tab/window closes
				expires: remember ? session.expirationDate : undefined,
			}),
		},
	}

	if (user2FA) {
		return json(
			{ status: '2fa-required', submission, userId: session.userId } as const,
			responseInit,
		)
	} else if (user?.username) {
		throw redirect(safeRedirect(`/builder`), responseInit)
	} else if (!redirectTo) {
		return json({ status: 'success', submission } as const, responseInit)
	} else {
		throw redirect(safeRedirect(redirectTo), responseInit)
	}
}

export function InlineLogin({
	redirectTo,
	formError,
}: {
	redirectTo?: string
	formError?: string | null
}) {
	const loginFetcher = useFetcher<typeof action>()
	const [token, setToken] = useState<string | null>(null)
	const onVerify = useCallback((token: string) => {
		setToken(token)
	}, [])

	const [form, fields] = useForm({
		id: 'inline-login',
		defaultValue: { redirectTo },
		constraint: getFieldsetConstraint(LoginFormSchema),
		lastSubmission: loginFetcher.data?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: LoginFormSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<div>
			<div className="mx-auto w-full max-w-md px-8">
				{loginFetcher.data?.status === '2fa-required' ? (
					<Verify
						target={loginFetcher.data?.userId ?? ''}
						type="2fa"
						fieldLabel="Enter your 2FA code"
						redirectTo={redirectTo}
					/>
				) : (
					<>
						<loginFetcher.Form
							method="POST"
							action={ROUTE_PATH}
							name="login"
							{...form.props}
						>
							{token ? (
								<input type="hidden" name="_captcha" value={token} />
							) : null}

							<Field
								labelProps={{ children: 'Username' }}
								inputProps={{
									...conform.input(fields.username),
									autoFocus: true,
									className: 'lowercase',
								}}
								errors={fields.username.errors}
							/>

							<div className="flex justify-end">
								<Link
									to="/forgot-username"
									className="text-body-xs font-semibold"
								>
									Forgot username?
								</Link>
							</div>

							<Field
								labelProps={{ children: 'Password' }}
								inputProps={conform.input(fields.password, {
									type: 'password',
								})}
								errors={fields.password.errors}
							/>

							<div className="flex justify-between">
								<CheckboxField
									labelProps={{
										htmlFor: fields.remember.id,
										children: 'Remember me',
									}}
									buttonProps={conform.input(fields.remember, {
										type: 'checkbox',
									})}
									errors={fields.remember.errors}
								/>

								<div>
									<Link
										to="/forgot-password"
										className="text-body-xs font-semibold"
									>
										Forgot password?
									</Link>
								</div>
							</div>

							<input {...conform.input(fields.redirectTo)} type="hidden" />
							<ErrorList
								errors={[...form.errors, formError]}
								id={form.errorId}
							/>

							<div className="flex items-center justify-between gap-6 pt-3">
								<StatusButton
									className="w-full"
									status={
										loginFetcher.state === 'submitting'
											? 'pending'
											: loginFetcher.data?.status ?? 'idle'
									}
									type="submit"
									disabled={loginFetcher.state !== 'idle' || !token}
								>
									Log in
								</StatusButton>
							</div>
						</loginFetcher.Form>
						<SocialLogin redirectTo={redirectTo} />
						<div className="flex items-center justify-center gap-2 pt-6">
							<span className="text-muted-foreground">New here?</span>
							<Link to="/signup">Create an account</Link>
						</div>
					</>
				)}
				<GoogleReCaptcha onVerify={onVerify} action="login" />
			</div>
		</div>
	)
}
