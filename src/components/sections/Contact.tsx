'use client';

import { useState } from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon, CheckCircleIcon, AlertCircleIcon, ArrowUpRightIcon } from 'lucide-react';
import { contact } from '@/data/contact';
import { socials } from '@/data/socials';
import SocialIcon from '@/components/ui/SocialIcon';
import SectionTitle from '@/components/ui/SectionTitle';
import MotionWrapper from '@/components/ui/MotionWrapper';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
	const [formData, setFormData] = useState({ name: '', email: '', message: '' });
	const [status, setStatus] = useState<FormStatus>('idle');
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus('sending');
		setErrorMessage('');

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const data = await response.json() as { error: string };
				throw new Error(data.error || 'Failed to send message');
			}

			setStatus('success');
			setFormData({ name: '', email: '', message: '' });
		} catch (err) {
			setStatus('error');
			setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<section id="contact" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
			<div className="container-width">
				<SectionTitle title="Get In Touch" subtitle="Have a project in mind or want to discuss opportunities? Let's talk." />

				<div className="mx-auto max-w-4xl">
					<MotionWrapper>
						<div className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
							<div className="grid md:grid-cols-5">
								{/* Left Panel */}
								<div className="relative flex flex-col justify-between bg-[var(--background-secondary)] p-8 md:col-span-2">
									<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(79,70,229,0.05)_0%,_transparent_70%)]" />

									<div className="relative">
										<h3 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">Let&apos;s work together</h3>
										<p className="mb-8 text-sm leading-relaxed text-[var(--text-muted)]">
											I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of something great.
										</p>

										<div className="space-y-5">
											<a
												href={`mailto:${contact.email}`}
												className="group flex items-center gap-3 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
											>
												<span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--card-border)] text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)]/10">
													<MailIcon size={16} />
												</span>
												{contact.email}
											</a>

											<a
												href={`tel:${contact.phone}`}
												className="group flex items-center gap-3 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
											>
												<span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--card-border)] text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)]/10">
													<PhoneIcon size={16} />
												</span>
												{contact.phone}
											</a>

											<div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
												<span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--card-border)] text-[var(--accent)]">
													<MapPinIcon size={16} />
												</span>
												{contact.location}
											</div>
										</div>
									</div>

									{/* Social links */}
									<div className="relative mt-10 flex items-center gap-3">
										{socials.map((social) => (
											<a
												key={social.name}
												href={social.url}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`Visit ${social.name} profile`}
												className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--card-border)] text-[var(--text-muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
											>
												<SocialIcon platform={social.name} size={16} />
											</a>
										))}
									</div>
								</div>

								{/* Right Panel — Form */}
								<div className="p-8 md:col-span-3">
									<div className="mb-6 flex items-center justify-between">
										<h3 className="text-lg font-medium text-[var(--text-primary)]">Send a message</h3>
										<ArrowUpRightIcon size={18} className="text-[var(--accent)]" />
									</div>

									<form onSubmit={handleSubmit} className="space-y-5">
										<div className="grid gap-5 sm:grid-cols-2">
											<div>
												<label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Name</label>
												<input
													id="name"
													name="name"
													type="text"
													required
													value={formData.name}
													onChange={handleChange}
													placeholder="John Doe"
													className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20"
												/>
											</div>
											<div>
												<label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Email</label>
												<input
													id="email"
													name="email"
													type="email"
													required
													value={formData.email}
													onChange={handleChange}
													placeholder="john@example.com"
													className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20"
												/>
											</div>
										</div>

										<div>
											<label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Message</label>
											<textarea
												id="message"
												name="message"
												required
												rows={5}
												value={formData.message}
												onChange={handleChange}
												placeholder="Tell me about your project or opportunity..."
												className="w-full resize-none rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20"
											/>
										</div>

										<button
											type="submit"
											disabled={status === 'sending'}
											className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-[0_4px_20px_rgba(79,70,229,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
										>
											{status === 'sending' ? (
												<>
													<span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
													Sending...
												</>
											) : (
												<>
													<SendIcon size={15} />
													Send Message
												</>
											)}
										</button>

										{status === 'success' && (
											<div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-400">
												<CheckCircleIcon size={16} />
												Message sent! I&apos;ll get back to you soon.
											</div>
										)}

										{status === 'error' && (
											<div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
												<AlertCircleIcon size={16} />
												{errorMessage}
											</div>
										)}
									</form>
								</div>
							</div>
						</div>
					</MotionWrapper>
				</div>
			</div>
		</section>
	);
}
