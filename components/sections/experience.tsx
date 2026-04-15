import { EXPERIENCE } from '@/lib/experience';

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <header className="mb-14 sm:mb-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Experience
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Where I&apos;ve worked
        </h2>
      </header>
      <ol className="space-y-10 sm:space-y-12">
        {EXPERIENCE.map((e) => (
          <li
            key={e.company}
            className="grid gap-3 border-l-2 border-border pl-6 sm:grid-cols-[200px_1fr] sm:gap-8 sm:pl-10"
          >
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:pt-1">
              {e.period}
            </div>
            <div>
              <h3 className="font-medium">
                {e.role} ·{' '}
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-border underline-offset-4 hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {e.company}
                </a>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {e.summary}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
