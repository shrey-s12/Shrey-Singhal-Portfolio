'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useRotatingIndex } from '@/hooks/useRotatingIndex';

const DEFAULT_INTERVAL_MS = 2800;

interface RotatingTextProps {
	items: string[];
	intervalMs?: number;
}

export default function RotatingText({ items, intervalMs = DEFAULT_INTERVAL_MS }: RotatingTextProps) {
	const prefersReducedMotion = useReducedMotion();
	const index = useRotatingIndex(items.length, intervalMs, prefersReducedMotion);

	return (
		<>
			{/* Screen readers get the full list once instead of a constantly changing line */}
			<span className="sr-only">{items.join(', ')}</span>

			<span aria-hidden="true" className="block overflow-hidden">
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={items[index]}
						initial={{ y: '100%', opacity: 0 }}
						animate={{ y: '0%', opacity: 1 }}
						exit={{ y: '-100%', opacity: 0 }}
						transition={{ duration: 0.35, ease: 'easeOut' }}
						className="block"
					>
						{items[index]}
					</motion.span>
				</AnimatePresence>
			</span>
		</>
	);
}
