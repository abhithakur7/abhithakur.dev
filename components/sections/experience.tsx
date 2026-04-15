import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCE } from '@/lib/experience';
import { SectionHeader } from '@/components/section-header';

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeader
        index="04"
        eyebrow="Experience"
        title={
          <>
            Where I&apos;ve <span className="italic">worked</span>.
          </>
        }
      />
      <ol className="relative">
        <span
          aria-hidden
          className="absolute left-3 top-2 bottom-2 w-px bg-border sm:left-[202px]"
        />
        {EXPERIENCE.map((e, i) => (
          <li
            key={e.company}
            className="relative grid gap-3 pb-12 pl-10 last:pb-0 sm:grid-cols-[200px_1fr] sm:gap-10 sm:pl-0"
          >
            <span
              aria-hidden
              className="absolute left-2 top-1.5 size-3 rounded-full border-2 border-background bg-accent sm:left-[197px]"
            />
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:pt-1">
              <span className="tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>{' '}
              · {e.period}
            </div>
            <div>
              <h3 className="font-display text-2xl font-medium tracking-tight">
                {e.role}
              </h3>
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {e.company}
                <ArrowUpRight className="size-3" aria-hidden />
              </a>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {e.summary}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
