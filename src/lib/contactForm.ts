// Shared by the contact form (client) and /api/contact (server), so both enforce the same rules

export const CONTACT_API_PATH = '/api/contact';

export const CONTACT_FIELD_LIMITS = {
	name: 100,
	email: 254,
	message: 5000,
} as const;

// Hidden field that people never see but spam bots tend to fill in
export const CONTACT_HONEYPOT_FIELD = 'website';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactFormData {
	name: string;
	email: string;
	message: string;
}

export type ContactValidationResult =
	| { isValid: true; data: ContactFormData }
	| { isValid: false; error: string };

function readTrimmedString(source: Record<string, unknown>, key: keyof ContactFormData): string {
	const value = source[key];
	return typeof value === 'string' ? value.trim() : '';
}

export function validateContactForm(input: unknown): ContactValidationResult {
	const source = typeof input === 'object' && input !== null ? (input as Record<string, unknown>) : {};
	const data: ContactFormData = {
		name: readTrimmedString(source, 'name'),
		email: readTrimmedString(source, 'email'),
		message: readTrimmedString(source, 'message'),
	};

	if (!data.name || !data.email || !data.message) {
		return { isValid: false, error: 'Name, email, and message are required.' };
	}

	if (!EMAIL_PATTERN.test(data.email)) {
		return { isValid: false, error: 'Please enter a valid email address.' };
	}

	const tooLongField = (Object.keys(CONTACT_FIELD_LIMITS) as Array<keyof ContactFormData>).find(
		(field) => data[field].length > CONTACT_FIELD_LIMITS[field]
	);
	if (tooLongField) {
		return {
			isValid: false,
			error: `${tooLongField[0].toUpperCase()}${tooLongField.slice(1)} must be ${CONTACT_FIELD_LIMITS[tooLongField]} characters or fewer.`,
		};
	}

	return { isValid: true, data };
}
