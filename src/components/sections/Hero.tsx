'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personal';
import { socials } from '@/data/socials';
import SocialIcon from '@/components/ui/SocialIcon';
import RotatingText from '@/components/ui/RotatingText';
import MagneticLink from '@/components/ui/MagneticLink';
import SpotlightGrid from '@/components/ui/SpotlightGrid';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Hero() {
	const prefersReducedMotion = useReducedMotion();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
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
		<section id="home" className="relative overflow-hidden" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
			<SpotlightGrid />

			<div className="container-width relative">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
				>
					{/* LEFT SIDE */}
					<div className="flex-1 text-center lg:text-left">
						{/* Current Role Badge */}
						<motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
							<span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
							<span className="text-sm font-medium text-accent">{personalInfo.availability}</span>
						</motion.div>

						{/* Hi I'm */}
						<motion.p variants={itemVariants} className="mb-2 text-base text-muted">
							Hi, I&apos;m
						</motion.p>

						{/* Name — HUGE purple gradient */}
						<motion.h1
							variants={itemVariants}
							className="mb-4 text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl lg:text-[80px]"
						>
							<span className="bg-linear-to-r from-accent via-secondary to-accent bg-clip-text text-transparent">
								{personalInfo.name}
							</span>
						</motion.h1>

						{/* Role */}
						<motion.h2
							variants={itemVariants}
							className="mb-4 text-lg font-bold text-foreground md:text-xl"
						>
							<RotatingText items={personalInfo.roles} />
						</motion.h2>

						{/* Description */}
						<motion.p
							variants={itemVariants}
							className="mb-8 max-w-md text-sm leading-relaxed text-muted lg:max-w-lg"
						>
							{personalInfo.tagline}
						</motion.p>

						{/* CTA Buttons */}
						<motion.div variants={itemVariants} className="mb-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
							<MagneticLink
								href={personalInfo.resume}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent to-secondary px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(59,130,246,0.4)] transition-shadow hover:shadow-[0_6px_30px_rgba(59,130,246,0.5)]"
							>
								Download Resume
								<span>↓</span>
							</MagneticLink>
							<MagneticLink
								href="#contact"
								className="inline-flex items-center rounded-full border border-border bg-surface px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent"
							>
								Get In Touch
							</MagneticLink>
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
									className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-subtle transition-all hover:border-accent hover:text-accent"
								>
									<SocialIcon platform={social.name} size={18} />
								</a>
							))}
						</motion.div>
					</div>

					{/* RIGHT SIDE — Profile Image */}
					<motion.div variants={itemVariants} className="relative flex-shrink-0">
						<div className="relative h-[280px] w-[280px] md:h-[380px] md:w-[380px]">
							{/* Gradient border container */}
							<div
								className="relative h-full w-full overflow-hidden rounded-2xl p-[3px]"
								style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-secondary))' }}
							>
								<div className="h-full w-full overflow-hidden rounded-[calc(1rem-3px)] bg-surface">
									<Image
										src={personalInfo.profileImage}
										alt={`Profile photo of ${personalInfo.name}`}
										width={380}
										height={380}
										priority
										className="h-full w-full object-cover"
									/>
								</div>
							</div>
							{/* Glow behind */}
							<div className="absolute -inset-4 -z-10 rounded-2xl bg-linear-to-br from-accent/20 to-secondary/20 blur-3xl" />
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
