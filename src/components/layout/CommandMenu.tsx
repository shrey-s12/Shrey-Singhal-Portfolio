'use client';

import { useState } from 'react';
import { Dialog } from 'radix-ui';
import { SearchIcon } from 'lucide-react';
import CommandItem, { getCommandOptionId } from '@/components/ui/CommandItem';
import { useCommands, type Command } from '@/hooks/useCommands';
import { useCommandSearch } from '@/hooks/useCommandSearch';
import { useIsMacPlatform } from '@/hooks/useIsMacPlatform';
import { useModifierShortcut } from '@/hooks/useModifierShortcut';

const SHORTCUT_KEY = 'k';
// Matches tw-animate-css's default exit duration, so the dialog has released its scroll lock
const CLOSE_ANIMATION_MS = 150;
const LISTBOX_ID = 'command-menu-list';

function Kbd({ children }: { children: React.ReactNode }) {
	return (
		<kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-sans text-[11px] text-subtle">
			{children}
		</kbd>
	);
}

export default function CommandMenu() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const commands = useCommands();
	const { query, updateQuery, sections, activeIndex, activeCommand, setActiveIndex, moveActive } =
		useCommandSearch(commands);
	const modifierLabel = useIsMacPlatform() ? '⌘' : 'Ctrl';

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			updateQuery('');
		}
	};

	useModifierShortcut(SHORTCUT_KEY, () => handleOpenChange(!isOpen));

	const handleRunCommand = (command: Command) => {
		if (command.keepOpen) {
			command.run();
			return;
		}

		handleOpenChange(false);
		window.setTimeout(command.run, CLOSE_ANIMATION_MS);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();
			moveActive(event.key === 'ArrowDown' ? 1 : -1);
		} else if (event.key === 'Enter' && activeCommand) {
			event.preventDefault();
			handleRunCommand(activeCommand);
		}
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
			<Dialog.Trigger asChild>
				<button
					type="button"
					aria-label="Open command menu"
					className="hidden items-center gap-2 rounded-lg border border-border bg-surface/60 px-2.5 py-1.5 text-subtle transition-colors hover:border-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 lg:flex"
				>
					<SearchIcon size={14} />
					<Kbd>{modifierLabel} K</Kbd>
				</button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay
					data-lenis-prevent
					className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
				/>
				<Dialog.Content
					data-lenis-prevent
					aria-describedby={undefined}
					className="fixed top-[15vh] left-1/2 z-[101] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.6)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
				>
					<Dialog.Title className="sr-only">Command menu</Dialog.Title>

					<div className="flex items-center gap-3 border-b border-border px-4">
						<SearchIcon aria-hidden="true" size={16} className="shrink-0 text-subtle" />
						<input
							type="text"
							role="combobox"
							aria-expanded="true"
							aria-controls={LISTBOX_ID}
							aria-activedescendant={activeCommand ? getCommandOptionId(activeCommand.id) : undefined}
							aria-label="Search commands"
							placeholder="Type a command or search..."
							value={query}
							onChange={(event) => updateQuery(event.target.value)}
							onKeyDown={handleKeyDown}
							className="h-12 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
						/>
						<Kbd>Esc</Kbd>
					</div>

					<ul id={LISTBOX_ID} role="listbox" aria-label="Commands" className="max-h-80 overflow-y-auto p-2">
						{sections.map((section) => (
							<li key={section.group} role="presentation">
								<p className="px-3 pt-2 pb-1 text-[11px] font-medium tracking-wider text-subtle uppercase">
									{section.group}
								</p>
								<ul role="group" aria-label={section.group}>
									{section.items.map(({ command, index }) => (
										<CommandItem
											key={command.id}
											command={command}
											isActive={index === activeIndex}
											onSelect={handleRunCommand}
											onHover={() => setActiveIndex(index)}
										/>
									))}
								</ul>
							</li>
						))}
						{sections.length === 0 && (
							<li role="presentation" className="px-3 py-8 text-center text-sm text-subtle">
								No results for &ldquo;{query}&rdquo;
							</li>
						)}
					</ul>

					<div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-subtle">
						<span className="flex items-center gap-1.5">
							<Kbd>↑</Kbd>
							<Kbd>↓</Kbd>
							navigate
						</span>
						<span className="flex items-center gap-1.5">
							<Kbd>↵</Kbd>
							select
						</span>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
