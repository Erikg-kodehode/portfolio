"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Translations } from "@/i18n/locales/translations";
import { usePathname } from "next/navigation";
import en from "./locales/en";
import no from "./locales/no";

// Default minimal translations to use as fallback
const defaultTranslations: Translations = no;

interface TranslationsContextType {
  translations: Translations;
  isLoading: boolean;
  error: string | null;
}

const TranslationsContext = createContext<TranslationsContextType>({
  translations: defaultTranslations as Translations,
  isLoading: false,
  error: null,
});

export function TranslationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [state, setState] = useState<TranslationsContextType>({
    translations: defaultTranslations as Translations,
    isLoading: true,
    error: null,
  });

  const updateTranslations = useCallback(() => {
    const isEnglish = pathname?.startsWith("/en");
    setState({
      translations: isEnglish ? en : no,
      isLoading: false,
      error: null,
    });
  }, [pathname]);

  useEffect(() => {
    setState(prev => ({ ...prev, isLoading: true }));
    // Short delay to ensure smooth transition
    const timer = setTimeout(() => {
      updateTranslations();
    }, 100);
    return () => clearTimeout(timer);
  }, [updateTranslations, pathname]);

  return (
    <TranslationsContext.Provider value={state}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  if (!context) {
    console.warn("Translation context not found, using fallback translations");
    return defaultTranslations as Translations;
  }
  return context.translations;
}
