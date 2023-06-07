'use client';
import React, { FC } from 'react';
import { IconType } from 'react-icons';
import { ImSpinner8 } from 'react-icons/im';

interface ButtonProps {
	label: string;
	onclick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
}

export const Button: FC<ButtonProps> = ({
	label,
	onclick,
	disabled,
	outline,
	small,
	icon: Icon,
}) => {
	return (
		<button
			onClick={onclick}
			disabled={disabled}
			className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
            ${
				outline
					? 'bg-white border-black text-black'
					: 'bg-rose-500 border-rose-500 text-white'
			}
                ${
					small
						? 'py-1 font-light text-sm border-[1px]'
						: 'py-3 font-semibold text-md border-2'
				}
               
               `}
		>
			{Icon && (
				<Icon
					size={24}
					className='absolute left-4 top-3'
				/>
			)}
			{label}
			{/* <ImSpinner8 size={24} className='  animate-spin absolute right-4 top-3' /> */}
		</button>
	);
};
