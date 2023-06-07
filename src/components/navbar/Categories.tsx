import React from 'react';
import { categories } from '@/utils';
import CategoryBox from './CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Categories() {
	const params = useSearchParams();
	const paramCategory = params?.get('category');
	const pathname = usePathname();
	const isMainPage = pathname === '/';

	if (!isMainPage) {
		return null;
	}

	return (
		<div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
			{categories.map((category) => (
				<CategoryBox
					key={category.label}
					label={category.label}
					selected={paramCategory === category.label}
					icon={category.icon}
				/>
			))}
		</div>
	);
}
