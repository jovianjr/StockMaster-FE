'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from 'react-query';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

import Navbar from '@/app/components/Navbar';
import Button from '@/app/components/Button';
import Box from '@/app/components/Box';
import { createAttempt, getPatterns } from '@/app/utils/services/patterns';

const LearningDetail = ({ params, id = null }) => {
	const router = useRouter();
	const slug = params?.slug ?? id;

	const {
		isLoading: dataPatternIsLoading,
		isError: dataPatternIsError,
		data: dataPattern,
		isFetching: dataPatternIsFetching,
		error: dataPatternError
	} = useQuery({
		refetchOnWindowFocus: false,
		retry: 3,
		queryKey: ['patterns', slug],
		queryFn: () => getPatterns(slug)
	});

	const startQuiz = useMutation({
		mutationKey: ['patterns', slug],
		mutationFn: () => createAttempt(slug),
		onSuccess: () => {
			router.push(`/learning/${slug}/quiz`);
		}
	});

	return (
		<>
			<Navbar backTo="/learning" now="learning" />
			<main
				className={`sticky top-20 flex min-h-screen flex-col items-center justify-center gap-5 px-10 pb-10 pt-24 lg:min-h-[80vh] lg:justify-start lg:px-20 lg:pt-0 ${
					id ? 'lg:max-h-[80vh] lg:overflow-auto' : ''
				}`}
			>
				{dataPatternIsLoading || dataPatternIsFetching ? (
					<>
						<div className="mt-4 h-10 w-full animate-pulse rounded-md bg-white/20"></div>
						<div className="h-[25vh] w-full animate-pulse rounded-md bg-white/20 lg:h-[50vh]"></div>
						<div className="h-24 w-full animate-pulse rounded-md bg-white/20"></div>
						<div className="grow"></div>
						<div className="h-10 w-full animate-pulse rounded-md bg-white/20"></div>
					</>
				) : dataPatternError ? (
					<>
						<div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4">
							<p className="text-2xl">Pola tidak ditemukan</p>
							<Link
								href={`/learning`}
								className="cursor-pointer text-sm hover:underline lg:text-base"
							>
								kembali
							</Link>
						</div>
					</>
				) : (
					<>
						<div className="flex flex-col items-center px-5 py-4">
							<h2 className="text-2xl font-semibold lg:text-3xl">
								{dataPattern?.data?.title}
							</h2>
						</div>
						<Box className="p-3">
							<div className="relative aspect-[16/9] w-full lg:aspect-square lg:h-[50vh]">
								<Image
									src={dataPattern?.data?.imageUrl}
									alt=""
									className="rounded-lg object-contain"
									fill
								/>
							</div>
						</Box>
						{dataPattern?.data?.descriptions?.map((desc, index) => (
							<p className="text-justify text-sm font-light lg:text-base" key={index}>
								{desc}
							</p>
						))}
						<div className="grow"></div>
						<Button
							onClick={startQuiz.mutateAsync}
							text={
								startQuiz.isLoading ? (
									<span className="flex items-center justify-center gap-2 font-normal">
										<ArrowPathIcon className="h-4 w-4 animate-spin" />
										Sedang membuat sesi
									</span>
								) : (
									'Mulai Quiz'
								)
							}
							disabled={startQuiz.isLoading}
						/>
					</>
				)}
			</main>
		</>
	);
};

export default LearningDetail;
