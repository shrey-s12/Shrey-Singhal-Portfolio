// src/data/types.ts

export interface Stat {
  label: string;
  value: string;
  suffix: string;
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  introduction: string;
  description: string;
  currentCompany: string;
  location: string;
  experience: string;
  email: string;
  phone: string;
  resume: string;
  profileImage: string;
  heroImage: string;
  ogImage: string;
  availability: string;
  focusAreas: string[];
  stats: Stat[];
  highlights: string[];
  currentlyLearning: string[];
  seo: SEO;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  status: string;
  featured: boolean;
  techStack: string[];
  keyFeatures: string[];
  highlights: string[];
  architecture?: string[];
  github: string;
  live: string;
  color: string;
}

export interface Experience {
  company: string;
  location: string;
  role: string;
  duration: string;
  timeframe: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  graduationYear: number;
  score: string;
  description: string;
}

export interface Highlight {
  title: string;
  description: string;
}

export interface LearningEntry {
  title: string;
  description: string;
}

export interface DSAData {
  totalSolved: string;
  easy: string;
  medium: string;
  hard: string;
  platform: string;
  leetcodeProfile: string;
  description: string;
  topics: string[];
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
}

export interface Social {
  name: string;
  url: string;
}

export interface NavLink {
  name: string;
  href: string;
}
