'use client';

import { motion } from 'framer-motion';
import { ExternalLinkIcon } from 'lucide-react';
import { dsaData } from '@/data/dsa';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Badge from '@/components/ui/Badge';
import SectionTitle from '@/components/ui/SectionTitle';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function DSA() {
	const prefersReducedMotion = useReducedMotion();

	const stats = [
		{ label: 'Total Solved', value: dsaData.totalSolved, color: 'text-[#3B82F6]', borderColor: 'border-[#3B82F6]/40' },
		{ label: 'Easy', value: dsaData.easy, color: 'text-green-400', borderColor: 'border-green-400/40' },
		{ label: 'Medium', value: dsaData.medium, color: 'text-yellow-400', borderColor: 'border-yellow-400/40' },
		{ label: 'Hard', value: dsaData.hard, color: 'text-red-400', borderColor: 'border-red-400/40' },
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: prefersReducedMotion ? 0 : 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.4, ease: 'easeOut' as const },
		},
	};

	return (
		<section id="dsa" className="py-12">
			<div className="container-width">
				<SectionTitle title="Problem Solving Journey" subtitle="Data structures and algorithms practice" />

				<div className="mx-auto max-w-3xl">
					{/* Stats */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
						className="mb-10 grid grid-cols-2 gap-5 md:grid-cols-4"
					>
						{stats.map((stat) => (
							<motion.div
								key={stat.label}
								variants={itemVariants}
								className={`rounded-2xl border-2 ${stat.borderColor} bg-[#111827] p-5 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]`}
							>
								<div className={`mb-2 text-3xl font-bold ${stat.color}`}>
									<AnimatedCounter value={stat.value} />
								</div>
								<div className="text-xs font-medium text-[#F9FAFB]/60">{stat.label}</div>
							</motion.div>
						))}
					</motion.div>

					{/* Platform & Link */}
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="mb-10 text-center"
					>
						<p className="mb-3 text-sm text-[#F9FAFB]/70">{dsaData.description}</p>
						<a
							href={dsaData.leetcodeProfile}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-sm font-medium text-[#3B82F6] transition-colors hover:text-[#3B82F6]/80"
						>
							{dsaData.platform} Profile
							<ExternalLinkIcon size={14} />
						</a>
					</motion.div>

					{/* Topics */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
						className="flex flex-wrap justify-center gap-3"
					>
						{dsaData.topics.map((topic) => (
							<motion.div key={topic} variants={itemVariants}>
								<Badge text={topic} variant="accent" />
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
