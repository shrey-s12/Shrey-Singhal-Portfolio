import type { SkillCategory } from '@/data/types';

export const skillCategories: SkillCategory[] = [
	{
		title: 'Programming Languages',
		skills: ['C++', 'JavaScript', 'TypeScript', 'PHP', 'SQL'],
	},
	{
		title: 'Backend',
		skills: ['Node.js', 'NestJS', 'Express.js', 'REST APIs', 'Authentication', 'Redis', 'Laravel'],
	},
	{
		title: 'Databases',
		skills: ['SQL', 'MongoDB', 'Redis', 'Query Optimization', 'Database Design'],
	},
	{
		title: 'Frontend',
		skills: ['Redux', 'React.js', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
	},
	{
		title: 'DevOps & Tools',
		skills: ['CI/CD', 'Git', 'GitHub', 'Swagger', 'Postman', 'Linux', 'VS Code'],
	},
];
