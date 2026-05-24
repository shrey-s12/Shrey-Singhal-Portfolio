'use client';

import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import Badge from '@/components/ui/Badge';
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
		<section id="skills" className="py-12">
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
						<motion.div
							key={category.title}
							variants={cardVariants}
							whileHover={prefersReducedMotion ? {} : { y: -6, boxShadow: '0 0 40px rgba(59, 130, 246, 0.2), 0 0 80px rgba(139, 92, 246, 0.1)' }}
							transition={{ duration: 0.25 }}
							className="rounded-2xl border-2 border-transparent bg-[#111827] p-8"
							style={{
								backgroundImage: 'linear-gradient(#111827, #111827), linear-gradient(135deg, #3B82F6, #8B5CF6)',
								backgroundOrigin: 'border-box',
								backgroundClip: 'padding-box, border-box',
								border: '2px solid transparent',
							}}
						>
							<h3 className="mb-6 text-lg font-semibold text-[#F9FAFB]">{category.title}</h3>
							<div className="flex flex-wrap gap-2">
								{category.skills.map((skill) => (
									<Badge key={skill} text={skill} variant="default" />
								))}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
