'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Command, CommandGroup } from '@/hooks/useCommands';

export interface IndexedCommand {
	command: Command;
	// Position in the flat result list, used for keyboard navigation across groups
	index: number;
}

export interface CommandSection {
	group: CommandGroup;
	items: IndexedCommand[];
}

function matchesQuery(command: Command, normalizedQuery: string): boolean {
	if (!normalizedQuery) {
		return true;
	}

	return [command.label, command.group, ...command.keywords].some((term) =>
		term.toLowerCase().includes(normalizedQuery)
	);
}

// Commands arrive already ordered by group, so consecutive commands share a section
function groupIntoSections(results: Command[]): CommandSection[] {
	const sections: CommandSection[] = [];

	results.forEach((command, index) => {
		const lastSection = sections[sections.length - 1];
		if (lastSection?.group === command.group) {
			lastSection.items.push({ command, index });
		} else {
			sections.push({ group: command.group, items: [{ command, index }] });
		}
	});

	return sections;
}

export function useCommandSearch(commands: Command[]) {
	const [query, setQuery] = useState<string>('');
	const [activeIndex, setActiveIndex] = useState<number>(0);

	const results = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		return commands.filter((command) => matchesQuery(command, normalizedQuery));
	}, [commands, query]);

	const sections = useMemo(() => groupIntoSections(results), [results]);

	const resultCount = results.length;
	const clampedActiveIndex = Math.min(activeIndex, Math.max(resultCount - 1, 0));
	const activeCommand: Command | undefined = results[clampedActiveIndex];

	const updateQuery = useCallback((value: string) => {
		setQuery(value);
		setActiveIndex(0);
	}, []);

	const moveActive = (step: 1 | -1) => {
		if (resultCount === 0) {
			return;
		}
		setActiveIndex((clampedActiveIndex + step + resultCount) % resultCount);
	};

	return {
		query,
		updateQuery,
		sections,
		activeIndex: clampedActiveIndex,
		activeCommand,
		setActiveIndex,
		moveActive,
	};
}
