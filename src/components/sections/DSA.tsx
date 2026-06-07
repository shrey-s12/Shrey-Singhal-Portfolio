'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon, FlameIcon, TrophyIcon, TargetIcon } from 'lucide-react';
import { dsaData } from '@/data/dsa';
import type { LeetCodeStats } from '@/data/types';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Badge from '@/components/ui/Badge';
import SectionTitle from '@/components/ui/SectionTitle';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function ProgressBar({ solved, total, color }: { solved: number; total: number; color: string }) {
	const percentage = total > 0 ? (solved / total) * 100 : 0;
	return (
		<div className="h-2 w-full overflow-hidden rounded-full bg-[var(--card-border)]">
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

function SubmissionHeatmap({ calendar }: { calendar: Record<string, number> }) {
	const CELL = 12;
	const GAP = 4;
	const STEP = CELL + GAP;

	const { rects, labels, totalWeeks } = useMemo(() => {
		const now = new Date();
		const start = new Date(now);
		start.setDate(start.getDate() - 52 * 7);
		start.setDate(start.getDate() - start.getDay());

		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const allRects: Array<{ col: number; row: number; count: number; dateStr: string }> = [];
		const monthPositions: Array<{ label: string; col: number }> = [];

		let col = 0;
		let prevMonth = -1;
		const cursor = new Date(start);

		while (cursor <= now) {
			const dow = cursor.getDay();
			if (dow === 0 && cursor > start) col++;

			const curMonth = cursor.getMonth();
			if (curMonth !== prevMonth) {
				prevMonth = curMonth;
				const lastLabel = monthPositions[monthPositions.length - 1];
				if (!lastLabel || col - lastLabel.col >= 3) {
					monthPositions.push({ label: monthNames[curMonth], col });
				}
			}

			const ts = Math.floor(Date.UTC(cursor.getFullYear(), cursor.getMonth(), cursor.getDate()) / 1000).toString();
			allRects.push({ col, row: dow, count: calendar[ts] ?? 0, dateStr: cursor.toISOString().split('T')[0] });
			cursor.setDate(cursor.getDate() + 1);
		}

		return { rects: allRects, labels: monthPositions, totalWeeks: col + 1 };
	}, [calendar]);

	const getColor = (count: number): string => {
		if (count === 0) return 'var(--background-secondary)';
		if (count <= 1) return '#0e4429';
		if (count <= 3) return '#006d32';
		if (count <= 6) return '#26a641';
		return '#39d353';
	};

	const svgWidth = totalWeeks * STEP;
	const svgHeight = 7 * STEP + 28;

	return (
		<div className="w-full overflow-x-auto">
			<svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full" preserveAspectRatio="xMidYMid meet" style={{ maxHeight: '150px' }}>
				{rects.map((r) => (
					<rect className="cursor-pointer" key={r.dateStr} x={r.col * STEP} y={r.row * STEP} width={CELL} height={CELL} rx={2} ry={2} fill={getColor(r.count)}>
						<title>{`${r.count} submission${r.count !== 1 ? 's' : ''} on ${new Date(r.dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}</title>
					</rect>
				))}
				{labels.map((m, i) => (
					<text key={i} x={m.col * STEP} y={7 * STEP + 18} fill="var(--text-muted)" fontSize={12}>{m.label}</text>
				))}
			</svg>
		</div>
	);
}

function LoadingSkeleton() {
	return (
		<div className="mx-auto max-w-4xl animate-pulse">
			<div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
				{[1, 2, 3].map((i) => (
					<div key={i} className="h-36 rounded-xl border border-[var(--card-border)] bg-[var(--background-secondary)]" />
				))}
			</div>
			<div className="mb-8 h-20 rounded-xl border border-[var(--card-border)] bg-[var(--background-secondary)]" />
			<div className="h-32 rounded-xl border border-[var(--card-border)] bg-[var(--background-secondary)]" />
		</div>
	);
}

export default function DSA() {
	const prefersReducedMotion = useReducedMotion();
	const [stats, setStats] = useState<LeetCodeStats | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchStats() {
			try {
				const response = await fetch('/api/leetcode');
				if (!response.ok) throw new Error('Failed to fetch');
				const data: LeetCodeStats = await response.json();
				setStats(data);
			} catch {
				setStats({
					username: 'shrey_s12',
					ranking: 0,
					reputation: 0,
					totalSolved: parseInt(dsaData.totalSolved) || 600,
					totalQuestions: 3400,
					easySolved: parseInt(dsaData.easy) || 300,
					easyTotal: 850,
					mediumSolved: parseInt(dsaData.medium) || 250,
					mediumTotal: 1800,
					hardSolved: parseInt(dsaData.hard) || 30,
					hardTotal: 750,
					contestRating: 0,
					contestAttended: 0,
					contestGlobalRanking: 0,
					contestTopPercentage: 0,
					badges: [],
					streak: 0,
					totalActiveDays: 0,
					submissionCalendar: {},
				});
			} finally {
				setLoading(false);
			}
		}

		fetchStats();
	}, []);

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
		<section id="dsa" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
			<div className="container-width">
				<SectionTitle title="Problem Solving Journey" subtitle="Data structures and algorithms practice" />

				{loading ? (
					<LoadingSkeleton />
				) : stats ? (
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
							<motion.div
								variants={itemVariants}
								className="rounded-xl border border-[var(--card-border)] bg-[var(--background-secondary)] p-6"
							>
								<div className="mb-3 flex items-center gap-2">
									<TrophyIcon size={18} className="text-yellow-400" />
									<span className="text-sm font-medium text-[var(--text-secondary)]">Contest Rating</span>
								</div>
								<div className="mb-2 text-3xl font-bold text-[var(--text-primary)]">
									{stats.contestRating > 0 ? (
										<AnimatedCounter value={String(stats.contestRating)} />
									) : (
										<span className="text-[var(--text-secondary)]">—</span>
									)}
								</div>
								{stats.contestTopPercentage > 0 && (
									<span className="inline-block rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-400">
										Top {stats.contestTopPercentage}%
									</span>
								)}
								<div className="mt-3 space-y-1 text-xs text-[var(--text-secondary)]">
									<div>Contests: {stats.contestAttended}</div>
									{stats.contestGlobalRanking > 0 && (
										<div>Global Rank: #{stats.contestGlobalRanking.toLocaleString()}</div>
									)}
								</div>
							</motion.div>

							{/* Problems Solved */}
							<motion.div
								variants={itemVariants}
								className="rounded-xl border border-[var(--card-border)] bg-[var(--background-secondary)] p-6"
							>
								<div className="mb-3 flex items-center gap-2">
									<TargetIcon size={18} className="text-[var(--accent)]" />
									<span className="text-sm font-medium text-[var(--text-secondary)]">Problems Solved</span>
								</div>
								<div className="mb-4 text-3xl font-bold text-[var(--text-primary)]">
									<AnimatedCounter value={String(stats.totalSolved)} />
									<span className="text-lg text-[var(--text-secondary)]">/{stats.totalQuestions}</span>
								</div>
								<div className="space-y-3">
									<div>
										<div className="mb-1 flex justify-between text-xs">
											<span className="text-green-400">Easy</span>
											<span className="text-[var(--text-secondary)]">{stats.easySolved}/{stats.easyTotal}</span>
										</div>
										<ProgressBar solved={stats.easySolved} total={stats.easyTotal} color="bg-green-400" />
									</div>
									<div>
										<div className="mb-1 flex justify-between text-xs">
											<span className="text-yellow-400">Medium</span>
											<span className="text-[var(--text-secondary)]">{stats.mediumSolved}/{stats.mediumTotal}</span>
										</div>
										<ProgressBar solved={stats.mediumSolved} total={stats.mediumTotal} color="bg-yellow-400" />
									</div>
									<div>
										<div className="mb-1 flex justify-between text-xs">
											<span className="text-red-400">Hard</span>
											<span className="text-[var(--text-secondary)]">{stats.hardSolved}/{stats.hardTotal}</span>
										</div>
										<ProgressBar solved={stats.hardSolved} total={stats.hardTotal} color="bg-red-400" />
									</div>
								</div>
							</motion.div>

							{/* Streak */}
							<motion.div
								variants={itemVariants}
								className="rounded-xl border border-[var(--card-border)] bg-[var(--background-secondary)] p-6"
							>
								<div className="mb-3 flex items-center gap-2">
									<FlameIcon size={18} className="text-orange-400" />
									<span className="text-sm font-medium text-[var(--text-secondary)]">Streak</span>
								</div>
								<div className="mb-1 text-3xl font-bold text-[var(--text-primary)]">
									{stats.streak > 0 ? (
										<>
											<AnimatedCounter value={String(stats.streak)} />
											<span className="ml-1 text-base text-[var(--text-secondary)]">days</span>
										</>
									) : (
										<span className="text-[var(--text-secondary)]">—</span>
									)}
								</div>
								<p className="text-xs text-[var(--text-secondary)]">Current Streak</p>
								<div className="mt-4 rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-4 py-3">
									<div className="text-lg font-semibold text-[var(--text-primary)]">
										{stats.totalActiveDays > 0 ? (
											<AnimatedCounter value={String(stats.totalActiveDays)} />
										) : (
											'—'
										)}
									</div>
									<p className="text-xs text-[var(--text-secondary)]">Total Active Days</p>
								</div>
							</motion.div>
						</div>

						{/* Badges Row */}
						{stats.badges.length > 0 && (
							<motion.div
								variants={itemVariants}
								className="mb-6 rounded-xl border border-[var(--card-border)] bg-[var(--background-secondary)] p-6"
							>
								<h3 className="mb-4 text-sm font-medium text-[var(--text-secondary)]">Badges</h3>
								<div className="flex flex-wrap gap-4">
									{stats.badges.map((badge, index) => (
										<div key={`${badge.name}-${index}`} className="flex items-center gap-2 rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2">
											{badge.icon && (
												<img
													src={badge.icon}
													alt={badge.name}
													className="h-6 w-6"
												/>
											)}
											<span className="text-sm text-[var(--text-primary)]">{badge.name}</span>
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
							<p className="mb-3 text-sm text-[var(--text-secondary)]">{dsaData.description}</p>
							<a
								href={dsaData.leetcodeProfile}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-secondary)]"
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
				) : null}
			</div>
		</section>
	);
}
