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
  metadataBase: new URL('https://abhithakur.dev'),
  title: {
    default: 'Abhishek Thakur — Senior Full-Stack Engineer · Chandigarh, India',
    template: '%s — Abhishek Thakur',
  },
  description:
    'Abhishek Thakur is a senior full-stack engineer based in Chandigarh, India, building SaaS platforms and payment systems with Node, NestJS, React, Stripe, and GCP. Open to senior / staff roles, remote.',
  applicationName: 'Abhishek Thakur',
  authors: [{ name: 'Abhishek Thakur', url: 'https://abhithakur.dev' }],
  creator: 'Abhishek Thakur',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://abhithakur.dev',
    title: 'Abhishek Thakur — Senior Full-Stack Engineer',
    description:
      'Senior full-stack engineer (SaaS & payments). Node, NestJS, React, Stripe, GCP. Based in Chandigarh, India.',
    siteName: 'Abhishek Thakur',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhishek Thakur — Senior Full-Stack Engineer',
    description:
      'Senior full-stack engineer (SaaS & payments). Node, NestJS, React, Stripe, GCP.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
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
            flash before next-themes applies .dark. Also pre-decide whether
            the intro splash should run, so already-seen visits and reduced
            -motion users never see a flash of the overlay. */}
        <style>{`
          html { background-color: oklch(0.985 0.004 80); color-scheme: light dark; }
          @media (prefers-color-scheme: dark) {
            html { background-color: oklch(0.155 0.008 270); }
          }
          html.dark { background-color: oklch(0.155 0.008 270); }
          html.splash-skip [data-splash] { display: none !important; }
        `}</style>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('splash:seen')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('splash-skip')}}catch(e){}",
          }}
        />
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
