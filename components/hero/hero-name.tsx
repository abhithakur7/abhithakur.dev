'use client';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const LINES = ['Abhishek', 'Thakur'];

/** How far (px) the cursor's pressure reaches. */
const REACH = 340;
/** The one autopilot pass after the letters land: start delay and length. */
const SWEEP_AT = 1100;
const SWEEP_MS = 2200;
/** After this long without pointer movement the letters relax to rest. */
const IDLE_MS = 2200;

/**
 * The name as a pressure plate: letters near the cursor get wider and
 * heavier through Archivo's wdth / wght axes, letters far away condense.
 * One autopilot pass sweeps across after the letters land, so touch users
 * see it too; after that the name rests until a mouse moves near it.
 * Styles are written straight to the spans inside one rAF loop — no React
 * re-render per frame.
 */
export function HeroName() {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const letters = Array.from(root.querySelectorAll<HTMLSpanElement>('[data-letter]'));
    const state = letters.map(() => ({ w: 100, g: 800 }));
    let centres: { x: number; y: number }[] = [];
    let pointer: { x: number; y: number } | null = null;
    let lastMove = 0;
    let raf = 0;
    let start = 0;
    let running = false;

    const measure = () => {
      letters.forEach((el) => (el.style.fontVariationSettings = ''));
      centres = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY };
      });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer = { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY };
      lastMove = performance.now();
      wake();
    };

    const tick = (t: number) => {
      if (!start) start = t;
      let target: { x: number; y: number } | null = null;
      const since = t - start - SWEEP_AT;
      if (pointer && t - lastMove < IDLE_MS) {
        target = pointer;
      } else if (since > 0 && since < SWEEP_MS) {
        // A single left-to-right pass along the baseline of both lines.
        const box = root.getBoundingClientRect();
        const k = since / SWEEP_MS;
        target = {
          x: box.left + window.scrollX + box.width * (k * 1.3 - 0.15),
          y: box.top + window.scrollY + box.height * (0.25 + 0.5 * k),
        };
      }
      let moving = target !== null || since <= 0;
      letters.forEach((el, i) => {
        const c = centres[i];
        const s = state[i];
        if (!c || !s) return;
        let wTarget = 100;
        let gTarget = 800;
        if (target) {
          const d = Math.hypot(c.x - target.x, c.y - target.y);
          const p = Math.max(0, 1 - d / REACH);
          const eased = p * p * (3 - 2 * p);
          wTarget = 78 + eased * 47;
          gTarget = 520 + eased * 380;
        }
        if (Math.abs(wTarget - s.w) > 0.2 || Math.abs(gTarget - s.g) > 1) moving = true;
        s.w += (wTarget - s.w) * 0.12;
        s.g += (gTarget - s.g) * 0.12;
        el.style.fontVariationSettings = `"wdth" ${s.w.toFixed(1)}, "wght" ${s.g.toFixed(0)}`;
      });
      // Stop the loop once everything has settled; the next mouse move wakes it.
      if (moving) raf = requestAnimationFrame(tick);
      else running = false;
    };

    const wake = () => {
      if (running || centres.length === 0) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    void document.fonts.ready.then(() => {
      measure();
      wake();
    });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', measure);
    };
  }, [reduced]);

  let n = 0;
  return (
    <h1
      ref={ref}
      className="font-display mt-6 select-none text-[clamp(3.1rem,10.5vw,7.6rem)] uppercase leading-[0.86]"
    >
      <span className="sr-only">Abhishek Thakur</span>
      {LINES.map((line) => (
        <span key={line} aria-hidden className="block whitespace-nowrap">
          {line.split('').map((ch) => {
            const i = n++;
            return (
              <span
                key={i}
                data-letter
                className="hero-letter inline-block"
                style={{ animationDelay: `${120 + i * 55}ms` }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
