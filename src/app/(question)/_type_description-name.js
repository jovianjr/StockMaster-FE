'use client';
import clsx from 'clsx';
import ButtonContainer from '@/app/components/Button';

export default function DescriptionName({ question = {}, answer = null, setAnswer = () => {} }) {
	return (
		<>
			<p className="pb-8 text-center">{question?.question}</p>
			<div className="flex flex-col gap-2">
				{question?.options?.map(option => (
					<ButtonContainer
						key={option.id}
						text={option.value}
						className={clsx(
							'w-full rounded-lg bg-transparent py-4 text-center font-semibold backdrop-blur-lg transition-all hover:bg-white/20',
							answer === option.id
								? 'scale-95 border-2 border-c-yellow bg-gradient-to-r from-c-yellow/40 to-c-yellow/70 font-bold'
								: 'bg-gradient-to-r from-white/10 to-white/20'
						)}
						onClick={() => setAnswer(option.id)}
					/>
				))}
			</div>
		</>
	);
}
