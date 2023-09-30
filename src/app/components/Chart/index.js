import clsx from 'clsx';
import ReactECharts from 'echarts-for-react';

export default function Chart({
	className = '',
	containerClassName = '',
	title = '',
	options = {}
}) {
	return (
		<div
			className={clsx(
				'flex h-full w-full flex-col items-center justify-center gap-2',
				containerClassName
			)}
		>
			<h5 className="w-full text-left text-base font-semibold lg:text-2xl">{title}</h5>
			<div
				className={clsx(
					'flex h-[40vh] w-full items-center justify-center rounded-md bg-white lg:rounded-lg',
					className
				)}
			>
				<ReactECharts className="!h-[inherit] !w-full" option={options} />
			</div>
		</div>
	);
}
