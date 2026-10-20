import { Mail } from 'lucide-react';
import { LinkedinIcon } from '@/components/icons';
import { CopyEmail } from '@/components/copy-email';
import { SectionHeader } from '@/components/section-header';
import { CardReader } from './card-reader';

const EMAIL = 'hi@abhithakur.dev';

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-16"
    >
      <div>
        <SectionHeader
          title="Say hi"
          description="Open to remote senior and staff full-stack roles. Tell me what your team is building and where you need help."
        />
        <div data-fall className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Mail className="size-4" aria-hidden /> {EMAIL}
          </a>
          <CopyEmail email={EMAIL} />
          <a
            href="https://www.linkedin.com/in/abhi-thakur-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-foreground px-5 text-sm font-semibold hover:bg-canary hover:text-[#1b1a21] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <LinkedinIcon className="size-4" /> LinkedIn
          </a>
        </div>
      </div>
      <CardReader />
    </section>
  );
}
