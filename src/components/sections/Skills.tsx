'use client';

import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import SectionTitle from '@/components/ui/SectionTitle';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Skills() {
	const prefersReducedMotion = useReducedMotion();

	if (skillCategories.length === 0) return null;

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: prefersReducedMotion ? 0 : 0.1,
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
		<section id="skills" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
			<div className="container-width">
				<SectionTitle title="Skills & Technologies" subtitle="Technologies and tools I work with" />

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="grid gap-6 md:grid-cols-2"
				>
					{skillCategories.map((category) => (
						<motion.div
							key={category.title}
							variants={cardVariants}
							whileHover={prefersReducedMotion ? {} : { y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
							transition={{ duration: 0.25 }}
							className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-7 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
						>
							{/* Gradient top border accent */}
							<div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]" />

							<h3 className="mb-5 text-lg font-semibold text-[var(--text-primary)]">{category.title}</h3>
							<div className="flex flex-wrap gap-2">
								{category.skills.map((skill) => (
									<span
										key={skill}
										className="inline-block rounded-full border border-[var(--card-border)] bg-[var(--background-secondary)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
									>
										{skill}
									</span>
								))}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
