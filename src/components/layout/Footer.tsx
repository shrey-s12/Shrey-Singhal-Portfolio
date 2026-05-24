import { navLinks } from '@/data/navLinks';
import { personalInfo } from '@/data/personal';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-white/10 bg-[#0B0F19] py-12">
			<div className="container-width px-4 md:px-8">
				<nav className="mb-8 flex flex-wrap justify-center gap-4 md:gap-6">
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-sm text-[#F9FAFB]/60 transition-colors hover:text-[#3B82F6]"
						>
							{link.name}
						</a>
					))}
				</nav>
				<p className="text-center text-sm text-[#F9FAFB]/40">
					&copy; {currentYear} {personalInfo.name}
				</p>
			</div>
		</footer>
	);
}
