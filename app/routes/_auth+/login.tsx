import { json, type DataFunctionArgs, type MetaFunction } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { GeneralErrorBoundary } from '~/components/error-boundary.tsx'
import { Spacer } from '~/components/spacer.tsx'
import { authenticator, requireAnonymous } from '~/utils/auth.server.ts'
import { commitSession, getSession } from '~/utils/session.server.ts'
import { InlineLogin } from '../resources+/login.tsx'

export async function loader({ request }: DataFunctionArgs) {
	await requireAnonymous(request)
	const session = await getSession(request.headers.get('cookie'))
	const error = session.get(authenticator.sessionErrorKey)
	const redirectTo = new URL(request.url).searchParams.get('redirectTo')
	session.set('redirectTo', redirectTo)
	let errorMessage: string | null = null
	if (typeof error?.message === 'string') {
		errorMessage = error.message
	}
	
	return json(
		{ formError: errorMessage },
		{ headers: { 'Set-Cookie': await commitSession(session) } },
	)
}

export const meta: MetaFunction = () => {
	return [
		{ title: 'Login to Resume Tailor' },
		{
			name: 'description',
			content: 'Land more job interviews.',
		},
	]
}

export default function LoginPage() {
	const [searchParams] = useSearchParams()
	const data = useLoaderData<typeof loader>()

	const redirectTo = searchParams.get('redirectTo') || ''

	return (
		<div className="flex min-h-full flex-col justify-center pb-32 pt-20">
			<div className="mx-auto w-full max-w-md">
				<div className="flex flex-col gap-3 text-center">
					<h1 className="text-h1">Login</h1>
					<p className="text-body-md text-muted-foreground">
						Please enter your details or sign up.
					</p>
				</div>
				<Spacer size="xs" />
				<InlineLogin redirectTo={redirectTo} formError={data.formError} />
			</div>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
