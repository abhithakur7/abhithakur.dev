import { describe, it, expect, vi, beforeEach } from 'vitest';
import { buildCache } from '../../scripts/fetch-github.mjs';

describe('buildCache', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns a cache object with pinned repos and username, even when the network fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('offline'));
    const cache = await buildCache('abhithakur7');
    expect(cache.username).toBe('abhithakur7');
    expect(Array.isArray(cache.repos)).toBe(true);
    expect(cache.fetchedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('populates repos when the API returns data', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          name: 'alpha',
          description: 'a',
          html_url: 'u1',
          stargazers_count: 5,
          language: 'TypeScript',
          fork: false,
        },
        {
          name: 'beta',
          description: null,
          html_url: 'u2',
          stargazers_count: 0,
          language: null,
          fork: false,
        },
        {
          name: 'gamma',
          description: 'g',
          html_url: 'u3',
          stargazers_count: 2,
          language: 'Go',
          fork: true,
        },
      ],
    });
    const cache = await buildCache('abhithakur7');
    expect(cache.repos.length).toBe(2);
    expect(cache.repos[0].name).toBe('alpha');
  });
});
