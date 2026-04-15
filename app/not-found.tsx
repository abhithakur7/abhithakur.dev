import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-3xl flex-col justify-center px-6 py-24">
      <div className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span className="tabular-nums">404</span>
        <span aria-hidden className="h-px flex-1 bg-border" />
        <span>Not found</span>
      </div>
      <h1 className="font-display mt-8 text-balance text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl">
        This page doesn&apos;t{' '}
        <span className="italic">exist</span>.
      </h1>
      <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
        The link is broken or the page has moved. Nothing here, but the rest of
        the site is one click away.
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="group inline-flex h-11 items-center gap-1.5 rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="size-4 transition group-hover:-translate-x-0.5" aria-hidden />
          Back home
        </Link>
      </div>
    </section>
  );
}
