'use client';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/app/components/Navbar';
import Box from '@/app/components/Box';
import clsx from 'clsx';

export default function Learning() {
	return (
		<>
			<Navbar />
			<main className="flex flex-col gap-4 px-6 pb-10 pt-28">
				<h2 className="text-2xl font-semibold">List Pola Saham</h2>
				<div className="flex flex-col gap-3">
					{[
						{ score: null },
						{ score: 80 },
						{ score: 100 },
						{ score: 0 },
						{ score: 80 },
						{ score: 0 }
					].map(val => {
						return (
							<Link
								href="/learning/1"
								className="group flex items-center gap-4"
								key={new Date()}
							>
								<Box className="relative flex gap-4 overflow-hidden">
									{val.score > 0 ? (
										<>
											<div
												className={clsx(
													'absolute left-0 top-0 z-0 h-full w-full',
													val.score == 100 ? 'bg-green-500/20' : '',
													val.score < 100 && val.score > 0
														? 'bg-yellow-500/10'
														: ''
												)}
											></div>
											<span
												className={clsx(
													'absolute right-3 top-3 rounded-full px-2 py-0.5 text-[0.625rem]',
													val.score == 100 ? 'bg-green-500' : '',
													val.score < 100 && val.score > 0
														? 'bg-yellow-500'
														: ''
												)}
											>
												{val.score ?? 0}%
											</span>
										</>
									) : null}
									<div className="relative z-10 aspect-square w-1/3">
										<Image
											src="/assets/images/placeholder/pattern.png"
											alt=""
											className="rounded-lg object-cover"
											fill
										/>
									</div>
									<div className="relative z-10 flex w-2/3 flex-col gap-2">
										<h2 className="text-xl font-semibold">Bearish Flag</h2>
										<p className="line-clamp-3 text-xs">
											Pola Bearish Flag terjadi setelah tren naik yang kuat.
											Pola ini terlihat seperti bendera dengan tiang
										</p>
									</div>
								</Box>
							</Link>
						);
					})}
				</div>
			</main>
		</>
	);
}
