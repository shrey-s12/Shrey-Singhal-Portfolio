'use client';

import { MailIcon, PhoneIcon, MapPinIcon, SendIcon, CheckCircleIcon, AlertCircleIcon, ArrowUpRightIcon } from 'lucide-react';
import { contact } from '@/data/contact';
import { socials } from '@/data/socials';
import SocialIcon from '@/components/ui/SocialIcon';
import SectionTitle from '@/components/ui/SectionTitle';
import MotionWrapper from '@/components/ui/MotionWrapper';
import { useContactForm } from '@/hooks/useContactForm';
import { CONTACT_FIELD_LIMITS, CONTACT_HONEYPOT_FIELD } from '@/lib/contactForm';

export default function Contact() {
	const { formData, status, errorMessage, handleChange, handleSubmit } = useContactForm();

	return (
		<section id="contact" className="py-8">
			<div className="container-width">
				<SectionTitle title="Get In Touch" subtitle="Have a project in mind or want to discuss opportunities? Let's talk." />

				<div className="mx-auto max-w-4xl">
					<MotionWrapper>
						<div className="overflow-hidden rounded-xl border border-border bg-surface">
							<div className="grid md:grid-cols-5">
								{/* Left Panel — Dark accent background */}
								<div className="relative flex flex-col justify-between bg-background p-8 md:col-span-2">
									{/* Subtle gradient overlay */}
									<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.05)_0%,_transparent_70%)]" />

									<div className="relative">
										<h3 className="mb-2 text-xl font-semibold text-foreground">Let&apos;s work together</h3>
										<p className="mb-8 text-sm leading-relaxed text-subtle">
											I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of something great.
										</p>

										<div className="space-y-5">
											<a
												href={`mailto:${contact.email}`}
												className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
											>
												<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-border text-accent transition-colors group-hover:bg-accent/10">
													<MailIcon size={16} />
												</span>
												{contact.email}
											</a>

											<a
												href={`tel:${contact.phone}`}
												className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
											>
												<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-border text-accent transition-colors group-hover:bg-accent/10">
													<PhoneIcon size={16} />
												</span>
												{contact.phone}
											</a>

											<div className="flex items-center gap-3 text-sm text-muted">
												<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-border text-accent">
													<MapPinIcon size={16} />
												</span>
												{contact.location}
											</div>
										</div>
									</div>

									{/* Social links at bottom */}
									<div className="relative mt-10 flex items-center gap-3">
										{socials.map((social) => (
											<a
												key={social.name}
												href={social.url}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`Visit ${social.name} profile`}
												className="flex h-9 w-9 items-center justify-center rounded-lg bg-border text-subtle transition-all hover:bg-accent/10 hover:text-accent"
											>
												<SocialIcon platform={social.name} size={16} />
											</a>
										))}
									</div>
								</div>

								{/* Right Panel — Form */}
								<div className="p-8 md:col-span-3">
									<div className="mb-6 flex items-center justify-between">
										<h3 className="text-lg font-medium text-foreground">Send a message</h3>
										<ArrowUpRightIcon size={18} className="text-accent" />
									</div>

									<form onSubmit={handleSubmit} className="space-y-5">
										{/* Honeypot: hidden from people, filled in by bots */}
										<input
											type="text"
											name={CONTACT_HONEYPOT_FIELD}
											value={formData[CONTACT_HONEYPOT_FIELD]}
											onChange={handleChange}
											tabIndex={-1}
											autoComplete="off"
											aria-hidden="true"
											className="hidden"
										/>
										<div className="grid gap-5 sm:grid-cols-2">
											<div>
												<label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-subtle">Name</label>
												<input
													id="name"
													name="name"
													type="text"
													required
													maxLength={CONTACT_FIELD_LIMITS.name}
													value={formData.name}
													onChange={handleChange}
													placeholder="John Doe"
													className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-border-strong outline-none transition-all focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
												/>
											</div>
											<div>
												<label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-subtle">Email</label>
												<input
													id="email"
													name="email"
													type="email"
													required
													maxLength={CONTACT_FIELD_LIMITS.email}
													value={formData.email}
													onChange={handleChange}
													placeholder="john@example.com"
													className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-border-strong outline-none transition-all focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
												/>
											</div>
										</div>

										<div>
											<label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-subtle">Message</label>
											<textarea
												id="message"
												name="message"
												required
												rows={5}
												maxLength={CONTACT_FIELD_LIMITS.message}
												value={formData.message}
												onChange={handleChange}
												placeholder="Tell me about your project or opportunity..."
												className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-border-strong outline-none transition-all focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
											/>
										</div>

										<button
											type="submit"
											disabled={status === 'sending'}
											className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
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
