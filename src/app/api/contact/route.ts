import { Resend } from 'resend';
import { contact } from '@/data/contact';
import { escapeHtml } from '@/lib/escapeHtml';
import { CONTACT_HONEYPOT_FIELD, validateContactForm, type ContactFormData } from '@/lib/contactForm';

// Resend's shared test sender only delivers to the Resend account owner's address.
// Set CONTACT_FROM_EMAIL to an address on a domain verified in Resend to send from your own domain.
const DEFAULT_FROM_EMAIL = 'Portfolio Contact <onboarding@resend.dev>';

function errorResponse(message: string, status: number): Response {
	return Response.json({ error: message }, { status });
}

// Created per request so a missing key fails one request instead of the whole build
function getResendClient(): Resend | null {
	const apiKey = process.env.RESEND_API_KEY;
	return apiKey ? new Resend(apiKey) : null;
}

function isSpamSubmission(body: unknown): boolean {
	if (typeof body !== 'object' || body === null) {
		return false;
	}
	const honeypotValue = (body as Record<string, unknown>)[CONTACT_HONEYPOT_FIELD];
	return typeof honeypotValue === 'string' && honeypotValue.length > 0;
}

function buildEmailHtml({ name, email, message }: ContactFormData): string {
	return `
		<div style="font-family: sans-serif; max-width: 600px;">
			<h2 style="color: #3B82F6;">New Portfolio Contact</h2>
			<p><strong>Name:</strong> ${escapeHtml(name)}</p>
			<p><strong>Email:</strong> ${escapeHtml(email)}</p>
			<hr style="border: 1px solid #eee; margin: 16px 0;" />
			<p><strong>Message:</strong></p>
			<p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
		</div>
	`;
}

export async function POST(request: Request) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return errorResponse('Invalid request body.', 400);
	}

	// Pretend it worked so bots get no signal that they were caught
	if (isSpamSubmission(body)) {
		return Response.json({ success: true });
	}

	const validation = validateContactForm(body);
	if (!validation.isValid) {
		return errorResponse(validation.error, 400);
	}

	const resend = getResendClient();
	if (!resend) {
		console.error('Contact API error: RESEND_API_KEY is not set');
		return errorResponse('Email service is not configured. Please email me directly.', 500);
	}

	try {
		const { name, email } = validation.data;
		const { error } = await resend.emails.send({
			from: process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM_EMAIL,
			to: contact.email,
			replyTo: email,
			subject: `Portfolio Contact: ${name}`,
			html: buildEmailHtml(validation.data),
		});

		if (error) {
			console.error('Resend error:', error);
			return errorResponse('Failed to send email. Please try again.', 500);
		}

		return Response.json({ success: true });
	} catch (err) {
		console.error('Contact API error:', err);
		return errorResponse('Something went wrong. Please try again.', 500);
	}
}
