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
		isLoading: dataPatternIsLoading,
		isError: dataPatternIsError,
		data: dataPatternList,
		isFetching: dataPatternIsFetching
	} = useQuery({
		queryKey: ['patterns'],
		queryFn: () => getPatterns()
	});

	return (
		<Box className={clsx('flex flex-col gap-6 !px-2 !py-10', className)}>
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
					{['', '', ''].map(val => (
						<SwiperSlide key={new Date()}>
							<div className="flex flex-col gap-3">
								<h2 className="text-xl font-semibold lg:text-3xl">Bearish Flag</h2>
								<div className="relative aspect-[3/2] w-full lg:aspect-[2/1]">
									<Image
										src="/assets/images/placeholder/pattern.png"
										alt="Golden Dollar Coin"
										className="object-cover"
										fill
									/>
								</div>
								<p className="line-clamp-3 text-justify text-sm font-light lg:text-base">
									Flag pattern adalah salah satu pola teknis yang digunakan dalam
									analisis teknis untuk memantau pergerakan harga di pasar
									keuangan, terutama dalam konteks perdagangan saham, forex, dan
									komoditas. Pola ini biasanya terbentuk setelah periode kenaikan
									atau penurunan harga yang tajam dan seringkali dianggap sebagai
									indikasi sementara bahwa pasar mungkin akan melanjutkan tren
									sebelumnya.
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
		</Box>
	);
};

export default SwiperLearning;
