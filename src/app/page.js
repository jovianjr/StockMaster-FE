'use client';
import Image from 'next/image';

import Navbar from '@/app/components/Navbar';
import Box from '@/app/components/Box';

export default function Home() {
	return (
		<>
			<Navbar />
			<main>
				<div className="relative h-[35vh] w-full overflow-hidden rounded-b-[10%]">
					<div className="absolute left-0 top-0 z-50 h-full w-full bg-black opacity-60"></div>
					<Image
						src="/assets/images/placeholder/profile-cover.png"
						alt="Logo StockMaster"
						className="relative z-10 object-cover"
						fill
					/>
				</div>
				<div className="relative flex flex-col items-center">
					<div className=" relative z-50 -mb-[25%] aspect-square w-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-white">
						<Image
							src="/assets/images/placeholder/profile.png"
							alt="Logo StockMaster"
							className="relative z-10 object-cover"
							fill
						/>
					</div>
					<div className="flex flex-col items-center py-4">
						<h1 className="text-2xl font-semibold">Lutfi Andriyanto</h1>
						<span className="text-xs italic text-gray-300">
							mendapatkan <b className="text-c-yellow">3.457 poin</b> minggu ini
						</span>
					</div>
				</div>
				<div className="flex flex-col gap-4 px-5 py-4">
					<Box className="flex !py-10">
						<div className="relative flex-1">
							<Image
								src="/assets/images/homepage/leaderboard.png"
								alt="LeaderBoard"
								className="relative z-10 object-cover"
								fill
							/>
						</div>
						<div className="flex flex-1 flex-col gap-1">
							<h2 className="text-xl font-semibold">Tantangan</h2>
							<p className="text-[0.625rem]">
								Mainkan tiap hari untuk mengukur kemampuanmu dengan peserta lain
							</p>
							<span className="relative mt-2 flex items-center">
								<button className="hover:bg-c-yellow text-c-yellow rounded-full border border-white/20 px-6 py-1 text-[0.625rem] text-xs font-semibold transition-all hover:text-black">
									Cek Sekarang
								</button>
								<Image
									src="/assets/images/homepage/golden-coin.png"
									alt="Golden Dollar Coin"
									className="absolute right-0 aspect-square -translate-x-1/3"
									width={40}
									height={40}
								/>
							</span>
						</div>
					</Box>

					<Box className="flex flex-col gap-3 !py-10">
						<h2 className="text-xl font-semibold">Bearish Flag</h2>
						<div className="relative aspect-[3/2] w-full">
							<Image
								src="/assets/images/placeholder/pattern.png"
								alt="Golden Dollar Coin"
								className="object-cover"
								fill
							/>
						</div>
						<p className="text-sm font-light">
							Flag pattern merupakan sebuah pola pada grafik pergerakan harga di pasar
							yang dipakai untuk memantau ...
						</p>
						<button className="rounded-full border border-white/50 px-4 py-2 text-xs transition-all hover:bg-white hover:text-black">
							Pelajari lebih lanjut
						</button>
					</Box>

					<Box className="flex flex-col gap-3 !py-10">
						<h2 className="text-xl font-semibold">Stock Updates</h2>
						<div className="flex flex-col gap-2">
							{['', '', '', '', ''].map(val => {
								return (
									<div className="flex items-center gap-4" key={new Date()}>
										<div className="relative aspect-square w-16">
											<Image
												src="/assets/images/placeholder/pattern.png"
												alt="Golden Dollar Coin"
												className="object-cover"
												fill
											/>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-sm font-semibold">Apple</p>
											<p className="text-xs italic text-gray-300">
												apple .inc
											</p>
										</div>
									</div>
								);
							})}
						</div>
						<button className="mt-2 rounded-full border border-white/50 px-4 py-2 text-xs transition-all hover:bg-white hover:text-black">
							Lihat Semua
						</button>
					</Box>
				</div>
			</main>
		</>
	);
}
