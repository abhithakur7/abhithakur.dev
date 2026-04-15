import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getAllWork } from '@/lib/content';

export async function SelectedWork() {
  const work = await getAllWork();
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <header className="mb-14 sm:mb-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Selected work
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Things I&apos;ve shipped
        </h2>
      </header>
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        {work.map((w, i) => (
          <Link
            key={w.slug}
            href={`/work/${w.slug}`}
            className={`group relative flex min-h-[220px] flex-col justify-between gap-10 rounded-xl border border-border bg-muted/30 p-6 sm:p-8 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              i === 0 ? 'lg:col-span-2 lg:min-h-[260px]' : ''
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                  {w.title}
                </h3>
                <ArrowUpRight
                  className="size-5 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {w.tagline}
              </p>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {w.stack.slice(0, 5).map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}
