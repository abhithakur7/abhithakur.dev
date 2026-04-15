import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getAllWork } from '@/lib/content';
import { SectionHeader } from '@/components/section-header';

export async function SelectedWork() {
  const work = await getAllWork();
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeader
        index="01"
        eyebrow="Selected work"
        title={
          <>
            Things I&apos;ve <span className="italic">shipped</span>.
          </>
        }
        description="Three case studies from the last few years — the products live, the stacks real, the trade-offs honest."
      />
      <ol className="divide-y divide-border border-y border-border">
        {work.map((w, i) => (
          <li key={w.slug}>
            <Link
              href={`/work/${w.slug}`}
              className="group grid grid-cols-12 items-baseline gap-6 py-8 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:py-10"
            >
              <span className="col-span-2 font-mono text-xs uppercase tracking-widest text-muted-foreground tabular-nums sm:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="col-span-10 sm:col-span-7">
                <h3 className="font-display text-3xl font-medium tracking-tight transition group-hover:text-accent sm:text-4xl">
                  {w.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {w.tagline}
                </p>
              </div>
              <div className="col-span-12 flex items-center justify-between gap-4 sm:col-span-4 sm:justify-end">
                <ul className="flex flex-wrap gap-1.5 sm:justify-end">
                  {w.stack.slice(0, 3).map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <ArrowUpRight
                  className="size-5 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden
                />
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
