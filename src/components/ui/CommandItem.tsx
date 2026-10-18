import { CornerDownLeftIcon } from 'lucide-react';
import type { Command } from '@/hooks/useCommands';

export function getCommandOptionId(commandId: string): string {
	return `command-option-${commandId}`;
}

// Keeps the keyboard-highlighted option visible when the list scrolls
function scrollIntoViewIfNeeded(element: HTMLLIElement | null): void {
	element?.scrollIntoView({ block: 'nearest' });
}

interface CommandItemProps {
	command: Command;
	isActive: boolean;
	onSelect: (command: Command) => void;
	onHover: () => void;
}

export default function CommandItem({ command, isActive, onSelect, onHover }: CommandItemProps) {
	const stateStyles = isActive ? 'bg-accent/10 text-foreground' : 'text-muted';
	const iconStateStyles = isActive ? 'border-accent/40 text-accent' : 'border-border text-subtle';

	return (
		<li
			id={getCommandOptionId(command.id)}
			role="option"
			aria-selected={isActive}
			ref={isActive ? scrollIntoViewIfNeeded : undefined}
			onClick={() => onSelect(command)}
			onMouseMove={onHover}
			className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${stateStyles}`}
		>
			<span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border bg-background ${iconStateStyles}`}>
				{command.icon}
			</span>
			<span className="flex-1 truncate">{command.label}</span>
			{isActive && <CornerDownLeftIcon aria-hidden="true" size={14} className="text-subtle" />}
		</li>
	);
}
