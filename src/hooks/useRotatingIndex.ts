'use client';

import { useEffect, useState } from 'react';

export function useRotatingIndex(length: number, intervalMs: number, paused = false): number {
	const [index, setIndex] = useState<number>(0);

	useEffect(() => {
		if (paused || length <= 1) {
			return;
		}

		const intervalId = window.setInterval(() => {
			setIndex((current: number) => (current + 1) % length);
		}, intervalMs);

		return () => window.clearInterval(intervalId);
	}, [length, intervalMs, paused]);

	return index;
}
