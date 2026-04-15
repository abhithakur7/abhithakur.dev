import { Building2, CreditCard, Cloud, type LucideIcon } from 'lucide-react';
import { getCapabilities } from '@/lib/content';

const ICONS: Record<string, LucideIcon> = { Building2, CreditCard, Cloud };

export async function WhatIDo() {
  const { pillars } = await getCapabilities();
  return (
    <section id="what-i-do" className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          What I do
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Where I spend my time
        </h2>
      </header>
      <div className="grid gap-6 sm:grid-cols-3">
        {pillars.map((p) => {
          const Icon = ICONS[p.icon] ?? Building2;
          return (
            <div key={p.title} className="rounded-xl border border-border p-6">
              <Icon className="size-5 text-accent" aria-hidden />
              <h3 className="mt-4 text-lg font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
