export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  technologies: string[];
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
  order: number;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'A personal portfolio website built with Next.js, React, and Tailwind CSS. Features include a dark mode, internationalization, and custom animations.',
    imageUrl: '/assets/portfolio.png',
    imageAlt: 'Portfolio website screenshot',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    sourceCodeUrl: 'https://github.com/yourusername/portfolio',
    liveDemoUrl: 'https://your-portfolio-url.com',
    order: 1
  },
  // Add more projects here
];

