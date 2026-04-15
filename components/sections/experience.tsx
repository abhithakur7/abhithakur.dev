import { EXPERIENCE } from '@/lib/experience';

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Experience
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Where I&apos;ve worked
        </h2>
      </header>
      <ol className="space-y-6">
        {EXPERIENCE.map((e) => (
          <li
            key={e.company}
            className="grid gap-2 border-l-2 border-border pl-6 sm:grid-cols-[200px_1fr] sm:gap-6 sm:pl-8"
          >
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {e.period}
            </div>
            <div>
              <h3 className="font-medium">
                {e.role} ·{' '}
                <span className="text-muted-foreground">{e.company}</span>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
