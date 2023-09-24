'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { Transition } from '@headlessui/react';

const Loading = ({ show = false }) => {
	return (
		<Transition
			show={show}
			enter="transition-opacity ease-linear duration-500"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity ease-linear duration-500 delay-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div
				className={clsx(
					'fixed z-[1000] flex h-full w-full items-center justify-center bg-black'
				)}
			>
				<Image src="/assets/images/eclipse-blue.png" alt="Eclipse blue" fill />
				<Image src="/assets/images/eclipse-purple.png" alt="Eclipse purple" fill />
				<div className="relative h-20 w-full">
					<Image
						src="/assets/images/logo.png"
						alt="Logo StockMaster"
						className="object-contain px-20"
						fill
					/>
				</div>
				<div class="absolute bottom-10 text-center">
					<div class="flex items-center space-x-2">
						<div aria-label="Loading..." role="status">
							<svg class="h-5 w-5 animate-spin stroke-white" viewBox="0 0 256 256">
								<line
									x1="128"
									y1="32"
									x2="128"
									y2="64"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="24"
								></line>
								<line
									x1="195.9"
									y1="60.1"
									x2="173.3"
									y2="82.7"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="24"
								></line>
								<line
									x1="224"
									y1="128"
									x2="192"
									y2="128"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="24"
								></line>
								<line
									x1="195.9"
									y1="195.9"
									x2="173.3"
									y2="173.3"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="24"
								></line>
								<line
									x1="128"
									y1="224"
									x2="128"
									y2="192"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="24"
								></line>
								<line
									x1="60.1"
									y1="195.9"
									x2="82.7"
									y2="173.3"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="24"
								></line>
								<line
									x1="32"
									y1="128"
									x2="64"
									y2="128"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="24"
								></line>
								<line
									x1="60.1"
									y1="60.1"
									x2="82.7"
									y2="82.7"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="24"
								></line>
							</svg>
						</div>
						<span class="text-md font-normal text-white">Loading...</span>
					</div>
				</div>
			</div>
		</Transition>
	);
};

export default Loading;
