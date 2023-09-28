import clsx from 'clsx';
import Link from 'next/link';

const Button = ({
	text = 'Button',
	className = '',
	onClick = () => {},
	disabled = false,
	children = null
}) => {
	return (
		<button
			onClick={onClick}
			className={clsx(
				'w-full rounded-full px-2 py-3 text-sm font-semibold lg:text-base',
				'bg-c-purple transition-all hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-700',
				className
			)}
			disabled={disabled}
		>
			{children ?? text}
		</button>
	);
};

const ButtonContainer = props => {
	return props.href ? (
		<Link href={props.href} className="h-fit w-full">
			<Button {...props} />
		</Link>
	) : (
		<Button {...props} />
	);
};

export default ButtonContainer;
