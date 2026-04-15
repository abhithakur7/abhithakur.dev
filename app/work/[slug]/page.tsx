import fs from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllWork, getWorkBySlug } from '@/lib/content';
import { computePrevNext } from '@/lib/prev-next';

export async function generateStaticParams() {
  const all = await getAllWork();
  return all.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = await getWorkBySlug(slug);
  if (!w) return {};
  return { title: `${w.title} — Abhishek Thakur`, description: w.summary };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = await getWorkBySlug(slug);
  if (!meta) notFound();
  const raw = await fs.readFile(
    path.join(process.cwd(), 'content', 'work', `${slug}.mdx`),
    'utf8',
  );
  const body = raw.replace(/^---[\s\S]*?---\n/, '');

  const all = await getAllWork();
  const { prev, next } = computePrevNext(
    all.map((w) => w.slug),
    slug,
  );

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/#work"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ArrowLeft className="size-4" aria-hidden /> Back to work
      </Link>
      <header className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Case study
        </p>
        <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{meta.tagline}</p>
        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-muted-foreground">Role</dt>
            <dd>{meta.role}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Team</dt>
            <dd>{meta.teamSize}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">When</dt>
            <dd>{meta.timeframe}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Live</dt>
            <dd>
              <a
                className="underline underline-offset-4"
                href={meta.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {new URL(meta.liveUrl).hostname}
              </a>
            </dd>
          </div>
        </dl>
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {meta.stack.map((s) => (
            <li
              key={s}
              className="rounded-md border border-border bg-muted/30 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {s}
            </li>
          ))}
        </ul>
      </header>
      <div className="prose prose-neutral dark:prose-invert mt-12 max-w-none">
        <MDXRemote source={body} />
      </div>
      <nav
        className="mt-16 flex items-center justify-between border-t border-border pt-6 text-sm"
        aria-label="Case study pagination"
      >
        {prev ? (
          <Link
            href={`/work/${prev}`}
            className="inline-flex items-center gap-1 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowLeft className="size-4" aria-hidden /> {prev}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next}`}
            className="inline-flex items-center gap-1 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {next} <ArrowRight className="size-4" aria-hidden />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
