import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import './globals.css';

import { personalInfo } from '@/data/personal';
import { SITE_URL } from '@/lib/site';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';

const geist = Geist({
	subsets: ['latin'],
	variable: '--font-geist',
});

// The preview image comes from app/opengraph-image.tsx, which Next.js picks up automatically
export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: personalInfo.seo.title,
	description: personalInfo.seo.description,
	keywords: personalInfo.seo.keywords,
	openGraph: {
		title: personalInfo.seo.title,
		description: personalInfo.seo.description,
		url: '/',
		siteName: personalInfo.name,
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: personalInfo.seo.title,
		description: personalInfo.seo.description,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${geist.variable} scroll-smooth`}>
			<body className="bg-background font-[family-name:var(--font-geist)] text-foreground antialiased">
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
