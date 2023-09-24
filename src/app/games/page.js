'use client';
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/app/components/Navbar';
import Box from '@/app/components/Box';
import ListBox from '@/app/components/ListBox';

const leaderboardOptions = [
	{ id: 1, name: 'Harian' },
	{ id: 2, name: 'Mingguan' }
];

const Games = () => {
	const handleChange = val => {
		console.log('options: ', val);
	};

	return (
		<>
			<Navbar />
			<main className="flex flex-col gap-4 px-6 pb-10 pt-28 lg:pt-0">
				<Box className="flex flex-col gap-2 lg:gap-4 lg:px-10 lg:py-12">
					<h1 className="text-2xl font-semibold lg:text-4xl">Tantangan Harian</h1>
					<p className="text-xs leading-5 lg:text-base">
						Siapakah yang akan menjadi juara hari ini? Ambil tantangan harian kami dan
						bersainglah dengan pemain lain untuk menduduki peringkat teratas!
					</p>
					<div className="relative mt-2 flex w-fit items-center">
						<Link href="/games/play">
							<button className="rounded-full border border-white/20 px-6 py-1 text-[0.625rem] text-xs font-semibold text-c-yellow transition-all hover:bg-c-yellow hover:text-black lg:px-8 lg:py-2 lg:text-base">
								Mulai Tantangan
							</button>
						</Link>
						<Image
							src="/assets/images/homepage/golden-coin.png"
							alt="Golden Dollar Coin"
							className="absolute right-0 aspect-square translate-x-1/2"
							width={48}
							height={48}
						/>
					</div>
				</Box>
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<h1 className="text-xl font-semibold lg:text-2xl">Papan Peringkat</h1>
						<ListBox
							className="w-32 lg:w-40"
							options={leaderboardOptions}
							onChange={handleChange}
						/>
					</div>
					<Box className="flex items-center gap-4 p-4">
						<div className="relative aspect-square w-12 overflow-hidden rounded-full lg:w-16">
							<Image
								src="/assets/images/placeholder/profile.png"
								alt="LeaderBoard"
								className="relative z-10 object-cover"
								fill
							/>
						</div>
						<div className="flex flex-col gap-1 lg:gap-0">
							<h2 className="text-sm font-semibold lg:text-lg">Lutfi Andriyanto</h2>
							<p className="text-xs lg:text-base">mendapatkan 3.457 poin</p>
						</div>
						<div className="grow"></div>
						<div className="flex flex-col items-center justify-center gap-1">
							<span className="text-2xl font-semibold">7</span>
							<span className="flex text-xs text-red-500">
								<ArrowDownIcon className="h-4 w-4" />
								<span>12</span>
							</span>
						</div>
					</Box>
					<div className="flex flex-col gap-5 px-4 py-2">
						{['', '', '', '', ''].map((val, idx) => {
							return (
								<div className="flex items-center gap-4" key="">
									<div className="relative aspect-square w-12 lg:w-16">
										<Image
											src="/assets/images/placeholder/profile.png"
											alt="LeaderBoard"
											className="relative z-10 rounded-full object-cover"
											fill
										/>
										<Box className="absolute bottom-0 right-0 z-10 flex !h-5 !w-5 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full !p-0 !text-sm font-semibold !text-c-yellow lg:!h-8 lg:!w-8">
											{idx <= 2 ? (
												<Image
													src="/assets/images/games/crown.png"
													alt="LeaderBoard"
													className="relative rounded-full object-contain"
													fill
												/>
											) : (
												idx + 1
											)}
										</Box>
									</div>
									<div className="flex flex-col gap-1 lg:gap-0	">
										<h2 className="text-sm font-semibold lg:text-base">
											Lutfi Andriyanto
										</h2>
										<p className="text-xs lg:text-sm">mendapatkan 3.457 poin</p>
									</div>
									<div className="grow"></div>
									{idx <= 2 ? (
										<div className="flex flex-col items-center justify-center gap-1">
											<span className="text-2xl font-semibold">
												{idx + 1}
											</span>
										</div>
									) : null}
								</div>
							);
						})}
					</div>
				</div>
			</main>
		</>
	);
};

export default Games;
