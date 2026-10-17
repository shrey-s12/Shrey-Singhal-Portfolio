'use client';

import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import type { SkillCategory } from '@/data/types';
import Marquee from '@/components/ui/Marquee';
import SkillTile from '@/components/ui/SkillTile';
import TechBadge from '@/components/ui/TechBadge';
import SectionTitle from '@/components/ui/SectionTitle';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const MARQUEE_DURATION_SECONDS = 25;

// Split every skill across two marquee rows that scroll in opposite directions
const ALL_SKILLS = skillCategories.flatMap((category) => category.skills);
const ROW_SPLIT_INDEX = Math.ceil(ALL_SKILLS.length / 2);
const MARQUEE_ROWS = [ALL_SKILLS.slice(0, ROW_SPLIT_INDEX), ALL_SKILLS.slice(ROW_SPLIT_INDEX)];

function CategoryRow({ category }: { category: SkillCategory }) {
	return (
		<div className="flex flex-col gap-3 py-5 md:flex-row md:items-center md:gap-8">
			<h3 className="shrink-0 text-xs font-semibold tracking-wider text-accent uppercase md:w-52">
				{category.title}
			</h3>
			<div className="flex flex-wrap gap-2">
				{category.skills.map((skill) => (
					<TechBadge key={skill} name={skill} variant="default" />
				))}
			</div>
		</div>
	);
}

export default function Skills() {
	const prefersReducedMotion = useReducedMotion();

	if (skillCategories.length === 0) return null;

	const fadeUpVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' as const },
		},
	};

	return (
		<section id="skills" className="py-8">
			<div className="container-width">
				<SectionTitle title="Skills & Technologies" subtitle="Technologies and tools I work with" />
			</div>

			{/* Scrolling logo rows run edge to edge, outside the content container.
			    Hidden for reduced motion: the category list below already shows every skill. */}
			<motion.div
				variants={fadeUpVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
				className="mb-12 space-y-2 motion-reduce:hidden"
			>
				{MARQUEE_ROWS.map((skills, rowIndex) => (
					<Marquee
						key={skills[0]}
						reverse={rowIndex % 2 === 1}
						durationSeconds={MARQUEE_DURATION_SECONDS}
						ariaLabel={`Skills, row ${rowIndex + 1}`}
					>
						{skills.map((skill) => (
							<SkillTile key={skill} name={skill} />
						))}
					</Marquee>
				))}
			</motion.div>

			<div className="container-width">
				<SpotlightCard
					variants={fadeUpVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="rounded-2xl border border-border bg-surface px-6"
				>
					<div className="divide-y divide-border">
						{skillCategories.map((category) => (
							<CategoryRow key={category.title} category={category} />
						))}
					</div>
				</SpotlightCard>
			</div>
		</section>
	);
}
