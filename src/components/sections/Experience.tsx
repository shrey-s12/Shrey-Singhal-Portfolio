'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';
import Badge from '@/components/ui/Badge';
import SectionTitle from '@/components/ui/SectionTitle';
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
					<div className="absolute top-0 bottom-0 left-4 w-0.5 bg-linear-to-b from-[#3B82F6] to-[#8B5CF6] shadow-[0_0_8px_rgba(59,130,246,0.4)] md:left-6" />

					<div className="space-y-12">
						{experiences.map((exp) => (
							<motion.div
								key={`${exp.company}-${exp.duration}`}
								variants={itemVariants}
								className="relative pl-12 md:pl-16"
							>
								{/* Timeline dot - larger with glow */}
								<div className="absolute left-2 top-2 h-5 w-5 rounded-full border-2 border-[#3B82F6] bg-[#0B0F19] shadow-[0_0_10px_rgba(59,130,246,0.5)] md:left-4" />

								<div className="rounded-2xl border border-white/15 bg-[#111827] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
									<div className="mb-3 flex flex-wrap items-center justify-between gap-2">
										<h3 className="text-lg font-semibold text-[#F9FAFB]">{exp.role}</h3>
										<span className="rounded-full bg-[#3B82F6]/10 px-3 py-1 text-xs text-[#3B82F6]">
											{exp.timeframe}
										</span>
									</div>
									<p className="mb-1 text-base text-[#3B82F6]">{exp.company}</p>
									<p className="mb-1 text-sm text-[#F9FAFB]/60">
										{exp.location} &middot; {exp.duration}
									</p>
									<p className="mb-4 text-sm text-[#F9FAFB]/70">{exp.description}</p>

									{/* Achievements */}
									<ul className="mb-4 space-y-2">
										{exp.achievements.map((achievement) => (
											<li key={achievement} className="flex items-start gap-2 text-sm text-[#F9FAFB]/70">
												<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B82F6]" />
												{achievement}
											</li>
										))}
									</ul>

									{/* Tech Stack */}
									<div className="flex flex-wrap gap-2">
										{exp.techStack.map((tech) => (
											<Badge key={tech} text={tech} variant="secondary" />
										))}
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
