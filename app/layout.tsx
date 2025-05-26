import "@/styles/globals.css";
import React, { type ReactNode } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import { headers } from "next/headers";

import { MainContent } from "@/features/layout/components";
import { Providers } from "@/providers";
import { ErrorBoundary } from "@/components/shared";
import { getLocaleFromPath } from "@/i18n";
import { TranslationsProvider } from "@/i18n/context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gulliksen - Portfolio",
  description: "Backend developer portfolio"
};

function getLanguageFromPath(pathname: string): string {
  try {
    return getLocaleFromPath(pathname);
  } catch (error) {
    console.error("Failed to detect language:", error);
    return "no"; // Default to Norwegian if detection fails
  }
}

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const lang = getLanguageFromPath(pathname);
  const fontClass = inter?.className ?? "";
  
  return (
    <html lang={lang} className={`${fontClass} scroll-smooth`} suppressHydrationWarning>
      <body 
        className="
          w-full
          min-h-screen
          bg-gradient-to-br from-gray-100/90 via-gray-50/80 to-white/90
          dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90
          text-blue-900 dark:text-blue-100
          antialiased
          transition-all duration-500
          relative
          overflow-x-hidden
          overflow-y-scroll
        ">
        <Providers>
          <TranslationsProvider>
            <ErrorBoundary>
              <MainContent>
                {children}
              </MainContent>
            </ErrorBoundary>
          </TranslationsProvider>
        </Providers>
      </body>
    </html>
  );
}
