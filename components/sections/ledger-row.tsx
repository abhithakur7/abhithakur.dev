'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const SLAM_DELAY = 0.2;

/**
 * One ledger entry. As it enters view a rubber stamp drops onto it and the
 * row jolts from the impact.
 */
export function LedgerRow({ stamp, current, children }: { stamp: string; current: boolean; children: ReactNode }) {
  const reduced = useReducedMotion();
  const viewport = { once: true, amount: 0.6 } as const;

  return (
    <motion.li
      data-fall
      className="relative grid gap-3 border-t-2 border-foreground py-10 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-10"
      initial={false}
      whileInView={reduced ? undefined : { x: [0, 0, -5, 4, -2, 0], y: [0, 0, 3, -1, 0, 0] }}
      viewport={viewport}
      transition={{ duration: 0.45, delay: SLAM_DELAY, times: [0, 0.3, 0.45, 0.6, 0.8, 1] }}
    >
      {children}
      {/* Decorative stamp: text lives in CSS so it isn't read or contrast-checked as content. */}
      <motion.span
        aria-hidden
        data-stamp={stamp}
        className={`pointer-events-none absolute right-0 top-8 select-none border-[3px] px-3 py-1 font-print text-sm font-extrabold uppercase tracking-[0.22em] before:content-[attr(data-stamp)] sm:right-4 sm:top-10 sm:text-base ${
          current ? 'border-accent text-accent' : 'border-[#d23a5c] text-[#d23a5c] dark:border-pink dark:text-pink'
        }`}
        style={{ rotate: current ? -7 : 9 }}
        initial={reduced ? { opacity: 0.85 } : { opacity: 0, scale: 2.6 }}
        whileInView={{ opacity: 0.85, scale: 1 }}
        viewport={viewport}
        transition={{ delay: SLAM_DELAY, type: 'spring', stiffness: 700, damping: 26 }}
      />
    </motion.li>
  );
}
