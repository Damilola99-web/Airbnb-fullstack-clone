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
					content={'data:image/png;base64,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'}
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
