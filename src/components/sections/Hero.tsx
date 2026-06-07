'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personal';
import { socials } from '@/data/socials';
import SocialIcon from '@/components/ui/SocialIcon';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Hero() {
	const prefersReducedMotion = useReducedMotion();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: prefersReducedMotion ? 0 : 0.12,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' as const },
		},
	};

	return (
		<section id="home" className="relative min-h-screen overflow-hidden" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
			<div className="container-width">
				{/* Two Column Layout */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
				>
					{/* LEFT SIDE */}
					<div className="flex-1 text-center lg:text-left">
						{/* Available Badge */}
						<motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-2">
							<span className="relative flex h-2.5 w-2.5">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
								<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
							</span>
							<span className="text-sm text-green-400">{personalInfo.availability}</span>
						</motion.div>

						{/* Small intro */}
						<motion.p variants={itemVariants} className="mb-2 text-base text-[var(--text-secondary)]">
							Hi, I&apos;m
						</motion.p>

						{/* Name - HUGE gradient text */}
						<motion.h1
							variants={itemVariants}
							className="mb-4 text-5xl font-bold leading-tight md:text-7xl"
						>
							<span className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
								{personalInfo.name}
							</span>
						</motion.h1>

						{/* Role */}
						<motion.p
							variants={itemVariants}
							className="mb-4 text-xl font-semibold text-[var(--text-primary)] md:text-2xl"
						>
							{personalInfo.role}
						</motion.p>

						{/* Description */}
						<motion.p
							variants={itemVariants}
							className="mb-8 max-w-lg text-base leading-relaxed text-[var(--text-secondary)] lg:max-w-xl"
						>
							{personalInfo.tagline}
						</motion.p>

						{/* CTA Buttons */}
						<motion.div variants={itemVariants} className="mb-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
							<a
								href="#projects"
								className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-8 py-3.5 text-sm font-medium text-white shadow-[0_4px_20px_rgba(79,70,229,0.4)] transition-all hover:shadow-[0_6px_30px_rgba(79,70,229,0.5)] hover:scale-[1.02]"
							>
								View My Work
								<span>→</span>
							</a>
							<a
								href="#contact"
								className="inline-flex items-center rounded-full border border-[var(--card-border)] bg-[var(--card)] px-8 py-3.5 text-sm font-medium text-[var(--text-primary)] backdrop-blur-sm transition-all hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(79,70,229,0.1)]"
							>
								Get In Touch
							</a>
						</motion.div>

						{/* Social Icons */}
						<motion.div variants={itemVariants} className="flex items-center justify-center gap-4 lg:justify-start">
							{socials.map((social) => (
								<a
									key={social.name}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Visit ${social.name} profile`}
									className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--card-border)] text-[var(--text-muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_15px_rgba(79,70,229,0.15)]"
								>
									<SocialIcon platform={social.name} size={18} />
								</a>
							))}
						</motion.div>
					</div>

					{/* RIGHT SIDE - Profile Image */}
					<motion.div
						variants={itemVariants}
						className="relative flex-shrink-0"
					>
						<div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
							{/* Glow behind */}
							<div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-[#4F46E5]/30 to-[#7C3AED]/30 blur-3xl" />
							{/* Gradient border container */}
							<div
								className="relative h-full w-full overflow-hidden rounded-3xl p-[3px]"
								style={{
									background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
								}}
							>
								<div className="h-full w-full overflow-hidden rounded-[calc(1.5rem-3px)] bg-[var(--background-secondary)]">
									<Image
										src={personalInfo.profileImage}
										alt={`Profile photo of ${personalInfo.name}`}
										width={400}
										height={400}
										priority
										className="h-full w-full object-cover"
									/>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>

				{/* Stats Row - Below Hero */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
				>
					{personalInfo.stats.map((stat) => (
						<motion.div
							key={stat.label}
							variants={itemVariants}
							className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 text-center backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
						>
							<div className="mb-1 text-2xl font-bold text-[var(--accent)] md:text-3xl">
								<AnimatedCounter value={stat.value} />
							</div>
							<div className="text-xs text-[var(--text-muted)]">{stat.suffix}</div>
							<div className="mt-1 text-sm text-[var(--text-secondary)]">{stat.label}</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
