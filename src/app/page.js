'use client';
import Navbar from '@/app/components/Navbar';
import Image from 'next/image';

export default function Home() {
	return (
		<>
			<Navbar />
			<main>
				<div className="relative h-[35vh] w-full overflow-hidden rounded-b-[10%]">
					<div className="absolute left-0 top-0 z-50 h-full w-full bg-black opacity-60"></div>
					<Image
						src="/assets/images/homepage/profile.png"
						alt="Logo StockMaster"
						className="relative z-10 object-cover"
						fill
					/>
				</div>
				Homepage
			</main>
		</>
	);
}
