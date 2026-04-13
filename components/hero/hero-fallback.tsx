export function HeroFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10"
      style={{
        background:
          'radial-gradient(ellipse at top, color-mix(in oklch, var(--color-accent) 15%, transparent), transparent 60%)',
      }}
    />
  );
}
