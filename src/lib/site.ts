const LOCAL_SITE_URL = 'http://localhost:3000';

// Public URL of the site, used to build absolute links for social previews.
// Set NEXT_PUBLIC_SITE_URL for a custom domain; on Vercel the production URL is used automatically.
function resolveSiteUrl(): string {
	if (process.env.NEXT_PUBLIC_SITE_URL) {
		return process.env.NEXT_PUBLIC_SITE_URL;
	}
	if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
		return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
	}
	return LOCAL_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();
