import { HeroFallback } from './hero-fallback';
import { HeroMeshClient } from './hero-mesh-client';

export function Hero() {
  const cta =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background';

  return (
    <section className="relative isolate flex min-h-[85dvh] items-center overflow-hidden">
      <HeroFallback />
      <HeroMeshClient />
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Senior Full-Stack Engineer
        </p>
        <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
          Abhishek Thakur
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
          I build multi-tenant SaaS platforms and payment systems. Based in
          Chandigarh. Taking new senior / staff roles — remote, global.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#work"
            className={`inline-flex h-10 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90 ${cta}`}
          >
            View work →
          </a>
          <a
            href="/resume.pdf"
            className={`inline-flex h-10 items-center rounded-md border border-border px-5 text-sm font-medium hover:bg-muted ${cta}`}
          >
            Résumé
          </a>
        </div>
      </div>
    </section>
  );
}
