'use client';

import { useState } from 'react';
import { CONTACT_API_PATH, CONTACT_HONEYPOT_FIELD, type ContactFormData } from '@/lib/contactForm';

export type ContactFormStatus = 'idle' | 'sending' | 'success' | 'error';

type ContactFormFields = ContactFormData & { [CONTACT_HONEYPOT_FIELD]: string };

const EMPTY_FORM: ContactFormFields = { name: '', email: '', message: '', [CONTACT_HONEYPOT_FIELD]: '' };
const FALLBACK_ERROR_MESSAGE = 'Something went wrong. Please try again.';

export function useContactForm() {
	const [formData, setFormData] = useState<ContactFormFields>(EMPTY_FORM);
	const [status, setStatus] = useState<ContactFormStatus>('idle');
	const [errorMessage, setErrorMessage] = useState<string>('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setFormData((current) => ({ ...current, [name]: value }));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setStatus('sending');
		setErrorMessage('');

		try {
			const response = await fetch(CONTACT_API_PATH, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const data = (await response.json().catch(() => ({}))) as { error?: string };
				throw new Error(data.error || FALLBACK_ERROR_MESSAGE);
			}

			setStatus('success');
			setFormData(EMPTY_FORM);
		} catch (err) {
			setStatus('error');
			setErrorMessage(err instanceof Error ? err.message : FALLBACK_ERROR_MESSAGE);
		}
	};

	return { formData, status, errorMessage, handleChange, handleSubmit };
}
