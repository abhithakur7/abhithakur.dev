import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HeroFallback } from './hero-fallback';
import { HeroMeshClient } from './hero-mesh-client';

export function Hero() {
  const cta =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background';

  return (
    <section className="relative isolate flex min-h-[88dvh] items-center overflow-hidden">
      <HeroFallback />
      <HeroMeshClient />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-24 sm:py-32 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            <span>Senior Full-Stack Engineer · Chandigarh</span>
          </div>
          <h1 className="font-display mt-7 text-balance text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl lg:text-[8rem]">
            Abhishek
            <br />
            <span className="italic" style={{ fontVariationSettings: '"WONK" 1, "SOFT" 100' }}>
              Thakur.
            </span>
          </h1>
          <p className="mt-9 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I build{' '}
            <span className="text-foreground">multi-tenant SaaS</span> and{' '}
            <span className="text-foreground">payment systems</span>. Currently
            leading engineering at Bizdesire — taking new{' '}
            <span className="text-foreground">senior / staff</span> roles,
            remote, global.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className={`group inline-flex h-11 items-center gap-1.5 rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90 ${cta}`}
            >
              View work
              <ArrowDown className="size-4 transition group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href="/resume.pdf"
              className={`inline-flex h-11 items-center gap-1.5 rounded-full border border-border px-5 text-sm font-medium hover:bg-muted ${cta}`}
            >
              Résumé
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <aside className="hidden border-l border-border pl-8 font-mono text-xs uppercase tracking-widest text-muted-foreground lg:block">
          <ul className="space-y-3">
            <li className="flex items-baseline justify-between gap-6">
              <span>Years</span>
              <span className="text-foreground tabular-nums">04+</span>
            </li>
            <li className="flex items-baseline justify-between gap-6">
              <span>Roles open</span>
              <span className="text-foreground">Senior · Staff</span>
            </li>
            <li className="flex items-baseline justify-between gap-6">
              <span>Mode</span>
              <span className="text-foreground">Remote, global</span>
            </li>
            <li className="flex items-baseline justify-between gap-6">
              <span>Stack</span>
              <span className="text-foreground">TS · Node · React</span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
