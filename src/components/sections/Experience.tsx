'use client';

import { motion } from 'framer-motion';
import { BriefcaseIcon } from 'lucide-react';
import { experiences } from '@/data/experience';
import SectionTitle from '@/components/ui/SectionTitle';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Experience() {
	const prefersReducedMotion = useReducedMotion();

	if (experiences.length === 0) return null;

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: prefersReducedMotion ? 0 : 0.2 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: 'easeOut' as const },
		},
	};

	return (
		<section id="experience" style={{ paddingTop: '140px', paddingBottom: '140px' }}>
			<div className="container-width">
				{/* Section wrapped in a card border */}
				<div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-8 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
					<SectionTitle
						title="Experience"
						icon={<BriefcaseIcon size={18} />}
					/>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
						className="space-y-8"
					>
						{experiences.map((exp) => (
							<motion.div
								key={`${exp.company}-${exp.duration}`}
								variants={itemVariants}
								className="border-b border-[var(--card-border)] pb-8 last:border-b-0 last:pb-0"
							>
								<div className="mb-3 flex flex-wrap items-center justify-between gap-2">
									<div>
										<h3 className="text-base font-semibold text-[var(--text-primary)]">{exp.role}</h3>
										<p className="text-sm font-medium text-[var(--accent)]">{exp.company}</p>
									</div>
									<span className="text-xs text-[var(--text-muted)]">{exp.duration}</span>
								</div>

								<p className="mb-3 text-sm text-[var(--text-secondary)]">{exp.description}</p>

								<ul className="mb-4 space-y-1.5">
									{exp.achievements.map((achievement) => (
										<li key={achievement} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
											<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
											{achievement}
										</li>
									))}
								</ul>

								<div className="flex flex-wrap gap-2">
									{exp.techStack.map((tech) => (
										<span
											key={tech}
											className="inline-block rounded-md border border-[var(--card-border)] bg-[var(--background-secondary)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)]"
										>
											{tech}
										</span>
									))}
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
