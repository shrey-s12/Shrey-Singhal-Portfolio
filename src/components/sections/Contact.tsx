'use client';

import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { contact } from '@/data/contact';
import { socials } from '@/data/socials';
import SocialIcon from '@/components/ui/SocialIcon';
import SectionTitle from '@/components/ui/SectionTitle';
import MotionWrapper from '@/components/ui/MotionWrapper';

export default function Contact() {
	return (
		<section id="contact" className="py-12">
			<div className="container-width">
				<SectionTitle title="Get In Touch" subtitle="Let&apos;s connect and build something great" />

				<div className="mx-auto max-w-2xl">
					<MotionWrapper>
						<div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#111827] p-8 shadow-[0_0_30px_rgba(59,130,246,0.05)]">
							{/* Gradient border accent at top */}
							<div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-[#3B82F6] to-[#8B5CF6]" />

							<div className="space-y-5">
								{/* Email */}
								<a
									href={`mailto:${contact.email}`}
									className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-[#F9FAFB]/80 transition-all hover:border-[#3B82F6]/30 hover:text-[#3B82F6] hover:shadow-[0_0_15px_rgba(59,130,246,0.08)] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50"
								>
									<MailIcon size={20} className="shrink-0 text-[#3B82F6]" />
									<span className="text-sm">{contact.email}</span>
								</a>

								{/* Phone */}
								<a
									href={`tel:${contact.phone}`}
									className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-[#F9FAFB]/80 transition-all hover:border-[#3B82F6]/30 hover:text-[#3B82F6] hover:shadow-[0_0_15px_rgba(59,130,246,0.08)] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50"
								>
									<PhoneIcon size={20} className="shrink-0 text-[#3B82F6]" />
									<span className="text-sm">{contact.phone}</span>
								</a>

								{/* Location */}
								<div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-[#F9FAFB]/80">
									<MapPinIcon size={20} className="shrink-0 text-[#3B82F6]" />
									<span className="text-sm">{contact.location}</span>
								</div>
							</div>
						</div>
					</MotionWrapper>

					{/* Social Links */}
					<MotionWrapper delay={0.2}>
						<div className="mt-10 flex items-center justify-center gap-5">
							{socials.map((social) => (
								<a
									key={social.name}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Visit ${social.name} profile`}
									className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-[#F9FAFB]/70 transition-all hover:border-[#3B82F6]/50 hover:text-[#3B82F6] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50"
								>
									<SocialIcon platform={social.name} size={22} />
								</a>
							))}
						</div>
					</MotionWrapper>
				</div>
			</div>
		</section>
	);
}
