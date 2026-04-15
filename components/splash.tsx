"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "splash:seen";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_DOOR = [0.85, 0, 0.15, 1] as const;

/** Total time on screen before the doors begin to part. */
const DWELL_MS = 1700;

/**
 * Splash strategy
 * ---------------
 * The splash markup is rendered as part of the static HTML so it's
 * present on the very first paint — no FOUC of the page → splash → page.
 *
 * Before any stylesheet loads, an inline <head> script adds
 * `html.splash-skip` if the visitor has seen it this session OR opted
 * into reduced motion. CSS then hides `[data-splash]` instantly — those
 * users never see it, no flash.
 *
 * On the client we mirror that decision in React state, run the exit
 * animation on a timer (or on tap to skip), and unmount on completion.
 */
export function Splash() {
  // Default to visible — this state is what the SSR'd HTML reflects.
  // The inline head script + CSS will hide [data-splash] for skip cases
  // before paint, so an initial true here doesn't cause a flash for them.
  const [show, setShow] = useState(true);

  // On mount, mirror the head-script decision (it has already added
  // `html.splash-skip` if reduced motion or seen-this-session). Defer the
  // setState via a microtask so it's not synchronous inside the effect
  // body — React flags that pattern as a cascading render.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const skip = document.documentElement.classList.contains("splash-skip");
    if (skip) {
      queueMicrotask(() => setShow(false));
      return;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // sessionStorage may throw in private mode — non-fatal.
    }
  }, []);

  // Once playing, schedule the exit.
  useEffect(() => {
    if (!show) return;
    const t = window.setTimeout(() => setShow(false), DWELL_MS);
    return () => window.clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          data-splash
          aria-hidden
          className="fixed inset-0 z-100 cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.7 } }}
          onClick={() => setShow(false)}
        >
          {/* Top door panel — slides up on exit */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-background"
            initial={{ y: 0 }}
            exit={{
              y: "-100%",
              transition: { duration: 0.85, ease: EASE_DOOR },
            }}
          />
          {/* Bottom door panel — slides down on exit */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
            initial={{ y: 0 }}
            exit={{
              y: "100%",
              transition: { duration: 0.85, ease: EASE_DOOR },
            }}
          />

          {/* Hairline crack at the seam */}
          <motion.div
            className="absolute left-0 right-0 top-1/2 z-1 h-px -translate-y-px bg-border"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            exit={{ opacity: 0 }}
          />

          {/* Mono caption — top */}
          <motion.p
            className="absolute left-0 right-0 top-8 z-2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:top-10"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: EASE_OUT_EXPO }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            Abhishek Thakur · §
          </motion.p>

          {/* Mono caption — bottom */}
          <motion.p
            className="absolute bottom-8 left-0 right-0 z-2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:bottom-10"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: EASE_OUT_EXPO }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            Tap anywhere to enter
          </motion.p>

          {/* The § "key" — sits at centre, lands, then turns 90° like a lock */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2"
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
            className="absolute inset-0 z-2 bg-accent"
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
