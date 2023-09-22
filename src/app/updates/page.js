'use client';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/app/components/Navbar';

export default function Updates() {
	return (
		<>
			<Navbar />
			<main className="px-5 pb-10 pt-24">
				<div className="flex flex-col gap-4 px-5 py-4">
					<h2 className="text-2xl font-semibold">Stock Updates</h2>
					<div className="flex flex-col gap-2 px-2">
						{['', '', '', '', '', '', '', '', '', '', ''].map(val => {
							return (
								<Link
									href="/updates/detail"
									className="group flex items-center gap-4"
									key={new Date()}
								>
									<div className="relative aspect-square w-16">
										<Image
											src="/assets/images/placeholder/stock-logo.png"
											alt=""
											className="rounded-lg object-cover"
											fill
										/>
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-sm font-semibold group-hover:underline">
											Apple
										</p>
										<p className="text-xs italic text-gray-300">apple .inc</p>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</main>
		</>
	);
}
