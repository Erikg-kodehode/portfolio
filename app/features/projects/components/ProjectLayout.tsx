"use client";
import { motion } from "framer-motion";

interface ProjectLayoutProps {
  children: React.ReactNode;
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0], // Improved easing curve
      }}
      className="relative w-full"
    >
      {children}
    </motion.div>
  );
}

