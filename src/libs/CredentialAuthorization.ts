import prisma from './prismadb';
import bcrypt from 'bcrypt';

type credentialType = Record<'email' | 'password', string> | undefined;

export const authorizeCredential = async (credentials: credentialType) => {
	if (!credentials?.email || !credentials?.password) {
		throw new Error('Invalid creentials');
	}

	const user = await prisma.user.findUnique({
		where: {
			email: credentials.email,
		},
	});

	if (!user || !user?.passwordHash) {
		throw new Error('Invalid credentials');
	}

	const passwordMatches = await bcrypt.compare(credentials.password, user.passwordHash);

	if (!passwordMatches) {
		throw new Error('Invalid credentials');
	}

	return user;
};
