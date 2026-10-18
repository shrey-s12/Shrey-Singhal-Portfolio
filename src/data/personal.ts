// src/data/personal.ts

import type { PersonalInfo } from '@/data/types';

export const personalInfo: PersonalInfo = {
	name: 'Shrey Singhal',

	shortName: 'Shrey',

	role: 'Full Stack Engineer',

	// Cycled through in the Hero
	roles: ['Software Development Engineer', 'Full Stack Engineer', 'Frontend Engineer', 'Backend Engineer'],

	tagline: 'Crafting fast, polished interfaces, backed by systems that scale.',

	introduction:
		'Full-stack engineer who builds fast, accessible interfaces and the scalable APIs behind them.',

	description: `
		I'm a full-stack engineer with 1+ year of professional experience building production web applications, from polished interfaces to the APIs behind them.

		At GIVA, I work on the company's web application, built with Next.js and TypeScript. Before that, at AppSquadz, I built scalable backend systems with NestJS, Express.js, MongoDB, Redis, and SQL.

		That backend foundation shapes how I build frontends: I think about data flow, performance, and how every screen talks to the server.

		Outside of work, I've solved 650+ DSA problems on LeetCode across Arrays, Trees, Graphs, Dynamic Programming, and more.
	`,

	currentCompany: 'GIVA',

	location: 'Bengaluru, Karnataka, India',

	experience: '1+ Year',

	email: 'shreynbd@gmail.com',

	phone: '+91 8057260114',

	resume: '/resume/shrey-singhal-resume.pdf',

	profileImage: '/images/Shrey.png',

	availability: 'Software Development Engineer @ GIVA',

	focusAreas: [
		'Frontend Architecture',
		'React & Next.js',
		'TypeScript',
		'UI Performance',
		'Scalable APIs',
		'System Design',
	],

	stats: [
		{
			label: 'Experience',
			value: '1+',
			suffix: 'Year',
		},
		{
			label: 'DSA Problems',
			value: '650+',
			suffix: 'Solved',
		},
		{
			label: 'Projects',
			value: '10+',
			suffix: 'Major',
		},
		{
			label: 'Tech Stack',
			value: '15+',
			suffix: 'Technologies',
		},
	],

	highlights: [
		'Built scalable backend systems',
		'Implemented JWT & RBAC authentication',
		'Optimized API performance and SQL queries',
		'Focused on system design and scalability',
		'Strong problem-solving mindset',
	],

	currentlyLearning: [
		'System Design',
		'Distributed Systems',
		'Redis Caching',
		'Scalable Architecture',
		'Backend Performance Optimization',
	],

	seo: {
		title: 'Shrey Singhal | SDE | Full Stack Engineer | Portfolio',

		description:
			'Full-stack engineer at GIVA building fast, polished interfaces with Next.js and TypeScript, backed by scalable APIs and solid system design.',

		keywords: [
			'Shrey Singhal',
			'Full Stack Engineer',
			'Frontend Engineer',
			'Software Development Engineer',
			'React Developer',
			'Next.js Developer',
			'TypeScript Developer',
			'Backend Engineer',
			'Node.js Developer',
			'NestJS Developer',
			'Software Engineer',
			'Web Developer',
			'System Design',
			'REST APIs',
			'Portfolio',
		],
	},
};
