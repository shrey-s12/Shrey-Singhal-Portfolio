'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { navLinks } from '@/data/navLinks';
import { personalInfo } from '@/data/personal';
import { useActiveSection } from '@/hooks/useActiveSection';
import ThemeToggle from '@/components/layout/ThemeToggle';

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

		setTimeout(scrollToTarget, 100);
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? 'border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
					: 'bg-transparent'
			}`}
		>
			<nav className="container-width flex items-center justify-between py-4">
				{/* Logo */}
				<a
					href="#home"
					onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, '#home')}
					className="text-lg font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
				>
					{personalInfo.shortName}
				</a>

				{/* Desktop Navigation - Center */}
				<ul className="hidden items-center gap-1 md:flex">
					{navLinks.map((link) => {
						const isActive = activeSection === link.href.replace('#', '');
						return (
							<li key={link.href}>
								<a
									href={link.href}
									onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link.href)}
									className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
										isActive
											? 'text-[var(--accent)]'
											: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
									}`}
								>
									{link.name}
									{isActive && (
										<motion.span
											layoutId="activeSection"
											className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-[var(--accent)]"
											transition={{ type: 'spring', stiffness: 380, damping: 30 }}
										/>
									)}
								</a>
							</li>
						);
					})}
				</ul>

				{/* Right side: Theme toggle + Mobile menu */}
				<div className="flex items-center gap-3">
					<ThemeToggle />
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--card-border)] text-[var(--text-primary)] md:hidden"
						aria-expanded={isOpen}
						aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
					>
						{isOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
					</button>
				</div>
			</nav>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className="overflow-hidden border-b border-[var(--card-border)] bg-[var(--background)]/95 backdrop-blur-xl md:hidden"
					>
						<ul className="flex flex-col gap-1 px-4 py-4">
							{navLinks.map((link) => {
								const isActive = activeSection === link.href.replace('#', '');
								return (
									<li key={link.href}>
										<a
											href={link.href}
											onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link.href)}
											className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
												isActive
													? 'bg-[var(--accent)]/10 text-[var(--accent)]'
													: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
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
