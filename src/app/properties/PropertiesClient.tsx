'use client';
import Container from '@/components/Container';
import ListingCard from '@/components/listings/ListingCard';
import { Heading } from '@/components/modals/Heading';
import { SafeUser, safeListing } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

interface PropertiesClientProps {
	currentUser?: SafeUser | null;
	listings: safeListing[];
}

export default function PropertiesClient({ currentUser, listings }: PropertiesClientProps) {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState('');

	const deleteLisitng = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`/api/listings/${id}`)
				.then(() => {
					toast.success('Listing Deleted');
					router.refresh();
				})
				.catch((error) => {
					toast.error(error?.response?.data?.error);
				})
				.finally(() => {
					setDeletingId('');
				});
		},
		[router]
	);

	return (
		<Container>
			<Heading
				title='Properties'
				subtitle='List of your Properties'
			/>
			<div className=' mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
				{listings?.map((listing) => (
					<ListingCard
						key={listing.id}
						listing={listing}
						actionId={listing.id}
						onAction={deleteLisitng}
						actionLabel='Delete Property'
						disabled={deletingId === listing.id}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
}
