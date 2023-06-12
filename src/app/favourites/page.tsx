import getCurrentUser from '@/actions/getCurrentUser';
import { getFavouriteListings } from '@/actions/getFavouriteListings';
import EmptyState from '@/components/EmptyState';
import FavouritesClient from './FavouritesClient';

export default async function page() {
	const currentUser = await getCurrentUser();
	const favourites = await getFavouriteListings();

	if (!currentUser) {
		return (
			<EmptyState
				title='Unauthorized'
				subtitle='Please login'
			/>
		);
	}

	if (favourites?.length === 0) {
		return (
			<EmptyState
				title='No favourites found'
				subtitle="Looks like you haven't favourited any listing."
			/>
		);
	}

	return (
		<FavouritesClient
			currentUser={currentUser}
			favourites={favourites}
		/>
	);
}
