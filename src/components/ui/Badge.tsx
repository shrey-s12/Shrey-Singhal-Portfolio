interface BadgeProps {
	text: string;
	variant?: 'default' | 'accent' | 'secondary';
}

export default function Badge({ text, variant = 'default' }: BadgeProps) {
	const variantStyles: Record<string, string> = {
		default: 'bg-[var(--background-secondary)] text-[var(--text-secondary)] border-[var(--card-border)]',
		accent: 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30',
		secondary: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/30',
	};

	return (
		<span
			className={`inline-block rounded-full border px-4 py-1.5 text-[13px] font-medium ${variantStyles[variant]}`}
		>
			{text}
		</span>
	);
}
