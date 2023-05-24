import '@/styles/globals.css';
import { Nunito } from 'next/font/google';
import Navbar from '../components/navbar/Navbar';
import RegisterModal from '@/components/modals/RegisterModal';
import { ToasterProvider } from '@/providers/ToasterProvider';

const font = Nunito({
	subsets: ['latin'],
});

// export metadata
export const metadata = {
	title: 'Air bnb clone',
	description: 'Air bnb clone',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
					content='Air bnb clone'
				/>
				<meta
					property='og:description'
					content='Air bnb clone with nextjs 13 and tailwindcss. Book an airbnb, list your airbnb, and more.'
				/>
				<meta
					property='og:image'
					content={'/images/airbnb.png'}
				/>
			</head>
			<body className={font.className}>
				<ToasterProvider />
				<RegisterModal />
				<Navbar />
				{children}
			</body>
		</html>
	);
}
