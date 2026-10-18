'use client';

import { useEffect, useEffectEvent } from 'react';

// Calls onTrigger when ⌘+key (macOS) or Ctrl+key (elsewhere) is pressed anywhere on the page
export function useModifierShortcut(key: string, onTrigger: () => void): void {
	const handleTrigger = useEffectEvent(onTrigger);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === key) {
				event.preventDefault();
				handleTrigger();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [key]);
}
