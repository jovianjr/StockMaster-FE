'use client';
import clsx from 'clsx';
import Image from 'next/image';

import Box from '@/app/components/Box';

export default function DescriptionImage({ question = {}, answer = null, setAnswer = () => {} }) {
	return (
		<>
			<p className="pb-8 text-center">{question.question}</p>
			<div className="grid h-full min-h-[50vh] grid-cols-2 gap-2 lg:h-[60vh]">
				{question?.options.map(option => (
					<Box
						className={clsx(
							'relative cursor-pointer !p-1 transition-all hover:bg-white/20',
							answer === option.id
								? 'scale-95 !border-4 !border-c-yellow !bg-c-yellow/20'
								: ''
						)}
						key={option.id}
						onClick={() => setAnswer(option?.id)}
					>
						<div className="relative h-full w-full">
							<Image
								src={option?.value}
								alt="LeaderBoard"
								className="relative z-10 object-contain p-4"
								fill
							/>
						</div>
					</Box>
				))}
			</div>
		</>
	);
}
