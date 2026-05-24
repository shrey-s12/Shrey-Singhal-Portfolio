import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import './globals.css';

import { personalInfo } from '@/data/personal';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';

const geist = Geist({
	subsets: ['latin'],
	variable: '--font-geist',
});

export const metadata: Metadata = {
	title: personalInfo.seo.title,
	description: personalInfo.seo.description,
	keywords: personalInfo.seo.keywords,
	openGraph: {
		title: personalInfo.seo.title,
		description: personalInfo.seo.description,
		images: [personalInfo.ogImage],
		type: 'website',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${geist.variable} scroll-smooth`}>
			<body className="bg-[#0B0F19] font-[family-name:var(--font-geist)] text-[#F9FAFB] antialiased">
				{/* Background Glow */}
				<div className="fixed inset-0 -z-10 overflow-hidden">
					<div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
					<div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
				</div>

				<SmoothScrollProvider>
					<ScrollProgress />
					<Navbar />
					{children}
					<Footer />
				</SmoothScrollProvider>
			</body>
		</html>
	);
}
