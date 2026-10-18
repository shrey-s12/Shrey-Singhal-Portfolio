'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLinkIcon, FlameIcon, TrophyIcon, TargetIcon } from 'lucide-react';
import { dsaData } from '@/data/dsa';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Badge from '@/components/ui/Badge';
import SectionTitle from '@/components/ui/SectionTitle';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useLeetCodeStats } from '@/hooks/useLeetCodeStats';

const BADGE_ICON_SIZE_PX = 24;

function ProgressBar({ solved, total, color }: { solved: number; total: number; color: string }) {
	const percentage = total > 0 ? (solved / total) * 100 : 0;
	return (
		<div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
			<motion.div
				className={`h-full rounded-full ${color}`}
				initial={{ width: 0 }}
				whileInView={{ width: `${percentage}%` }}
				viewport={{ once: true }}
				transition={{ duration: 1, ease: 'easeOut' }}
			/>
		</div>
	);
}

function LoadingSkeleton() {
	return (
		<div className="mx-auto max-w-4xl animate-pulse">
			<div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
				{[1, 2, 3].map((i) => (
					<div key={i} className="h-36 rounded-xl bg-surface border border-border" />
				))}
			</div>
			<div className="mb-8 h-20 rounded-xl bg-surface border border-border" />
			<div className="h-32 rounded-xl bg-surface border border-border" />
		</div>
	);
}

export default function DSA() {
	const prefersReducedMotion = useReducedMotion();
	const stats = useLeetCodeStats();

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
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: 'easeOut' as const },
		},
	};

	return (
		<section id="dsa" className="py-8">
			<div className="container-width">
				<SectionTitle title="Problem Solving Journey" subtitle="Data structures and algorithms practice" />

				{stats ? (
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.1 }}
						className="mx-auto max-w-4xl"
					>
						{/* Top Row: Contest Rating | Problems Solved | Streak */}
						<div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
							{/* Contest Rating */}
							<SpotlightCard
								variants={itemVariants}
								className="rounded-xl border border-border bg-surface p-6"
							>
								<div className="mb-3 flex items-center gap-2">
									<TrophyIcon size={18} className="text-yellow-400" />
									<span className="text-sm font-medium text-muted">Contest Rating</span>
								</div>
								<div className="mb-2 text-3xl font-bold text-foreground">
									{stats.contestRating > 0 ? (
										<AnimatedCounter value={String(stats.contestRating)} />
									) : (
										<span className="text-muted">—</span>
									)}
								</div>
								{stats.contestTopPercentage > 0 && (
									<span className="inline-block rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-400">
										Top {stats.contestTopPercentage}%
									</span>
								)}
								<div className="mt-3 space-y-1 text-xs text-muted">
									<div>Contests: {stats.contestAttended}</div>
									{stats.contestGlobalRanking > 0 && (
										<div>Global Rank: #{stats.contestGlobalRanking.toLocaleString()}</div>
									)}
								</div>
							</SpotlightCard>

							{/* Problems Solved */}
							<SpotlightCard
								variants={itemVariants}
								className="rounded-xl border border-border bg-surface p-6"
							>
								<div className="mb-3 flex items-center gap-2">
									<TargetIcon size={18} className="text-accent" />
									<span className="text-sm font-medium text-muted">Problems Solved</span>
								</div>
								<div className="mb-4 text-3xl font-bold text-foreground">
									<AnimatedCounter value={String(stats.totalSolved)} />
									<span className="text-lg text-muted">/{stats.totalQuestions}</span>
								</div>
								<div className="space-y-3">
									<div>
										<div className="mb-1 flex justify-between text-xs">
											<span className="text-green-400">Easy</span>
											<span className="text-muted">{stats.easySolved}/{stats.easyTotal}</span>
										</div>
										<ProgressBar solved={stats.easySolved} total={stats.easyTotal} color="bg-green-400" />
									</div>
									<div>
										<div className="mb-1 flex justify-between text-xs">
											<span className="text-yellow-400">Medium</span>
											<span className="text-muted">{stats.mediumSolved}/{stats.mediumTotal}</span>
										</div>
										<ProgressBar solved={stats.mediumSolved} total={stats.mediumTotal} color="bg-yellow-400" />
									</div>
									<div>
										<div className="mb-1 flex justify-between text-xs">
											<span className="text-red-400">Hard</span>
											<span className="text-muted">{stats.hardSolved}/{stats.hardTotal}</span>
										</div>
										<ProgressBar solved={stats.hardSolved} total={stats.hardTotal} color="bg-red-400" />
									</div>
								</div>
							</SpotlightCard>

							{/* Streak */}
							<SpotlightCard
								variants={itemVariants}
								className="rounded-xl border border-border bg-surface p-6"
							>
								<div className="mb-3 flex items-center gap-2">
									<FlameIcon size={18} className="text-orange-400" />
									<span className="text-sm font-medium text-muted">Streak</span>
								</div>
								<div className="mb-1 text-3xl font-bold text-foreground">
									{stats.streak > 0 ? (
										<>
											<AnimatedCounter value={String(stats.streak)} />
											<span className="ml-1 text-base text-muted">days</span>
										</>
									) : (
										<span className="text-muted">—</span>
									)}
								</div>
								<p className="text-xs text-muted">Current Streak</p>
								<div className="mt-4 rounded-lg bg-white/5 px-4 py-3">
									<div className="text-lg font-semibold text-foreground">
										{stats.totalActiveDays > 0 ? (
											<AnimatedCounter value={String(stats.totalActiveDays)} />
										) : (
											'—'
										)}
									</div>
									<p className="text-xs text-muted">Total Active Days</p>
								</div>
							</SpotlightCard>
						</div>

						{/* Badges Row */}
						{stats.badges.length > 0 && (
							<motion.div
								variants={itemVariants}
								className="mb-6 rounded-xl border border-border bg-surface p-6"
							>
								<h3 className="mb-4 text-sm font-medium text-muted">Badges</h3>
								<div className="flex flex-wrap gap-4">
									{stats.badges.map((badge, index) => (
										<div key={`${badge.name}-${index}`} className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
											{badge.icon && (
												<Image
													src={badge.icon}
													alt={badge.name}
													width={BADGE_ICON_SIZE_PX}
													height={BADGE_ICON_SIZE_PX}
													// Remote LeetCode assets; skip the optimizer so no remotePatterns config is needed
													unoptimized
												/>
											)}
											<span className="text-sm text-foreground">{badge.name}</span>
										</div>
									))}
								</div>
							</motion.div>
						)}

						{/* Platform & Link */}
						<motion.div
							variants={itemVariants}
							className="mb-8 text-center"
						>
							<p className="mb-3 text-sm text-foreground/70">{dsaData.description}</p>
							<a
								href={dsaData.leetcodeProfile}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80"
							>
								{dsaData.platform} Profile
								<ExternalLinkIcon size={14} />
							</a>
						</motion.div>

						{/* Topic Badges */}
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
					</motion.div>
				) : (
					<LoadingSkeleton />
				)}
			</div>
		</section>
	);
}
