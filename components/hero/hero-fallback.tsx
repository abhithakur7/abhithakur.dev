/*
 * Hero background: editorial drafting paper.
 * - warm dual-spot light (top-left + bottom-right)
 * - dot grid masked to fade toward the centre where the H1 lives
 * - subtle SVG grain for paper texture
 * - massive serif "§" watermark anchored to the bottom-right
 * All layers are pointer-events-none, theme-token driven, and respect
 * prefers-reduced-motion (no animation here — pure static composition).
 */

const GRAIN_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>`,
)}`;

export function HeroFallback() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Layer 1 — warm dual-spot lighting */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(60% 50% at 12% 0%, color-mix(in oklch, var(--color-accent) 18%, transparent), transparent 60%)',
            'radial-gradient(50% 50% at 100% 100%, color-mix(in oklch, var(--color-accent) 10%, transparent), transparent 65%)',
          ].join(', '),
        }}
      />

      {/* Layer 2 — dot grid (drafting paper) masked to fade toward middle */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(color-mix(in oklch, var(--color-foreground) 28%, transparent) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 25%, black 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 25%, black 90%)',
          opacity: 0.35,
        }}
      />

      {/* Layer 3 — paper grain */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-multiply dark:opacity-[0.10] dark:mix-blend-overlay"
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Layer 4 — massive serif watermark, bottom-right */}
      <div
        className="font-display absolute -right-6 -bottom-16 select-none text-[22rem] leading-none text-foreground/[0.04] sm:text-[32rem]"
        style={{ fontVariationSettings: '"WONK" 1, "SOFT" 100' }}
      >
        §
      </div>
    </div>
  );
}
