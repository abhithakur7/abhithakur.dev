import Link from 'next/link';
import { Mail } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { GithubIcon, LinkedinIcon } from './icons';
import { NavSections } from './nav-sections';

export function Nav() {
  const iconLink =
    'rounded-md p-2 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';
  return (
    <header className="sticky top-0 z-40 border-b-2 border-foreground bg-background/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-1.5 focus:text-sm focus:text-background"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-6"
      >
        <Link
          href="/"
          data-fall
          className="font-display rounded-sm text-sm uppercase tracking-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Abhishek Thakur
        </Link>
        <NavSections />
        <div data-fall className="flex items-center gap-1">
          <a
            href="https://github.com/abhithakur7"
            aria-label="GitHub"
            className={iconLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/abhi-thakur-dev/"
            aria-label="LinkedIn"
            className={iconLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href="mailto:hi@abhithakur.dev"
            aria-label="Email"
            className={iconLink}
          >
            <Mail className="size-4" aria-hidden />
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
