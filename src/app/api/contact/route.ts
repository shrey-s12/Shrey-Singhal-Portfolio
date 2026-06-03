import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
	name: string;
	email: string;
	message: string;
}

export async function POST(request: Request) {
	try {
		const body: ContactFormData = await request.json();
		const { name, email, message } = body;

		// Validate
		if (!name || !email || !message) {
			return Response.json(
				{ error: 'Name, email, and message are required.' },
				{ status: 400 }
			);
		}

		// Send email via Resend
		const { error } = await resend.emails.send({
			from: 'Portfolio Contact <onboarding@resend.dev>',
			to: 'shreynbd@gmail.com',
			replyTo: email,
			subject: `Portfolio Contact: ${name}`,
			html: `
				<div style="font-family: sans-serif; max-width: 600px;">
					<h2 style="color: #3B82F6;">New Portfolio Contact</h2>
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Email:</strong> ${email}</p>
					<hr style="border: 1px solid #eee; margin: 16px 0;" />
					<p><strong>Message:</strong></p>
					<p style="white-space: pre-wrap;">${message}</p>
				</div>
			`,
		});

		if (error) {
			console.error('Resend error:', error);
			return Response.json(
				{ error: 'Failed to send email. Please try again.' },
				{ status: 500 }
			);
		}

		return Response.json({ success: true });
	} catch (err) {
		console.error('Contact API error:', err);
		return Response.json(
			{ error: 'Something went wrong. Please try again.' },
			{ status: 500 }
		);
	}
}
