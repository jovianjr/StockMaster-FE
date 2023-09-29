import clsx from 'clsx';
import { Fragment, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const defaultOption = [
	{ id: 1, name: 'Harian', value: 'daily' },
	{ id: 2, name: 'Mingguan', value: 'weekly' }
];

const ListBox = ({ className = '', options = defaultOption, onChange = () => {} }) => {
	const [selected, setSelected] = useState(options[0]);

	const handleChange = option => {
		setSelected(option);
		onChange(option.value);
	};

	return (
		<Listbox value={selected} onChange={handleChange}>
			{({ open }) => (
				<div className="relative mt-1 w-min text-xs text-white/90 lg:text-base">
					<Listbox.Button
						className={clsx(
							'relative cursor-pointer py-2 pl-3 pr-10',
							'rounded-lg bg-white/20 shadow-[inset_2px_2px_10px_0_rgba(255,255,255,0.15)] backdrop-blur-lg',
							className
						)}
					>
						<span className="block truncate text-left">{selected.name}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronDownIcon
								className={clsx('h-5 w-5 transition-all', open ? 'rotate-180' : '')}
								aria-hidden="true"
							/>
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options
							className={clsx(
								'absolute z-50 mt-1 max-h-60 w-full overflow-auto',
								'rounded-lg bg-white/20 shadow-[inset_2px_2px_10px_0_rgba(255,255,255,0.15)] backdrop-blur-lg'
							)}
						>
							{options.map((person, personIdx) => (
								<Listbox.Option
									key={personIdx}
									className={({ active }) =>
										`relative cursor-default select-none px-4 py-2 ${
											active ? 'bg-amber-100/20 text-amber-300' : 'text-white'
										}`
									}
									value={person}
								>
									{({ selected }) => (
										<>
											<span
												className={`block truncate ${
													selected ? 'font-medium' : 'font-normal'
												}`}
											>
												{person.name}
											</span>
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			)}
		</Listbox>
	);
};

export default ListBox;
