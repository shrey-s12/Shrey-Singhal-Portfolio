'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';
import TechBadge from '@/components/ui/TechBadge';
import SectionTitle from '@/components/ui/SectionTitle';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Experience() {
	const prefersReducedMotion = useReducedMotion();

	if (experiences.length === 0) return null;

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: prefersReducedMotion ? 0 : 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.5, ease: 'easeOut' as const },
		},
	};

	return (
		<section id="experience" className="py-8">
			<div className="container-width">
				<SectionTitle title="Experience" subtitle="Professional journey and contributions" />

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="relative mx-auto max-w-4xl"
				>
					{/* Timeline line - thicker with glow */}
					<div className="absolute top-0 bottom-0 left-4 w-0.5 bg-linear-to-b from-accent to-secondary shadow-[0_0_8px_rgba(59,130,246,0.4)] md:left-6" />

					<div className="space-y-12">
						{experiences.map((exp) => (
							<motion.div
								key={`${exp.company}-${exp.duration}`}
								variants={itemVariants}
								className="relative pl-12 md:pl-16"
							>
								{/* Timeline dot - larger with glow */}
								<div className="absolute left-2 top-2 h-5 w-5 rounded-full border-2 border-accent bg-background shadow-[0_0_10px_rgba(59,130,246,0.5)] md:left-4" />

								<SpotlightCard className="rounded-2xl border border-white/15 bg-surface p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
									<div className="mb-3 flex flex-wrap items-center justify-between gap-2">
										<h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
										<span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
											{exp.timeframe}
										</span>
									</div>
									<p className="mb-1 text-base text-accent">{exp.company}</p>
									<p className="mb-1 text-sm text-foreground/60">
										{exp.location} &middot; {exp.duration}
									</p>
									{exp.description && (
										<p className="text-sm text-foreground/70">{exp.description}</p>
									)}

									{/* Achievements */}
									{exp.achievements.length > 0 && (
										<ul className="mt-4 space-y-2">
											{exp.achievements.map((achievement) => (
												<li key={achievement} className="flex items-start gap-2 text-sm text-foreground/70">
													<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
													{achievement}
												</li>
											))}
										</ul>
									)}

									{/* Tech Stack */}
									{exp.techStack.length > 0 && (
										<div className="mt-4 flex flex-wrap gap-2">
											{exp.techStack.map((tech) => (
												<TechBadge key={tech} name={tech} variant="secondary" />
											))}
										</div>
									)}
								</SpotlightCard>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
