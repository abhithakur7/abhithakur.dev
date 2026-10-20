import type { Metadata } from 'next';
import { Archivo, Martian_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

const sans = Archivo({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  axes: ['wdth'],
});
const mono = Martian_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  axes: ['wdth'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abhithakur.dev'),
  title: {
    default: 'Abhishek Thakur | Senior Full-Stack Engineer, Chandigarh',
    template: '%s | Abhishek Thakur',
  },
  description:
    'Abhishek Thakur builds booking flows, Stripe integrations and AI writing tools. Senior full-stack engineer and Kinetichex lead, based in Chandigarh, India.',
  applicationName: 'Abhishek Thakur',
  authors: [{ name: 'Abhishek Thakur', url: 'https://abhithakur.dev' }],
  creator: 'Abhishek Thakur',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://abhithakur.dev',
    title: 'Abhishek Thakur | Senior Full-Stack Engineer',
    description:
      'Booking flows, Stripe payments and AI writing tools. Senior full-stack engineer at Kinetichex, based in Chandigarh, India.',
    siteName: 'Abhishek Thakur',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhishek Thakur | Senior Full-Stack Engineer',
    description:
      'Booking flows, Stripe payments and AI writing tools. React, NestJS and TypeScript.',
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
      className={`${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* Paint the paper colour before stylesheets load so there is no
            white flash ahead of next-themes applying .dark. */}
        <style>{`
          html { background-color: #F4F5F1; color-scheme: light dark; }
          @media (prefers-color-scheme: dark) {
            html { background-color: #121318; }
          }
          html.dark { background-color: #121318; }
          html.light { background-color: #F4F5F1; }
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
