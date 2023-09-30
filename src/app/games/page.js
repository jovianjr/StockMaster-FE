'use client';
import { ArrowDownIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import { useQuery, useMutation } from 'react-query';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Navbar from '@/app/components/Navbar';
import Box from '@/app/components/Box';
import ListBox from '@/app/components/ListBox';
import { getLeaderBoards, getlastGame, postCreateAttempt } from '@/app/utils/services/games';
import { useAuth0 } from '@auth0/auth0-react';
import Countdown from 'react-countdown';

const leaderboardOptions = [
	{ id: 2, name: 'Mingguan', value: 'weekly' },
	{ id: 1, name: 'Harian', value: 'daily' }
];

const Games = () => {
	const router = useRouter();
	const [timeframe, setTimeframe] = useState('weekly');
	const [lastGameDataId, setLastGameDataId] = useState();

	const { user } = useAuth0();

	const {
		isLoading: leaderBoardsIsLoading,
		isError: leaderBoardsIsError,
		data: leaderBoardsList,
		isFetching: leaderBoardsIsFetching
	} = useQuery({
		refetchOnWindowFocus: false,
		queryKey: ['leaderboards', timeframe],
		queryFn: () => getLeaderBoards(timeframe)
	});

	const lastGame = useQuery({
		queryKey: ['last-game'],
		queryFn: () => getlastGame(),
		onSuccess: res => {
			const data = res.data;
			setLastGameDataId(data._id);
		}
	});

	const startQuiz = useMutation({
		mutationKey: ['patterns', lastGameDataId],
		mutationFn: () => postCreateAttempt(lastGameDataId),
		onSuccess: () => {
			router.push(`/games/play`);
		}
	});

	const myLeaderboard = useMemo(() => {
		const data = leaderBoardsList?.data;
		if (data) {
			const findData = data.find(val => val.userEmail === user.email);
			return findData;
		} else return {};
	}, [user, leaderBoardsList]);

	const isFinished = useMemo(() => {
		return (
			lastGame?.data?.data?.lastAttempt?.isFinished &&
			lastGame?.data?.data?.lastAttempt?.updatedAt.slice(0, 10) ===
				new Date().toISOString().slice(0, 10)
		);
	}, [lastGame]);

	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0, 0, 0, 0);

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
						<button
							className={`flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-1 text-[0.625rem] text-xs font-semibold text-c-yellow transition-all lg:min-w-[150px] ${
								isFinished ? '' : 'hover:bg-c-yellow hover:text-black'
							} disabled:cursor-not-allowed lg:px-8 lg:py-2 lg:text-base`}
							onClick={isFinished ? null : startQuiz.mutateAsync}
							disabled={startQuiz.isLoading || isFinished}
						>
							{startQuiz.isLoading ? (
								<span>
									<ArrowPathIcon className="h-4 w-4 animate-spin" />
								</span>
							) : null}
							{isFinished ? (
								<Countdown date={tomorrow} daysInHours={true} />
							) : (
								'Mulai Tantangan'
							)}
						</button>
						<div className="absolute right-0 top-1/2 aspect-square w-10 -translate-y-1/2 translate-x-1/2 lg:w-12">
							<Image
								src={
									isFinished
										? '/assets/images/homepage/alarm.png'
										: '/assets/images/homepage/golden-coin.png'
								}
								alt="Golden Dollar Coin"
								fill
							/>
						</div>
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
											<span className="h-3 w-20 rounded-md bg-white/20 lg:h-5 lg:w-40 lg:rounded-lg"></span>
											<span className="h-2 w-28 rounded-md bg-white/20 lg:h-4 lg:w-60 lg:rounded-lg"></span>
										</div>
										<div className="grow"></div>
										<div className="flex flex-col items-center justify-center gap-1">
											<span className="aspect-square w-12 rounded-md bg-white/20 lg:w-20 lg:rounded-lg"></span>
										</div>
									</div>
								)
							)}
						</>
					) : leaderBoardsIsError || leaderBoardsList?.data?.length == 0 ? (
						<div className="flex h-40 items-center justify-center">Belum ada data</div>
					) : (
						<>
							{!!myLeaderboard ? (
								<Box className="flex items-center gap-4 p-4">
									<div className="relative aspect-square w-12 overflow-hidden rounded-full lg:w-16">
										<Image
											src={
												myLeaderboard?.user?.picture ??
												'/assets/images/placeholder/profile.png'
											}
											alt="LeaderBoard"
											className="relative z-10 object-cover"
											fill
										/>
									</div>
									<div className="flex flex-col gap-1 lg:gap-0">
										<h2 className="text-sm font-semibold lg:text-lg">
											{myLeaderboard?.user?.name}
										</h2>
										<p className="text-xs lg:text-base">
											mendapatkan{' '}
											{myLeaderboard?.totalPoints?.toLocaleString('id')} poin
										</p>
									</div>
									<div className="grow"></div>
									<div className="flex flex-col items-center justify-center gap-1">
										<span className="text-2xl font-semibold">
											{myLeaderboard?.rank}
										</span>
										<span className="flex text-xs text-red-500">
											<ArrowDownIcon className="h-4 w-4" />
											<span>12</span>
										</span>
									</div>
								</Box>
							) : null}
							<div className="flex flex-col gap-5 px-4 py-2 lg:gap-8">
								{leaderBoardsList?.data?.map((leaderBoard, idx) => {
									return (
										<div
											className="flex items-center gap-4"
											key={leaderBoard.user?._id}
										>
											<div className="relative aspect-square w-12 lg:w-16">
												<Image
													src={
														leaderBoard.user?.picture ??
														'/assets/images/placeholder/profile.png'
													}
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
													{leaderBoard.user?.name}
												</h2>
												<p className="text-xs lg:text-sm">
													mendapatkan{' '}
													{leaderBoard?.totalPoints?.toLocaleString('id')}{' '}
													poin
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
