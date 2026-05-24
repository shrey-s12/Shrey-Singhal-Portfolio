interface BadgeProps {
	text: string;
	variant?: 'default' | 'accent' | 'secondary';
}

export default function Badge({ text, variant = 'default' }: BadgeProps) {
	const variantStyles: Record<string, string> = {
		default: 'bg-white/10 text-[#F9FAFB] border-white/10',
		accent: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30',
		secondary: 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/30',
	};

	return (
		<span
			className={`inline-block rounded-full border px-4 py-1.5 text-[13px] font-medium ${variantStyles[variant]}`}
		>
			{text}
		</span>
	);
}
