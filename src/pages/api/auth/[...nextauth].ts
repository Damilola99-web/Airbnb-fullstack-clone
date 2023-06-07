import NextAuth from 'next-auth/next';
import { AuthOptions } from 'next-auth';
import prisma from '../../../libs/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
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

				const passwordMatches = await bcrypt.compare(
					credentials.password,
					user.passwordHash
				);

				if (!passwordMatches) {
					throw new Error('Invalid credentials');
				}

				return user;
			},
		}),
	],
	pages: {
		signIn: '/',
	},
	debug: process.env.NODE_ENV === 'development',
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
