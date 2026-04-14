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
      const fm = workFrontmatter.parse(data);
      const expected = path.basename(file, '.mdx');
      if (fm.slug !== expected) {
        throw new Error(
          `Slug mismatch in ${file}: frontmatter slug "${fm.slug}" does not match filename "${expected}".`,
        );
      }
      return fm;
    }),
  );

  if (entries.length === 0) {
    throw new Error(`No work entries found in ${dir}.`);
  }

  const seenSlugs = new Set<string>();
  const seenOrders = new Set<number>();
  for (const e of entries) {
    if (seenSlugs.has(e.slug)) throw new Error(`Duplicate slug: ${e.slug}`);
    if (seenOrders.has(e.order)) throw new Error(`Duplicate order: ${e.order}`);
    seenSlugs.add(e.slug);
    seenOrders.add(e.order);
  }

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
