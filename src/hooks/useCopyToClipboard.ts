'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const COPIED_RESET_MS = 2000;

interface CopyToClipboard {
	copiedText: string | null;
	copy: (text: string) => Promise<void>;
}

// copiedText holds the last copied value for a short while, so the UI can confirm the copy
export function useCopyToClipboard(): CopyToClipboard {
	const [copiedText, setCopiedText] = useState<string | null>(null);
	const resetTimeoutRef = useRef<number | undefined>(undefined);

	const copy = useCallback(async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			window.clearTimeout(resetTimeoutRef.current);
			resetTimeoutRef.current = window.setTimeout(() => setCopiedText(null), COPIED_RESET_MS);
		} catch {
			setCopiedText(null);
		}
	}, []);

	// Don't let a pending reset fire after unmount
	useEffect(() => () => window.clearTimeout(resetTimeoutRef.current), []);

	return { copiedText, copy };
}
