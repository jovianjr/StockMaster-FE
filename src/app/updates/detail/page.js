'use client';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/app/components/Navbar';

export default function Updates() {
	return (
		<>
			<Navbar backTo="/updates" now="updates" />
			<main className="flex flex-col items-center justify-center gap-5 px-10 pb-10 pt-24">
				<div className="flex flex-col items-center px-5 py-4">
					<h2 className="text-2xl font-semibold">Stock Updates</h2>
					<p className="text-sm italic text-gray-300">apple .inc</p>
				</div>
				<div className="relative aspect-square w-2/3">
					<Image
						src="/assets/images/placeholder/stock-logo.png"
						alt=""
						className="rounded-lg object-cover"
						fill
					/>
				</div>
				<p className="text-justify text-sm font-light">
					Apple Inc. adalah perusahaan teknologi multinasional yang berpusat di Cupertino,
					California, yang merancang, mengembangkan, dan menjual barang elektronik
					konsumen, perangkat lunak komputer, dan layanan daring. Perangkat keras yang
					diproduksi Apple meliputi telepon pintar iPhone, komputer tablet iPad, komputer
					pribadi Mac, pemutar media portabel iPod, jam pintar Apple Watch, pemutar media
					digital Apple TV, dan pengeras suara pintar HomePod.{' '}
				</p>
				<div className="relative aspect-[2/1] w-full">
					<Image
						src="/assets/images/placeholder/pattern.png"
						alt=""
						className="rounded-lg object-contain"
						fill
					/>
				</div>
			</main>
		</>
	);
}
