"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { useRouter } from "next/navigation";

interface ProjectSwipeNavProps {
  prevProjectId: string | null;
  nextProjectId: string | null;
  isEnglish: boolean;
  isZoomed?: boolean;
}

export default function ProjectSwipeNav({ 
  prevProjectId, 
  nextProjectId, 
  isEnglish,
  isZoomed = false 
}: ProjectSwipeNavProps) {
  const router = useRouter();
  const controls = useAnimation();
  const [activeKey, setActiveKey] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isZoomed || (e.target instanceof HTMLElement && 
          (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA'))) {
        return;
      }

      if (e.key === 'ArrowLeft' && prevProjectId) {
        setActiveKey('left');
        router.push(`${isEnglish ? '/en' : '/no'}/projects/${prevProjectId}`);
      } else if (e.key === 'ArrowRight' && nextProjectId) {
        setActiveKey('right');
        router.push(`${isEnglish ? '/en' : '/no'}/projects/${nextProjectId}`);
      }
    };

    const handleKeyUp = () => setActiveKey(null);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [prevProjectId, nextProjectId, isEnglish, router, isZoomed]);

  // Handle touch/swipe navigation
  const handleDragStart = (_e: any, _info: PanInfo) => {
    if (isZoomed) return;
    setIsDragging(true);
  };

  const handleDrag = (_e: any, info: PanInfo) => {
    if (isZoomed) return;
    setDragDirection(info.offset.x > 0 ? 'right' : 'left');
  };

  const handleDragEnd = async (_e: any, info: PanInfo) => {
    if (isZoomed) return;
    
    const threshold = 50;
    const velocity = Math.abs(info.velocity.x);
    const isSwipe = velocity > 200 || Math.abs(info.offset.x) > threshold;
    
    setIsDragging(false);
    setDragDirection(null);

    if (isSwipe) {
      if (info.offset.x > 0 && prevProjectId) {
        await controls.start({ x: 100, opacity: 0 });
        router.push(`${isEnglish ? '/en' : '/no'}/projects/${prevProjectId}`);
      } else if (info.offset.x < 0 && nextProjectId) {
        await controls.start({ x: -100, opacity: 0 });
        router.push(`${isEnglish ? '/en' : '/no'}/projects/${nextProjectId}`);
      } else {
        controls.start({ x: 0, opacity: 1 });
      }
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
  };

  if (isZoomed) return null;

  return (
    <motion.div
      className="w-full"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ opacity: 1, x: 0 }}
    >
      <div className="relative flex items-center justify-between py-2 px-4">
        {/* Previous button */}
        {prevProjectId ? (
          <motion.button
            onClick={() => router.push(`${isEnglish ? '/en' : '/no'}/projects/${prevProjectId}`)}
            className={`flex items-center space-x-3 px-3 py-1.5 rounded-lg
              transition-all duration-200 group/prev
              ${activeKey === 'left' || dragDirection === 'right' 
                ? 'bg-blue-100/20 dark:bg-blue-900/20' 
                : 'hover:bg-slate-100/50 dark:hover:bg-slate-700/50'}`}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-xl text-blue-600 dark:text-blue-400 
              transition-transform duration-200 group-hover/prev:-translate-x-1">←</span>
            <div className="text-left">
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {isEnglish ? "Previous" : "Forrige"}
              </div>
              <div className="text-sm font-medium text-blue-900 dark:text-blue-200">
                {isEnglish ? "Project" : "Prosjekt"}
              </div>
            </div>
          </motion.button>
        ) : (
          <div className="w-24" />
        )}

        {/* Progress indicators */}
        <div className="flex space-x-2">
          {['prev', 'current', 'next'].map((position) => (
            <motion.div
              key={position}
              animate={{
                scale: position === 'current' ? 1.2 : 1,
                opacity: position === 'current' ? 1 : 
                         ((dragDirection === 'left' && position === 'next') || 
                          (dragDirection === 'right' && position === 'prev')) ? 0.8 : 0.4
              }}
              className={`w-2 h-2 rounded-full ${position === 'current' 
                ? 'bg-blue-500 dark:bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.5)] dark:shadow-[0_0_8px_rgba(96,165,250,0.5)]' 
                : 'bg-blue-300/50 dark:bg-blue-500/50'}`}
            />
          ))}
        </div>

        {/* Next button */}
        {nextProjectId ? (
          <motion.button
            onClick={() => router.push(`${isEnglish ? '/en' : '/no'}/projects/${nextProjectId}`)}
            className={`flex items-center space-x-3 px-3 py-1.5 rounded-lg
              transition-all duration-200 group/next
              ${activeKey === 'right' || dragDirection === 'left'
                ? 'bg-blue-100/20 dark:bg-blue-900/20' 
                : 'hover:bg-slate-100/50 dark:hover:bg-slate-700/50'}`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-right">
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {isEnglish ? "Next" : "Neste"}
              </div>
              <div className="text-sm font-medium text-blue-900 dark:text-blue-200">
                {isEnglish ? "Project" : "Prosjekt"}
              </div>
            </div>
            <span className="text-xl text-blue-600 dark:text-blue-400 
              transition-transform duration-200 group-hover/next:translate-x-1">→</span>
          </motion.button>
        ) : (
          <div className="w-24" />
        )}

        {/* Swipe indicators */}
        {isDragging && (
          <>
            {prevProjectId && dragDirection === 'right' && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white 
                px-3 py-1.5 rounded-md text-sm opacity-90">
                {isEnglish ? "Release for previous" : "Slipp for forrige"}
              </div>
            )}
            {nextProjectId && dragDirection === 'left' && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white 
                px-3 py-1.5 rounded-md text-sm opacity-90">
                {isEnglish ? "Release for next" : "Slipp for neste"}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

