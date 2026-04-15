import { Mail } from 'lucide-react';
import { LinkedinIcon } from '@/components/icons';
import { CopyEmail } from '@/components/copy-email';
import { SectionHeader } from '@/components/section-header';

const EMAIL = 'thakur.abhi270@gmail.com';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeader
        index="05"
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s build <span className="italic">something</span>.
          </>
        }
        description="Senior / staff full-stack roles, remote-first, timezone-flexible. Happy to talk SaaS architecture, Stripe integrations, or team leadership."
      />
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Mail className="size-4" aria-hidden /> {EMAIL}
        </a>
        <CopyEmail email={EMAIL} />
        <a
          href="https://www.linkedin.com/in/abhishek-thakur-5a5260164/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <LinkedinIcon className="size-4" /> LinkedIn
        </a>
      </div>
    </section>
  );
}
