"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const pathname = usePathname();

  // Prevent scroll position jumps during language switch
  useEffect(() => {
    // Store scroll position before language switch
    const scrollPos = window.scrollY;
    
    // After language switch, restore scroll position
    const timer = setTimeout(() => {
      window.scrollTo(0, scrollPos);
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <LoadingProvider>
      <LanguageProvider>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </LanguageProvider>
    </LoadingProvider>
  );
}
