import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {
  workFrontmatter,
  capabilitiesFrontmatter,
  type WorkFrontmatter,
  type CapabilitiesFrontmatter,
} from './content.schema';

const ROOT = path.join(process.cwd(), 'content');

export async function getAllWork(): Promise<WorkFrontmatter[]> {
  const dir = path.join(ROOT, 'work');
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.mdx'));
  const entries = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(dir, file), 'utf8');
      const { data } = matter(raw);
      return workFrontmatter.parse(data);
    }),
  );
  return entries.sort((a, b) => a.order - b.order);
}

export async function getWorkBySlug(slug: string): Promise<WorkFrontmatter | null> {
  const all = await getAllWork();
  return all.find((w) => w.slug === slug) ?? null;
}

export async function getCapabilities(): Promise<CapabilitiesFrontmatter> {
  const raw = await fs.readFile(path.join(ROOT, 'capabilities.mdx'), 'utf8');
  const { data } = matter(raw);
  return capabilitiesFrontmatter.parse(data);
}
