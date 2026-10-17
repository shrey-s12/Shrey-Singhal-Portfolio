'use client';

import { motion, useMotionTemplate, useMotionValue, type HTMLMotionProps } from 'framer-motion';

const GLOW_RADIUS_PX = 320;

type SpotlightCardProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
	children?: React.ReactNode;
};

// A card whose surface lights up softly around the cursor on hover.
// Accepts every motion.div prop, so it can replace an existing card element directly.
export default function SpotlightCard({ children, className = '', ...props }: SpotlightCardProps) {
	const pointerX = useMotionValue(0);
	const pointerY = useMotionValue(0);
	const glow = useMotionTemplate`radial-gradient(${GLOW_RADIUS_PX}px circle at ${pointerX}px ${pointerY}px, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 80%)`;

	const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		pointerX.set(event.clientX - rect.left);
		pointerY.set(event.clientY - rect.top);
	};

	return (
		<motion.div {...props} onPointerMove={handlePointerMove} className={`group relative ${className}`}>
			<motion.div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{ background: glow }}
			/>
			{children}
		</motion.div>
	);
}
