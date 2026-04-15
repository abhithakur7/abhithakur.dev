'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

function Letters({
  text,
  baseDelay = 0,
  italic = false,
  italicSettings,
}: {
  text: string;
  baseDelay?: number;
  italic?: boolean;
  italicSettings?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={italic ? 'italic' : undefined} style={italic ? italicSettings : undefined}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden
          className="inline-block transition-[font-variation-settings] duration-300 ease-out hover:[font-variation-settings:'WONK'_1,'SOFT'_100]"
          initial={reduced ? false : { opacity: 0, y: '0.45em' }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={
            reduced
              ? undefined
              : { duration: 0.7, ease: EASE, delay: baseDelay + i * 0.04 }
          }
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroName() {
  return (
    <h1 className="font-display mt-7 text-balance text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl lg:text-[8rem]">
      <span className="sr-only">Abhishek Thakur.</span>
      <span aria-hidden className="block">
        <Letters text="Abhishek" />
      </span>
      <span aria-hidden className="block">
        <Letters
          text="Thakur."
          baseDelay={0.32}
          italic
          italicSettings={{ fontVariationSettings: '"WONK" 1, "SOFT" 100' }}
        />
      </span>
    </h1>
  );
}
