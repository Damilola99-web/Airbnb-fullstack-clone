import prisma from '@/libs/prismadb';

export interface IListingsParams {
	userId?: string;
	guestCount?: number;
	roomCount?: number;
	startDate?: string;
	endDate?: string;
	locationValue?: string;
	category?: string;
}

export const getListings = async (params: IListingsParams) => {
	const { userId, category, endDate, guestCount, locationValue, roomCount, startDate } = params;

	let query: any = {};

	if (userId) {
		query.userId = userId;
	}
	if (category) {
		query.category = category;
	}
	if (guestCount) {
		query.guestCount = { gte: +guestCount };
	}
	if (roomCount) {
		query.roomCount = { gte: +roomCount };
	}
	if (guestCount) {
		query.guestCount = { gte: +guestCount };
	}
	if (locationValue) {
		query.locationValue = locationValue;
	}

	if (startDate && endDate) {
		query.NOT = {
			reservations: {
				some: {
					OR: [
						{
							endDate: { gte: startDate },
							startDate: { lte: startDate },
						},
						{
							startDate: { lte: endDate },
							endDate: { gte: endDate },
						},
					],
				},
			},
		};
	}

	try {
		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: 'desc',
			},
		});
		const safeListings = listings.map((listing) => ({
			...listing,
			createdAt: listing.createdAt.toISOString(),
		}));
		return safeListings;
	} catch (error: any) {
		throw new Error(error);
	}
};
