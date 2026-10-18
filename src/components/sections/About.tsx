'use client';

import { personalInfo } from '@/data/personal';
import MotionWrapper from '@/components/ui/MotionWrapper';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Badge from '@/components/ui/Badge';
import SectionTitle from '@/components/ui/SectionTitle';
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function About() {
	return (
		<section id="about" className="py-8">
			<div className="container-width">
				<SectionTitle title="About Me" subtitle="A brief introduction to who I am" />

				<MotionWrapper>
					<p className="mx-auto mb-16 max-w-3xl text-center text-base leading-relaxed text-foreground/80 md:text-lg">
						{personalInfo.introduction}
					</p>
				</MotionWrapper>

				{/* Stats */}
				<MotionWrapper delay={0.2}>
					<div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4">
						{personalInfo.stats.map((stat) => (
							<SpotlightCard
								key={stat.label}
								className="rounded-2xl border border-white/15 bg-surface p-8 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]"
							>
								<div className="mb-1 text-3xl font-bold text-accent">
									<AnimatedCounter value={stat.value} />
								</div>
								<div className="text-xs text-foreground/50">{stat.suffix}</div>
								<div className="mt-1 text-sm text-foreground/70">{stat.label}</div>
							</SpotlightCard>
						))}
					</div>
				</MotionWrapper>

				{/* Focus Areas */}
				<MotionWrapper delay={0.4}>
					<div className="flex flex-wrap justify-center gap-3">
						{personalInfo.focusAreas.map((area) => (
							<Badge key={area} text={area} variant="accent" />
						))}
					</div>
				</MotionWrapper>
			</div>
		</section>
	);
}
