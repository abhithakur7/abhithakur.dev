import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCE } from '@/lib/experience';
import { SectionHeader } from '@/components/section-header';
import { LedgerRow } from './ledger-row';

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <SectionHeader title="Where I've worked" />
      <ol className="border-b-2 border-foreground">
        {EXPERIENCE.map((e, i) => (
          <LedgerRow key={e.company} stamp={i === 0 ? 'Current' : 'Settled'} current={i === 0}>
            <p className="font-print text-xs uppercase tracking-wider text-muted-foreground sm:pt-2">
              {e.period}
            </p>
            <div className="pr-28 sm:pr-40">
              <h3 className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] uppercase leading-[0.95]">
                {e.role}
              </h3>
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-base font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {e.company}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{e.summary}</p>
            </div>
          </LedgerRow>
        ))}
      </ol>
    </section>
  );
}
