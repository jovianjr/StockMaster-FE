'use client';
import clsx from 'clsx';
import Image from 'next/image';

import Box from '@/app/components/Box';
import ButtonContainer from '@/app/components/Button';

export default function ImageDescription({ options = ['', '', ''], answer = null, setAnswer = () => {} }) {
	return (
		<>
			<Box className="relative aspect-[16/9] !h-auto">
				<div className="relative aspect-[16/9] h-full">
					<Image
						src="/assets/images/placeholder/pattern.png"
						alt="LeaderBoard"
						className="relative z-10 object-cover"
						fill
					/>
				</div>
			</Box>
			<div className="flex flex-col gap-2">
				{options.map(() => (
					<ButtonContainer
						key=""
						text="Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."
						className={clsx(
							'w-full rounded-lg bg-transparent px-4 py-4 text-center !font-light backdrop-blur-lg',
							answer
								? 'bg-gradient-to-r from-purple-500/20 to-purple-500/50 font-bold'
								: 'bg-gradient-to-r from-white/10 to-white/20'
						)}
						onClick={() => setAnswer('a')}
					/>
				))}
			</div>
		</>
	);
}
