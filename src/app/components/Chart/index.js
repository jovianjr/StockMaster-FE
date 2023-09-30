import clsx from 'clsx';
import ReactECharts from 'echarts-for-react';

export default function Chart({
	className = '',
	containerClassName = '',
	title = '',
	description = '',
	options = {}
}) {
	return (
		<div
			className={clsx(
				'mb-4 flex h-full w-full flex-col items-center justify-center gap-2',
				containerClassName
			)}
		>
			<div className="flex w-full flex-col gap-1">
				<h5 className="w-full text-left text-base font-semibold lg:text-2xl">{title}</h5>
				<p className="text-xs font-light lg:text-sm">{description}</p>
			</div>
			<div
				className={clsx(
					'flex h-[30vh] w-full items-center justify-center rounded-md bg-white lg:h-[40vh] lg:rounded-lg',
					className
				)}
			>
				<ReactECharts className="!h-[inherit] !w-full" option={options} />
			</div>
		</div>
	);
}
