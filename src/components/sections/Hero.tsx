'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personal';
import { socials } from '@/data/socials';
import SocialIcon from '@/components/ui/SocialIcon';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Hero() {
	const prefersReducedMotion = useReducedMotion();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: prefersReducedMotion ? 0 : 0.15,
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
		<section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20">
			{/* Animated gradient background */}
			{!prefersReducedMotion && (
				<motion.div
					className="absolute inset-0 -z-10"
					animate={{
						background: [
							'radial-gradient(circle at 30% 50%, rgba(59,130,246,0.12) 0%, transparent 50%)',
							'radial-gradient(circle at 70% 50%, rgba(139,92,246,0.12) 0%, transparent 50%)',
							'radial-gradient(circle at 30% 50%, rgba(59,130,246,0.12) 0%, transparent 50%)',
						],
					}}
					transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
				/>
			)}

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="container-width flex flex-col items-center gap-12 text-center"
			>
				{/* Profile Image */}
				<motion.div variants={itemVariants} className="relative">
					<div className="relative h-[250px] w-[250px] overflow-hidden rounded-full border-2 border-[#3B82F6]/30 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
						<Image
							src={personalInfo.profileImage}
							alt={`Profile photo of ${personalInfo.name}`}
							width={250}
							height={250}
							priority
							className="h-full w-full object-cover"
						/>
					</div>
					{!prefersReducedMotion && (
						<motion.div
							className="absolute -inset-3 -z-10 rounded-full bg-linear-to-br from-[#3B82F6]/25 to-[#8B5CF6]/25 blur-2xl"
							animate={{ scale: [1, 1.08, 1] }}
							transition={{ duration: 3, repeat: Infinity }}
						/>
					)}
				</motion.div>

				{/* Open to Work Indicator */}
				<motion.div variants={itemVariants} className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-2">
					<span className="relative flex h-2.5 w-2.5">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
						<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
					</span>
					<span className="text-sm text-green-400">{personalInfo.availability}</span>
				</motion.div>
				{/* Name */}
				<motion.h1
					variants={itemVariants}
					className="text-5xl font-extrabold md:text-7xl"
				>
					<span className="bg-linear-to-r from-[#3B82F6] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
						{personalInfo.name}
					</span>
				</motion.h1>

				{/* Role */}
				<motion.p
					variants={itemVariants}
					className="text-xl font-medium text-[#3B82F6] md:text-2xl"
				>
					{personalInfo.role}
				</motion.p>

				{/* Tagline */}
				<motion.p
					variants={itemVariants}
					className="max-w-xl text-base text-[#F9FAFB]/70 md:text-lg"
				>
					{personalInfo.tagline}
				</motion.p>

				{/* CTA Buttons */}
				<motion.div variants={itemVariants} className="mt-4 flex flex-wrap items-center justify-center gap-6">
					<a
						href="#projects"
						className="rounded-full bg-[#3B82F6] px-10 py-4 text-base font-medium text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all hover:bg-[#3B82F6]/80 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
					>
						View Projects
					</a>
					<a
						href={personalInfo.resume}
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-full border border-[#3B82F6]/50 px-10 py-4 text-base font-medium text-[#3B82F6] transition-all hover:bg-[#3B82F6]/10 hover:border-[#3B82F6]/70"
					>
						Download Resume
					</a>
					<a
						href="#contact"
						className="rounded-full border border-white/20 px-10 py-4 text-base font-medium text-[#F9FAFB] transition-all hover:bg-white/5 hover:border-white/30"
					>
						Contact Me
					</a>
				</motion.div>

				{/* Social Links */}
				<motion.div variants={itemVariants} className="flex items-center gap-5">
					{socials.map((social) => (
						<a
							key={social.name}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Visit ${social.name} profile`}
							className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-[#F9FAFB]/70 transition-all hover:border-[#3B82F6]/50 hover:text-[#3B82F6] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
						>
							<SocialIcon platform={social.name} size={20} />
						</a>
					))}
				</motion.div>
			</motion.div>
		</section>
	);
}
