import React from 'react';
import { IconType } from 'react-icons';

export default function CategoryInput({
	icon: Icon,
	label,
	onClick,
	selected,
}: {
	label: string;
	icon: IconType;
	selected?: boolean;
	onClick: (value: string) => void;
}) {
	return (
		<div
			onClick={() => onClick(label)}
			className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
				selected ? 'border-black' : 'bg-neutral-200'
			}`}
		>
			<Icon size={30} />
			<div className='font-semibold'>{label}</div>
		</div>
	);
}
