export function SectionHeader({
  title,
  description,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <header data-fall className="mb-12 sm:mb-16">
      <h2 className="font-display text-balance text-[clamp(2.4rem,6vw,4.75rem)] uppercase leading-[0.9]">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
