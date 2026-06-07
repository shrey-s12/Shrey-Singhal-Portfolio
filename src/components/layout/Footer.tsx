import { navLinks } from '@/data/navLinks';
import { socials } from '@/data/socials';
import { personalInfo } from '@/data/personal';
import SocialIcon from '@/components/ui/SocialIcon';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-[var(--card-border)]" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
			<div className="container-width">
				<div className="flex flex-col items-center gap-6">
					{/* Nav Links */}
					<nav className="flex flex-wrap justify-center gap-4 md:gap-6">
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
							>
								{link.name}
							</a>
						))}
					</nav>

					{/* Social Icons */}
					<div className="flex items-center gap-4">
						{socials.map((social) => (
							<a
								key={social.name}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Visit ${social.name} profile`}
								className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-all hover:text-[var(--accent)]"
							>
								<SocialIcon platform={social.name} size={18} />
							</a>
						))}
					</div>

					{/* Copyright */}
					<p className="text-sm text-[var(--text-muted)]">
						&copy; {currentYear} {personalInfo.name}. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
