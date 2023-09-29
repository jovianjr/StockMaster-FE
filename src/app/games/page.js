'use client';
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import { useQuery } from 'react-query';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/app/components/Navbar';
import Box from '@/app/components/Box';
import ListBox from '@/app/components/ListBox';
import { getLeaderBoards } from '@/app/utils/services/games';

const leaderboardOptions = [
	{ id: 1, name: 'Harian', value: 'daily' },
	{ id: 2, name: 'Mingguan', value: 'weekly' }
];

const Games = () => {
	const [timeframe, setTimeframe] = useState('daily');

	const {
		isLoading: leaderBoardsIsLoading,
		isError: leaderBoardsIsError,
		data: leaderBoardsList,
		isFetching: leaderBoardsIsFetching
	} = useQuery({
		queryKey: ['leaderboards', timeframe],
		queryFn: () => getLeaderBoards(timeframe)
	});

	return (
		<>
			<Navbar now="games" />
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
							onChange={val => setTimeframe(val)}
						/>
					</div>
					{leaderBoardsIsLoading || leaderBoardsIsFetching ? (
						<>
							{['loading-1', 'loading-2', 'loading-3', 'loading-4', 'loading-5'].map(
								val => (
									<div
										className="flex animate-pulse items-center gap-4"
										key={val}
									>
										<div className="relative aspect-square w-12 overflow-hidden rounded-full bg-white/20 lg:w-16"></div>
										<div className="flex flex-col gap-2">
											<span className="h-5 w-40 rounded-md bg-white/20 lg:rounded-lg"></span>
											<span className="h-4 w-60 rounded-md bg-white/20 lg:rounded-lg"></span>
										</div>
										<div className="grow"></div>
										<div className="flex flex-col items-center justify-center gap-1">
											<span className="aspect-square w-20 rounded-md bg-white/20 lg:rounded-lg"></span>
										</div>
									</div>
								)
							)}
						</>
					) : leaderBoardsIsError ? (
						<div className="flex h-40 items-center justify-center">Belum ada data</div>
					) : (
						<>
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
									<h2 className="text-sm font-semibold lg:text-lg">
										Lutfi Andriyanto
									</h2>
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
								{leaderBoardsList?.data?.leaderBoards?.map((leaderBoard, idx) => {
									return (
										<div
											className="flex items-center gap-4"
											key={leaderBoard.rank}
										>
											<div className="relative aspect-square w-12 lg:w-16">
												<Image
													src="/assets/images/placeholder/profile.png"
													alt="LeaderBoard"
													className="relative z-10 rounded-full object-cover"
													fill
												/>
												<Box className="absolute bottom-0 right-0 z-10 flex !h-5 !w-5 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full !p-0 !text-sm font-semibold !text-c-yellow lg:!h-8 lg:!w-8">
													{leaderBoard.rank <= 2 ? (
														<Image
															src="/assets/images/games/crown.png"
															alt="LeaderBoard"
															className="relative rounded-full object-contain"
															fill
														/>
													) : (
														leaderBoard.rank
													)}
												</Box>
											</div>
											<div className="flex flex-col gap-1 lg:gap-0	">
												<h2 className="text-sm font-semibold lg:text-base">
													Lutfi Andriyanto
												</h2>
												<p className="text-xs lg:text-sm">
													mendapatkan 3.457 poin
												</p>
											</div>
											<div className="grow"></div>
											{leaderBoard.rank <= 2 ? (
												<div className="flex flex-col items-center justify-center gap-1">
													<span className="text-2xl font-semibold">
														{leaderBoard.rank}
													</span>
												</div>
											) : null}
										</div>
									);
								})}
							</div>
						</>
					)}
				</div>
			</main>
		</>
	);
};

export default Games;
