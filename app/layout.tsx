import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '24 - An AI Interrogation Experience',
  description: 'You have 24 prompts to make the suspect confess.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}