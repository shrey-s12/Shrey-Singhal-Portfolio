'use client';

import { motion } from 'framer-motion';
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
		<section id="education" className="py-12">
			<div className="container-width">
				<SectionTitle title="Education" subtitle="Academic background and qualifications" />

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="mx-auto max-w-3xl space-y-10"
				>
					{sorted.map((entry) => (
						<motion.div
							key={`${entry.institution}-${entry.graduationYear}`}
							variants={cardVariants}
							className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#111827]/90 backdrop-blur-sm p-10"
						>
							{/* Gradient left border accent */}
							<div className="absolute top-0 left-0 h-full w-1 bg-linear-to-b from-[#3B82F6] to-[#8B5CF6]" />

							<div className="mb-3 flex flex-wrap items-center justify-between gap-2">
								<h3 className="text-lg font-semibold text-[#F9FAFB]">{entry.degree}</h3>
								<span className="rounded-full bg-[#3B82F6]/10 px-3 py-1 text-xs font-medium text-[#3B82F6]">
									{entry.graduationYear}
								</span>
							</div>
							<p className="mb-1 text-base font-medium text-[#F9FAFB]/90">{entry.institution}</p>
							<p className="mb-2 text-sm text-[#F9FAFB]/60">{entry.location}</p>
							<p className="mb-3 text-sm font-medium text-[#8B5CF6]">{entry.score}</p>
							<p className="text-sm text-[#F9FAFB]/70">{entry.description}</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
