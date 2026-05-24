'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
	children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		try {
			const lenis = new Lenis({
				smoothWheel: true,
				lerp: 0.08,
			});

			lenisRef.current = lenis;

			function raf(time: number) {
				lenis.raf(time);
				requestAnimationFrame(raf);
			}

			requestAnimationFrame(raf);

			return () => {
				lenis.destroy();
				lenisRef.current = null;
			};
		} catch {
			// Falls back to native scroll if Lenis fails
		}
	}, []);

	return <>{children}</>;
}
