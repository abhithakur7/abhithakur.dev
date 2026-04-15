import fs from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
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
  const bySlug = new Map(all.map((w) => [w.slug, w]));
  const idx = all.findIndex((w) => w.slug === slug);
  const indexLabel = String(idx + 1).padStart(2, '0');

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> Back to work
      </Link>

      <header className="mt-10 border-b border-border pb-12">
        <div className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="tabular-nums">{indexLabel}</span>
          <span aria-hidden className="h-px flex-1 bg-border" />
          <span>Case study</span>
        </div>

        <h1 className="font-display mt-8 text-balance text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          {meta.title}
          <span className="text-accent">.</span>
        </h1>

        <p className="font-display mt-7 max-w-2xl text-balance text-xl italic leading-snug text-muted-foreground sm:text-2xl">
          {meta.tagline}
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Role
            </dt>
            <dd className="mt-2">{meta.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              When
            </dt>
            <dd className="mt-2 tabular-nums">{meta.timeframe}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Live
            </dt>
            <dd className="mt-2">
              <a
                className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                href={meta.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {new URL(meta.liveUrl).hostname}
                <ExternalLink className="size-3" aria-hidden />
              </a>
            </dd>
          </div>
        </dl>

        <ul className="mt-8 flex flex-wrap gap-1.5">
          {meta.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {s}
            </li>
          ))}
        </ul>
      </header>

      <div className="prose prose-neutral prose-lg dark:prose-invert mt-14 max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-h2:mt-16 prose-h2:mb-6 prose-h2:flex prose-h2:items-baseline prose-h2:gap-3 prose-h2:before:font-mono prose-h2:before:text-xs prose-h2:before:uppercase prose-h2:before:tracking-widest prose-h2:before:text-accent prose-h2:before:content-['§'] prose-strong:font-semibold prose-strong:text-foreground prose-a:underline-offset-4 prose-a:decoration-border hover:prose-a:decoration-foreground prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.875em] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-border prose-li:marker:text-muted-foreground">
        <MDXRemote source={body} />
      </div>

      <nav
        className="mt-20 grid grid-cols-2 gap-3 border-t border-border pt-8 text-sm sm:gap-4"
        aria-label="Case study pagination"
      >
        {prev ? (
          <Link
            href={`/work/${prev}`}
            className="group rounded-xl border border-border p-5 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <ArrowLeft className="size-3 transition group-hover:-translate-x-0.5" aria-hidden />
              Previous
            </span>
            <span className="font-display mt-2 block text-lg font-medium tracking-tight">
              {bySlug.get(prev)?.title ?? prev}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next}`}
            className="group rounded-xl border border-border p-5 text-right transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Next
              <ArrowRight className="size-3 transition group-hover:translate-x-0.5" aria-hidden />
            </span>
            <span className="font-display mt-2 block text-lg font-medium tracking-tight">
              {bySlug.get(next)?.title ?? next}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
