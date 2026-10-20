import fs from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { ReactNode } from 'react';
import { getAllWork, getWorkBySlug } from '@/lib/content';
import { computePrevNext } from '@/lib/prev-next';
import { CaseStudyJsonLd } from '@/components/json-ld';
import { UplevelitDiagram } from '@/components/diagrams/uplevelit-diagram';
import { PenbookDiagram } from '@/components/diagrams/penbook-diagram';
import { RebatesDiagram } from '@/components/diagrams/rebates-diagram';

const DIAGRAMS: Record<string, () => React.ReactElement> = {
  uplevelit: UplevelitDiagram,
  penbook: PenbookDiagram,
  'rocket-rebates': RebatesDiagram,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  return '';
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

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
  const url = `https://abhithakur.dev/work/${slug}`;
  const title = `${w.title} case study`;
  return {
    title,
    description: w.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${title} | Abhishek Thakur`,
      description: w.summary,
      authors: ['Abhishek Thakur'],
      ...(w.publishedAt && { publishedTime: w.publishedAt }),
      ...((w.updatedAt ?? w.publishedAt) && { modifiedTime: w.updatedAt ?? w.publishedAt }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Abhishek Thakur`,
      description: w.summary,
    },
  };
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
  const headings = [...body.matchAll(/^## (.+)$/gm)].map((m) => {
    const text = (m[1] ?? '').trim();
    return { text, id: slugify(text) };
  });

  const all = await getAllWork();
  const { next } = computePrevNext(
    all.map((w) => w.slug),
    slug,
  );
  const nextMeta = next ? all.find((w) => w.slug === next) : undefined;
  const updated = meta.updatedAt ?? meta.publishedAt;

  return (
    <article className="pb-24">
      <CaseStudyJsonLd
        slug={meta.slug}
        title={meta.title}
        summary={meta.summary}
        publishedAt={meta.publishedAt}
        updatedAt={meta.updatedAt}
        faq={meta.faq}
      />

      <header className="mx-auto max-w-6xl px-6 pt-10 sm:pt-14">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft className="size-4" aria-hidden /> All work
        </Link>

        <h1 className="font-display mt-10 text-balance text-[clamp(3rem,10vw,8.5rem)] uppercase leading-[0.86]">
          {meta.title}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <p className="max-w-3xl text-balance text-2xl leading-snug sm:text-3xl">{meta.tagline}</p>

          {/* The order ticket: the facts a reader scans for. */}
          <dl className="rotate-[1.2deg] bg-canary p-6 font-print text-[12px] text-[#1b1a21] shadow-[0_22px_36px_-22px_rgb(0_0_0/0.5)]">
            <div className="flex justify-between gap-4">
              <dt className="opacity-80">Role</dt>
              <dd className="text-right font-bold">{meta.role}</dd>
            </div>
            <div className="mt-2 flex justify-between gap-4">
              <dt className="opacity-80">When</dt>
              <dd className="text-right font-bold">{meta.timeframe}</dd>
            </div>
            {meta.liveUrl && (
              <div className="mt-2 flex justify-between gap-4">
                <dt className="opacity-80">Live</dt>
                <dd className="text-right font-bold">
                  <a
                    className="inline-flex items-center gap-1 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    href={meta.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {new URL(meta.liveUrl).hostname}
                    <ExternalLink className="size-3" aria-hidden />
                  </a>
                </dd>
              </div>
            )}
            <div aria-hidden className="my-4 border-t-2 border-dashed border-current opacity-30" />
            <div>
              <dt className="sr-only">Stack</dt>
              <dd>
                <ul className="space-y-0.5">
                  {meta.stack.map((s) => (
                    <li key={s}>
                      <span className="opacity-80">1 × </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="mx-auto mt-20 grid max-w-6xl gap-12 px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-sm font-semibold">On this page</p>
            <ol className="mt-4 space-y-2 border-l-2 border-foreground pl-4 text-sm text-muted-foreground">
              {headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    {h.text}
                  </a>
                </li>
              ))}
              {meta.faq?.length ? (
                <li>
                  <a href="#questions" className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    Questions
                  </a>
                </li>
              ) : null}
            </ol>
          </div>
        </nav>

        <div className="min-w-0">
          <div className="cs-prose prose prose-neutral prose-lg dark:prose-invert max-w-[68ch]">
            <MDXRemote
              source={body}
              components={{
                Diagram: DIAGRAMS[slug] ?? (() => null),
                h2: ({ children }: { children?: ReactNode }) => (
                  <h2 id={slugify(textOf(children))}>{children}</h2>
                ),
              }}
            />
          </div>

          {meta.faq?.length ? (
            <section id="questions" className="mt-20 max-w-[68ch] scroll-mt-24">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9]">Questions</h2>
              <dl className="mt-8 space-y-8">
                {meta.faq.map((f) => (
                  <div key={f.q}>
                    <dt className="text-lg font-bold">{f.q}</dt>
                    <dd className="mt-2 text-base leading-relaxed text-muted-foreground">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {updated && (
            <p className="mt-16 text-sm text-muted-foreground">
              Last updated <time dateTime={updated}>{formatDate(updated)}</time>
            </p>
          )}
        </div>
      </div>

      {nextMeta && (
        <Link
          href={`/work/${nextMeta.slug}`}
          className="group mx-auto mt-24 block max-w-6xl px-6 focus-visible:outline-none"
        >
          <span className="block border-t-2 border-foreground pt-8 text-sm text-muted-foreground">Next case study</span>
          <span className="font-display mt-3 flex items-end justify-between gap-6 text-[clamp(2.5rem,8vw,6.5rem)] uppercase leading-[0.88] transition-colors group-hover:text-accent group-focus-visible:text-accent">
            {nextMeta.title}
            <ArrowUpRight className="mb-2 size-[0.6em] shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
          </span>
          <span className="mt-4 block max-w-2xl text-lg text-muted-foreground">{nextMeta.tagline}</span>
        </Link>
      )}
    </article>
  );
}
