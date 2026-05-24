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
			'Built scalable APIs using Node.js ecosystem technologies',
			'Implemented secure authentication and authorization systems',
			'Optimized database queries and API response times',
			'Worked on production-grade backend architecture',
			'Improved backend maintainability and scalability',
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
			'Developed responsive web applications using React.js and Redux',
			'Collaborated with cross-functional teams to enhance user experience',
			'Implemented RESTful APIs and integrated third-party services',
			'Optimized frontend performance and improved application responsiveness',
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
