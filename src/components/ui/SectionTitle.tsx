interface SectionTitleProps {
	title: string;
	subtitle?: string;
	icon?: React.ReactNode;
}

export default function SectionTitle({ title, subtitle, icon }: SectionTitleProps) {
	return (
		<div className="mb-10">
			<div className="flex items-center gap-3">
				{icon && (
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
						{icon}
					</div>
				)}
				<h2 className="text-xl font-bold text-[var(--text-primary)]">{title}</h2>
			</div>
			{subtitle && (
				<p className="mt-2 text-sm text-[var(--text-secondary)]">{subtitle}</p>
			)}
		</div>
	);
}
