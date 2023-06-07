import '@/styles/globals.css';
import { Nunito } from 'next/font/google';
import Navbar from '@/components/navbar/Navbar';
import RegisterModal from '@/components/modals/RegisterModal';
import { ToasterProvider } from '@/providers/ToasterProvider';
import LoginModal from '@/components/modals/LoginModal';
import getCurrentUser from '@/actions/getCurrentUser';
import RentModal from '@/components/modals/RentModal';

const font = Nunito({
	subsets: ['latin'],
});

// export metadata
export const metadata = {
	title: 'Air bnb clone',
	description: 'Air bnb clone',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser();
	return (
		<html lang='en'>
			<head>
				<meta
					property='og:url'
					content='https://rashtech-airbnb.vercel.app/'
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:title'
					content='Rashtech Airbnb'
				/>
				<meta
					property='og:description'
					content='Rashtech Airbnb. Book an airbnb, list your airbnb, and more features.'
				/>
				<meta
					property='og:image'
					content={
						'https://res.cloudinary.com/drypjfn7k/image/upload/v1684925418/Airbnb-logo_e8al1w.jpg'
					}
				/>
				<meta
					property='og:image:width'
					content='600'
				/>

				<meta
					property='og:image:height'
					content='400'
				/>
			</head>
			<body className={font.className}>
				<ToasterProvider />
				<RentModal />
				<LoginModal />
				<RegisterModal />
				<Navbar currentUser={currentUser} />
				{children}
			</body>
		</html>
	);
}
