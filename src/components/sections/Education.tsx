'use client';

import { motion } from 'framer-motion';
import { GraduationCapIcon } from 'lucide-react';
import { education } from '@/data/education';
import SectionTitle from '@/components/ui/SectionTitle';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Education() {
	const prefersReducedMotion = useReducedMotion();

	if (education.length === 0) return null;

	const sorted = [...education].sort((a, b) => b.graduationYear - a.graduationYear);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, x: -10 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.5, ease: 'easeOut' as const },
		},
	};

	return (
		<section id="education" style={{ paddingTop: '140px', paddingBottom: '140px' }}>
			<div className="container-width">
				{/* Section wrapped in a card border */}
				<div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-8 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
					<SectionTitle
						title="Education"
						icon={<GraduationCapIcon size={18} />}
					/>

					{/* Timeline */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
						className="relative ml-3 border-l-2 border-[var(--card-border)] pl-8"
					>
						{sorted.map((entry, index) => {
							const startYear = entry.graduationYear - (index === 0 ? 4 : 2);
							const yearRange = `${startYear} - ${entry.graduationYear}`;

							return (
								<motion.div
									key={`${entry.institution}-${entry.graduationYear}`}
									variants={itemVariants}
									className="relative mb-10 last:mb-0"
								>
									{/* Timeline Dot */}
									<div className="absolute -left-[37px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--background)]">
										<div className="h-2 w-2 rounded-full bg-[var(--accent)]" />
									</div>

									{/* Content */}
									<div className="flex flex-wrap items-start justify-between gap-4">
										<div>
											<p className="mb-1 text-xs text-[var(--accent)]">{yearRange}</p>
											<h3 className="text-base font-semibold text-[var(--text-primary)]">{entry.degree}</h3>
											<p className="mt-1 text-sm text-[var(--text-secondary)]">{entry.institution}, {entry.location.split(',')[0]}</p>
											<p className="mt-1 text-xs text-[var(--text-muted)]">{entry.score.includes('CGPA') ? entry.score : `Percentage: ${entry.score}`}</p>
										</div>

										{/* Score Badge */}
										<span className="shrink-0 rounded-full bg-[var(--accent)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--accent)]">
											{entry.score}
										</span>
									</div>
								</motion.div>
							);
						})}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
