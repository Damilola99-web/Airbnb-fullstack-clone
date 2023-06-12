import prisma from '@/libs/prismadb';

export interface IListingsParams {
	userId?: string;
}

export const getListings = async (params: IListingsParams) => {
	const { userId } = params;

	let query: any = {};

	if (userId) {
		query.userId = userId;
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
