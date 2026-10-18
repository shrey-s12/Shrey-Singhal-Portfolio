import { TECH_ICONS } from '@/data/techIcons';
import Badge from '@/components/ui/Badge';

interface TechBadgeProps {
	name: string;
	variant?: React.ComponentProps<typeof Badge>['variant'];
}

export default function TechBadge({ name, variant }: TechBadgeProps) {
	return <Badge text={name} variant={variant} icon={TECH_ICONS[name]} />;
}
