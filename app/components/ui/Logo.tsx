'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface LogoProps {
  className?: string;
  isCompact?: boolean;
}

export default function Logo({ className = '', isCompact = false }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Define gradient colors based on theme
  const gradientColors = isDark
    ? { start: '#1e40af', end: '#1d4ed8' }  // Dark mode blues
    : { start: '#2563eb', end: '#3b82f6' };  // Light mode blues

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const textPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  // Define pulse animation for brackets
  const bracketVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  return (
    <motion.svg
      viewBox="0 0 240 48"
      className={`w-full h-auto ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      fill="none"
    >
      {/* Define gradients */}
      <defs>
        <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className={`${isDark ? 'stop-blue-900' : 'stop-blue-500'} stop-opacity-20`} />
          <stop offset="100%" className={`${isDark ? 'stop-blue-800' : 'stop-blue-400'} stop-opacity-10`} />
        </linearGradient>
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientColors.start} />
          <stop offset="100%" stopColor={gradientColors.end} />
        </linearGradient>
      </defs>
      {/* Background shape with gradient */}
      {/* Background rectangle with gradient fill and animated stroke */}
      <motion.rect
        x="2"
        y="2"
        width="236"
        height="44"
        rx="8"
        fill="url(#backgroundGradient)"
        stroke="url(#borderGradient)"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        }}
      />

      {/* Main text with enhanced animation */}
      <motion.text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className={`text-2xl font-bold ${
          isDark ? 'fill-slate-50' : 'fill-slate-900'
        }`}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2
          }
        }}
      >
        {isCompact ? 'EG' : 'Erik Gulliksen'}
      </motion.text>

      {/* Decorative elements */}
      <motion.path
        d="M 8 8 L 232 8"
        className={`${isDark ? 'stroke-blue-400' : 'stroke-blue-600'} stroke-2`}
        variants={textPathVariants}
      />
      <motion.path
        d="M 8 40 L 232 40"
        className={`${isDark ? 'stroke-blue-400' : 'stroke-blue-600'} stroke-2`}
        variants={textPathVariants}
      />

      {/* Code brackets */}
      {/* Code brackets with pulse effect */}
      <motion.path
        d="M 12 16 L 4 24 L 12 32"
        className={`${isDark ? 'stroke-green-400' : 'stroke-green-600'} stroke-2`}
        variants={bracketVariants}
        animate="pulse"
      />
      <motion.path
        d="M 228 16 L 236 24 L 228 32"
        className={`${isDark ? 'stroke-green-400' : 'stroke-green-600'} stroke-2`}
        variants={bracketVariants}
        animate="pulse"
      />
    </motion.svg>
  );
}

