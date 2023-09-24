'use client';
import clsx from 'clsx';
import Image from 'next/image';

import Box from '@/app/components/Box';
import ButtonContainer from '@/app/components/Button';

export default function DescriptionImage({
	options = ['', '', '', ''],
	answer = null,
	setAnswer = () => {}
}) {
	return (
		<>
			<p className="pb-8 text-center">
				Pola yang terbentuk ketika harga saham atau aset bergerak dalam saluran naik yang
				semakin sempit. Garis tren atas yang miring naik lebih cepat daripada garis tren
				bawah yang miring naik.
			</p>
			<div className="grid h-full grid-cols-2 gap-2">
				{options.map(() => (
					<Box
						className={clsx('relative !p-1', answer ? '!bg-purple-500/30' : '')}
						key=""
						onClick={() => setAnswer(option)}
					>
						<div className="relative h-full w-full">
							<Image
								src="/assets/images/placeholder/pattern.png"
								alt="LeaderBoard"
								className="relative z-10 object-contain"
								fill
							/>
						</div>
					</Box>
				))}
			</div>
		</>
	);
}
