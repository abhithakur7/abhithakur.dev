'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

type Pillar = { title: string; description: string };

const COPIES = [
  { label: 'Customer copy', stock: 'bg-sheet text-foreground' },
  { label: 'Office copy', stock: 'bg-canary text-[#1b1a21]' },
  { label: 'File copy', stock: 'bg-pink text-[#1b1a21]' },
] as const;

/**
 * Three pillars as the three copies of an invoice book. The top copy can be
 * flicked off and slides back in at the bottom of the pile.
 */
export function Triplicate({ pillars }: { pillars: Pillar[] }) {
  const reduced = useReducedMotion();
  const [order, setOrder] = useState(() => pillars.map((_, i) => i));
  const [leaving, setLeaving] = useState<number | null>(null);

  const next = () => {
    if (leaving !== null) return;
    if (reduced) {
      setOrder(([first, ...rest]) => (first === undefined ? rest : [...rest, first]));
      return;
    }
    setLeaving(order[0] ?? null);
  };

  return (
    <div data-fall className="relative">
      <ol className="relative h-[360px] sm:h-[330px]" aria-label="What I do">
        {pillars.map((p, i) => {
          const pos = order.indexOf(i);
          const copy = COPIES[i % COPIES.length] ?? COPIES[0];
          const isLeaving = leaving === i;
          return (
            <motion.li
              key={p.title}
              aria-current={pos === 0 ? 'true' : undefined}
              className={`absolute inset-0 flex cursor-pointer flex-col p-7 shadow-[0_26px_40px_-26px_rgb(0_0_0/0.55)] sm:p-9 ${copy.stock}`}
              style={{ zIndex: isLeaving ? 10 : 3 - pos }}
              initial={false}
              animate={
                isLeaving
                  ? { x: '75%', y: -40, rotate: 14 }
                  : { x: pos * 16, y: pos * 14, rotate: pos === 0 ? -1.2 : pos * 1.8, scale: 1 - pos * 0.025 }
              }
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              onAnimationComplete={() => {
                if (!isLeaving) return;
                setOrder(([first, ...rest]) => (first === undefined ? rest : [...rest, first]));
                setLeaving(null);
              }}
              onClick={pos === 0 ? next : undefined}
            >
              <div className="flex items-baseline justify-between font-print text-[10px] uppercase tracking-[0.18em] opacity-90">
                <span>Invoice</span>
                <span>{copy.label}</span>
              </div>
              <h3 className="font-display mt-auto text-[clamp(1.9rem,4vw,2.8rem)] uppercase leading-[0.92]">
                {p.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed">{p.description}</p>
            </motion.li>
          );
        })}
      </ol>
      <button
        type="button"
        onClick={next}
        className="mt-10 inline-flex h-11 items-center rounded-full border-2 border-foreground px-5 text-sm font-semibold hover:bg-canary hover:text-[#1b1a21] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Next copy
      </button>
    </div>
  );
}
