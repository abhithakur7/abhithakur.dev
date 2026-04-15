import { Building2, CreditCard, Cloud, type LucideIcon } from 'lucide-react';
import { getCapabilities } from '@/lib/content';
import { SectionHeader } from '@/components/section-header';

const ICONS: Record<string, LucideIcon> = { Building2, CreditCard, Cloud };

export async function WhatIDo() {
  const { pillars } = await getCapabilities();
  return (
    <section id="what-i-do" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeader
        index="02"
        eyebrow="What I do"
        title={
          <>
            Where I spend my <span className="italic">time</span>.
          </>
        }
      />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
        {pillars.map((p, i) => {
          const Icon = ICONS[p.icon] ?? Building2;
          return (
            <div
              key={p.title}
              className="group relative bg-background p-7 sm:p-9"
            >
              <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <Icon
                className="size-7 text-accent transition group-hover:scale-110"
                strokeWidth={1.5}
                aria-hidden
              />
              <h3 className="font-display mt-7 text-2xl font-medium tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
