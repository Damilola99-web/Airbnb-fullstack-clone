import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await req.json();
	const {
		title,
		description,
		imageUrl,
		category,
		roomCount,
		bathroomCount,
		guestCount,
		location,
		price,
	} = body;

	Object.keys(body).forEach((value) => {
		if (!body[value]) {
			NextResponse.error();
		}
	});

	const listing = await prisma.listing.create({
		data: {
			title,
			bathroomCount,
			category,
			description,
			guestCount,
			imageUrl,
			locationValue: location.value,
			price: parseInt(price, 10),
			roomCount,
			userId: currentUser.id,
		},
    });
    
    return NextResponse.json(listing)
}


