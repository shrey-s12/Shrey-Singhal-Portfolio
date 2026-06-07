'use client';

import { UserIcon } from 'lucide-react';
import { personalInfo } from '@/data/personal';
import MotionWrapper from '@/components/ui/MotionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';

export default function About() {
	const codeLines = [
		'const developer = {',
		`  name: "${personalInfo.name}",`,
		'  role: "Backend Developer",',
		'  skills: ["Node.js", "MongoDB", "React"],',
		'  passion: "Building scalable apps",',
		'};',
		'',
		'// Always learning, always building',
	];

	return (
		<section id="about" style={{ paddingTop: '140px', paddingBottom: '140px' }}>
			<div className="container-width">
				{/* Section wrapped in card border */}
				<div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-8 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
					<SectionTitle
						title="About Me"
						icon={<UserIcon size={18} />}
					/>

					<div className="grid gap-8 lg:grid-cols-2 lg:items-start">
						{/* Left - Text */}
						<MotionWrapper>
							<div>
								<p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
									{personalInfo.introduction}
								</p>
								<p className="mb-6 text-sm leading-relaxed text-[var(--text-muted)]">
									Experienced in modern web technologies, RESTful APIs, database design, and cloud platforms.
								</p>
								<a
									href={personalInfo.resume}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_15px_rgba(79,70,229,0.3)] transition-all hover:shadow-[0_6px_25px_rgba(79,70,229,0.4)]"
								>
									Download Resume
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
										<polyline points="7 10 12 15 17 10" />
										<line x1="12" y1="15" x2="12" y2="3" />
									</svg>
								</a>
							</div>
						</MotionWrapper>

						{/* Right - Code Snippet */}
						<MotionWrapper delay={0.2}>
							<div className="overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--background-secondary)]">
								{/* Terminal dots */}
								<div className="flex items-center gap-2 border-b border-[var(--card-border)] px-4 py-3">
									<span className="h-3 w-3 rounded-full bg-red-500" />
									<span className="h-3 w-3 rounded-full bg-yellow-500" />
									<span className="h-3 w-3 rounded-full bg-green-500" />
								</div>
								{/* Code */}
								<div className="p-5 font-mono text-sm leading-relaxed">
									{codeLines.map((line, index) => (
										<div key={index} className="flex">
											<span className="mr-4 inline-block w-4 text-right text-[var(--text-muted)] select-none">
												{index + 1}
											</span>
											<span className="text-[var(--text-secondary)]">{line}</span>
										</div>
									))}
								</div>
							</div>
						</MotionWrapper>
					</div>
				</div>
			</div>
		</section>
	);
}
