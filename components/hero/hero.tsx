import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HeroName } from './hero-name';
import { ReceiptPrinter } from './receipt-printer';
import { MagneticLink } from '@/components/magnetic-link';

export function Hero() {
  const cta =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background';

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-14 px-6 pb-16 pt-12 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 lg:pb-20">
      <div data-fall className="min-w-0">
        <p className="text-sm text-muted-foreground sm:text-base">
          Senior full-stack engineer, Chandigarh. Open to senior and staff roles, remote.
        </p>

        <HeroName />

        <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          I build <span className="text-foreground">booking flows</span>,{' '}
          <span className="text-foreground">payment integrations</span> and the
          APIs behind them. Engineering lead at Kinetichex.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <MagneticLink
            href="#work"
            className={`group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-90 ${cta}`}
          >
            See the work
            <ArrowDown className="size-4 transition group-hover:translate-y-0.5" aria-hidden />
          </MagneticLink>
          <MagneticLink
            href="/abhishek-thakur-resume.pdf"
            target="_blank"
            rel="noopener"
            className={`inline-flex h-12 items-center gap-2 rounded-full border-2 border-foreground px-6 text-sm font-semibold hover:bg-canary hover:text-[#1b1a21] ${cta}`}
          >
            Résumé PDF
            <ArrowUpRight className="size-4" aria-hidden />
          </MagneticLink>
        </div>
      </div>

      <ReceiptPrinter />
    </section>
  );
}
