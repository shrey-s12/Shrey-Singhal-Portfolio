'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GlassCardProps {
	children: React.ReactNode;
	className?: string;
	hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
	const prefersReducedMotion = useReducedMotion();

	if (hover && !prefersReducedMotion) {
		return (
			<motion.div
				whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
				transition={{ duration: 0.25 }}
				className={`rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.35)] ${className}`}
			>
				{children}
			</motion.div>
		);
	}

	return (
		<div className={`rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.35)] ${className}`}>
			{children}
		</div>
	);
}
