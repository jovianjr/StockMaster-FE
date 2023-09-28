'use client';
import clsx from 'clsx';
import Image from 'next/image';

import Box from '@/app/components/Box';
import ButtonContainer from '@/app/components/Button';

export default function ImageName({ question = {}, answer = null, setAnswer = () => {} }) {
	return (
		<>
			<Box className="relative aspect-[16/9] !h-auto lg:flex lg:!h-[40vh] lg:justify-center">
				<div className="relative aspect-[16/9] h-full">
					<Image
						src={question?.imageUrl}
						alt="LeaderBoard"
						className="relative z-10 object-cover"
						fill
					/>
				</div>
			</Box>
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
