import type { ReactNode } from 'react';

export function DiagramFrame({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="not-prose my-12 overflow-hidden rounded-xl border border-border bg-background">
      <figcaption className="border-b border-border bg-muted/40 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {caption}
      </figcaption>
      <div className="overflow-x-auto p-6 sm:p-8">{children}</div>
    </figure>
  );
}
