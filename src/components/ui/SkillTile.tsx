import { TECH_ICONS } from '@/data/techIcons';

const TILE_ICON_SIZE = 20;

interface SkillTileProps {
	name: string;
}

// A logo + name tile used in the scrolling skills marquee
export default function SkillTile({ name }: SkillTileProps) {
	const Icon = TECH_ICONS[name];

	return (
		<li className="flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-surface/80 px-5 py-3 text-sm font-medium whitespace-nowrap text-foreground/80 transition-colors hover:border-accent/40 hover:text-foreground">
			{Icon && <Icon aria-hidden="true" size={TILE_ICON_SIZE} className="text-muted" />}
			{name}
		</li>
	);
}
