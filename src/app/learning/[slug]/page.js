'use client';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

import Navbar from '@/app/components/Navbar';
import Button from '@/app/components/Button';
import Box from '@/app/components/Box';
import { getPatterns } from '@/app/utils/services/patterns';

const LearningDetail = ({ params }) => {
	const {
		isLoading: dataPatternIsLoading,
		isError: dataPatternIsError,
		data: dataPattern,
		isFetching: dataPatternIsFetching,
		error: dataPatternError
	} = useQuery({
		retry: 3,
		queryKey: ['patterns', params.slug],
		queryFn: () => getPatterns(params.slug)
	});

	useEffect(() => {
		if (dataPatternError?.response?.data?.message == 'invalid object id') {
			notFound();
		}
	}, [dataPatternError, dataPatternIsError]);

	return (
		<>
			<Navbar backTo="/learning" />
			<main className="flex min-h-screen flex-col items-center justify-center gap-5 px-10 pb-10 pt-24 lg:min-h-[80vh] lg:px-20 lg:pt-0">
				{dataPatternIsLoading || dataPatternIsFetching ? (
					<>
						<div className="mt-4 h-10 w-full animate-pulse rounded-md bg-white/20"></div>
						<div className="h-[25vh] w-full animate-pulse rounded-md bg-white/20 lg:h-[50vh]"></div>
						<div className="h-24 w-full animate-pulse rounded-md bg-white/20"></div>
						<div className="grow"></div>
						<div className="h-10 w-full animate-pulse rounded-md bg-white/20"></div>
					</>
				) : (
					<>
						<div className="flex flex-col items-center px-5 py-4">
							<h2 className="text-2xl font-semibold lg:text-3xl">
								{dataPattern?.data?.title}
							</h2>
						</div>
						<Box className="p-3">
							<div className="relative aspect-[16/9] w-full lg:h-[50vh]">
								<Image
									src={dataPattern?.data?.imageUrl}
									alt=""
									className="rounded-lg object-cover"
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
						<Button href={`/learning/${params.slug}/quiz`} text="Selanjutnya" />
					</>
				)}
			</main>
		</>
	);
};

export default LearningDetail;
