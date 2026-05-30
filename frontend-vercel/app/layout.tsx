import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { I18nProvider } from "@/lib/I18nContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sierra Blu | New Cairo Rent & Resale Intelligence · سييرا بلو",
  description:
    "New Cairo's first AI-powered platform for Rent & Resale. Curated properties across the Fifth Settlement, Madinaty, Mountain View and Mostakbal City — matched by intelligence, advised by people.",
  keywords: [
    "Sierra Blu",
    "Sierra Estates",
    "New Cairo",
    "rent",
    "resale",
    "real estate",
    "Fifth Settlement",
    "Madinaty",
    "Mostakbal City",
    "Mountain View",
    "El Shorouk",
    "عقارات",
    "القاهرة الجديدة",
    "إيجار",
    "إعادة بيع",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for faster font delivery */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          Load EVERY family the app actually renders. Previously only
          Playfair/Inter/Cairo were loaded while page.tsx + tailwind.config.js
          referenced Cormorant Garamond / Jost / DM Mono — so headings silently
          fell back to system fonts. Keep this list reconciled with the code.
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600;700&family=Cairo:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A1628] text-[#F4F0E8] antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" disableTransitionOnChange>
          <I18nProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#0E1D35",
                  color: "#F4F0E8",
                  border: "1px solid rgba(201, 162, 77, 0.15)",
                },
              }}
            />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
