import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders'; // Built-in Astro loader system

const blog = defineCollection({
  // Tells Astro where to hunt for Keystatic's saved blog files
  loader: glob({
    pattern: '**/[^_]*.{md,mdx,mdoc}',
    base: './src/content/blog',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // If you added fields like pubDate or description, map them here:
    // description: z.string().optional(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      duration: z.number(),
      pricing: z.number(),
      description: z.string(),
      calLink: z.string(),
      image: image().optional(),
    }),
});
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/testimonials' }),
  schema: () =>
    z.object({
      name: z.string(),
      relationship: z.string(),
      headline: z.string().optional(),
      review: z.string(),
    }),
});

export const collections = { blog, services, testimonials };
