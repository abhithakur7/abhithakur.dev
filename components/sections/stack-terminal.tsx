import { STACK_GROUPS } from '@/lib/stack';

export function StackTerminal() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <header className="mb-14 sm:mb-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Stack
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          What I build with
        </h2>
      </header>
      <div className="overflow-hidden rounded-xl border border-border bg-muted/40 font-mono text-sm">
        <div className="flex items-center gap-1.5 border-b border-border bg-background/60 px-4 py-3 sm:px-5">
          <span className="size-2.5 rounded-full bg-red-400/60" />
          <span className="size-2.5 rounded-full bg-yellow-400/60" />
          <span className="size-2.5 rounded-full bg-green-400/60" />
          <span className="ml-3 text-xs text-muted-foreground">
            ~ abhishek $ stack --list
          </span>
        </div>
        <dl className="grid gap-x-8 gap-y-4 p-6 sm:grid-cols-[max-content_1fr] sm:p-8 sm:gap-y-5">
          {STACK_GROUPS.map((g) => (
            <div key={g.label} className="contents">
              <dt className="text-muted-foreground">{g.label}</dt>
              <dd className="text-foreground">{g.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
