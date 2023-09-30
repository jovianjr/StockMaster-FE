'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useQuery } from 'react-query';
import 'swiper/css';

import Box from '@/app/components/Box';
import { getPatterns } from '@/app/utils/services/patterns';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import clsx from 'clsx';

const SwiperLearning = ({ className = '' }) => {
	const [swiper, setSwiper] = useState(null);

	const {
		isLoading: patternsIsLoading,
		isError: patternsIsError,
		data: patternsList,
		isFetching: patternsIsFetching
	} = useQuery({
		refetchOnWindowFocus: false,
		queryKey: ['patterns'],
		queryFn: () => getPatterns()
	});

	return (
		<Box className={clsx('flex flex-col gap-6 !px-2 !py-10', className)}>
			{patternsIsLoading || patternsIsFetching ? (
				<div className="flex animate-pulse flex-col items-start justify-center gap-3 px-6">
					<div className="h-6 w-1/4 rounded-md bg-white/20 lg:h-10"></div>
					<div className="h-[25vh] w-full rounded-md bg-white/20 lg:h-[50vh]"></div>
					<div className="h-10 w-full rounded-md bg-white/20 lg:h-20"></div>
					<div className="h-6 w-full rounded-md bg-white/20 lg:h-10"></div>
				</div>
			) : patternsIsError ? (
				<div className="flex h-[70vh] flex-col items-center justify-center  gap-3">
					<p className="text-sm lg:text-base">Oops, Terjadi kesalahan.</p>
					<p className="text-xs lg:text-sm">Silakan coba lagi nanti</p>
				</div>
			) : (
				<>
					<div className="flex items-center gap-1">
						<ChevronLeftIcon
							className="h-16 w-12 cursor-pointer"
							onClick={() => swiper.slidePrev()}
						/>
						<Swiper
							className="h-full w-full"
							slidesPerView={1}
							spaceBetween={30}
							loop={true}
							modules={[Autoplay, Navigation]}
							autoplay={{
								delay: 3000,
								disableOnInteraction: false
							}}
							onSwiper={s => {
								setSwiper(s);
							}}
						>
							{patternsList?.data?.map(pattern => (
								<SwiperSlide key={pattern._id}>
									<div className="flex flex-col gap-3">
										<h2 className="text-xl font-semibold lg:text-3xl">
											{pattern.title}
										</h2>
										<div className="relative aspect-[3/2] w-full lg:aspect-[2/1]">
											<Image
												src={pattern.imageUrl}
												alt="Golden Dollar Coin"
												className="object-contain"
												fill
											/>
										</div>
										<p className="line-clamp-3 text-justify text-sm font-light lg:text-base">
											{pattern.descriptions[0]}
										</p>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
						<ChevronRightIcon
							className="h-16 w-12 cursor-pointer"
							onClick={() => swiper.slideNext()}
						/>
					</div>
					<Link href="/learning" className="mx-10">
						<button className="w-full rounded-full border border-white/50 px-4 py-2 text-xs transition-all hover:bg-white hover:text-black">
							Pelajari lebih lanjut
						</button>
					</Link>
				</>
			)}
		</Box>
	);
};

export default SwiperLearning;
