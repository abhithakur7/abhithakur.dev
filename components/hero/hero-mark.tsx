/*
 * Hero centrepiece — "orbital compass".
 * A nested set of rings, ticks, arcs and a glyph. Engineering + editorial:
 * reads as a compass rose / blueprint reference mark / typographic seal.
 *
 * All static SVG with CSS keyframe rotations on a few sub-groups —
 * no R3F, no three.js, no JS animation loop, ~3KB on the wire.
 * Honours prefers-reduced-motion (animations stop, mark stays).
 */

const TICKS_24 = Array.from({ length: 24 }, (_, i) => i * 15);
const TICKS_4 = [0, 90, 180, 270];

export function HeroMark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <style>{`
        @keyframes hero-spin-cw  { to { transform: rotate(360deg); } }
        @keyframes hero-spin-ccw { to { transform: rotate(-360deg); } }
        .hero-spin-cw  { transform-box: fill-box; transform-origin: center; animation: hero-spin-cw  120s linear infinite; }
        .hero-spin-ccw { transform-box: fill-box; transform-origin: center; animation: hero-spin-ccw 90s  linear infinite; }
        .hero-spin-fast{ transform-box: fill-box; transform-origin: center; animation: hero-spin-cw  40s  linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-spin-cw, .hero-spin-ccw, .hero-spin-fast { animation: none; }
        }
      `}</style>

      <svg
        viewBox="-300 -300 600 600"
        className="h-[min(82vh,720px)] w-[min(82vh,720px)] text-foreground opacity-90"
        fill="none"
      >
        {/* Faint outer ring — 280r */}
        <circle cx="0" cy="0" r="280" stroke="currentColor" strokeOpacity={0.07} strokeWidth={0.6} />

        {/* Outer ring with 24 ticks — slow CW spin */}
        <g className="hero-spin-cw">
          <circle cx="0" cy="0" r="240" stroke="currentColor" strokeOpacity={0.18} strokeWidth={0.7} strokeDasharray="2 4" />
          {TICKS_24.map((deg) => (
            <line
              key={deg}
              x1={0}
              y1={-240}
              x2={0}
              y2={-232}
              stroke="currentColor"
              strokeOpacity={0.35}
              strokeWidth={0.8}
              transform={`rotate(${deg})`}
            />
          ))}
          {TICKS_4.map((deg) => (
            <line
              key={`a-${deg}`}
              x1={0}
              y1={-244}
              x2={0}
              y2={-228}
              stroke="var(--color-accent)"
              strokeOpacity={0.85}
              strokeWidth={1.2}
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* Mid ring — solid, half-opacity */}
        <circle cx="0" cy="0" r="180" stroke="currentColor" strokeOpacity={0.22} strokeWidth={0.8} />

        {/* Three concentric arcs — counter-spin */}
        <g className="hero-spin-ccw">
          <circle cx="0" cy="0" r="160" stroke="currentColor" strokeOpacity={0.4} strokeWidth={1} strokeDasharray="180 80" />
          <circle cx="0" cy="0" r="120" stroke="currentColor" strokeOpacity={0.55} strokeWidth={1} strokeDasharray="120 60" />
          <circle cx="0" cy="0" r="80"  stroke="currentColor" strokeOpacity={0.75} strokeWidth={1.2} strokeDasharray="60 40" />
        </g>

        {/* Crosshair guides — static */}
        <g stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.6} strokeDasharray="3 6">
          <line x1={-280} y1={0} x2={280} y2={0} />
          <line x1={0} y1={-280} x2={0} y2={280} />
        </g>

        {/* Inner orbital — fast CW */}
        <g className="hero-spin-fast">
          <circle
            cx="0"
            cy="-50"
            r="3"
            fill="var(--color-accent)"
          />
          <circle cx="0" cy="0" r="50" stroke="currentColor" strokeOpacity={0.3} strokeWidth={0.8} />
        </g>

        {/* Centre seal — § with the same WONK + SOFT axes used in the bg watermark */}
        <text
          x="0"
          y="0"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-display), Georgia, serif"
          fontSize="56"
          fontWeight="500"
          fill="var(--color-foreground)"
          fillOpacity={0.85}
          style={{ fontVariationSettings: '"WONK" 1, "SOFT" 100' }}
        >
          §
        </text>

        {/* Tiny mono labels at four cardinals — index 01..04 like a chapter compass */}
        {[
          { label: 'N', x: 0,    y: -266 },
          { label: 'E', x: 266,  y: 0    },
          { label: 'S', x: 0,    y: 266  },
          { label: 'W', x: -266, y: 0    },
        ].map((c) => (
          <text
            key={c.label}
            x={c.x}
            y={c.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="10"
            letterSpacing="2"
            fill="currentColor"
            fillOpacity={0.55}
          >
            {c.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
