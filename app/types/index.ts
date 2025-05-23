export interface NavLink {
  name: string;
  path: string;
}

export interface ProjectType {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  tech: string[];
}

export interface ExploreCardProps {
  href: string;
  title: string;
  description: string;
  isEnglish: boolean;
}

