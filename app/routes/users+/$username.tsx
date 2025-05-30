import { json, type DataFunctionArgs, type MetaFunction } from '@remix-run/node'
import {
	Form,
	Link,
	useFetcher,
	useLoaderData,
	useLocation,
	useSubmit,
} from '@remix-run/react'
import { useRef } from 'react'
import { GeneralErrorBoundary } from '~/components/error-boundary.tsx'
import { Spacer } from '~/components/spacer.tsx'
import { Button } from '~/components/ui/button.tsx'
import { prisma } from '~/utils/db.server.ts'
import { getUserImgSrc, invariant, useDoubleCheck } from '~/utils/misc.ts'
import { useOptionalUser } from '~/utils/user.ts'
import * as deleteProfileRoute from '~/routes/resources+/delete-profile.tsx'
import { Icon } from '~/components/ui/icon.tsx'

export async function loader({ params }: DataFunctionArgs) {
	invariant(params.username, 'Missing username')
	const user = await prisma.user.findUnique({
		where: { username: params.username },
		select: {
			id: true,
			username: true,
			name: true,
			imageId: true,
			createdAt: true,
		},
	})
	if (!user) {
		throw new Response('not found', { status: 404 })
	}
	return json({ user, userJoinedDisplay: user.createdAt.toLocaleDateString() })
}

export default function UsernameIndex() {
	const data = useLoaderData<typeof loader>()
	const user = data.user
	const userDisplayName = user.name ?? user.username
	const loggedInUser = useOptionalUser()
	const isLoggedInUser = data.user.id === loggedInUser?.id
	const manageSubFormRef = useRef<HTMLFormElement>(null)
	const submit = useSubmit()
	const path = useLocation().pathname

	const doubleCheckDeleteProfile = useDoubleCheck()

	const deleteProfileFormId = 'delete-profile-form'

	const deleteProfileFetcher = useFetcher<typeof deleteProfileRoute.action>()

	return (
		<div className="mx-auto mb-48 mt-36 flex flex-col items-center justify-center md:container">
			<Spacer size="4xs" />

			<div className="bg-night-500 mx-auto flex flex-col items-center rounded-3xl p-12 md:container">
				<div className="relative w-52">
					<div className="absolute -top-40">
						<div className="relative">
							<img
								src={getUserImgSrc(data.user.imageId)}
								alt={userDisplayName}
								className="h-52 w-52 rounded-full object-cover"
								width={208}
								height={208}
								loading="lazy"
							/>
						</div>
					</div>
				</div>

				<Spacer size="sm" />

				<div className="flex flex-col items-center">
					<div className="flex flex-wrap items-center justify-center gap-4">
						<h1 className="text-center text-h2">{userDisplayName}</h1>
					</div>
					<p className="mt-2 text-center text-accent-foreground">
						Joined {data.userJoinedDisplay}
					</p>
					<div className="mt-10 flex gap-4">
						{isLoggedInUser ? (
							<>
								<Button
									asChild
									onClick={event => {
										event.preventDefault()
										submit(manageSubFormRef.current)
									}}
								>
									<Form
										action={`/resources/stripe/manage-subscription?redirectTo=${encodeURIComponent(
											path,
										)}`}
										method="POST"
										ref={manageSubFormRef}
									>
										<input hidden name="userId" value={user.id} />
										<button type="submit">Manage subscription</button>
									</Form>
								</Button>
								<Button asChild>
									<Link prefetch="intent" to="/settings/profile">
										Edit profile
									</Link>
								</Button>
								<Button asChild>
									<Link prefetch="intent" to="resume/edit">
										Edit resume
									</Link>
								</Button>
								<Button variant={'destructive'} asChild>
									<Button
										variant="destructive"
										{...doubleCheckDeleteProfile.getButtonProps({
											type: 'submit',
											form: deleteProfileFormId,
										})}
									>
										<Icon name="trash">
											{doubleCheckDeleteProfile.doubleCheck
												? 'Are you sure?'
												: 'Delete Profile'}
										</Icon>
									</Button>
								</Button>
							</>
						) : (
							<Button asChild>
								<Link prefetch="intent" to="jobs">
									{userDisplayName}'s jobs
								</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
			<deleteProfileFetcher.Form
				method="POST"
				id={deleteProfileFormId}
				action={deleteProfileRoute.ROUTE_PATH}
			></deleteProfileFetcher.Form>
		</div>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<p>No user with the username "{params.username}" exists</p>
				),
			}}
		/>
	)
}

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
	const displayName = data?.user.name ?? params.username
	return [
		{ title: `${displayName} | Resume Tailor` },
		{
			name: 'description',
			content: `${displayName} on Resume Tailor is not a host or renter yet.`,
		},
	]
}
