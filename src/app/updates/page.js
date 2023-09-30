'use client';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/app/components/Navbar';
import DetailPage from '@/app/updates/[id]/page';
import { getStocks } from '@/app/utils/services/updates';

export default function Updates() {
	const [activeIndex, setActiveIndex] = useState(isMobile ? null : 0);

	const {
		isLoading: updatesIsLoading,
		isError: updatesIsError,
		data: updatesList,
		isFetching: updatesIsFetching
	} = useQuery({
		refetchOnWindowFocus: false,
		queryKey: ['updates'],
		queryFn: () => getStocks()
	});

	return (
		<>
			<Navbar now="updates" />
			<main className="sticky top-24 px-5 pb-10 pt-24 lg:flex lg:pt-0">
				<div className="flex flex-col gap-4 px-5 py-4 lg:flex-1">
					<h2 className="text-2xl font-semibold lg:text-4xl">Stock Updates</h2>
					<div className="flex flex-col gap-2 px-2 lg:max-h-[80vh] lg:overflow-auto">
						{updatesIsLoading || updatesIsFetching ? (
							[
								'loading-1',
								'loading-12',
								'loading-13',
								'loading-14',
								'loading-15',
								'loading-16',
								'loading-17',
								'loading-18',
								'loading-19'
							].map(val => (
								<div className="flex animate-pulse items-center gap-4" key={val}>
									<div className="aspect-square w-12 rounded-md bg-white/20 lg:w-16 lg:rounded-lg"></div>
									<div className="flex flex-col gap-2">
										<div className="h-4 w-20 rounded-md bg-white/20 lg:h-5 lg:w-20 lg:rounded-lg"></div>
										<div className="h-2 w-28 rounded-md bg-white/20 lg:h-4 lg:w-32 lg:rounded-lg"></div>
									</div>
								</div>
							))
						) : (
							<>
								{updatesList?.data?.map((stock, idx) => {
									return (
										<UpdateContainer
											key={stock._id}
											className={`group flex cursor-pointer items-center gap-4 rounded-md p-2 ${
												activeIndex === idx ? 'bg-c-purple' : ''
											}`}
											href={`/updates/${stock._id}`}
											onClick={() => setActiveIndex(idx)}
										>
											<div className="group relative flex aspect-square w-16 items-center gap-4">
												<Image
													src={stock.imageUrl}
													alt=""
													className="rounded-lg object-cover"
													fill
												/>
											</div>
											<div className="flex flex-col gap-1">
												<p className="text-sm font-semibold group-hover:underline lg:text-base">
													{stock.symbol}
												</p>
												<p className="text-xs italic text-gray-300 lg:text-sm">
													{stock.name}
												</p>
											</div>
										</UpdateContainer>
									);
								})}
							</>
						)}
					</div>
				</div>
				<BrowserView className="hidden flex-[2] py-4 lg:flex lg:flex-col">
					{!!updatesList ? (
						<>
							<h2 className="text-2xl font-semibold lg:text-4xl">
								{updatesList?.data[activeIndex]?.title}
							</h2>
							<DetailPage id={updatesList?.data[activeIndex]?._id} />
						</>
					) : null}
				</BrowserView>
			</main>
		</>
	);
}

const UpdateContainer = ({
	children,
	className = '',
	href = '/updates/detail',
	onClick = () => {}
}) => {
	return (
		<>
			<BrowserView className={className} onClick={onClick}>
				{children}
			</BrowserView>
			<MobileView>
				<Link href={href} className={className}>
					{children}
				</Link>
			</MobileView>
		</>
	);
};
