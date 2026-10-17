'use client';

import { useSyncExternalStore } from 'react';

const MAC_PLATFORM_PATTERN = /Mac|iPhone|iPad|iPod/i;

function subscribe(): () => void {
	// The platform never changes during a session, so there is nothing to subscribe to
	return () => {};
}

function getSnapshot(): boolean {
	return MAC_PLATFORM_PATTERN.test(navigator.userAgent);
}

function getServerSnapshot(): boolean {
	return true;
}

export function useIsMacPlatform(): boolean {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
