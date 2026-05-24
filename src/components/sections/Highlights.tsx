'use client';

import { motion } from 'framer-motion';
import { highlights } from '@/data/highlights';
import GlassCard from '@/components/ui/GlassCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Highlights() {
	const prefersReducedMotion = useReducedMotion();

	if (highlights.length === 0) return null;

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
		<section id="highlights" className="py-12">
			<div className="container-width">
				<SectionTitle title="Engineering Highlights" subtitle="Key achievements and technical contributions" />

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
				>
					{highlights.map((highlight) => (
						<motion.div key={highlight.title} variants={cardVariants}>
							<GlassCard hover className="relative overflow-hidden p-8">
								{/* Gradient top border accent */}
								<div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-[#3B82F6] to-[#8B5CF6]" />
								<h3 className="mb-3 text-lg font-semibold text-[#F9FAFB]">{highlight.title}</h3>
								<p className="text-sm leading-relaxed text-[#F9FAFB]/70">{highlight.description}</p>
							</GlassCard>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
