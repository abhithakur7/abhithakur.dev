import { z } from 'zod';

export const workFrontmatter = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  stack: z.array(z.string()).min(1),
  liveUrl: z.string().url(),
  role: z.string(),
  teamSize: z.string(),
  timeframe: z.string(),
  order: z.number().int().positive(),
  summary: z.string().min(1),
});
export type WorkFrontmatter = z.infer<typeof workFrontmatter>;

export const capabilitiesFrontmatter = z.object({
  pillars: z
    .array(
      z.object({
        title: z.string(),
        icon: z.string(),
        description: z.string(),
      }),
    )
    .length(3),
});
export type CapabilitiesFrontmatter = z.infer<typeof capabilitiesFrontmatter>;
