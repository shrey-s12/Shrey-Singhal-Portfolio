'use client';

import { motion } from 'framer-motion';
import { ExternalLinkIcon } from 'lucide-react';
import { projects } from '@/data/projects';
import TechBadge from '@/components/ui/TechBadge';
import SectionTitle from '@/components/ui/SectionTitle';
import SocialIcon from '@/components/ui/SocialIcon';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Projects() {
	const prefersReducedMotion = useReducedMotion();

	const featured = projects.filter((p) => p.featured);
	const nonFeatured = projects.filter((p) => !p.featured);

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
		<section id="projects" className="py-8">
			<div className="container-width">
				<SectionTitle title="Projects" subtitle="Featured work and side projects" />

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="space-y-10"
				>
					{/* Featured Projects */}
					{featured.map((project) => (
						<SpotlightCard
							key={project.id}
							variants={cardVariants}
							whileHover={prefersReducedMotion ? {} : { y: -6 }}
							transition={{ duration: 0.25 }}
							className="overflow-hidden rounded-2xl border border-white/15 bg-surface shadow-[0_0_30px_rgba(59,130,246,0.06)]"
						>
							{/* Terminal-style header - more prominent */}
							<div className="flex items-center gap-2.5 border-b border-white/15 bg-background px-5 py-3.5">
								<span className="h-3.5 w-3.5 rounded-full bg-red-500" />
								<span className="h-3.5 w-3.5 rounded-full bg-yellow-500" />
								<span className="h-3.5 w-3.5 rounded-full bg-green-500" />
								<span className="ml-4 font-mono text-xs text-foreground/60">{project.title}</span>
							</div>

							<div className="p-7">
								<div className="mb-3 flex flex-wrap items-center gap-3">
									<h3 className="text-xl font-bold text-foreground">{project.title}</h3>
									<span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
										{project.category}
									</span>
								</div>
								<p className="mb-2 text-sm text-secondary">{project.tagline}</p>
								<p className="mb-5 text-sm text-foreground/70">{project.description}</p>

								{/* Tech Stack */}
								<div className="mb-5 flex flex-wrap gap-2">
									{project.techStack.map((tech) => (
										<TechBadge key={tech} name={tech} variant="default" />
									))}
								</div>

								{/* Links */}
								<div className="flex items-center gap-3">
									{project.github && (
										<a
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`View ${project.title} on GitHub`}
											className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-foreground/70 transition-all hover:border-accent/50 hover:text-accent hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
										>
											<SocialIcon platform="GitHub" size={16} />
											GitHub
										</a>
									)}
									{project.live && (
										<a
											href={project.live}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`View ${project.title} live demo`}
											className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-foreground/70 transition-all hover:border-secondary/50 hover:text-secondary hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]"
										>
											<ExternalLinkIcon size={16} />
											Live
										</a>
									)}
								</div>
							</div>
						</SpotlightCard>
					))}

					{/* Non-featured Projects Grid */}
					{nonFeatured.length > 0 && (
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{nonFeatured.map((project) => (
								<SpotlightCard
									key={project.id}
									variants={cardVariants}
									whileHover={prefersReducedMotion ? {} : { y: -6, boxShadow: '0 0 30px rgba(59, 130, 246, 0.1)' }}
									transition={{ duration: 0.25 }}
									className="rounded-2xl border border-white/15 bg-surface p-7"
								>
									<div className="mb-2 flex items-center gap-2">
										<h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
									</div>
									<p className="mb-1 text-xs text-accent">{project.category}</p>
									<p className="mb-2 text-sm text-secondary">{project.tagline}</p>
									<p className="mb-4 text-sm text-foreground/70">{project.description}</p>

									<div className="mb-4 flex flex-wrap gap-2">
										{project.techStack.slice(0, 5).map((tech) => (
											<TechBadge key={tech} name={tech} variant="default" />
										))}
									</div>

									<div className="flex items-center gap-3">
										{project.github && (
											<a
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`View ${project.title} on GitHub`}
												className="text-foreground/60 transition-colors hover:text-accent"
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
												className="text-foreground/60 transition-colors hover:text-secondary"
											>
												<ExternalLinkIcon size={18} />
											</a>
										)}
									</div>
								</SpotlightCard>
							))}
						</div>
					)}
				</motion.div>
			</div>
		</section>
	);
}
