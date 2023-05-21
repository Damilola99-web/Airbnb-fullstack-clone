import '@/styles/globals.css';
import { Nunito } from 'next/font/google';
import Navbar from '../components/navbar/Navbar';
import RegisterModal from '@/components/modals/RegisterModal';

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
			<head></head>
			<body className={font.className}>
				<RegisterModal />
				<Navbar />
				{children}</body>
		</html>
	);
}
