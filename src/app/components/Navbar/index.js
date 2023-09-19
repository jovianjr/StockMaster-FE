import React, { useState, useEffect } from 'react';

import { Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
	const [scrolling, setScrolling] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setScrolling(true);
			} else {
				setScrolling(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const logout = () => {
		console.log('logout');
	};

	return (
		<Menu>
			<div
				className={clsx(
					'fixed left-0 top-0 z-[100] flex h-20 w-full items-center justify-center gap-10 border-b border-white/30 px-4 py-2 transition-all duration-500',
					scrolling ? 'bg-black' : 'bg-transparent'
				)}
			>
				<div className="relative h-full w-full">
					<Image
						src="/assets/images/logo.png"
						alt="Logo StockMaster"
						className="object-contain"
						fill
					/>
				</div>
				<Menu.Button className="absolute right-4 top-1/2 -translate-y-1/2">
					<Bars3Icon className="h-8 w-8 !p-0" />
				</Menu.Button>
			</div>
			<Menu.Items className="fixed left-0 top-0 z-[1000] h-full w-full px-10 py-12 ">
				<div className="absolute inset-0 bg-white/20 text-black shadow-[inset_0_2px_30px_0_rgba(255,255,255,0.5)] backdrop-blur"></div>
				<div className="relative z-10 flex h-full flex-col items-end gap-3">
					<Menu.Item className="mb-10">
						{({ close }) => (
							<XMarkIcon
								onClick={close}
								className="float-right aspect-square w-10 rounded-full bg-white/20 p-2 font-bold text-white"
							/>
						)}
					</Menu.Item>
					<CustomMenu text="Home" href="/" active />
					<CustomMenu text="Learning" href="/learning" />
					<CustomMenu text="Games" href="/games" />
					<CustomMenu text="Updates" href="/updates" />
					<div className="grow"></div>
					<button
						className="w-full rounded-lg bg-red-500/30 py-4 text-center font-semibold text-red-500 backdrop-blur"
						onClick={logout}
					>
						Logout
					</button>
				</div>
			</Menu.Items>
		</Menu>
	);
}

const CustomMenu = ({ text = '', href = '', active = false }) => {
	return (
		<Menu.Item>
			<Link
				href={href}
				className={clsx(
					'w-full rounded-lg py-4 text-center font-semibold backdrop-blur',
					active ? 'bg-purple-500 font-bold' : 'bg-white/30'
				)}
			>
				{text}
			</Link>
		</Menu.Item>
	);
};
