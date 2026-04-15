import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getAllWork } from '@/lib/content';

export async function SelectedWork() {
  const work = await getAllWork();
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Selected work
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Things I&apos;ve shipped
        </h2>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {work.map((w, i) => (
          <Link
            key={w.slug}
            href={`/work/${w.slug}`}
            className={`group relative flex flex-col justify-between gap-8 rounded-xl border border-border bg-muted/30 p-6 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-medium tracking-tight">{w.title}</h3>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{w.tagline}</p>
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
