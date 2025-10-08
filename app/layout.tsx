import type {Metadata} from 'next';
import {FathomAnalytics} from './fathom';
import './globals.css';

export const metadata: Metadata = {
  title: '24 - An AI Interrogation Experience',
  description:
    'You have 24 prompts to break a murder suspect. ' +
    'An intense AI-powered detective interrogation game. ' +
    'Can you extract a confession before time runs out?',
  keywords: [
    'interrogation game',
    'AI game',
    'detective game',
    'mystery game',
    '24 game',
    'interactive fiction',
    'crime game',
    'psychological thriller',
    'AI interrogation',
    'murder mystery',
  ],
  authors: [{name: 'Edgar', url: 'https://tini.la/edgar'}],
  creator: 'Edgar',
  publisher: 'Jupiter Wave',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://24.jupiterwave.games',
    title: '24 - An AI Interrogation Experience',
    description:
      'You have 24 prompts to break a murder suspect. ' +
      'An intense AI-powered detective interrogation game.',
    siteName: '24',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '24 - An AI Interrogation Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '24 - An AI Interrogation Experience',
    description:
      'You have 24 prompts to break a murder suspect. ' +
      'Can you extract a confession?',
    images: ['/og-image.png'],
    creator: '@jupiterwave',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </head>
      <body className="h-screen overflow-hidden">
        <FathomAnalytics />
        {children}
      </body>
    </html>
  );
}
