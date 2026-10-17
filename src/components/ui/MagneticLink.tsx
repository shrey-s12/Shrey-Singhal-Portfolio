'use client';

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// How far the link follows the cursor, as a fraction of the cursor's distance from its centre
const MAGNETIC_STRENGTH = 0.3;
const SPRING_CONFIG = { stiffness: 200, damping: 15, mass: 0.2 };

export default function MagneticLink({ children, style, ...props }: HTMLMotionProps<'a'>) {
	const prefersReducedMotion = useReducedMotion();
	const offsetX = useMotionValue(0);
	const offsetY = useMotionValue(0);
	const x = useSpring(offsetX, SPRING_CONFIG);
	const y = useSpring(offsetY, SPRING_CONFIG);

	const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
		if (prefersReducedMotion || event.pointerType !== 'mouse') {
			return;
		}

		const rect = event.currentTarget.getBoundingClientRect();
		offsetX.set((event.clientX - (rect.left + rect.width / 2)) * MAGNETIC_STRENGTH);
		offsetY.set((event.clientY - (rect.top + rect.height / 2)) * MAGNETIC_STRENGTH);
	};

	const handlePointerLeave = () => {
		offsetX.set(0);
		offsetY.set(0);
	};

	return (
		<motion.a
			{...props}
			style={{ ...style, x, y }}
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
		>
			{children}
		</motion.a>
	);
}
