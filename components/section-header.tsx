export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <header className="mb-14 sm:mb-20">
      <div className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span aria-hidden className="tabular-nums">
          {index}
        </span>
        <span aria-hidden className="h-px flex-1 bg-border" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-display mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
