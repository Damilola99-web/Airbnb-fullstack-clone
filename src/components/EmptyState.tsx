'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Heading } from './modals/Heading';
import { Button } from './Button';

interface EmptyStateProps {
	title?: string;
	subtitle?: string;
	showReset?: boolean;
}

export default function EmptyState({
	showReset,
	subtitle = 'Try changing or removing some of the filters',
	title = 'No exact matches',
}: EmptyStateProps) {
	const router = useRouter();
	return (
		<div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
			<Heading
				center
				title={title}
				subtitle={subtitle}
			/>
			<div className=' w-48 mt-4'>
				{showReset && (
					<Button
						outline
						label='Remove all filters'
						onclick={() => router.push('/')}
					/>
				)}
			</div>
		</div>
	);
}
