interface SectionTitleProps {
	title: string;
	subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
	return (
		<div className="mb-12 text-center">
			<h2 className="mb-4 text-3xl font-bold md:text-4xl">
				<span className="bg-linear-to-r from-accent to-secondary bg-clip-text text-transparent">
					{title}
				</span>
			</h2>
			{subtitle && (
				<p className="mx-auto max-w-2xl text-base text-foreground/60">{subtitle}</p>
			)}
		</div>
	);
}
