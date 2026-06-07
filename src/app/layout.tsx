import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import './globals.css';

import { personalInfo } from '@/data/personal';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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
		<html lang="en" className={`${geist.variable} scroll-smooth`} suppressHydrationWarning>
			<body className="font-[family-name:var(--font-geist)] antialiased transition-colors duration-300">
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
					{/* Background Glows */}
					<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
						<div className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-[#4F46E5]/8 blur-[150px]" />
						<div className="absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-[#7C3AED]/8 blur-[150px]" />
					</div>

					<Navbar />
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
