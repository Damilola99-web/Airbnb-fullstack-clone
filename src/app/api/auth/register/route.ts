import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const body = await request.json();
	const { email, name, password } = body;
	if (!email || !name || !password) {
		return NextResponse.json({ message: 'Fill in all fields' }, { status: 400 });
	}
	const hashedPassword = await bcrypt.hash(password, 10);

	const userAlreadyExists = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (userAlreadyExists) {
		return NextResponse.json({ message: 'User already exists' }, { status: 400 });
	}

	try {
		const user = await prisma.user.create({
			data: {
				email,
				name,
				passwordHash: hashedPassword,
			},
		});
		return NextResponse.json({ message: 'User created', user }, { status: 201 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: 'An errror occurred', error }, { status: 500 });
	}
}
