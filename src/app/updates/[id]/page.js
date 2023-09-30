'use client';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/app/components/Navbar';
import { useQuery, useMutation } from 'react-query';
import { createAttempt, getPatterns } from '@/app/utils/services/patterns';

export default function Updates({ params, id = null }) {
	const updates_id = params?.id ?? id;

	const {
		isLoading: updatesIsLoading,
		isError: updatesIsError,
		data: updates,
		isFetching: updatesIsFetching,
		error: updatesError
	} = useQuery({
		refetchOnWindowFocus: false,
		retry: 3,
		queryKey: ['updates', updates_id],
		queryFn: () => getPatterns(updates_id)
	});

	return (
		<>
			<Navbar backTo="/updates" now="updates" />
			<main className="flex h-full w-full flex-col items-center justify-start gap-5 px-10 pb-10 pt-24 lg:max-h-[80vh] lg:overflow-auto lg:pt-0">
				{updatesIsLoading || updatesIsFetching ? (
					<>
						<div className="flex w-full flex-col items-center gap-1 px-10 py-4 lg:w-1/2">
							<div className="h-8 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-3/4 animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
						</div>

						<div className="h-[35vh] w-3/4 animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
						<div className="flex w-full flex-col items-center gap-2">
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
						</div>

						<div className="h-[20vh] w-3/4 animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
					</>
				) : (
					<>
						<div className="flex flex-col items-center px-5 py-4">
							<h2 className="text-2xl font-semibold">{updates?.data?.title}</h2>
							<p className="text-sm italic text-gray-300">{updates?.data?.title}</p>
						</div>
						<div className="relative aspect-square min-h-[30vh] w-2/3">
							<Image
								src={updates?.data?.imageUrl}
								alt=""
								className="rounded-lg object-contain"
								fill
							/>
						</div>
						{updates?.data?.descriptions?.map((desc, idx) => (
							<p className="text-justify text-sm font-light lg:text-base" key={idx}>
								{desc}
							</p>
						))}
						<div className="relative aspect-[2/1] min-h-[30vh] w-full">
							<Image
								src={updates?.data?.imageUrl}
								alt=""
								className="rounded-lg object-contain"
								fill
							/>
						</div>
					</>
				)}
			</main>
		</>
	);
}
