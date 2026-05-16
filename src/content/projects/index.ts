import shifit from './shifit.json';
import visualPoetry from './visual-poetry.json';
import tuneday from './tuneday.json';
import evolutionVsNature from './evolution-vs-nature.json';
import motionPieces from './motion-pieces.json';
import nutrili from './nutrili.json';
import woodShop from './wood-shop.json';
import personalProjects from './personal-projects.json';
import type { Lang } from '../../i18n/languages';

export interface ProjectSection {
  type: 'image-full' | 'image-pair' | 'image-triplet' | 'video' | 'pullquote' | 'deliverables';
  src?: string;
  left?: string;
  right?: string;
  items?: string[] | { en: string; fr: string }[];
  text?: { en: string; fr: string };
  caption?: { en: string; fr: string };
  loop?: boolean;
}

export interface ProjectResource {
  label: { en: string; fr: string };
  url: string;
}

export interface Project {
  slug: string;
  number: string;
  title: Record<Lang, string>;
  tagline: Record<Lang, string>;
  discipline: string[];
  year: string;
  role: Record<Lang, string>;
  client: string;
  tools: string[];
  accent: string;
  featured: boolean;
  order: number;
  cover: string;
  brief: Record<Lang, string>;
  sections: ProjectSection[];
  resources: ProjectResource[];
}

export const projects: Project[] = [
  shifit, visualPoetry, tuneday, evolutionVsNature,
  motionPieces, nutrili, woodShop, personalProjects,
] as unknown as Project[];

export const projectsByOrder = [...projects].sort((a, b) => a.order - b.order);
export const featuredProjects = projectsByOrder.filter(p => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const idx = projectsByOrder.findIndex(p => p.slug === slug);
  return projectsByOrder[(idx + 1) % projectsByOrder.length];
}
