'use client';

import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]): string {
	const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

	useEffect(() => {
		if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
			return;
		}

		const observers: IntersectionObserver[] = [];

		const handleIntersect = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry: IntersectionObserverEntry) => {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id);
				}
			});
		};

		const observer = new IntersectionObserver(handleIntersect, {
			rootMargin: '-80px 0px -60% 0px',
			threshold: 0,
		});

		sectionIds.forEach((id: string) => {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		});

		observers.push(observer);

		return () => {
			observers.forEach((obs: IntersectionObserver) => obs.disconnect());
		};
	}, [sectionIds]);

	return activeSection;
}
