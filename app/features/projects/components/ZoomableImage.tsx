"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { usePathname } from "next/navigation";

interface ZoomableImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function ZoomableImage({ src, alt, priority = false }: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  const handleZoomToggle = useCallback(() => {
    setIsZoomed(!isZoomed);
    setScale(1); // Reset scale when toggling zoom
  }, []);

  const handlePinch = useCallback((_e: any, info: PanInfo) => {
    if (!isZoomed) return;
    
    const newScale = scale + info.offset.y * -0.01;
    setScale(Math.min(Math.max(0.5, newScale), 3)); // Limit scale between 0.5 and 3
  }, [isZoomed, scale]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isZoomed && e.key === 'Escape') {
        setIsZoomed(false);
        setScale(1);
      }
    };

    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when zoomed
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isZoomed]);

  return (
    <>
      <motion.div 
        className="relative w-full h-[400px] overflow-hidden cursor-zoom-in group"
        onClick={handleZoomToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleZoomToggle();
          }
        }}
        aria-label={isEnglish ? "Click to zoom image" : "Klikk for å zoome bilde"}
        whileTap={{ scale: 0.98 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`
            object-cover transition-all duration-700
            ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
            group-hover:scale-105 transition-transform duration-500
          `}
          priority={priority}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse" />
        )}
        
        {/* Zoom indicator */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-md text-sm
          opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isEnglish ? "Click to zoom" : "Klikk for å zoome"}
        </div>
      </motion.div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={handleZoomToggle}
            role="dialog"
            aria-modal="true"
            aria-label={isEnglish ? "Zoomed image view" : "Forstørret bildevisning"}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-7xl aspect-video"
              onClick={(e) => e.stopPropagation()}
              drag
              dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              dragElastic={0.1}
              whileTap={{ cursor: "grabbing" }}
            >
              <motion.div
                className="w-full h-full"
                style={{ scale }}
                onPan={handlePinch}
              >
                <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                  quality={90}
                  draggable={false}
                />
              </motion.div>
              
              {/* Close button */}
              <button
                onClick={handleZoomToggle}
                className="absolute top-4 right-4 bg-black/70 text-white w-10 h-10 rounded-full
                  flex items-center justify-center hover:bg-black/90 transition-colors duration-200
                  text-2xl leading-none touch-manipulation"
                aria-label={isEnglish ? "Close zoomed view" : "Lukk forstørret visning"}
              >
                ×
              </button>

              {/* Image caption */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2
                bg-black/70 text-white px-4 py-2 rounded-md text-sm text-center">
                {alt}
              </div>

              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2
                bg-black/70 text-white px-4 py-2 rounded-md text-sm text-center opacity-60">
                {isEnglish ? "Pinch to zoom • Drag to move" : "Knip for å zoome • Dra for å flytte"}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

