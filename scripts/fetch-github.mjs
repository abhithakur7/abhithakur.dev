import fs from 'node:fs/promises';
import path from 'node:path';

export async function buildCache(username) {
  const cache = { username, repos: [], fetchedAt: new Date().toISOString() };
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers: { 'User-Agent': 'portfolio-build' } },
    );
    if (res.ok) {
      const repos = await res.json();
      cache.repos = repos
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map((r) => ({
          name: r.name,
          description: r.description ?? '',
          url: r.html_url,
          stars: r.stargazers_count,
          language: r.language ?? '',
        }));
    }
  } catch {
    // leave repos empty; UI shows a calm fallback
  }
  return cache;
}

async function main() {
  const username = process.env.GH_USER ?? 'abhithakur7';
  const cache = await buildCache(username);
  const out = path.join(process.cwd(), 'public', 'github-cache.json');
  await fs.writeFile(out, JSON.stringify(cache, null, 2));
  console.log(`Wrote ${cache.repos.length} repos to ${out}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
