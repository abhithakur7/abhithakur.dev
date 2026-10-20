'use client';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export type Docket = {
  slug: string;
  title: string;
  tagline: string;
  stack: readonly string[];
  role: string;
  timeframe: string;
};

// Kitchen-docket stock rotates through the three invoice-book colours.
const STOCK = [
  'bg-sheet text-foreground',
  'bg-canary text-[#1b1a21]',
  'bg-pink text-[#1b1a21]',
] as const;

function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return match;
}

/**
 * Projects hang on a rail like kitchen dockets. On wide screens the section
 * pins and vertical scroll slides the rail sideways; the dockets swing with
 * scroll velocity. Narrow screens and reduced motion get a plain stack.
 */
export function DocketRail({ items, header }: { items: Docket[]; header: React.ReactNode }) {
  const reduced = useReducedMotion();
  const wide = useMedia('(min-width: 1024px)');
  const pinned = wide && !reduced;

  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!pinned || !track.current) return;
    const el = track.current;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 48));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const velocity = useVelocity(scrollYProgress);
  const swing = useSpring(useTransform(velocity, [-1.2, 0, 1.2], [14, 0, -14], { clamp: true }), {
    stiffness: 90,
    damping: 7,
    mass: 0.7,
  });

  if (!pinned) {
    return (
      <div ref={section} className="relative mx-auto max-w-6xl px-6">
        {header}
        <ol className="grid gap-10 md:grid-cols-2">
          {items.map((d, i) => (
            <li key={d.slug} data-fall style={{ rotate: `${i % 2 ? 1.2 : -1}deg` }}>
              <DocketCard docket={d} index={i} />
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div ref={section} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6">{header}</div>
        <div className="relative">
          {/* The rail */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-[6px] bg-foreground/85 shadow-[0_3px_0_rgb(0_0_0/0.15)]" />
          <motion.ol
            ref={track}
            style={{ x }}
            className="flex w-max gap-12 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pr-24"
          >
            {items.map((d, i) => (
              <SwingingDocket key={d.slug} docket={d} index={i} swing={swing} />
            ))}
          </motion.ol>
        </div>
      </div>
    </div>
  );
}

function SwingingDocket({ docket, index, swing }: { docket: Docket; index: number; swing: MotionValue<number> }) {
  // Each docket hangs a little differently so the rail doesn't move in lockstep.
  const factor = 0.75 + (index % 3) * 0.2;
  const rotate = useTransform(swing, (v) => v * factor + (index % 2 ? 1.5 : -1.5));
  return (
    <motion.li data-fall style={{ rotate, transformOrigin: '50% 0%' }} className="w-[440px] shrink-0 xl:w-[480px]">
      {/* Clip holding the docket to the rail */}
      <div aria-hidden className="mx-auto -mb-2 h-7 w-16 rounded-b-md bg-foreground/80" />
      <DocketCard docket={docket} index={index} />
    </motion.li>
  );
}

function DocketCard({ docket, index }: { docket: Docket; index: number }) {
  const stock = STOCK[index % STOCK.length];
  return (
    <Link
      href={`/work/${docket.slug}`}
      className={`group relative block ${stock} px-7 pb-7 pt-7 shadow-[0_22px_36px_-22px_rgb(0_0_0/0.5)] transition-transform duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent`}
    >
      <div className="flex justify-between gap-3 font-print text-[10px] uppercase tracking-wider opacity-90">
        <span>{docket.timeframe}</span>
        <span className="text-right">{docket.role}</span>
      </div>
      <div aria-hidden className="my-4 border-t-2 border-dashed border-current opacity-30" />
      <h3 className="font-display text-[clamp(2.4rem,3.6vw,3.4rem)] uppercase leading-[0.88]">{docket.title}</h3>
      <p className="mt-4 text-lg leading-snug">{docket.tagline}</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-0.5 font-print text-[11px]">
        {docket.stack.slice(0, 4).map((s) => (
          <li key={s} className="flex gap-2">
            <span className="opacity-80">1 ×</span>
            {s}
          </li>
        ))}
      </ul>
      <div aria-hidden className="my-4 border-t-2 border-dashed border-current opacity-30" />
      <p className="font-print text-[12px] font-bold uppercase tracking-wider underline-offset-4 group-hover:underline">
        Read the case study
      </p>
    </Link>
  );
}
