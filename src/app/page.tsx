import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';

const About = dynamic(() => import('@/components/sections/About'));
const Skills = dynamic(() => import('@/components/sections/Skills'));
const Education = dynamic(() => import('@/components/sections/Education'));
const Experience = dynamic(() => import('@/components/sections/Experience'));
const Projects = dynamic(() => import('@/components/sections/Projects'));
const Highlights = dynamic(() => import('@/components/sections/Highlights'));
const DSA = dynamic(() => import('@/components/sections/DSA'));
const Learning = dynamic(() => import('@/components/sections/Learning'));
const Contact = dynamic(() => import('@/components/sections/Contact'));

export default function Home() {
	return (
		<main>
			<Hero />
			<About />
			<Skills />
			<Education />
			<Experience />
			<Projects />
			<Highlights />
			<DSA />
			<Learning />
			<Contact />
		</main>
	);
}
