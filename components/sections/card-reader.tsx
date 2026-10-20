'use client';
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const MAILTO = 'mailto:hi@abhithakur.dev';
const TOO_SLOW_MS = 2500;

type Status = 'idle' | 'reading' | 'approved' | 'short' | 'slow';

const LCD: Record<Status, string> = {
  idle: 'SWIPE TO EMAIL',
  reading: 'READING...',
  approved: 'APPROVED. OPENING MAIL',
  short: 'SWIPE ALL THE WAY',
  slow: 'TOO SLOW. AGAIN?',
};

/**
 * A card reader. Drag the card through the slot and, if the swipe is clean,
 * it opens a new email. Keyboard and reduced-motion users press the card
 * and it swipes itself.
 */
export function CardReader() {
  const reduced = useReducedMotion();
  const slot = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const [max, setMax] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const started = useRef(0);
  const dragged = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (!slot.current || !card.current) return;
      setMax(slot.current.clientWidth - card.current.offsetWidth - 16);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const approve = () => {
    setStatus('approved');
    window.setTimeout(() => {
      // Click a real link rather than assigning location, so the browser
      // treats it like any other mailto link.
      const link = document.createElement('a');
      link.href = MAILTO;
      link.click();
      animate(x, 0, { duration: 0.5 });
      setStatus('idle');
    }, 900);
  };

  const reset = (next: Status) => {
    setStatus(next);
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 26 });
  };

  const autoSwipe = async () => {
    if (status === 'approved') return;
    if (reduced) {
      approve();
      return;
    }
    setStatus('reading');
    await animate(x, max, { duration: 0.55, ease: [0.4, 0, 0.2, 1] });
    approve();
  };

  return (
    <div data-fall className="w-full max-w-[460px]">
      <div className="rounded-[22px] bg-foreground p-4 shadow-[0_30px_50px_-30px_rgb(0_0_0/0.6)]">
        <div
          role="status"
          className={`flex h-12 items-center rounded-lg px-4 font-print text-[13px] font-bold tracking-[0.12em] text-[#1b1a21] transition-colors ${
            status === 'approved' ? 'bg-[#9be29b]' : status === 'short' || status === 'slow' ? 'bg-pink' : 'bg-canary'
          }`}
        >
          {LCD[status]}
        </div>

        {/* Slot the card travels along */}
        <div ref={slot} className="relative mt-4 h-[176px] overflow-hidden rounded-xl bg-black/70 p-2 shadow-[inset_0_4px_10px_rgb(0_0_0/0.8)]">
          <div aria-hidden className="absolute inset-x-2 top-1/2 h-px bg-white/10" />
          <motion.button
            ref={card}
            type="button"
            aria-label="Swipe the card to email hi@abhithakur.dev"
            className="relative flex h-full w-[60%] cursor-grab touch-none flex-col justify-between rounded-lg bg-accent p-4 text-left text-accent-foreground shadow-[0_8px_20px_rgb(0_0_0/0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-canary active:cursor-grabbing"
            style={{ x }}
            drag={reduced ? false : 'x'}
            dragConstraints={{ left: 0, right: max }}
            dragElastic={0.04}
            dragMomentum={false}
            onDragStart={() => {
              dragged.current = true;
              started.current = performance.now();
              setStatus('reading');
            }}
            onDragEnd={() => {
              const took = performance.now() - started.current;
              if (x.get() < max * 0.92) reset('short');
              else if (took > TOO_SLOW_MS) reset('slow');
              else approve();
            }}
            onClick={() => {
              if (dragged.current) {
                dragged.current = false;
                return;
              }
              void autoSwipe();
            }}
          >
            <span className="flex items-start justify-between">
              <span aria-hidden className="block h-7 w-10 rounded-md bg-canary/90 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.25)]" />
              <span className="font-print text-[8px] tracking-[0.16em] opacity-80 sm:text-[9px] sm:tracking-[0.2em]">SENIOR / STAFF</span>
            </span>
            <span className="font-print text-[10px] tracking-[0.1em] sm:text-[13px] sm:tracking-[0.14em]">HI@ABHITHAKUR.DEV</span>
            <span className="flex items-end justify-between gap-2 font-print text-[8px] tracking-[0.12em] sm:text-[10px] sm:tracking-[0.16em]">
              <span>ABHISHEK THAKUR</span>
              <span className="opacity-80">VALID THRU OPEN</span>
            </span>
          </motion.button>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        {reduced ? 'Press the card to write an email.' : 'Drag the card across, or press it.'}
      </p>
    </div>
  );
}
