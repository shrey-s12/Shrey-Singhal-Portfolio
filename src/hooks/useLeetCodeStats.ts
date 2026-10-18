'use client';

import { useEffect, useState } from 'react';
import type { LeetCodeStats } from '@/data/types';
import { getFallbackLeetCodeStats } from '@/lib/leetcodeFallback';

const LEETCODE_API_PATH = '/api/leetcode';

// stats is null while loading, then always holds data (live, or the static fallback on failure)
export function useLeetCodeStats(): LeetCodeStats | null {
	const [stats, setStats] = useState<LeetCodeStats | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		async function loadStats() {
			try {
				const response = await fetch(LEETCODE_API_PATH, { signal: controller.signal });
				if (!response.ok) {
					throw new Error(`LeetCode stats request failed: ${response.status}`);
				}
				setStats((await response.json()) as LeetCodeStats);
			} catch {
				if (!controller.signal.aborted) {
					setStats(getFallbackLeetCodeStats());
				}
			}
		}

		loadStats();
		return () => controller.abort();
	}, []);

	return stats;
}
