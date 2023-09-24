'use client';
import clsx from 'clsx';
import ButtonContainer from '@/app/components/Button';

export default function DescriptionName({
	options = ['', '', ''],
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
			<div className="flex flex-col gap-2">
				{options.map(() => (
					<ButtonContainer
						key=""
						text="Opsi A"
						className={clsx(
							'w-full rounded-lg bg-transparent py-4 text-center font-semibold backdrop-blur-lg',
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
