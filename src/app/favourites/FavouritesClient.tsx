import Container from '@/components/Container';
import ListingCard from '@/components/listings/ListingCard';
import { Heading } from '@/components/modals/Heading';
import { SafeUser, safeListing } from '@/types';

interface FavouritesClientProps {
	currentUser?: SafeUser | null;
	favourites: safeListing[];
}

export default function FavouritesClient({ favourites, currentUser }: FavouritesClientProps) {
	return (
		<Container>
			<Heading
				title='Favourites'
				subtitle='List of places you have favourited!'
			/>
			<div className=' mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
				{favourites?.map((listing) => (
					<ListingCard
						key={listing.id}
						listing={listing}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
}
