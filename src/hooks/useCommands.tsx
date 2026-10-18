'use client';

import { useMemo } from 'react';
import { CheckIcon, CopyIcon, FileDownIcon, HashIcon, MailIcon } from 'lucide-react';
import { navLinks } from '@/data/navLinks';
import { personalInfo } from '@/data/personal';
import { socials } from '@/data/socials';
import { scrollToSection } from '@/lib/scroll';
import SocialIcon from '@/components/ui/SocialIcon';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

const COMMAND_ICON_SIZE = 16;

export type CommandGroup = 'Navigate' | 'Actions' | 'Socials';

export interface Command {
	id: string;
	label: string;
	group: CommandGroup;
	keywords: string[];
	icon: React.ReactNode;
	run: () => void;
	// Keeps the menu open after running, e.g. so "Copied" feedback stays visible
	keepOpen?: boolean;
}

function openInNewTab(url: string): void {
	window.open(url, '_blank', 'noopener,noreferrer');
}

function buildNavigateCommands(): Command[] {
	return navLinks.map((link) => ({
		id: `navigate-${link.href}`,
		label: link.name,
		group: 'Navigate',
		keywords: ['section', 'go to', 'jump'],
		icon: <HashIcon size={COMMAND_ICON_SIZE} />,
		run: () => scrollToSection(link.href.replace('#', '')),
	}));
}

function buildSocialCommands(): Command[] {
	return socials.map((social) => ({
		id: `social-${social.name}`,
		label: `Open ${social.name}`,
		group: 'Socials',
		keywords: ['profile', 'social', social.name],
		icon: <SocialIcon platform={social.name} size={COMMAND_ICON_SIZE} />,
		run: () => openInNewTab(social.url),
	}));
}

// Every command available in the ⌘K menu, in display order
export function useCommands(): Command[] {
	const { copiedText, copy } = useCopyToClipboard();
	const isEmailCopied = copiedText === personalInfo.email;

	return useMemo(() => {
		const actionCommands: Command[] = [
			{
				id: 'action-copy-email',
				label: isEmailCopied ? 'Email copied!' : 'Copy email address',
				group: 'Actions',
				// 'copy' keeps the item matching after its label switches to "Email copied!"
				keywords: ['copy', 'email', 'contact', 'clipboard', personalInfo.email],
				icon: isEmailCopied ? <CheckIcon size={COMMAND_ICON_SIZE} /> : <CopyIcon size={COMMAND_ICON_SIZE} />,
				run: () => copy(personalInfo.email),
				keepOpen: true,
			},
			{
				id: 'action-send-email',
				label: 'Send an email',
				group: 'Actions',
				keywords: ['copy', 'email', 'contact', 'mail', 'hire'],
				icon: <MailIcon size={COMMAND_ICON_SIZE} />,
				run: () => {
					window.location.href = `mailto:${personalInfo.email}`;
				},
			},
			{
				id: 'action-resume',
				label: 'View resume',
				group: 'Actions',
				keywords: ['cv', 'download', 'pdf', 'resume'],
				icon: <FileDownIcon size={COMMAND_ICON_SIZE} />,
				run: () => openInNewTab(personalInfo.resume),
			},
		];

		return [...buildNavigateCommands(), ...actionCommands, ...buildSocialCommands()];
	}, [copy, isEmailCopied]);
}
