'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedCounterProps {
	value: string;
	duration?: number;
}

export default function AnimatedCounter({ value, duration = 1.5 }: AnimatedCounterProps) {
	const prefersReducedMotion = useReducedMotion();
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.5 });

	// Parse numeric portion and suffix
	const numericMatch = value.match(/^(\d+)/);
	const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : 0;
	const suffix = value.replace(/^\d+/, '');

	const motionValue = useMotionValue(0);
	const springValue = useSpring(motionValue, {
		duration: duration * 1000,
		bounce: 0,
	});

	useEffect(() => {
		if (isInView && !prefersReducedMotion) {
			motionValue.set(numericValue);
		} else if (prefersReducedMotion) {
			motionValue.jump(numericValue);
		}
	}, [isInView, numericValue, motionValue, prefersReducedMotion]);

	useEffect(() => {
		const unsubscribe = springValue.on('change', (latest: number) => {
			if (ref.current) {
				ref.current.textContent = `${Math.round(latest)}${suffix}`;
			}
		});

		return () => unsubscribe();
	}, [springValue, suffix]);

	if (prefersReducedMotion) {
		return <span ref={ref}>{value}</span>;
	}

	return (
		<motion.span ref={ref}>
			0{suffix}
		</motion.span>
	);
}
