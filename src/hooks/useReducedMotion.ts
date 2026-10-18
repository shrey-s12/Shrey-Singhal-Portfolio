'use client';

import { useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void): () => void {
	const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
	mediaQuery.addEventListener('change', onChange);
	return () => mediaQuery.removeEventListener('change', onChange);
}

function getSnapshot(): boolean {
	return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// The server can't know the user's preference, so it renders the animated version
function getServerSnapshot(): boolean {
	return false;
}

export function useReducedMotion(): boolean {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
