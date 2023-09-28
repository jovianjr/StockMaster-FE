'use client';
import { useState } from 'react';

import Button from '@/app/components/Button';
import Navbar from '@/app/components/Navbar';

import TypeBoard from '@/app/(question)/_type_board';
import TypeDescriptionImage from '@/app/(question)/_type_description-image';
import TypeDescriptionName from '@/app/(question)/_type_description-name';
import TypeImageDescription from '@/app/(question)/_type_image-description';
import TypeImageName from '@/app/(question)/_type_image-name';

const questions = [
	{
		type: 'board',
		options: ['', '', '', '']
	},
	{
		type: 'desc-image',
		options: ['', '', '', '']
	},
	{
		type: 'desc-name',
		options: ['', '', '', '']
	},
	{
		type: 'image-desc',
		options: ['', '', '', '']
	},
	{
		type: 'image-name',
		options: ['', '', '', '']
	}
];

export default function Play() {
	const [choice, setChoice] = useState(new Array(questions.length));
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	const handleAnswerBoard = val => {
		hanldeNext();
		console.log(val);
	};

	const hanldeNext = val => {
		setCurrentQuestionIndex(prevState => {
			if (prevState <= questions.length) return prevState + 1;
			else return prevState;
		});
	};

	const handleAnswer = val => {
		setChoice(prevState => {
			const st = [...prevState];
			st[currentQuestionIndex] = val;
			console.log(st);
			return st;
		});
	};

	return (
		<>
			<Navbar />
			<main className="sticky top-24 flex h-auto min-h-screen w-full flex-col gap-4 px-6 pb-10 pt-28 lg:min-h-[90vh] lg:pt-0">
				{questions[currentQuestionIndex].type === 'board' ? (
					<TypeBoard
						name="Bearish Flag"
						answer={choice[currentQuestionIndex]}
						setAnswer={handleAnswerBoard}
					/>
				) : null}

				{questions[currentQuestionIndex].type === 'desc-image' ? (
					<TypeDescriptionImage
						options={['', '', '', '']}
						answer={choice[currentQuestionIndex]}
						setAnswer={handleAnswer}
					/>
				) : null}

				{questions[currentQuestionIndex].type === 'desc-name' ? (
					<TypeDescriptionName
						options={['', '', '', '']}
						answer={choice[currentQuestionIndex]}
						setAnswer={handleAnswer}
					/>
				) : null}

				{questions[currentQuestionIndex].type === 'image-desc' ? (
					<TypeImageDescription
						options={['', '', '', '']}
						answer={choice[currentQuestionIndex]}
						setAnswer={handleAnswer}
					/>
				) : null}

				{questions[currentQuestionIndex].type === 'image-name' ? (
					<TypeImageName
						options={['', '', '', '']}
						answer={choice[currentQuestionIndex]}
						setAnswer={handleAnswer}
					/>
				) : null}

				{questions[currentQuestionIndex].type !== 'board' ? (
					<>
						<div className="grow"></div>
						<Button text="selanjutnya" onClick={hanldeNext} />
					</>
				) : null}
			</main>
		</>
	);
}
