'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

import Button from '@/app/components/Button';
import Navbar from '@/app/components/Navbar';

import TypeBoard from '@/app/(question)/_type_board';
import TypeDescriptionImage from '@/app/(question)/_type_description-image';
import TypeDescriptionName from '@/app/(question)/_type_description-name';
import TypeImageDescription from '@/app/(question)/_type_image-description';
import TypeImageName from '@/app/(question)/_type_image-name';

import {
	getGame,
	getlastGame,
	postAnswerQuestion,
	postEndAttempt
} from '@/app/utils/services/games';

const Games = () => {
	const [runningTime, setRunningTime] = useState(new Date());
	const [choices, setChoices] = useState(new Array(0));
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	const {
		isLoading: lastGameIsLoading,
		isError: lastGameIsError,
		data: lastGame,
		refetch: lastGameRefetch,
		isFetching: lastGameIsFetching,
		error: lastGameError
	} = useQuery({
		refetchOnWindowFocus: false,
		queryKey: ['last-game'],
		queryFn: () => getlastGame(),
		onSuccess: res => {
			const data = res.data.lastAttempt;
			setCurrentQuestionIndex(data.totalTrue + data.totalFalse);
		}
	});

	const {
		isLoading: gameIsLoading,
		isError: gameIsError,
		data: game,
		isFetching: gameIsFetching,
		error: gameError
	} = useQuery({
		refetchOnWindowFocus: false,
		enabled: !!lastGame?.data,
		retry: 3,
		queryKey: ['game', lastGame?.data?._id],
		queryFn: () => getGame(lastGame?.data?._id + '?questions=1'),
		onSuccess: res => {
			setRunningTime(new Date());
			setChoices(new Array(res.data.questionIds.length));
		}
	});

	const answerQuestion = useMutation({
		mutationKey: ['answer-question', game?.data?.questionIds[currentQuestionIndex]],
		mutationFn: () =>
			postAnswerQuestion({
				game_id: lastGame?.data?._id,
				attempt_id: lastGame?.data?.lastAttempt?._id,
				question_id: game?.data?.questionIds[currentQuestionIndex],
				answer: choices[currentQuestionIndex],
				timeSeconds: (new Date() - runningTime) / 1000
			}),
		onSuccess: () => {
			setRunningTime(new Date());
			if (choices.length - 1 !== currentQuestionIndex) {
				setCurrentQuestionIndex(prevState => {
					if (prevState <= choices.length) return prevState + 1;
					else return prevState;
				});
			} else {
				endAttempt.mutateAsync();
			}
		}
	});

	const endAttempt = useMutation({
		mutationKey: ['end-attempt', lastGame?.data?.lastAttempt?._id],
		mutationFn: () =>
			postEndAttempt({
				game_id: lastGame?.data?._id,
				attempt_id: lastGame?.data?.lastAttempt?._id
			}),
		onSuccess: () => {
			lastGameRefetch();
		}
	});

	const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
	const question = useMemo(() => {
		const currentQuestion =
			game?.data?.questions[game?.data?.questionIds[currentQuestionIndex]];

		const questionData =
			currentQuestion?.type === 'multiple-choice'
				? currentQuestion?.multipleChoice
				: currentQuestion?.type === 'handwrite'
				? currentQuestion?.handwrite
				: {};

		if (questionData.options) questionData.options = shuffle(questionData.options);

		return { type: currentQuestion?.type, ...questionData };
	}, [game, currentQuestionIndex]);

	const progress = useMemo(() => {
		const val = (currentQuestionIndex / choices.length) * 100;
		return `${val}%`;
	}, [currentQuestionIndex, choices]);

	const handleAnswer = val => {
		setChoices(prevState => {
			const st = [...prevState];
			st[currentQuestionIndex] = val;
			return st;
		});
	};

	return (
		<>
			<Navbar now="games" />
			<main className="sticky top-24 flex h-auto min-h-screen w-full flex-col gap-4 px-6 pb-10 pt-28 lg:min-h-[90vh] lg:pt-0">
				{gameIsLoading || gameIsFetching || lastGameIsLoading || lastGameIsFetching ? (
					<>
						<div className="h-40 w-full animate-pulse rounded-lg bg-white/20 lg:h-[40vh]"></div>
						<div className="h-10 w-full animate-pulse rounded-lg bg-white/20 lg:h-16"></div>
						<div className="h-10 w-full animate-pulse rounded-lg bg-white/20 lg:h-16"></div>
						<div className="h-10 w-full animate-pulse rounded-lg bg-white/20 lg:h-16"></div>
						<div className="h-10 w-full animate-pulse rounded-lg bg-white/20 lg:h-16"></div>
					</>
				) : gameError ? (
					<div className="flex h-[80vh] flex-col items-center justify-center">
						<div className="relative mb-4 aspect-square h-[25vh]">
							<Image
								src={'/assets/images/games/robot-sad.png'}
								alt="Not passed icon"
								className="object-contain"
								fill
							/>
						</div>
						<div className="flex flex-col items-center justify-center gap-1 font-semibold">
							Sesi tidak ditemukan
						</div>
						<div className="mt-10 w-40 lg:w-80">
							<Button href={`/games`} text="Kembali" />
						</div>
					</div>
				) : lastGame?.data?.lastAttempt?.isFinished ? (
					<div className="flex h-[80vh] flex-col items-center justify-center gap-4">
						<div className="relative mb-4 aspect-square h-[25vh]">
							<Image
								src={'/assets/images/games/complete.png'}
								alt="Passed icon"
								className="object-contain"
								fill
							/>
						</div>
						<div className="flex flex-col items-center justify-center gap-1">
							<h1 className="text-3xl font-semibold">Selesai 👏🏻</h1>
							<p className="text-xs font-semibold">
								+ {lastGame?.data?.lastAttempt?.totalPoints} Poin
							</p>
						</div>
						<div className="mt-10 w-40 lg:w-80">
							<Button href={`/games`} text="Periksa Peringkat" />
						</div>
					</div>
				) : (
					<>
						{question?.type === 'handwrite' ? (
							<TypeBoard
								name={question?.title}
								progress={progress}
								setAnswer={handleAnswer}
							/>
						) : null}

						{question?.type === 'multiple-choice' ? (
							<>
								{question?.question && question?.optionType === 'image' ? (
									<TypeDescriptionImage
										question={question}
										answer={choices[currentQuestionIndex]}
										setAnswer={handleAnswer}
									/>
								) : null}

								{question?.question && question?.optionType === 'short-text' ? (
									<TypeDescriptionName
										question={question}
										answer={choices[currentQuestionIndex]}
										setAnswer={handleAnswer}
									/>
								) : null}

								{question?.imageUrl && question?.optionType === 'long-text' ? (
									<TypeImageDescription
										question={question}
										answer={choices[currentQuestionIndex]}
										setAnswer={handleAnswer}
									/>
								) : null}

								{question?.imageUrl && question?.optionType === 'short-text' ? (
									<TypeImageName
										question={question}
										answer={choices[currentQuestionIndex]}
										setAnswer={handleAnswer}
									/>
								) : null}
							</>
						) : null}

						<div className="grow"></div>
						<Button
							className="relative overflow-hidden !bg-white/20 shadow-[inset_0_2px_6px_0_rgba(255,255,255,0.25)] backdrop-blur-lg transition-all duration-500 disabled:!bg-white/30"
							onClick={answerQuestion.mutateAsync}
							disabled={answerQuestion.isLoading || endAttempt.isLoading}
						>
							<span
								className="absolute left-0 top-0 z-0 h-full w-full rounded-full bg-c-purple shadow-[inset_0_2px_6px_0_rgba(255,255,255,0.25)] transition-all duration-1000"
								style={{
									width: progress
								}}
							></span>
							<span className="relative z-10">
								{answerQuestion.isLoading || endAttempt.isLoading ? (
									<span className="flex items-center justify-center gap-2 font-normal">
										<ArrowPathIcon className="h-4 w-4 animate-spin" />
										{choices.length - 1 !== currentQuestionIndex
											? 'Selanjutnya'
											: 'Selesai'}
									</span>
								) : choices.length - 1 !== currentQuestionIndex ? (
									'Selanjutnya'
								) : (
									'Selesai'
								)}
							</span>
						</Button>
					</>
				)}
			</main>
		</>
	);
};

export default Games;
