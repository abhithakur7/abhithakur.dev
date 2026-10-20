'use client';
import { useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { STACK_GROUPS } from '@/lib/stack';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&-';
const TICK_MS = 50;

/**
 * A row of split-flap cells. When `active` turns on, every cell spins
 * through random glyphs and lands on its letter, later cells landing later.
 * Glyphs are written to the DOM directly; React renders the cells once.
 */
function Flaps({ text, active, delay, size }: { text: string; active: boolean; delay: number; size: 'lg' | 'sm' }) {
  const ref = useRef<HTMLSpanElement>(null);
  const chars = text.toUpperCase().split('');

  useEffect(() => {
    const root = ref.current;
    if (!root || !active) return;
    const cells = Array.from(root.querySelectorAll<HTMLSpanElement>('[data-cell]'));
    const flips = cells.map((_, i) => 3 + i + Math.floor(Math.random() * 3));
    let tick = 0;
    let timer = 0;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        tick++;
        let busy = false;
        cells.forEach((cell, i) => {
          const target = cell.dataset.char ?? '';
          const left = (flips[i] ?? 0) - tick;
          if (left > 0) {
            busy = true;
            cell.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? target;
            cell.dataset.flip = String(tick % 2);
          } else if (cell.textContent !== target) {
            cell.textContent = target;
            cell.dataset.flip = String(tick % 2);
          }
        });
        if (!busy) window.clearInterval(timer);
      }, TICK_MS);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [active, delay]);

  const cell =
    size === 'lg'
      ? 'h-[1.35em] w-[0.95em] text-[clamp(1.6rem,5.2vw,3.6rem)]'
      : 'h-[1.5em] w-[1.05em] text-[13px] sm:text-[15px]';

  return (
    <span ref={ref} aria-hidden className="inline-flex gap-[3px]">
      {chars.map((ch, i) =>
        ch === ' ' ? (
          <span key={i} className={`${cell} inline-block`} />
        ) : (
          <span
            key={i}
            data-cell
            data-char={ch}
            className={`flap-cell ${cell} relative inline-flex items-center justify-center rounded-[3px] bg-[#2a2b33] font-print font-bold text-canary`}
          >
            {active ? ' ' : ch}
          </span>
        ),
      )}
    </span>
  );
}

/**
 * The stack as a split-flap departures board. The heading and each group
 * label flip into place when the board scrolls into view; the items under
 * each label are plain text so they stay readable and searchable.
 */
export function FlapBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  const active = seen && !reduced;

  return (
    <div
      ref={ref}
      data-fall
      className="rounded-[22px] bg-[#1b1a21] p-6 text-[#ecede6] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/5 sm:p-10"
    >
      <h2 className="leading-none">
        <span className="sr-only">The stack</span>
        <Flaps text="The stack" active={active} delay={0} size="lg" />
      </h2>

      <dl className="mt-10 grid gap-x-10 gap-y-5 lg:grid-cols-2">
        {STACK_GROUPS.map((g, i) => (
          <div key={g.label} className="grid gap-2 sm:grid-cols-[15.5rem_minmax(0,1fr)] sm:items-start sm:gap-4">
            <dt>
              <span className="sr-only">{g.label}</span>
              <Flaps text={g.label} active={active} delay={250 + i * 70} size="sm" />
            </dt>
            <dd className="text-[15px] leading-relaxed text-[#ecede6]/85 sm:pt-0.5">{g.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
