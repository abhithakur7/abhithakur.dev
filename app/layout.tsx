import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
});

export const metadata: Metadata = {
  title: 'Abhishek Thakur — Senior Full-Stack Engineer',
  description: 'SaaS & payment systems. Node, NestJS, React, Stripe, GCP.',
  metadataBase: new URL('https://abhithakur.dev'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${mono.variable} ${display.variable}`}
    >
      <head>
        {/* Set the page background colour BEFORE stylesheets load so the
            first paint matches the theme — eliminates the white-splash
            flash before next-themes applies .dark. */}
        <style>{`
          html { background-color: oklch(0.985 0.004 80); color-scheme: light dark; }
          @media (prefers-color-scheme: dark) {
            html { background-color: oklch(0.155 0.008 270); }
          }
          html.dark { background-color: oklch(0.155 0.008 270); }
        `}</style>
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
