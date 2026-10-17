'use client';

import { motion } from 'framer-motion';
import { learningJourney } from '@/data/learning';
import SectionTitle from '@/components/ui/SectionTitle';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Learning() {
	const prefersReducedMotion = useReducedMotion();

	if (learningJourney.length === 0) return null;

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
		<section id="learning" className="py-8">
			<div className="container-width">
				<SectionTitle title="Learning Journey" subtitle="Currently exploring and growing in" />

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2"
				>
					{learningJourney.map((entry) => (
						<motion.div
							key={entry.title}
							variants={cardVariants}
							className="relative overflow-hidden rounded-2xl border border-white/15 bg-surface p-7"
						>
							{/* Subtle gradient accent at top */}
							<div className="absolute top-0 left-0 h-0.5 w-full bg-linear-to-r from-accent to-secondary" />
							<h3 className="mb-3 text-lg font-semibold text-foreground">{entry.title}</h3>
							<p className="text-sm leading-relaxed text-foreground/70">{entry.description}</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
