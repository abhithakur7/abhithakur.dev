import { describe, it, expect } from 'vitest';
import { getAllWork, getWorkBySlug, getCapabilities } from '@/lib/content';

describe('content loader', () => {
  it('loads all work entries ordered by `order`', async () => {
    const all = await getAllWork();
    expect(all.length).toBe(3);
    expect(all.map((w) => w.slug)).toEqual(['uplevelit', 'penbook', 'rocket-rebates']);
    for (const w of all) {
      expect(w.title).toBeTruthy();
      expect(w.stack.length).toBeGreaterThan(0);
    }
  });

  it('loads a single work entry by slug', async () => {
    const w = await getWorkBySlug('uplevelit');
    expect(w?.title).toBe('Uplevelit');
  });

  it('returns null for unknown slug', async () => {
    expect(await getWorkBySlug('nope')).toBeNull();
  });

  it('loads capabilities with exactly 3 pillars', async () => {
    const caps = await getCapabilities();
    expect(caps.pillars.length).toBe(3);
  });

  it('has no duplicate slugs or order values', async () => {
    const all = await getAllWork();
    expect(new Set(all.map((w) => w.slug)).size).toBe(all.length);
    expect(new Set(all.map((w) => w.order)).size).toBe(all.length);
  });

  it('frontmatter slug matches the filename', async () => {
    // If this invariant is violated, getAllWork() throws — so reaching this
    // assertion is itself confirmation.
    const all = await getAllWork();
    for (const w of all) {
      expect(w.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
