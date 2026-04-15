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

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ArrowLeft className="size-4" aria-hidden /> Back to work
      </Link>

      <header className="mt-8 border-b border-border pb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Case study
        </p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-5 text-balance text-lg text-muted-foreground">
          {meta.tagline}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Role
            </dt>
            <dd className="mt-1.5">{meta.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              When
            </dt>
            <dd className="mt-1.5">{meta.timeframe}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Live
            </dt>
            <dd className="mt-1.5">
              <a
                className="inline-flex items-center gap-1 underline underline-offset-4 decoration-border hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
              className="rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {s}
            </li>
          ))}
        </ul>
      </header>

      <div className="prose prose-neutral prose-lg dark:prose-invert mt-12 max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-strong:font-semibold prose-strong:text-foreground prose-a:underline-offset-4 prose-a:decoration-border hover:prose-a:decoration-foreground prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.875em] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-border">
        <MDXRemote source={body} />
      </div>

      <nav
        className="mt-20 grid grid-cols-2 gap-4 border-t border-border pt-8 text-sm"
        aria-label="Case study pagination"
      >
        {prev ? (
          <Link
            href={`/work/${prev}`}
            className="group rounded-lg border border-border p-4 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <ArrowLeft className="size-3" aria-hidden /> Previous
            </span>
            <span className="mt-1.5 block font-medium">
              {bySlug.get(prev)?.title ?? prev}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next}`}
            className="group rounded-lg border border-border p-4 text-right transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Next <ArrowRight className="size-3" aria-hidden />
            </span>
            <span className="mt-1.5 block font-medium">
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
