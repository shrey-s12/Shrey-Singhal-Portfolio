const DEFAULT_DURATION_SECONDS = 40;

// Fades the row out at both edges so items glide in and out instead of being cut off
const EDGE_FADE_STYLE: React.CSSProperties = {
	maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
	WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
};

// Animation, pause-on-hover, and the reduced-motion fallback (a static, wrapped list)
const TRACK_CLASSES =
	'flex shrink-0 items-center gap-4 pr-4 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:animate-none motion-reduce:pr-0';

interface MarqueeProps {
	children: React.ReactNode;
	// Scrolls left-to-right instead of right-to-left
	reverse?: boolean;
	durationSeconds?: number;
	ariaLabel: string;
}

// Infinite scrolling row. The content is rendered twice so the loop is seamless:
// both copies move left by their own width, and the second takes the first's place.
export default function Marquee({
	children,
	reverse = false,
	durationSeconds = DEFAULT_DURATION_SECONDS,
	ariaLabel,
}: MarqueeProps) {
	const trackStyle = {
		'--marquee-duration': `${durationSeconds}s`,
		animationDirection: reverse ? 'reverse' : 'normal',
	} as React.CSSProperties;

	return (
		<div className="group flex overflow-hidden py-2" style={EDGE_FADE_STYLE}>
			<ul aria-label={ariaLabel} className={TRACK_CLASSES} style={trackStyle}>
				{children}
			</ul>
			<ul aria-hidden="true" className={`${TRACK_CLASSES} motion-reduce:hidden`} style={trackStyle}>
				{children}
			</ul>
		</div>
	);
}
