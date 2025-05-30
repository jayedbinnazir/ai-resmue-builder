import {
	useLoaderData,
	Outlet,
	NavLink,
	Link,
} from '@remix-run/react'
import { json, type DataFunctionArgs } from '@remix-run/node'
import { prisma } from '~/utils/db.server.ts'
import { GeneralErrorBoundary } from '~/components/error-boundary.tsx'
import { cn, getUserImgSrc } from '~/utils/misc.ts'
import { requireUserId } from '~/utils/auth.server.ts'

export async function loader({ params, request }: DataFunctionArgs) {
	await requireUserId(request, { redirectTo: null })
	const owner = await prisma.user.findUnique({
		where: {
			username: params.username,
		},
		select: {
			id: true,
			username: true,
			name: true,
			imageId: true,
		},
	})
	if (!owner) {
		throw new Response('Not found', { status: 404 })
	}
	return json({ owner })
}

export default function ResumeRoute() {
	const data = useLoaderData<typeof loader>()
	const ownerDisplayName = data.owner.name ?? data.owner.username
	const navLinkDefaultClassName =
		'line-clamp-2 block rounded-l-full py-2 pl-8 pr-6 text-base lg:text-xl'
	return (
		<div className="flex h-full pb-12">
			<div className="bg-night-500 mx-auto grid w-full flex-grow grid-cols-4 pl-2 md:container md:rounded-3xl">
				<div className="col-span-1 py-12">
					<Link
						to={`/users/${data.owner.username}`}
						className="mb-4 flex flex-col items-center justify-center gap-2 pl-8 pr-4 lg:flex-row lg:justify-start lg:gap-4"
					>
						<img
							src={getUserImgSrc(data.owner.imageId)}
							alt={ownerDisplayName}
							className="h-16 w-16 rounded-full object-cover lg:h-24 lg:w-24"
						/>
						<h1 className="text-center text-base font-bold md:text-lg lg:text-left lg:text-2xl">
							{ownerDisplayName}'s Resume
						</h1>
					</Link>
					<ul>
						<li>
							<NavLink
								to="upload"
								className={({ isActive }) =>
									cn(navLinkDefaultClassName, isActive && 'bg-accent')
								}
							>
								Upload
							</NavLink>
						</li>
						<li>
							<NavLink
								to="edit"
								className={({ isActive }) =>
									cn(navLinkDefaultClassName, isActive && 'bg-accent')
								}
							>
								Edit
							</NavLink>
						</li>
					</ul>
				</div>
				<main className="bg-night-400 col-span-3 px-10 py-12 md:rounded-r-3xl">
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<p>Resume for "{params.username}" does not exist</p>
				),
			}}
		/>
	)
}
