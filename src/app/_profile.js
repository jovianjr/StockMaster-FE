'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth0 } from '@auth0/auth0-react';
import 'swiper/css';

import Box from '@/app/components/Box';
import SwiperPattern from '@/app/_pattern';
import { useEffect } from 'react';

export default function Profile({ className = '', patternClassName = '' }) {
	const { user } = useAuth0();

	useEffect(() => {
		console.log(user);
	}, []);

	return (
		<>
			<main className={className}>
				<div className="relative h-[35vh] w-full overflow-hidden rounded-b-[10%] rounded-t-none lg:h-[35vh] lg:rounded-t-[10%]">
					<div className="absolute left-0 top-0 z-50 h-full w-full bg-black opacity-60 lg:opacity-0"></div>
					<Image
						src="/assets/images/placeholder/profile-cover.png"
						alt="Profile Cover"
						className="relative z-10 object-cover"
						fill
					/>
				</div>
				<div className="relative flex flex-col items-center">
					<div className=" relative z-50 -mb-[20%] aspect-square w-2/5 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-white lg:-mb-[25%] lg:w-1/2">
						<Image
							src={user?.picture ?? '/assets/images/placeholder/profile.png'}
							alt="Profile Picture"
							className="relative z-10 object-cover"
							fill
						/>
					</div>
					<div className="flex flex-col items-center py-4">
						<h1 className="text-2xl font-semibold">{user?.name}</h1>
						<span className="text-xs italic text-gray-300">
							mendapatkan <b className="text-c-yellow">3.457 poin</b> minggu ini
						</span>
					</div>
				</div>
				<div className="flex flex-col gap-4 px-5 py-4 lg:px-0 lg:py-0">
					<Box className="flex !py-10">
						<div className="relative flex-1">
							<Image
								src="/assets/images/homepage/leaderboard.png"
								alt="LeaderBoard"
								className="relative z-10 object-cover"
								fill
							/>
						</div>
						<div className="flex w-full flex-1 flex-col gap-1">
							<h2 className="text-xl font-semibold">Tantangan</h2>
							<p className="text-[0.625rem] lg:text-xs">
								Mainkan tiap hari untuk mengukur kemampuanmu dengan peserta lain
							</p>
							<span className="relative mt-2 flex w-full items-center">
								<Link href="/games">
									<button className="relative rounded-full border border-white/20 px-6 py-1 text-[0.625rem] text-xs font-semibold text-c-yellow transition-all hover:bg-c-yellow hover:text-black lg:py-2">
										Cek Sekarang
										<Image
											src="/assets/images/homepage/golden-coin.png"
											alt="Golden Dollar Coin"
											className="absolute right-0 top-1/2 aspect-square -translate-y-1/2 translate-x-1/2"
											width={40}
											height={40}
										/>
									</button>
								</Link>
							</span>
						</div>
					</Box>

					<SwiperPattern className={patternClassName} />

					<Box className="flex flex-col gap-3 !py-10">
						<h2 className="text-xl font-semibold">Stock Updates</h2>
						<div className="flex flex-col gap-2">
							{[
								'updates-1',
								'updates-12',
								'updates-13',
								'updates-14',
								'updates-15'
							].map(val => {
								return (
									<div className="flex items-center gap-4" key={val}>
										<div className="relative aspect-square w-16">
											<Image
												src="/assets/images/placeholder/pattern.png"
												alt="Golden Dollar Coin"
												className="object-cover"
												fill
											/>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-sm font-semibold lg:text-base">
												Apple
											</p>
											<p className="text-xs italic text-gray-300 lg:text-sm">
												apple .inc
											</p>
										</div>
									</div>
								);
							})}
						</div>
						<Link href="/updates">
							<button className="mt-2 w-full rounded-full border border-white/50 px-4 py-2 text-xs transition-all hover:bg-white hover:text-black">
								Lihat Semua
							</button>
						</Link>
					</Box>
				</div>
			</main>
		</>
	);
}
