export function computePrevNext(
  slugs: string[],
  current: string,
): { prev: string | null; next: string | null } {
  const idx = slugs.indexOf(current);
  if (idx === -1) return { prev: null, next: null };
  const prev = slugs[(idx - 1 + slugs.length) % slugs.length] ?? null;
  const next = slugs[(idx + 1) % slugs.length] ?? null;
  return { prev, next };
}
