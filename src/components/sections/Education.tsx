'use client';

import { motion, type Variants } from 'framer-motion';
import { GraduationCapIcon, MapPinIcon } from 'lucide-react';
import { education } from '@/data/education';
import type { Education as EducationEntry } from '@/data/types';
import SectionTitle from '@/components/ui/SectionTitle';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Splits a score like "8.2 CGPA" into its number ("8.2") and unit ("CGPA") for display
const SCORE_PATTERN = /^([\d.]+%?)\s*(.*)$/;

function splitScore(score: string): { value: string; unit: string } {
	const match = score.match(SCORE_PATTERN);
	return match ? { value: match[1], unit: match[2] } : { value: score, unit: '' };
}

function formatYears({ startYear, graduationYear }: EducationEntry): string {
	return startYear ? `${startYear} – ${graduationYear}` : String(graduationYear);
}

function getEntryKey(entry: EducationEntry): string {
	return `${entry.institution}-${entry.graduationYear}`;
}

function YearPill({ entry }: { entry: EducationEntry }) {
	return (
		<span className="shrink-0 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
			{formatYears(entry)}
		</span>
	);
}

// Large left card for the highest qualification
function FeaturedEducationCard({ entry, variants }: { entry: EducationEntry; variants: Variants }) {
	const { value, unit } = splitScore(entry.score);

	return (
		<SpotlightCard
			variants={variants}
			className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-8 md:col-span-3 md:p-10"
		>
			{/* Gradient left border accent */}
			<div className="absolute top-0 left-0 h-full w-1 bg-linear-to-b from-accent to-secondary" />

			<div className="mb-6 flex items-start justify-between gap-4">
				<span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
					<GraduationCapIcon aria-hidden="true" size={24} />
				</span>
				<YearPill entry={entry} />
			</div>

			<h3 className="mb-2 text-xl font-semibold text-foreground md:text-2xl">{entry.degree}</h3>
			<p className="mb-1 text-base font-medium text-foreground/90">{entry.institution}</p>
			<p className="mb-5 flex items-center gap-1.5 text-sm text-subtle">
				<MapPinIcon aria-hidden="true" size={14} />
				{entry.location}
			</p>
			<p className="mb-6 text-sm leading-relaxed text-foreground/70">{entry.description}</p>

			<div className="mt-auto flex items-baseline gap-2 border-t border-border pt-6">
				<span className="bg-linear-to-r from-accent to-secondary bg-clip-text text-5xl font-bold text-transparent">
					{value}
				</span>
				{unit && <span className="text-sm font-medium tracking-wider text-muted uppercase">{unit}</span>}
			</div>
		</SpotlightCard>
	);
}

// Compact right-hand card for school qualifications
function CompactEducationCard({ entry, variants }: { entry: EducationEntry; variants: Variants }) {
	return (
		<SpotlightCard
			variants={variants}
			className="flex flex-1 flex-col rounded-2xl border border-border bg-surface p-6"
		>
			<div className="mb-3 flex items-start justify-between gap-3">
				<h3 className="text-base font-semibold text-foreground">{entry.degree}</h3>
				<YearPill entry={entry} />
			</div>
			<p className="mb-1 text-sm font-medium text-foreground/90">{entry.institution}</p>
			<p className="flex items-center gap-1.5 text-xs text-subtle">
				<MapPinIcon aria-hidden="true" size={12} />
				{entry.location}
			</p>
			<p className="mt-auto pt-4 text-2xl font-bold text-secondary">{entry.score}</p>
		</SpotlightCard>
	);
}

export default function Education() {
	const prefersReducedMotion = useReducedMotion();

	if (education.length === 0) return null;

	const [highestQualification, ...otherQualifications] = [...education].sort(
		(a, b) => b.graduationYear - a.graduationYear
	);

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15 },
		},
	};

	const cardVariants: Variants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: 'easeOut' },
		},
	};

	return (
		<section id="education" className="py-8">
			<div className="container-width">
				<SectionTitle title="Education" subtitle="Academic background and qualifications" />

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="mx-auto grid max-w-5xl gap-6 md:grid-cols-5"
				>
					<FeaturedEducationCard entry={highestQualification} variants={cardVariants} />

					{otherQualifications.length > 0 && (
						<div className="flex flex-col gap-6 md:col-span-2">
							{otherQualifications.map((entry) => (
								<CompactEducationCard key={getEntryKey(entry)} entry={entry} variants={cardVariants} />
							))}
						</div>
					)}
				</motion.div>
			</div>
		</section>
	);
}
