'use client';

import { useCountries } from '@/hooks/useCountries';
import { SafeUser } from '@/types';
import { Heading } from '../modals/Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
	title: string;
	locationValue: string;
	imageUrl: string;
	id: string;
	currentUser?: SafeUser | null;
}

export default function ListingHead({
	id,
	imageUrl,
	locationValue,
	title,
	currentUser,
}: ListingHeadProps) {
	const { getByValue } = useCountries();
	const location = getByValue(locationValue);
	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div className=' w-full h-[60vh] overflow-hidden rounded-xl relative'>
				<Image
					alt='Image'
					src={imageUrl}
					fill
					className=' object-cover w-full'
				/>
				<div className=' absolute top-5 right-5'>
					<HeartButton
						listingId={id}
						currentUser={currentUser}
					/>
				</div>
			</div>
		</>
	);
}
