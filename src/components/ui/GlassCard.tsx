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
				whileHover={{ y: -6, boxShadow: '0 0 40px rgba(59, 130, 246, 0.15), 0 0 80px rgba(139, 92, 246, 0.08)' }}
				transition={{ duration: 0.25 }}
				className={`rounded-2xl border border-white/15 bg-white/[0.03] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-lg ${className}`}
			>
				{children}
			</motion.div>
		);
	}

	return (
		<div className={`rounded-2xl border border-white/15 bg-white/[0.03] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-lg ${className}`}>
			{children}
		</div>
	);
}
