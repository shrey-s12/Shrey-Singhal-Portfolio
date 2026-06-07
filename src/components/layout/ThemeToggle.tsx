'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<button
				className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card)] transition-all"
				aria-label="Toggle theme"
			>
				<div className="h-5 w-5" />
			</button>
		);
	}

	return (
		<button
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card)] transition-all hover:border-[var(--accent)] hover:shadow-[0_0_15px_rgba(79,70,229,0.15)]"
			aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
		>
			{theme === 'dark' ? (
				<SunIcon size={18} className="text-[var(--text-secondary)] transition-transform duration-300" />
			) : (
				<MoonIcon size={18} className="text-[var(--text-secondary)] transition-transform duration-300" />
			)}
		</button>
	);
}
