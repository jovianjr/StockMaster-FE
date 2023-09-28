import clsx from 'clsx';

const Box = ({ children = null, className = '', onClick = () => {} }) => {
	return (
		<div
			className={clsx(
				'h-full w-full rounded-xl p-6',
				'bg-white/10 shadow-[inset_2px_2px_10px_0_rgba(255,255,255,0.15)] backdrop-blur-lg',
				className
			)}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Box;
