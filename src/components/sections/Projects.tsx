'use client';

import { motion } from 'framer-motion';
import { ExternalLinkIcon } from 'lucide-react';
import { projects } from '@/data/projects';
import SectionTitle from '@/components/ui/SectionTitle';
import SocialIcon from '@/components/ui/SocialIcon';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Projects() {
	const prefersReducedMotion = useReducedMotion();

	// First project is the featured MCP project
	const featured = projects[0];
	const others = projects.slice(1);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: prefersReducedMotion ? 0 : 0.15,
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: 'easeOut' as const },
		},
	};

	return (
		<section id="projects" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
			<div className="container-width">
				<SectionTitle title="Projects" subtitle="Featured work and side projects" />

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					className="space-y-8"
				>
					{/* Featured Project - Full Width Card */}
					{featured && (
						<motion.div
							variants={cardVariants}
							whileHover={prefersReducedMotion ? {} : { y: -4 }}
							transition={{ duration: 0.25 }}
							className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
						>
							{/* Terminal header */}
							<div className="flex items-center gap-2.5 border-b border-[var(--card-border)] bg-[var(--background-secondary)] px-5 py-3.5">
								<span className="h-3 w-3 rounded-full bg-red-500" />
								<span className="h-3 w-3 rounded-full bg-yellow-500" />
								<span className="h-3 w-3 rounded-full bg-green-500" />
								<span className="ml-4 font-mono text-xs text-[var(--text-muted)]">{featured.title}</span>
							</div>

							<div className="p-8">
								<div className="mb-3 flex flex-wrap items-center gap-3">
									<h3 className="text-2xl font-bold text-[var(--text-primary)]">{featured.title}</h3>
									<span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
										{featured.category}
									</span>
									<span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
										Featured
									</span>
								</div>
								<p className="mb-2 text-sm font-medium text-[var(--accent-secondary)]">{featured.tagline}</p>
								<p className="mb-6 text-sm leading-relaxed text-[var(--text-secondary)]">{featured.description}</p>

								{/* Tech Stack */}
								<div className="mb-6 flex flex-wrap gap-2">
									{featured.techStack.map((tech) => (
										<span
											key={tech}
											className="inline-block rounded-full border border-[var(--card-border)] bg-[var(--background-secondary)] px-3 py-1 text-[12px] font-medium text-[var(--text-secondary)]"
										>
											{tech}
										</span>
									))}
								</div>

								{/* Links */}
								<div className="flex items-center gap-3">
									{featured.github && (
										<a
											href={featured.github}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`View ${featured.title} on GitHub`}
											className="flex items-center gap-2 rounded-full border border-[var(--card-border)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_15px_rgba(79,70,229,0.1)]"
										>
											<SocialIcon platform="GitHub" size={16} />
											GitHub
										</a>
									)}
									{featured.live && (
										<a
											href={featured.live}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`View ${featured.title} live demo`}
											className="flex items-center gap-2 rounded-full border border-[var(--card-border)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent-secondary)] hover:text-[var(--accent-secondary)] hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]"
										>
											<ExternalLinkIcon size={16} />
											Live
										</a>
									)}
								</div>
							</div>
						</motion.div>
					)}

					{/* Other Projects - 2 Column Grid */}
					<div className="grid gap-6 md:grid-cols-2">
						{others.map((project) => (
							<motion.div
								key={project.id}
								variants={cardVariants}
								whileHover={prefersReducedMotion ? {} : { y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
								transition={{ duration: 0.25 }}
								className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-7 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
							>
								<div className="mb-2 flex items-center gap-2">
									<h3 className="text-lg font-semibold text-[var(--text-primary)]">{project.title}</h3>
								</div>
								<p className="mb-1 text-xs font-medium text-[var(--accent)]">{project.category}</p>
								<p className="mb-2 text-sm text-[var(--accent-secondary)]">{project.tagline}</p>
								<p className="mb-5 text-sm text-[var(--text-secondary)]">{project.description}</p>

								<div className="mb-5 flex flex-wrap gap-2">
									{project.techStack.slice(0, 6).map((tech) => (
										<span
											key={tech}
											className="inline-block rounded-full border border-[var(--card-border)] bg-[var(--background-secondary)] px-3 py-1 text-[11px] font-medium text-[var(--text-muted)]"
										>
											{tech}
										</span>
									))}
								</div>

								<div className="flex items-center gap-3">
									{project.github && (
										<a
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`View ${project.title} on GitHub`}
											className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
										>
											<SocialIcon platform="GitHub" size={18} />
										</a>
									)}
									{project.live && (
										<a
											href={project.live}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`View ${project.title} live demo`}
											className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent-secondary)]"
										>
											<ExternalLinkIcon size={18} />
										</a>
									)}
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
