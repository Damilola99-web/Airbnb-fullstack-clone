'use client';
import Container from '@/components/Container';
import ListingCard from '@/components/listings/ListingCard';
import { Heading } from '@/components/modals/Heading';
import { SafeUser, safeReservation } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

interface ReservationsClientProps {
	currentUser?: SafeUser | null;
	reservations: safeReservation[];
}

export default function ReservationsClient({ reservations, currentUser }: ReservationsClientProps) {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState('');

	const cancelReservation = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					toast.success('Reservation cancelled');
					router.refresh();
				})
				.catch((error) => {
					toast.error('Something went wrong');
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
				title='Reservations'
				subtitle='Bookings on your properties'
			/>
			<div className=' mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
				{reservations?.map((reservation) => (
					<ListingCard
						key={reservation.id}
						listing={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={cancelReservation}
						disabled={deletingId === reservation.id}
						actionLabel='Cancel guest reservation'
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
}
