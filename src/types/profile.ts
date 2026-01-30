export type Profile = {
  fullName: string;
  title: string;
  avatar: string;
  summary: string[];
  links: {
    email: string;
    calendly: string;
    linkedin: string;
    github: string;
    resume: string;
  };
  statistics: {
    projects: number;
    experience: number;
    clients: number;
  };
  projects: Project[];
  experience: Experience[];
  stacks: Stack[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  techIds: string[]; // ["react", "typescript", "node"]
  link: string;
  github: string;
  category: string; // "web" | "mobile" | "fullstack"
  rol: string; // "Frontend Developer" | "Backend Developer" | "Fullstack Developer"
  from: string;
  to: string;
};

export type Experience = {
  company: string;
  link: string;
  role: string;
  description: string;
  techIds: string[];
  from: string;
  to: string;
};

export type Stack = {
  title: string;
  description: string;
  techIds: string[];
};

export type Tech = {
  id: string;
  name: string;
  experience: number;
  keywords: string[];
};

export type SearchResultItem = {
  href: string;
  label: string;
  path: string;
  tag: string;
};
