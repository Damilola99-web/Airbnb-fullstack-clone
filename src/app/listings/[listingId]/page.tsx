import getCurrentUser from '@/actions/getCurrentUser';
import { getListingById } from '@/actions/getListing';
import EmptyState from '@/components/EmptyState';
import ListingClient from './ListingClient';
interface IParams {
	listingId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
	const listing = await getListingById(params);
	const currentUser = await getCurrentUser();

	if (!listing) {
		return <EmptyState />;
	}

	return (
		<ListingClient
			listing={listing}
			currentUser={currentUser}
		/>
	);
}
