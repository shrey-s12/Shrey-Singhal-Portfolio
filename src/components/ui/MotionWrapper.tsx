'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MotionWrapperProps {
	children: React.ReactNode;
	delay?: number;
	className?: string;
}

export default function MotionWrapper({ children, delay = 0, className = '' }: MotionWrapperProps) {
	const prefersReducedMotion = useReducedMotion();

	if (prefersReducedMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.5, delay, ease: 'easeOut' }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
