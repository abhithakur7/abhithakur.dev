'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

const HeroMesh = dynamic(() => import('./hero-mesh'), { ssr: false });

export function HeroMeshClient() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void) => number;
      };
    const idle =
      typeof w.requestIdleCallback === 'function'
        ? w.requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 500);
    const id = idle(() => setMounted(true));
    return () => {
      if (typeof w.cancelIdleCallback === 'function' && typeof id === 'number') {
        (w as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
      }
    };
  }, []);
  if (!mounted || reduced) return null;
  return <HeroMesh />;
}
