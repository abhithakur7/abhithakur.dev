'use client';
import { useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';

const GRAVITY = 1.1;
const FALL_MS = 2100;

type Body = { el: HTMLElement; top: number; height: number; y: number; vy: number; rot: number; vr: number };

const MESSAGES = {
  idle: "Don't press this",
  falling: 'Production is down. Rolling back…',
  restored: 'Rolled back. Please stop.',
} as const;

/**
 * Drops every [data-fall] block on screen under gravity, lets it bounce on
 * the bottom of the viewport, then "rolls back the deploy" and springs
 * everything home. Hidden for reduced motion.
 */
export function DontPress() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<keyof typeof MESSAGES>('idle');
  const busy = useRef(false);

  if (reduced) return null;

  const collapse = () => {
    if (busy.current) return;
    busy.current = true;
    setPhase('falling');

    const vh = window.innerHeight;
    const bodies: Body[] = [];
    document.querySelectorAll<HTMLElement>('[data-fall]').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      // Nested blocks fall with their parent.
      if (el.parentElement?.closest('[data-fall]')) return;
      el.style.transition = 'none';
      el.style.willChange = 'transform';
      bodies.push({
        el,
        top: r.top,
        height: r.height,
        y: 0,
        vy: -2 - Math.random() * 6,
        rot: 0,
        vr: (Math.random() - 0.5) * 5,
      });
    });

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    const start = performance.now();
    const step = (t: number) => {
      for (const b of bodies) {
        b.vy += GRAVITY;
        b.y += b.vy;
        b.rot += b.vr;
        const floor = vh - b.top - Math.min(b.height, vh * 0.45);
        if (b.y > floor) {
          b.y = floor;
          b.vy *= -0.32;
          b.vr *= 0.55;
        }
        b.el.style.transform = `translateY(${b.y}px) rotate(${b.rot}deg)`;
      }
      if (t - start < FALL_MS) {
        requestAnimationFrame(step);
        return;
      }
      for (const b of bodies) {
        b.el.style.transition = 'transform 900ms cubic-bezier(0.2, 0.9, 0.25, 1.15)';
        b.el.style.transform = '';
      }
      window.setTimeout(() => {
        for (const b of bodies) {
          b.el.style.transition = '';
          b.el.style.willChange = '';
        }
        html.style.overflow = prevOverflow;
        busy.current = false;
        setPhase('restored');
      }, 950);
    };
    requestAnimationFrame(step);
  };

  return (
    <>
      <button
        type="button"
        onClick={collapse}
        className="rounded-full border-2 border-[#d23a5c] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#d23a5c] transition hover:bg-[#d23a5c] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-pink dark:text-pink dark:hover:bg-pink dark:hover:text-[#1b1a21]"
      >
        {phase === 'restored' ? "Seriously, don't" : MESSAGES.idle}
      </button>
      <p
        role="status"
        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-5 py-2.5 font-print text-xs text-background shadow-lg transition-opacity duration-300 ${
          phase === 'falling' ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {phase === 'falling' ? MESSAGES.falling : phase === 'restored' ? MESSAGES.restored : ''}
      </p>
    </>
  );
}
