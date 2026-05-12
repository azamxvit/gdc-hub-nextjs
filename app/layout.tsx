import { Geist_Mono, Inter } from "next/font/google";
import { headers } from "next/headers";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { routing } from "@/i18n/routing";

import type { Metadata } from "next";

import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GDC Hub",
    template: "%s · GDC Hub",
  },
  description: "Геймифицированный резидентский портал GDC",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const resolvedHeaders = await headers();
  const locale = resolvedHeaders.get("x-next-intl-locale") ?? routing.defaultLocale;

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
