import { Mail } from 'lucide-react';
import { LinkedinIcon } from '@/components/icons';
import { CopyEmail } from '@/components/copy-email';

const EMAIL = 'thakur.abhi270@gmail.com';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <header className="mb-10 sm:mb-14">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Contact
        </p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Looking for senior / staff full-stack roles.
        </h2>
        <p className="mt-5 max-w-2xl text-balance text-muted-foreground leading-relaxed">
          Remote-first, timezone-flexible. Happy to talk about SaaS architecture,
          Stripe integrations, or team leadership.
        </p>
      </header>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Mail className="size-4" aria-hidden /> {EMAIL}
        </a>
        <CopyEmail email={EMAIL} />
        <a
          href="https://www.linkedin.com/in/abhishek-thakur-5a5260164/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <LinkedinIcon className="size-4" /> LinkedIn
        </a>
      </div>
    </section>
  );
}
