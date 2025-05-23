"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface LoadingContextType {
  isLanguageChanging: boolean;
  startLanguageChange: () => void;
  endLanguageChange: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLanguageChanging: false,
  startLanguageChange: () => {},
  endLanguageChange: () => {},
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);

  const startLanguageChange = useCallback(() => {
    setIsLanguageChanging(true);
  }, []);

  const endLanguageChange = useCallback(() => {
    setIsLanguageChanging(false);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLanguageChanging,
        startLanguageChange,
        endLanguageChange,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
