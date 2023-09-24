import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';

const Input = ({
	className = '',
	placeholder = '',
	name = '',
	type = 'text',
	password = false
}) => {
	const [show, setShow] = useState(false);

	return (
		<div className="relative h-full w-full">
			<input
				className={clsx(
					'w-full rounded-full px-6 py-3 text-sm lg:text-base',
					'bg-transparent bg-gradient-to-r from-white/10 to-white/30 backdrop-blur-lg',
					'placeholder:font-light placeholder:text-white/50',
					className
				)}
				placeholder={placeholder}
				name={name}
				type={password ? (show ? 'text' : 'password') : type}
			/>

			{password ? (
				<span
					className="absolute right-4 top-1/2 -translate-y-1/2"
					onClick={() => setShow(!show)}
				>
					{show ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
				</span>
			) : null}
		</div>
	);
};

export default Input;
