"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Image from "next/image";
import { useLoading } from "@/components/providers/LoadingProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const { startLanguageChange, endLanguageChange } = useLoading();
  const { startChange, endChange } = useLanguage();
  const isEnglish = pathname?.startsWith("/en");

  // Loading state when route is transitioning
  const isChanging = isLoading || isPending;

  // Function to transform the path when switching languages
  const getTargetPath = () => {
    if (pathname === "/en" || pathname === "/no" || pathname === "/") {
      return isEnglish ? "/no" : "/en";
    }
    
    if (isEnglish) {
      const noPrefix = pathname.replace(/^\/en/, "");
      return noPrefix === "" ? "/no" : `/no${noPrefix}`;
    } else {
      const withoutNoPrefix = pathname.replace(/^\/no/, "");
      return withoutNoPrefix === "" ? "/en" : `/en${withoutNoPrefix}`;
    }
  };

  const handleLanguageChange = () => {
    if (isChanging) return;

    setIsLoading(true);
    startLanguageChange();
    startChange();
    const targetPath = getTargetPath();
    
    // Capture current scroll position
    const scrollPos = window.scrollY;
    
  startTransition(() => {
      // Use router.push with correct options for Next.js 14
      router.push(targetPath, { scroll: false });
      
      // End loading state after a short delay for smooth transition
      setTimeout(() => {
        window.scrollTo(0, scrollPos);
        setIsLoading(false);
        endLanguageChange();
        endChange();
      }, 150);
    });
  };

  return (
    <button
      onClick={handleLanguageChange}
      disabled={isChanging}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-md 
        bg-slate-200 dark:bg-slate-700 
        hover:bg-slate-300 dark:hover:bg-slate-600 
        transition-all duration-200
        ${isChanging ? "opacity-50 cursor-not-allowed" : ""}
        ${isChanging ? "scale-95" : "hover:scale-105"}`}
      aria-label={isEnglish ? "Bytt til norsk" : "Switch to English"}
    >
      <Image
        src={isEnglish ? "/assets/no-flag.svg" : "/assets/gb-flag.svg"}
        alt={isEnglish ? "Norwegian flag" : "UK flag"}
        width={20}
        height={15}
        className={`rounded-sm transition-opacity duration-200 ${isChanging ? "opacity-50" : ""}`}
      />
    </button>
  );
}
