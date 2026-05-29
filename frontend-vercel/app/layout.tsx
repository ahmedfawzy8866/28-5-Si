import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sierra AI',
  description: 'Sierra AI Property Finder OS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-canvas-ivory text-branding-navy font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
