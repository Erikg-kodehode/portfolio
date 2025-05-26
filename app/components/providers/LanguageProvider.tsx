"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface LanguageContextType {
  isChanging: boolean;
  startChange: () => void;
  endChange: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  isChanging: false,
  startChange: () => {},
  endChange: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [isChanging, setIsChanging] = useState(false);

  const startChange = useCallback(() => {
    setIsChanging(true);
  }, []);

  const endChange = useCallback(() => {
    setIsChanging(false);
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        isChanging,
        startChange,
        endChange,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
