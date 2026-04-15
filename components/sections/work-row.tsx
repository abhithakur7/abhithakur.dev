'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useRef, type CSSProperties } from 'react';

type Props = {
  index: number;
  slug: string;
  title: string;
  tagline: string;
  stack: readonly string[];
};

export function WorkRow({ index, slug, title, tagline, stack }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      href={`/work/${slug}`}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
      }}
      className="group relative grid grid-cols-12 items-baseline gap-6 py-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:py-10"
      style={{ '--mx': '50%', '--my': '50%' } as CSSProperties}
    >
      {/* spotlight that follows cursor — appears on hover, fades out smoothly */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -mx-4 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx) var(--my), color-mix(in oklch, var(--color-accent) 14%, transparent), transparent 55%)',
        }}
      />

      <span className="relative col-span-2 font-mono text-xs uppercase tracking-widest text-muted-foreground tabular-nums sm:col-span-1">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="relative col-span-10 sm:col-span-7">
        <h3 className="font-display text-3xl font-medium tracking-tight transition-colors group-hover:text-accent sm:text-4xl">
          {title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {tagline}
        </p>
      </div>
      <div className="relative col-span-12 flex items-center justify-between gap-4 sm:col-span-4 sm:justify-end">
        <ul className="flex flex-wrap gap-1.5 sm:justify-end">
          {stack.slice(0, 3).map((s) => (
            <li
              key={s}
              className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {s}
            </li>
          ))}
        </ul>
        <ArrowUpRight
          className="size-5 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          aria-hidden
        />
      </div>
    </Link>
  );
}
