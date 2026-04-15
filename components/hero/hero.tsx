import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HeroFallback } from './hero-fallback';
import { HeroMark } from './hero-mark';
import { HeroName } from './hero-name';
import { MagneticLink } from '@/components/magnetic-link';

export function Hero() {
  const cta =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background';

  return (
    <section className="relative isolate flex min-h-[88dvh] items-center overflow-hidden">
      <HeroFallback />
      <HeroMark />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-24 sm:py-32 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span aria-hidden className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            <span>Available now · Senior Full-Stack Engineer · Chandigarh, India</span>
          </div>

          <HeroName />

          <p className="mt-9 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I build{' '}
            <span className="text-foreground">SaaS platforms</span> and{' '}
            <span className="text-foreground">payment systems</span>. Most
            recently led engineering at Bizdesire on Uplevelit. Open to new{' '}
            <span className="text-foreground">senior / staff</span> roles,
            remote, global.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticLink
              href="#work"
              className={`group inline-flex h-11 items-center gap-1.5 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 ${cta}`}
            >
              View work
              <ArrowDown
                className="size-4 transition group-hover:translate-y-0.5"
                aria-hidden
              />
            </MagneticLink>
            <MagneticLink
              href="/abhishek-thakur-resume.pdf"
              target="_blank"
              rel="noopener"
              className={`inline-flex h-11 items-center gap-1.5 rounded-full border border-border px-5 text-sm font-medium hover:bg-muted ${cta}`}
            >
              Résumé
              <ArrowUpRight className="size-4" aria-hidden />
            </MagneticLink>
          </div>
        </div>

        <aside className="hidden border-l border-border pl-8 font-mono text-xs uppercase tracking-widest text-muted-foreground lg:block">
          <ul className="space-y-3">
            <li className="flex items-baseline justify-between gap-6">
              <span>Status</span>
              <span className="text-foreground">Available now</span>
            </li>
            <li className="flex items-baseline justify-between gap-6">
              <span>Last role</span>
              <span className="text-foreground">Lead · Bizdesire</span>
            </li>
            <li className="flex items-baseline justify-between gap-6">
              <span>Years</span>
              <span className="text-foreground tabular-nums">04+</span>
            </li>
            <li className="flex items-baseline justify-between gap-6">
              <span>Open to</span>
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
