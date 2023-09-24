'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import Navbar from '@/app/components/Navbar';
import Button from '@/app/components/Button';
import Box from '@/app/components/Box';

const LearningDetail = () => {
	const params = useParams();

	return (
		<>
			<Navbar backTo="/learning" />
			<main className="flex min-h-screen flex-col items-center justify-center gap-5 px-10 pb-10 pt-24 lg:min-h-[80vh] lg:px-20 lg:pt-0">
				<div className="flex flex-col items-center px-5 py-4">
					<h2 className="text-2xl font-semibold lg:text-3xl">Stock Updates</h2>
				</div>
				<Box className="p-3">
					<div className="relative aspect-[16/9] w-full lg:h-[50vh]">
						<Image
							src="/assets/images/placeholder/pattern.png"
							alt=""
							className="rounded-lg object-cover"
							fill
						/>
					</div>
				</Box>
				<p className="text-justify text-sm font-light lg:text-base">
					Pola Bearish Flag terjadi setelah tren naik yang kuat. Pola ini terlihat seperti
					bendera dengan tiang yang menunjukkan tren naik sebelumnya dan koreksi harga
					yang relatif pendek yang bergerak secara horizontal atau sedikit turun.
					Bentuknya seperti segitiga yang menurun atau lurus dengan garis miring ke bawah.
					Pola Bearish Flag adalah sinyal bahwa tren naik mungkin akan melanjutkan
					pergerakannya setelah koreksi harga singkat. Ini mengindikasikan bahwa penjual
					masih dominan meskipun terjadi koreksi harga. Trader sering mencari peluang sell
					saat harga keluar dari pola ini ke bawah.
				</p>
				<div className="grow"></div>
				<Button href={`/learning/${params.slug}/quiz`} text="Selanjutnya" />
			</main>
		</>
	);
};

export default LearningDetail;
