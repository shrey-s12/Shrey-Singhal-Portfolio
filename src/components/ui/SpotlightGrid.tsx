'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const GRID_CELL_PX = 48;
const SPOTLIGHT_RADIUS_PX = 360;
// Start off-screen so nothing is lit until the cursor moves
const HIDDEN_POSITION_PX = -9999;

function gridLines(color: string): React.CSSProperties {
	return {
		backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
		backgroundSize: `${GRID_CELL_PX}px ${GRID_CELL_PX}px`,
	};
}

const BASE_GRID_STYLE: React.CSSProperties = {
	...gridLines('rgba(255, 255, 255, 0.035)'),
	maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
};

const LIT_GRID_STYLE = gridLines('color-mix(in srgb, var(--color-accent) 45%, transparent)');

// Fades every layer out towards the bottom so the grid never ends in a hard edge
const CONTAINER_FADE_STYLE: React.CSSProperties = {
	maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
	WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)',
};

export default function SpotlightGrid() {
	const prefersReducedMotion = useReducedMotion();
	const containerRef = useRef<HTMLDivElement>(null);
	const pointerX = useMotionValue(HIDDEN_POSITION_PX);
	const pointerY = useMotionValue(HIDDEN_POSITION_PX);

	const spotlightMask = useMotionTemplate`radial-gradient(${SPOTLIGHT_RADIUS_PX}px circle at ${pointerX}px ${pointerY}px, black, transparent 70%)`;
	const spotlightGlow = useMotionTemplate`radial-gradient(${SPOTLIGHT_RADIUS_PX}px circle at ${pointerX}px ${pointerY}px, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 70%)`;

	// Track the cursor on window so the spotlight follows it over the Hero's content too
	useEffect(() => {
		if (prefersReducedMotion) {
			return;
		}

		const handlePointerMove = (event: PointerEvent) => {
			const rect = containerRef.current?.getBoundingClientRect();
			if (!rect) {
				return;
			}

			pointerX.set(event.clientX - rect.left);
			pointerY.set(event.clientY - rect.top);
		};

		window.addEventListener('pointermove', handlePointerMove, { passive: true });
		return () => window.removeEventListener('pointermove', handlePointerMove);
	}, [prefersReducedMotion, pointerX, pointerY]);

	return (
		<div ref={containerRef} aria-hidden="true" className="pointer-events-none absolute inset-0" style={CONTAINER_FADE_STYLE}>
			<div className="absolute inset-0" style={BASE_GRID_STYLE} />
			{!prefersReducedMotion && (
				<>
					<motion.div
						className="absolute inset-0"
						style={{ ...LIT_GRID_STYLE, maskImage: spotlightMask, WebkitMaskImage: spotlightMask }}
					/>
					<motion.div className="absolute inset-0" style={{ background: spotlightGlow }} />
				</>
			)}
		</div>
	);
}
