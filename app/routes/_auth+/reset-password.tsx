import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import {
	json,
	redirect,
	type DataFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import {
	Form,
	useActionData,
	useFormAction,
	useLoaderData,
	useNavigation,
} from '@remix-run/react'
import { z } from 'zod'
import { GeneralErrorBoundary } from '~/components/error-boundary.tsx'
import { ErrorList, Field } from '~/components/forms.tsx'
import { StatusButton } from '~/components/ui/status-button.tsx'
import {
	authenticator,
	requireAnonymous,
	resetUserPassword,
} from '~/utils/auth.server.ts'
import { commitSession, getSession } from '~/utils/session.server.ts'
import { passwordSchema } from '~/utils/user-validation.ts'

export const resetPasswordUsernameSessionKey = 'resetPasswordUsername'

const ResetPasswordSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.refine(({ confirmPassword, password }) => password === confirmPassword, {
		message: 'The passwords did not match',
		path: ['confirmPassword'],
	})

export async function loader({ request }: DataFunctionArgs) {
	await requireAnonymous(request)
	const session = await getSession(request.headers.get('cookie'))
	const error = session.get(authenticator.sessionErrorKey)
	const resetPasswordUsername = session.get(resetPasswordUsernameSessionKey)
	if (typeof resetPasswordUsername !== 'string' || !resetPasswordUsername) {
		return redirect('/login')
	}
	return json(
		{ formError: error?.message, resetPasswordUsername },
		{ headers: { 'Set-Cookie': await commitSession(session) } },
	)
}

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()
	const submission = parse(formData, {
		schema: ResetPasswordSchema,
		acceptMultipleErrors: () => true,
	})
	if (submission.intent !== 'submit') {
		return json({ status: 'idle', submission } as const)
	}
	if (!submission.value) {
		return json({ status: 'error', submission } as const, { status: 400 })
	}
	const { password } = submission.value

	const session = await getSession(request.headers.get('cookie'))
	const username = session.get(resetPasswordUsernameSessionKey)
	if (typeof username !== 'string' || !username) {
		return redirect('/login')
	}
	await resetUserPassword({ username, password })
	session.unset(resetPasswordUsernameSessionKey)
	return redirect('/login', {
		headers: { 'Set-Cookie': await commitSession(session) },
	})
}

export const meta: MetaFunction = () => {
	return [{ title: 'Reset Password | Resume Tailor' }]
}

export default function ResetPasswordPage() {
	const data = useLoaderData<typeof loader>()
	const actionData = useActionData<typeof action>()
	const formAction = useFormAction()
	const navigation = useNavigation()

	const [form, fields] = useForm({
		id: 'reset-password',
		constraint: getFieldsetConstraint(ResetPasswordSchema),
		lastSubmission: actionData?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: ResetPasswordSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<div className="md:container flex flex-col justify-center pb-32 pt-20">
			<div className="text-center">
				<h1 className="text-h1">Password Reset</h1>
				<p className="mt-3 text-body-md text-muted-foreground">
					Hi, {data.resetPasswordUsername}. No worries. It happens all the time.
				</p>
			</div>
			<Form
				method="POST"
				className="mx-auto mt-16 min-w-[368px] max-w-sm"
				{...form.props}
			>
				<Field
					labelProps={{
						htmlFor: fields.password.id,
						children: 'New Password',
					}}
					inputProps={{
						...conform.input(fields.password, { type: 'password' }),
						autoComplete: 'new-password',
					}}
					errors={fields.password.errors}
				/>
				<Field
					labelProps={{
						htmlFor: fields.confirmPassword.id,
						children: 'Confirm Password',
					}}
					inputProps={{
						...conform.input(fields.confirmPassword, { type: 'password' }),
						autoComplete: 'new-password',
					}}
					errors={fields.confirmPassword.errors}
				/>

				<ErrorList errors={form.errors} id={form.errorId} />

				<StatusButton
					className="w-full"
					status={
						navigation.state === 'submitting' &&
						navigation.formAction === formAction &&
						navigation.formMethod === 'POST'
							? 'pending'
							: actionData?.status ?? 'idle'
					}
					type="submit"
					disabled={navigation.state !== 'idle'}
				>
					Reset password
				</StatusButton>
			</Form>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
