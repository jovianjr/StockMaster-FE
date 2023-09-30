'use client';
import Image from 'next/image';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import Chart from '@/app/components/Chart';
import Navbar from '@/app/components/Navbar';
import { getStocks } from '@/app/utils/services/updates';

const generateOptions = (x, y) => {
	return {
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			type: 'category',
			data: x
		},
		yAxis: {
			type: 'value',
			splitLine: false
		},
		series: [
			{
				data: y,
				type: 'line',
				smooth: true,
				showSymbol: false,
				lineStyle: { color: '#9E00FF' }
			}
		]
	};
};

export default function Updates({ params, id = null }) {
	const updates_id = params?.id ?? id;

	const {
		isLoading: updatesIsLoading,
		isError: updatesIsError,
		data: updates,
		isFetching: updatesIsFetching,
		error: updatesError
	} = useQuery({
		refetchOnWindowFocus: false,
		retry: 3,
		queryKey: ['updates', updates_id],
		queryFn: () => getStocks(updates_id)
	});

	const graphOptions = useMemo(() => {
		const prices = {};
		prices.timestamp = updates?.data?.prices?.map(price =>
			new Date(price.timestamp).toLocaleDateString('en-US')
		);
		prices.close = updates?.data?.prices?.map(price => price.close);
		prices.trend = updates?.data?.prices?.map(price => price.trend);
		prices.seasonal = updates?.data?.prices?.map(price => price.seasonal);
		prices.residual = updates?.data?.prices?.map(price => price.residual);

		const forecasts = {};
		forecasts.timestamp = updates?.data?.forecasts?.map(forecast =>
			new Date(forecast.timestamp).toLocaleDateString('en-US')
		);
		forecasts.forecast = updates?.data?.forecasts?.map(forecast => forecast.forecast);

		return {
			forecast: generateOptions(forecasts.timestamp, forecasts.forecast),
			price: {
				close: generateOptions(prices.timestamp, prices.close),
				trend: generateOptions(prices.timestamp, prices.trend),
				seasonal: generateOptions(prices.timestamp, prices.seasonal),
				residual: generateOptions(prices.timestamp, prices.residual)
			}
		};
	}, [updates]);

	return (
		<>
			<Navbar backTo="/updates" now="updates" />
			<main className="relative flex h-full w-full flex-col items-center justify-start gap-5 px-10 pb-10 pt-24 lg:max-h-[80vh] lg:overflow-auto lg:pt-0">
				{updatesIsLoading || updatesIsFetching ? (
					<>
						<div className="flex w-full flex-col items-center gap-1 px-10 py-4 lg:w-1/2">
							<div className="h-8 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-3/4 animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
						</div>

						<div className="h-[35vh] w-3/4 animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
						<div className="flex w-full flex-col items-center gap-2">
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
							<div className="h-4 w-full animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
						</div>

						<div className="h-[20vh] w-3/4 animate-pulse rounded-md bg-white/20 lg:rounded-lg"></div>
					</>
				) : (
					<>
						<div className="flex flex-col items-center px-5 py-4">
							<h2 className="text-2xl font-semibold">{updates?.data?.symbol}</h2>
							<p className="text-sm italic text-gray-300">{updates?.data?.name}</p>
						</div>
						<div className="relative aspect-square min-h-[30vh] w-2/3">
							<Image
								src={updates?.data?.imageUrl}
								alt={`${updates?.data?.name} image`}
								className="rounded-lg object-contain"
								fill
							/>
						</div>
						<p className="text-justify text-sm font-light lg:text-base">
							{updates?.data?.description}
						</p>

						<Chart
							title="Close (Penutupan)"
							options={graphOptions?.price?.close}
							description="Harga saham pada akhir sesi perdagangan pada suatu hari tertentu. Ini adalah harga terakhir yang dicatat pada hari tersebut."
						/>
						<Chart
							title="Trend (Tren)"
							options={graphOptions?.price?.trend}
							description="Komponen dalam analisis time series yang menggambarkan perubahan jangka panjang dalam harga saham. Ini mencerminkan apakah saham tersebut sedang dalam tren naik (bullish) atau tren turun (bearish) dalam jangka waktu tertentu."
						/>
						<Chart
							title="Seasonal (Musiman)"
							options={graphOptions?.price?.seasonal}
							description="Komponen yang mengidentifikasi pola berulang dalam perilaku saham seiring dengan musim atau periode tertentu. Ini bisa mencakup faktor-faktor musiman seperti liburan atau peristiwa tahunan."
						/>
						<Chart
							title="Residual (Sisa)"
							options={graphOptions?.price?.residual}
							description="Komponen yang mencerminkan fluktuasi acak atau ketidakpastian dalam data harga saham yang tidak dapat dijelaskan oleh tren atau faktor musiman. Ini bisa mencakup peristiwa acak atau berita pasar yang mempengaruhi harga saham."
						/>
						<Chart
							title="Forecast (Peramalan)"
							options={graphOptions?.forecast}
							description="Estimasi atau prediksi mengenai nilai masa depan harga saham berdasarkan analisis komponen sebelumnya, yaitu tren, musiman, dan sisa. Ini digunakan untuk membuat keputusan investasi atau perencanaan keuangan."
						/>
					</>
				)}
			</main>
		</>
	);
}
