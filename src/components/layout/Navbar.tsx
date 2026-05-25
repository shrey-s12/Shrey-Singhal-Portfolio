'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { navLinks } from '@/data/navLinks';
import { personalInfo } from '@/data/personal';
import { useActiveSection } from '@/hooks/useActiveSection';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [scrolled, setScrolled] = useState<boolean>(false);

	const sectionIds = useMemo(() => navLinks.map((link) => link.href.replace('#', '')), []);
	const activeSection = useActiveSection(sectionIds);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault();
		setIsOpen(false);

		const targetId = href.replace('#', '');
		const scrollToTarget = () => {
			const element = document.getElementById(targetId);
			if (element) {
				const navbarHeight = 80;
				const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
				window.scrollTo({ top, behavior: 'smooth' });
			}
		};

		// Small delay on mobile to let menu close first
		setTimeout(scrollToTarget, 100);
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled ? 'border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-lg' : 'bg-transparent'
			}`}
		>
			<nav className="container-width flex items-center justify-between px-4 py-4 md:px-8">
				<a
					href="#home"
					onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, '#home')}
					className="text-lg font-bold text-[#F9FAFB]"
				>
					{personalInfo.shortName}
				</a>

				{/* Desktop Navigation */}
				<ul className="hidden items-center gap-1 md:flex">
					{navLinks.map((link) => {
						const isActive = activeSection === link.href.replace('#', '');
						return (
							<li key={link.href}>
								<a
									href={link.href}
									onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link.href)}
									className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
										isActive ? 'text-[#3B82F6]' : 'text-[#F9FAFB]/70 hover:text-[#F9FAFB]'
									}`}
								>
									{link.name}
									{isActive && (
										<motion.span
											layoutId="activeSection"
											className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"
											transition={{ type: 'spring', stiffness: 380, damping: 30 }}
										/>
									)}
								</a>
							</li>
						);
					})}
				</ul>

				{/* Mobile Hamburger */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="flex h-11 w-11 items-center justify-center rounded-lg text-[#F9FAFB] md:hidden"
					aria-expanded={isOpen}
					aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
				>
					{isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
				</button>
			</nav>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className="overflow-hidden border-b border-white/10 bg-[#0B0F19]/95 backdrop-blur-lg md:hidden"
					>
						<ul className="flex flex-col gap-1 px-4 py-4">
							{navLinks.map((link) => {
								const isActive = activeSection === link.href.replace('#', '');
								return (
									<li key={link.href}>
										<a
											href={link.href}
											onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link.href)}
											className={`block rounded-lg px-4 py-3 text-sm transition-colors ${
												isActive
													? 'bg-[#3B82F6]/10 text-[#3B82F6]'
													: 'text-[#F9FAFB]/70 hover:text-[#F9FAFB]'
											}`}
										>
											{link.name}
										</a>
									</li>
								);
							})}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
