'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { isMobile } from 'react-device-detect';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

import Button from '@/app/components/Button';
import Navbar from '@/app/components/Navbar';

import TypeBoard from '@/app/(question)/_type_board';
import TypeDescriptionImage from '@/app/(question)/_type_description-image';
import TypeDescriptionName from '@/app/(question)/_type_description-name';
import TypeImageDescription from '@/app/(question)/_type_image-description';
import TypeImageName from '@/app/(question)/_type_image-name';

import {
	getLastAttempt,
	getPatterns,
	postAnswerQuestion,
	postEndAttempt
} from '@/app/utils/services/patterns';

const Quiz = ({ params }) => {
	const [runningTime, setRunningTime] = useState(new Date());
	const [choices, setChoices] = useState(new Array(0));
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	const {
		isLoading: PatternIsLoading,
		isError: PatternIsError,
		data: Pattern,
		isFetching: PatternIsFetching,
		error: PatternError
	} = useQuery({
		refetchOnWindowFocus: false,
		retry: 3,
		queryKey: ['patterns-with-question', params.slug],
		queryFn: () => getPatterns(params.slug + '?questions=1'),
		onSuccess: res => {
			setRunningTime(new Date());
			setChoices(new Array(res.data.questionIds.length));
		}
	});

	const {
		isLoading: AttemptIsLoading,
		isError: AttemptIsError,
		data: Attempt,
		refetch: AttemptRefetch,
		isFetching: AttemptIsFetching,
		error: AttemptError
	} = useQuery({
		refetchOnWindowFocus: false,
		retry: 3,
		queryKey: ['pattern-last-attempt', params.slug],
		queryFn: () => getLastAttempt(params.slug),
		onSuccess: res => {
			const data = res.data;
			setCurrentQuestionIndex(data.totalTrue + data.totalFalse);
		}
	});

	const answerQuestion = useMutation({
		mutationKey: ['answer-question', Pattern?.data?.questionIds[currentQuestionIndex]],
		mutationFn: () =>
			postAnswerQuestion({
				pattern_id: params?.slug,
				attempt_id: Attempt?.data?._id,
				question_id: Pattern?.data?.questionIds[currentQuestionIndex],
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
		mutationKey: ['end-attempt', Attempt?.data?._id],
		mutationFn: () =>
			postEndAttempt({
				pattern_id: params?.slug,
				attempt_id: Attempt?.data?._id
			}),
		onSuccess: () => {
			AttemptRefetch();
		}
	});

	const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
	const question = useMemo(() => {
		const currentQuestion =
			Pattern?.data?.questions[Pattern?.data?.questionIds[currentQuestionIndex]];

		const questionData =
			currentQuestion?.type === 'multiple-choice'
				? currentQuestion?.multipleChoice
				: currentQuestion?.type === 'handwrite'
				? currentQuestion?.handwrite
				: {};

		if (questionData.options) questionData.options = shuffle(questionData.options);

		return { type: currentQuestion?.type, ...questionData };
	}, [Pattern, currentQuestionIndex]);

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
			<Navbar now="learning" />
			<main className="sticky top-24 flex h-auto min-h-screen w-full flex-col gap-4 px-6 pb-10 pt-28 lg:min-h-[90vh] lg:pt-0">
				{PatternIsLoading || PatternIsFetching || AttemptIsLoading || AttemptIsFetching ? (
					<>
						<div className="h-40 w-full animate-pulse rounded-lg bg-white/20 lg:h-[40vh]"></div>
						<div className="h-10 w-full animate-pulse rounded-lg bg-white/20 lg:h-16"></div>
						<div className="h-10 w-full animate-pulse rounded-lg bg-white/20 lg:h-16"></div>
						<div className="h-10 w-full animate-pulse rounded-lg bg-white/20 lg:h-16"></div>
						<div className="h-10 w-full animate-pulse rounded-lg bg-white/20 lg:h-16"></div>
					</>
				) : PatternError ? (
					<>
						<div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4">
							<p className="text-2xl font-semibold">Sesi tidak ditemukan</p>
							<Link
								href={isMobile ? `/learning/${params.slug}` : '/learning'}
								className="cursor-pointer text-sm hover:underline lg:text-base"
							>
								kembali
							</Link>
						</div>
					</>
				) : Attempt.data.isFinished ? (
					<div className="flex h-[80vh] flex-col items-center justify-center">
						<div className="relative mb-4 aspect-square h-[35vh]">
							<Image
								src={
									Attempt.data.totalTrue /
										(Attempt.data.totalTrue + Attempt.data.totalFalse) >
									0.75
										? '/assets/images/games/done.png'
										: '/assets/images/games/robot-sad.png'
								}
								alt="Profile Cover"
								className="object-contain"
								fill
							/>
						</div>
						<div className="relative aspect-[2/1] w-40">
							<Image
								src={
									Attempt.data.totalTrue /
										(Attempt.data.totalTrue + Attempt.data.totalFalse) >
									0.75
										? '/assets/images/games/good-job.png'
										: '/assets/images/games/oh-no.png'
								}
								alt="Profile Cover"
								className="object-contain"
								fill
							/>
						</div>
						<p>
							{Attempt.data.totalTrue /
								(Attempt.data.totalTrue + Attempt.data.totalFalse) >
							0.75
								? 'Anda telah lulus quiz ini'
								: 'Anda belum lulus quiz ini'}
						</p>
						<div className="mt-10 w-40">
							<Button
								href={isMobile ? `/learning/${params.slug}` : '/learning'}
								text="kembali"
							/>
						</div>
					</div>
				) : (
					<>
						{question?.type === 'handwrite' ? (
							<TypeBoard
								name={question?.title}
								image={question?.imageUrl}
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

export default Quiz;
