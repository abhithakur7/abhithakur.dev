'use client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'splash:seen';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_DOOR = [0.85, 0, 0.15, 1] as const;

/** Total time on screen before the doors begin to part. */
const DWELL_MS = 1700;

export function Splash() {
  const reduced = useReducedMotion();
  // null = decision not yet made (SSR / first paint), true = playing, false = gone
  const [show, setShow] = useState<boolean | null>(null);

  // Decide on mount whether to play the splash this session.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reduced || sessionStorage.getItem(STORAGE_KEY)) {
      setShow(false);
      return;
    }
    setShow(true);
    sessionStorage.setItem(STORAGE_KEY, '1');
  }, [reduced]);

  // Once playing, schedule the exit.
  useEffect(() => {
    if (show !== true) return;
    const t = window.setTimeout(() => setShow(false), DWELL_MS);
    return () => window.clearTimeout(t);
  }, [show]);

  // During SSR + first effect tick, render nothing so the splash doesn't
  // flash on visits that won't show it (already-seen, reduced-motion).
  if (show === null) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          aria-hidden
          className="fixed inset-0 z-[100] cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.7 } }}
          onClick={() => setShow(false)}
        >
          {/* Top door panel — slides up on exit */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-background"
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.85, ease: EASE_DOOR } }}
          />
          {/* Bottom door panel — slides down on exit */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
            initial={{ y: 0 }}
            exit={{ y: '100%', transition: { duration: 0.85, ease: EASE_DOOR } }}
          />

          {/* Hairline crack at the seam */}
          <motion.div
            className="absolute left-0 right-0 top-1/2 z-[1] h-px -translate-y-px bg-border"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            exit={{ opacity: 0 }}
          />

          {/* Mono caption — top */}
          <motion.p
            className="absolute left-0 right-0 top-8 z-[2] text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:top-10"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: EASE_OUT_EXPO }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            Abhishek Thakur · § 01
          </motion.p>

          {/* Mono caption — bottom */}
          <motion.p
            className="absolute bottom-8 left-0 right-0 z-[2] text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:bottom-10"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: EASE_OUT_EXPO }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            Tap anywhere to enter
          </motion.p>

          {/* The § "key" — sits at centre, lands, then turns 90° like a lock */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
            animate={{
              scale: [0.6, 1.05, 1, 1, 1],
              opacity: [0, 1, 1, 1, 1],
              rotate: [-15, 0, 0, 90, 90],
            }}
            transition={{
              duration: 1.45,
              ease: EASE_OUT_EXPO,
              times: [0, 0.25, 0.55, 0.85, 1],
            }}
            exit={{
              scale: 0.85,
              opacity: 0,
              transition: { duration: 0.4, ease: EASE_OUT_EXPO },
            }}
          >
            <span
              className="font-display block text-foreground text-[10rem] leading-none sm:text-[14rem]"
              style={{ fontVariationSettings: '"WONK" 1, "SOFT" 100' }}
            >
              §
            </span>
          </motion.div>

          {/* Brief warm flash at the moment the key finishes turning */}
          <motion.div
            className="absolute inset-0 z-[2] bg-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.18, 0] }}
            transition={{ duration: 1.45, times: [0, 0.78, 0.86, 0.95] }}
            exit={{ opacity: 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
