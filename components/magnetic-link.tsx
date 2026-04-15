'use client';
import { useRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  /** Multiplier for cursor pull. 0.25 = subtle, 0.5 = strong. */
  strength?: number;
  /** Px around the element where the magnet activates. */
  radius?: number;
};

export function MagneticLink({
  children,
  strength = 0.22,
  radius = 90,
  className,
  style,
  ...props
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  return (
    <a
      ref={ref}
      className={className}
      style={{
        transition:
          'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms ease, background-color 150ms ease, color 150ms ease',
        ...style,
      }}
      onMouseMove={(e) => {
        if (reduced || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const distance = Math.hypot(dx, dy);
        const max = Math.max(rect.width, rect.height) / 2 + radius;
        if (distance > max) {
          ref.current.style.transform = '';
          return;
        }
        ref.current.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = '';
      }}
      {...props}
    >
      {children}
    </a>
  );
}
