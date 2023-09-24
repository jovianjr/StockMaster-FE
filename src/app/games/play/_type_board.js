'use client';
import { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import Button from '@/app/components/Button';
import Box from '@/app/components/Box';

export default function Play({ name = 'Pola X', answer = null, setAnswer = () => {} }) {
	const canvasRef = useRef();

	return (
		<>
			<div className="flex flex-col gap-1">
				<h2 className="text-xl font-semibold">{name}</h2>
				<p className="text-sm">Gambarkan pola pada area board</p>
			</div>
			<Box className="flex w-full items-center justify-center !p-0 md:!p-2 lg:!p-4">
				<div className="relative flex aspect-square w-full max-w-[60vh]">
					<button
						className="absolute right-2 top-2 z-10"
						onClick={() => canvasRef.current.undo()}
					>
						<ArrowUturnLeftIcon className="h-5 w-5" />
					</button>
					<CanvasDraw
						ref={canvasRef}
						lazyRadius={0}
						brushRadius={4}
						brushColor="#ffffff"
						className="!h-full !w-full rounded-lg !bg-c-black shadow-[inset_2px_2px_10px_0_rgba(255,255,255,0.15)] backdrop-blur-lg"
						hideGrid={true}
					/>
				</div>
			</Box>
			<div className="grow lg:grow-0"></div>
			<Button
				text="selanjutnya"
				onClick={() => setAnswer(canvasRef.current.getDataURL('', '', '#000000'))}
			/>
		</>
	);
}
