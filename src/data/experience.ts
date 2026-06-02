import type { Experience } from '@/data/types';

export const experiences: Experience[] = [
	{
		company: 'AppSquadz',
		location: 'Noida',
		role: 'Software Engineer',
		duration: 'March 2025 - Present',
		timeframe: 'Full-time',
		description:
			'Working on scalable backend systems, API development, authentication modules, and performance-focused backend architecture.',
		achievements: [
			'Architecting scalable backend systems using NestJS with modular design and robust Dependency Injection.',
			'Building high-performance REST APIs with secure and scalable authentication using JWT and RBAC.',
			'Developing admin panels using Laravel, enabling efficient role-based workflows and seamless data management.',
			'Optimizing database performance with SQL queries, handling relational data, ensuring low-latency responses.',
		],
		techStack: ['NestJS', 'Node.js', 'Express', 'SQL', 'MongoDB', 'Redis', 'Docker'],
	},
	{
		company: 'Explorin.io',
		location: 'Moradabad',
		role: 'Web Developer',
		duration: 'June 2024 - August 2024',
		timeframe: 'Internship',
		description:
			'Contributed to frontend and backend development, focusing on building responsive web applications and optimizing user experience.',
		achievements: [
			'Acquired expertise in modern web development technologies including ReactJS, NodeJS and Tailwind CSS.',
			'Gained practical experience through project-based learning, equipping according to latest industry standards.',
			'Participated in backend development tasks involving RESTful APIs and third-party service integrations.',
			'Worked with MongoDB database, enhancing backend development by managing and querying data effectively.',
		],
		techStack: [
			'Redux',
			'React.js',
			'Node.js',
			'Express',
			'SQL',
			'MongoDB',
			'JavaScript',
			'Git',
			'GitHub',
			'Postman',
			'HTML',
			'CSS',
		],
	},
];
