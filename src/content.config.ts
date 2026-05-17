// Projects are imported directly as JSON (see src/content/projects/index.ts),
// not via Astro's content layer. This empty config silences the auto-collection
// deprecation warning without forcing a getCollection() rewrite.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  }),
};
