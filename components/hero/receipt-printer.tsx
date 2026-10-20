'use client';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Line =
  | { kind: 'title'; text: string }
  | { kind: 'center'; text: string }
  | { kind: 'row'; left: string; right: string; strong?: boolean }
  | { kind: 'rule' }
  | { kind: 'barcode' };

const STARTED = new Date(2021, 9, 1);
const LINE_MS = 85;

function receiptLines(order: number, date: string): Line[] {
  const years = Math.floor((Date.now() - STARTED.getTime()) / (365.25 * 864e5));
  return [
    { kind: 'title', text: 'ABHISHEK THAKUR' },
    { kind: 'center', text: 'full-stack engineer' },
    { kind: 'center', text: 'Chandigarh, IN / remote' },
    { kind: 'rule' },
    { kind: 'row', left: `ORDER #${order}`, right: date },
    { kind: 'rule' },
    { kind: 'row', left: '1 lead, Kinetichex', right: 'now' },
    { kind: 'row', left: '1 team lead, Bizdesire', right: '24-26' },
    { kind: 'row', left: '2 solo products', right: 'shipped' },
    { kind: 'row', left: '1 Stripe payout flow', right: 'settled' },
    { kind: 'row', left: '1 stuck "processing"', right: 'fixed' },
    { kind: 'rule' },
    { kind: 'row', left: 'YEARS SHIPPING', right: String(years), strong: true },
    { kind: 'row', left: 'OPEN TO', right: 'SENIOR/STAFF', strong: true },
    { kind: 'rule' },
    { kind: 'barcode' },
    { kind: 'center', text: 'hi@abhithakur.dev' },
  ];
}

function newOrder() {
  return 1000 + Math.floor(Math.random() * 9000);
}

function today() {
  return new Date()
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
    .toUpperCase();
}

// Zigzag edges: bottom always (the last tear), top once it's torn off.
const TEETH = 22;
function zigzag(top: boolean) {
  const pts: string[] = [];
  for (let i = 0; i <= TEETH; i++) {
    pts.push(`${((i / TEETH) * 100).toFixed(2)}% ${top && i % 2 ? '7px' : '0px'}`);
  }
  for (let i = TEETH; i >= 0; i--) {
    pts.push(`${((i / TEETH) * 100).toFixed(2)}% calc(100% - ${i % 2 ? 0 : 7}px)`);
  }
  return `polygon(${pts.join(',')})`;
}
const CLIP_HANGING = zigzag(false);
const CLIP_TORN = zigzag(true);

// A fixed bar pattern so the barcode reads the same on server and client.
const BARS = [3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 2, 1, 1, 3, 1, 2, 1, 1, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1];

export function ReceiptPrinter() {
  const reduced = useReducedMotion();
  const controls = useAnimationControls();
  const [order, setOrder] = useState(4821);
  const [date, setDate] = useState('20 OCT 26');
  const [printed, setPrinted] = useState(0);
  const [phase, setPhase] = useState<'printing' | 'hanging' | 'falling'>('printing');
  const [pulling, setPulling] = useState(false);

  const lines = useMemo(() => receiptLines(order, date), [order, date]);

  useEffect(() => {
    queueMicrotask(() => {
      setOrder(newOrder());
      setDate(today());
    });
  }, []);

  useEffect(() => {
    if (phase !== 'printing') return;
    if (reduced) {
      queueMicrotask(() => {
        setPrinted(lines.length);
        setPhase('hanging');
      });
      return;
    }
    if (printed >= lines.length) {
      queueMicrotask(() => setPhase('hanging'));
      return;
    }
    const t = window.setTimeout(() => setPrinted((p) => p + 1), printed === 0 ? 700 : LINE_MS);
    return () => window.clearTimeout(t);
  }, [phase, printed, lines.length, reduced]);

  const tear = useCallback(async () => {
    if (phase !== 'hanging') return;
    if (!reduced) {
      setPhase('falling');
      const dir = Math.random() > 0.5 ? 1 : -1;
      await controls.start({
        y: window.innerHeight * 1.1,
        x: dir * (40 + Math.random() * 120),
        rotate: dir * (20 + Math.random() * 40),
        transition: { duration: 1.1, ease: [0.5, 0, 0.9, 0.5] },
      });
      controls.set({ x: 0, y: 0, rotate: 0 });
    }
    setOrder(newOrder());
    setPrinted(0);
    setPhase('printing');
  }, [controls, phase, reduced]);

  const printing = phase === 'printing' && printed < lines.length;

  return (
    <div data-fall className="relative mx-auto w-full max-w-[320px] lg:mx-0 lg:mt-10">
      {/* Printer body */}
      <motion.div
        className="relative z-10 h-[74px] rounded-[18px] bg-foreground px-5 pt-3 shadow-[0_18px_30px_-18px_rgb(0_0_0/0.5)]"
        animate={printing ? { x: [0, -0.6, 0.6, 0] } : { x: 0 }}
        transition={printing ? { duration: 0.12, repeat: Infinity } : undefined}
      >
        <div className="flex items-center justify-between font-print text-[9px] tracking-[0.18em] text-background/70">
          <span>AT-21 THERMAL</span>
          <span
            aria-hidden
            className={`size-2 rounded-full ${printing ? 'animate-pulse bg-canary' : 'bg-background/40'}`}
          />
        </div>
        {/* Paper slot */}
        <div className="absolute inset-x-4 bottom-3 h-[7px] rounded-full bg-black/80 shadow-[inset_0_2px_3px_rgb(0_0_0/0.8)]" />
      </motion.div>

      {/* Receipt — hangs from the slot, drag it down to tear it off */}
      <motion.div
        aria-label="Receipt"
        className="relative z-[5] mx-auto -mt-[14px] w-[272px] touch-none"
        drag={phase === 'hanging' && !reduced ? 'y' : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.05, bottom: 0.55 }}
        onDragStart={() => setPulling(true)}
        onDragEnd={(_, info) => {
          setPulling(false);
          if (info.offset.y > 70 || info.velocity.y > 600) void tear();
        }}
        animate={controls}
        style={{ cursor: phase === 'hanging' && !reduced ? 'grab' : undefined }}
        whileDrag={{ cursor: 'grabbing' }}
      >
        <div
          className="bg-sheet px-5 pb-6 pt-7 font-print text-[10.5px] leading-[1.55] text-foreground shadow-[0_24px_40px_-24px_rgb(0_0_0/0.45)]"
          style={{ clipPath: phase === 'falling' ? CLIP_TORN : CLIP_HANGING }}
        >
          {lines.slice(0, printed).map((l, i) => (
            <ReceiptLine key={`${order}-${i}`} line={l} />
          ))}
          {printed === 0 && <div className="h-6" />}
        </div>
      </motion.div>

      <div
        className={`mt-4 flex h-6 items-center justify-center gap-3 text-xs text-muted-foreground transition-opacity ${pulling ? 'opacity-0' : ''}`}
      >
        {phase === 'hanging' && (
          <>
            <span className="hidden sm:inline">{reduced ? '' : 'Pull the receipt down to tear it off'}</span>
            <button
              type="button"
              onClick={() => void tear()}
              className="rounded-sm underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {reduced ? 'Print another' : 'Tear off'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ReceiptLine({ line }: { line: Line }) {
  switch (line.kind) {
    case 'title':
      return (
        <p className="text-center text-[13px] font-bold tracking-[0.12em]" style={{ fontVariationSettings: '"wdth" 112' }}>
          {line.text}
        </p>
      );
    case 'center':
      return <p className="text-center">{line.text}</p>;
    case 'rule':
      return <p aria-hidden className="my-1 overflow-hidden whitespace-nowrap text-muted-foreground">{'-'.repeat(60)}</p>;
    case 'row':
      return (
        <p className={`flex justify-between gap-3 ${line.strong ? 'font-bold' : ''}`}>
          <span>{line.left}</span>
          <span className="text-right">{line.right}</span>
        </p>
      );
    case 'barcode':
      return (
        <div aria-hidden className="my-3 flex h-10 items-stretch justify-center gap-[2px]">
          {BARS.map((w, i) => (
            <span key={i} className="bg-foreground" style={{ width: w * 1.5 }} />
          ))}
        </div>
      );
  }
}
