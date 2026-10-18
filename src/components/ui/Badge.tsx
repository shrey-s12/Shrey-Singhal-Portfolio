import type { IconType } from 'react-icons';

type BadgeVariant = 'default' | 'accent' | 'secondary';

const BADGE_ICON_SIZE = 14;

const VARIANT_STYLES: Record<BadgeVariant, string> = {
	default: 'bg-white/10 text-foreground border-white/10',
	accent: 'bg-accent/10 text-accent border-accent/30',
	secondary: 'bg-secondary/10 text-secondary border-secondary/30',
};

interface BadgeProps {
	text: string;
	variant?: BadgeVariant;
	icon?: IconType;
}

export default function Badge({ text, variant = 'default', icon: Icon }: BadgeProps) {
	return (
		<span
			className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[13px] font-medium ${VARIANT_STYLES[variant]}`}
		>
			{Icon && <Icon aria-hidden="true" size={BADGE_ICON_SIZE} className="shrink-0 opacity-80" />}
			{text}
		</span>
	);
}
