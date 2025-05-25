import "@/styles/globals.css";
import React, { type ReactNode } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import { headers } from "next/headers";

import { Navigation, Footer } from "@/features/layout";
import { Providers } from "@/providers";
import { ErrorBoundary } from "@/components/shared";
import { getLocaleFromPath } from "@/i18n";
import { TranslationsProvider } from "@/i18n/context";
import * as enTranslations from "@/i18n/locales/en";
import * as noTranslations from "@/i18n/locales/no";


const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

// Use a different name for the runtime config
export const runtimeConfig = "force-dynamic";

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

// Main content wrapper with error boundary
function MainContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col relative isolate min-h-screen">
      <Navigation className="flex-shrink-0 sticky top-0 z-50" />
      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-5 sm:py-6 relative z-[40]">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <Footer className="flex-shrink-0" />
    </div>
  );
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
  
  // Get initial translations based on path
  const initialTranslations = lang === "en" ? enTranslations.default : noTranslations.default;
  
  return (
    <html lang={lang} className={`${fontClass} scroll-smooth`} suppressHydrationWarning>
      <body 
        className="
          w-full
          min-h-screen
          bg-gradient-to-br from-blue-50 via-blue-100 to-white
          dark:from-slate-950 dark:via-slate-900 dark:to-slate-800
          text-blue-900 dark:text-blue-100
          antialiased
          transition-all duration-500 ease-in-out
          relative
          overflow-x-hidden
          overflow-y-scroll
        ">
        <Providers>
          <TranslationsProvider translations={initialTranslations}>
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
