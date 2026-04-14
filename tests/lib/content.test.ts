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
});
