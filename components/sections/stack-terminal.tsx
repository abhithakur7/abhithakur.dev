import { STACK_GROUPS } from '@/lib/stack';
import { SectionHeader } from '@/components/section-header';

export function StackTerminal() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeader
        index="03"
        eyebrow="Stack"
        title={
          <>
            What I <span className="italic">build with</span>.
          </>
        }
      />
      <div className="overflow-hidden rounded-xl border border-border bg-muted/40 font-mono text-sm shadow-[0_30px_60px_-30px_oklch(0_0_0_/_0.15)]">
        <div className="flex items-center gap-1.5 border-b border-border bg-background/80 px-4 py-3 sm:px-5">
          <span className="size-2.5 rounded-full bg-red-400/60" />
          <span className="size-2.5 rounded-full bg-yellow-400/60" />
          <span className="size-2.5 rounded-full bg-green-400/60" />
          <span className="ml-3 text-xs text-muted-foreground">
            ~/abhishek
          </span>
        </div>
        <div className="px-6 pt-6 sm:px-8 sm:pt-8">
          <p className="text-muted-foreground">
            <span className="text-accent">$</span> stack --list
          </p>
        </div>
        <dl className="grid gap-x-10 gap-y-4 p-6 sm:grid-cols-[max-content_1fr] sm:gap-y-5 sm:p-8">
          {STACK_GROUPS.map((g) => (
            <div key={g.label} className="contents">
              <dt className="text-muted-foreground">
                <span className="text-accent">›</span> {g.label}
              </dt>
              <dd className="text-foreground">{g.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
        <div className="border-t border-border bg-background/40 px-6 py-4 sm:px-8">
          <p className="text-xs text-muted-foreground">
            <span className="text-accent">$</span>
            <span className="ml-1 inline-block size-2 translate-y-px animate-pulse bg-foreground" />
          </p>
        </div>
      </div>
    </section>
  );
}
