import type { SkillCategory } from '@/data/types';

export const skillCategories: SkillCategory[] = [
	{
		title: 'Programming Languages',
		skills: ['C++', 'JavaScript', 'TypeScript', 'PHP', 'SQL'],
	},
	{
		title: 'Backend Development',
		skills: [
			'Node.js',
			'NestJS',
			'Express.js',
			'Laravel',
			'CodeIgniter',
			'REST APIs',
			'JWT Authentication',
			'RBAC',
		],
	},
	{
		title: 'Databases & Caching',
		skills: ['MongoDB', 'MySQL', 'Redis', 'Database Design', 'Query Optimization'],
	},
	{
		title: 'Frontend Development',
		skills: [
			'React.js',
			'Next.js',
			'Redux',
			'Tailwind CSS',
			'Bootstrap',
			'HTML',
			'CSS',
		],
	},
	{
		title: 'Cloud & DevOps',
		skills: [
			'AWS',
			'Docker',
			'CI/CD',
			'Linux',
		],
	},
	{
		title: 'Tools & Platforms',
		skills: [
			'Git',
			'GitHub',
			'Bitbucket',
			'Postman',
			'Swagger',
			'VS Code',
			'XAMPP'
		],
	},
];
