import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { personalInfo } from '@/data/personal';

export const alt = `${personalInfo.name} — ${personalInfo.availability}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Image generation can't read CSS variables, so these mirror the tokens in globals.css
const COLORS = {
	background: '#0b0f19',
	border: '#1e293b',
	foreground: '#f9fafb',
	muted: '#94a3b8',
	accent: '#3b82f6',
	secondary: '#8b5cf6',
};

const FONT_DIR = join(process.cwd(), 'src/assets/fonts');
const FONT_FAMILY = 'Geist';

const FEATURED_TECH = ['Node.js', 'NestJS', 'TypeScript', 'MongoDB', 'Redis', 'React'];

export default async function OpengraphImage() {
	const [geistRegular, geistExtraBold] = await Promise.all([
		readFile(join(FONT_DIR, 'Geist-400.ttf')),
		readFile(join(FONT_DIR, 'Geist-800.ttf')),
	]);

	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: '0 88px',
					backgroundColor: COLORS.background,
					backgroundImage: `radial-gradient(circle at 85% 15%, ${COLORS.secondary}33, transparent 45%), radial-gradient(circle at 10% 90%, ${COLORS.accent}33, transparent 45%)`,
					color: COLORS.foreground,
					fontFamily: FONT_FAMILY,
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						alignSelf: 'flex-start',
						padding: '10px 22px',
						borderRadius: 999,
						border: `1px solid ${COLORS.accent}55`,
						backgroundColor: `${COLORS.accent}1a`,
						color: COLORS.accent,
						fontSize: 26,
					}}
				>
					<div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: COLORS.accent }} />
					{personalInfo.availability}
				</div>

				<div
					style={{
						display: 'flex',
						marginTop: 36,
						fontSize: 104,
						fontWeight: 800,
						letterSpacing: -3,
						backgroundImage: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.secondary})`,
						backgroundClip: 'text',
						color: 'transparent',
					}}
				>
					{personalInfo.name}
				</div>

				<div style={{ display: 'flex', marginTop: 12, fontSize: 36, color: COLORS.muted }}>
					{personalInfo.tagline}
				</div>

				<div style={{ display: 'flex', gap: 14, marginTop: 56 }}>
					{FEATURED_TECH.map((tech) => (
						<div
							key={tech}
							style={{
								display: 'flex',
								padding: '8px 20px',
								borderRadius: 999,
								border: `1px solid ${COLORS.border}`,
								backgroundColor: '#ffffff0d',
								fontSize: 24,
							}}
						>
							{tech}
						</div>
					))}
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{ name: FONT_FAMILY, data: geistRegular, weight: 400, style: 'normal' },
				{ name: FONT_FAMILY, data: geistExtraBold, weight: 800, style: 'normal' },
			],
		}
	);
}
