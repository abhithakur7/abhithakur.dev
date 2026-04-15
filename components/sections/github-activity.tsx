import fs from 'node:fs/promises';
import path from 'node:path';
import { Star } from 'lucide-react';
import { GithubIcon } from '@/components/icons';

type Cache = {
  username: string;
  repos: {
    name: string;
    description: string;
    url: string;
    stars: number;
    language: string;
  }[];
  fetchedAt: string;
};

async function readCache(): Promise<Cache> {
  const raw = await fs.readFile(
    path.join(process.cwd(), 'public', 'github-cache.json'),
    'utf8',
  );
  return JSON.parse(raw) as Cache;
}

export async function GithubActivity() {
  const cache = await readCache();
  return (
    <section id="github" className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-10 flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            GitHub
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Recent activity
          </h2>
        </div>
        <a
          href={`https://github.com/${cache.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <GithubIcon className="size-4" /> @{cache.username}
        </a>
      </header>
      {cache.repos.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Pinned repos will appear here after the next deploy.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cache.repos.slice(0, 6).map((r) => (
            <li key={r.name}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-xl border border-border p-5 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{r.name}</h3>
                  {r.stars > 0 && (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                      <Star className="size-3" aria-hidden />
                      {r.stars}
                    </span>
                  )}
                </div>
                {r.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {r.description}
                  </p>
                )}
                {r.language && (
                  <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                    {r.language}
                  </p>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
