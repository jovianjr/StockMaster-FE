'use client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { BrowserView, MobileView } from 'react-device-detect';

import Navbar from '@/app/components/Navbar';
import Box from '@/app/components/Box';
import DetailPage from '@/app/learning/[slug]/page';
import { getPatterns } from '@/app/utils/services/patterns';

export default function Learning() {
	const [activeIndex, setActiveIndex] = useState(0);

	const {
		isLoading: dataPatternIsLoading,
		isError: dataPatternIsError,
		data: dataPatternList,
		isFetching: dataPatternIsFetching
	} = useQuery({
		refetchOnWindowFocus: false,
		queryKey: ['patterns'],
		queryFn: () => getPatterns()
	});

	return (
		<>
			<Navbar now="learning" />
			<main className="sticky top-24 px-5 pb-10 pt-28 lg:flex lg:pt-0">
				<div className="flex flex-1 flex-col gap-4 px-6 lg:gap-6">
					<h2 className="text-2xl font-semibold lg:text-3xl">List Pola Saham</h2>
					<div className="flex flex-col gap-3 lg:max-h-[80vh] lg:overflow-auto lg:pr-2">
						{dataPatternIsLoading || dataPatternIsFetching
							? [
									'loading-1',
									'loading-2',
									'loading-3',
									'loading-4',
									'loading-5',
									'loading-6'
							  ].map(val => (
									<div
										key={val}
										className="h-40 w-full animate-pulse rounded-lg bg-white/20"
									></div>
							  ))
							: dataPatternList?.data?.map((pattern, idx) => {
									const patternScore =
										(pattern?.lastAttempt?.totalTrue /
											(pattern?.lastAttempt?.totalTrue +
												pattern?.lastAttempt?.totalFalse)) *
										100;

									return (
										<PatternContainer
											href={`/learning/${pattern._id}`}
											className={`flex items-center gap-4 transition-all lg:rounded-lg ${
												activeIndex === idx ? 'bg-c-purple' : ''
											}`}
											key={pattern._id}
											onClick={() => setActiveIndex(idx)}
										>
											<Box className="relative flex gap-4 overflow-hidden transition-all hover:scale-95 hover:bg-white/30">
												{patternScore > 0 ? (
													<>
														<div
															className={clsx(
																'absolute left-0 top-0 z-0 h-full w-full',
																patternScore >= 75
																	? 'bg-green-500/20'
																	: '',
																patternScore < 75 &&
																	patternScore > 0
																	? 'bg-yellow-500/10'
																	: ''
															)}
														></div>
														<span
															className={clsx(
																'absolute right-3 top-3 rounded-full px-2 py-0.5 text-[0.625rem]',
																patternScore >= 75
																	? 'bg-green-500'
																	: '',
																patternScore < 75 &&
																	patternScore > 0
																	? 'bg-yellow-500'
																	: ''
															)}
														>
															{patternScore.toFixed() ?? 0}%
														</span>
													</>
												) : null}
												<div className="relative z-10 aspect-square w-1/3">
													<Image
														src={pattern.imageUrl}
														alt=""
														className="rounded-lg object-cover"
														fill
													/>
												</div>
												<div className="relative z-10 flex w-2/3 flex-col gap-2">
													<h2 className="text-xl font-semibold">
														{pattern.title}
													</h2>
													<p className="line-clamp-3 text-xs leading-7 lg:text-sm">
														{pattern?.descriptions[0]}
													</p>
												</div>
											</Box>
										</PatternContainer>
									);
							  })}
					</div>
				</div>
				<BrowserView className="hidden flex-[2] py-4 lg:flex lg:flex-col">
					{!!dataPatternList ? (
						<>
							<h2 className="text-2xl font-semibold lg:text-4xl">
								{dataPatternList?.data[activeIndex]?.title}
							</h2>
							<DetailPage id={dataPatternList?.data[activeIndex]?._id} />
						</>
					) : null}
				</BrowserView>
			</main>
		</>
	);
}

const PatternContainer = ({
	children,
	className = '',
	href = '/learning/',
	onClick = () => {}
}) => {
	return (
		<>
			<BrowserView className={className} onClick={onClick}>
				{children}
			</BrowserView>
			<MobileView>
				<Link href={href} className={className}>
					{children}
				</Link>
			</MobileView>
		</>
	);
};
