'use client';

import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import TechBadge from '@/components/ui/TechBadge';
import SectionTitle from '@/components/ui/SectionTitle';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Skills() {
	const prefersReducedMotion = useReducedMotion();

	if (skillCategories.length === 0) return null;

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
		<section id="skills" className="py-8">
			<div className="container-width">
				<SectionTitle title="Skills & Technologies" subtitle="Technologies and tools I work with" />

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
				>
					{skillCategories.map((category) => (
						<SpotlightCard
							key={category.title}
							variants={cardVariants}
							whileHover={prefersReducedMotion ? {} : { y: -6, boxShadow: '0 0 40px rgba(59, 130, 246, 0.2), 0 0 80px rgba(139, 92, 246, 0.1)' }}
							transition={{ duration: 0.25 }}
							className="rounded-2xl border-2 border-transparent bg-surface p-8"
							style={{
								backgroundImage: 'linear-gradient(var(--color-surface), var(--color-surface)), linear-gradient(135deg, var(--color-accent), var(--color-secondary))',
								backgroundOrigin: 'border-box',
								backgroundClip: 'padding-box, border-box',
								border: '2px solid transparent',
							}}
						>
							<h3 className="mb-6 text-lg font-semibold text-foreground">{category.title}</h3>
							<div className="flex flex-wrap gap-2">
								{category.skills.map((skill) => (
									<TechBadge key={skill} name={skill} variant="default" />
								))}
							</div>
						</SpotlightCard>
					))}
				</motion.div>
			</div>
		</section>
	);
}
