'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface FloatingSnippetProps {
  left: string;
  delay: string;
  duration: string;
  children: React.ReactNode;
}

// Syntax highlighting colors
const syntaxColors = {
  keyword: 'var(--syntax-keyword, #ff79c6)',
  function: 'var(--syntax-function, #50fa7b)',
  string: 'var(--syntax-string, #f1fa8c)',
  number: 'var(--syntax-number, #bd93f9)',
  comment: 'var(--syntax-comment, #6272a4)',
  operator: 'var(--syntax-operator, #ff79c6)',
  variable: 'var(--syntax-variable, #f8f8f2)',
  type: 'var(--syntax-type, #8be9fd)',
};

// Custom easing functions for smoother animation
const customEasing = [0.4, 0, 0.6, 1]; // Smooth easeInOut

// Animation variants for the floating effect
const getFloatVariants = (isDark: boolean) => ({
  initial: {
    y: "100%",
    x: "-50%",
    opacity: 0,
  },
  animate: {
    y: "-100%",
    x: "50%",
    opacity: isDark 
      ? [0, 0.9, 0.9, 0] 
      : [0, 0.8, 0.8, 0],
  }
});

const FloatingSnippet: React.FC<FloatingSnippetProps> = ({ left, delay, duration, children }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        left,
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        color: theme === 'dark' ? 'var(--circuit-color-dark, rgba(56, 189, 248, 0.8))' : 'var(--circuit-color, rgba(59, 130, 246, 0.8))',
        textShadow: theme === 'dark' 
          ? '0 0 8px var(--circuit-glow-dark, rgba(56, 189, 248, 0.4)), 0 0 12px var(--circuit-glow-dark, rgba(56, 189, 248, 0.2))'
          : '0 0 5px var(--circuit-glow, rgba(59, 130, 246, 0.3))',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        zIndex: -1,
        opacity: theme === 'dark' ? 0.9 : 0.7,
        backdropFilter: theme === 'dark' ? 'blur(1px)' : 'none',
      }}
      initial="initial"
      animate="animate"
      variants={getFloatVariants(theme === 'dark')}
      transition={{
        duration: parseFloat(duration),
        delay: parseFloat(delay),
        repeat: Infinity,
        times: [0, 0.1, 0.2, 0.3, 0.7, 0.8, 0.9, 1],
        ease: customEasing,
        opacity: {
          duration: parseFloat(duration),
          ease: "easeInOut",
          times: [0, 0.1, 0.2, 0.3, 0.7, 0.8, 0.9, 1],
        },
        x: {
          ease: customEasing,
        },
        y: {
          ease: customEasing,
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Code snippets configuration with syntax highlighting
const codeSnippets = [
  // Algorithm fragments
  { 
    left: "15%", 
    delay: "0s", 
    duration: "18s", 
    html: `<span style="color: ${syntaxColors.keyword}">function</span> <span style="color: ${syntaxColors.function}">quickSort</span>(arr) {
  <span style="color: ${syntaxColors.keyword}">if</span> (arr.length <= 1) <span style="color: ${syntaxColors.keyword}">return</span> arr;
  <span style="color: ${syntaxColors.comment}>// Partition array...</span>
}`
  },
  // Data structures
  { 
    left: "35%", 
    delay: "3s", 
    duration: "20s",
    html: `<span style="color: ${syntaxColors.keyword}">class</span> <span style="color: ${syntaxColors.type}">BinaryTree</span> {
  <span style="color: ${syntaxColors.variable}">left</span>: Node;
  <span style="color: ${syntaxColors.variable}">right</span>: Node;
}`
  },
  // Design patterns
  { 
    left: "75%", 
    delay: "6s", 
    duration: "19s",
    html: `<span style="color: ${syntaxColors.keyword}">class</span> <span style="color: ${syntaxColors.type}">Singleton</span> {
  <span style="color: ${syntaxColors.keyword}">private</span> <span style="color: ${syntaxColors.keyword}">static</span> instance;
}`
  },
  // Circuit logic
  { 
    left: "25%", 
    delay: "4s", 
    duration: "17s",
    html: `<span style="color: ${syntaxColors.comment}">// Logic Gate Implementation</span>
<span style="color: ${syntaxColors.keyword}">const</span> <span style="color: ${syntaxColors.function}">NAND</span> = <span style="color: ${syntaxColors.operator}">!</span>(a <span style="color: ${syntaxColors.operator}">&&&</span> b);`
  },
  // Mathematical formulas
  { 
    left: "55%", 
    delay: "8s", 
    duration: "21s",
    html: `<span style="color: ${syntaxColors.comment}">// Fibonacci Sequence</span>
f(n) = f(n-1) + f(n-2)`
  },
  // Binary operations
  { 
    left: "85%", 
    delay: "5s", 
    duration: "16s",
    html: `<span style="color: ${syntaxColors.number}">0b1100</span> <span style="color: ${syntaxColors.operator}">|</span> <span style="color: ${syntaxColors.number}">0b0011</span> <span style="color: ${syntaxColors.comment}>// Bitwise OR</span>`
  },
  // ASCII art
  { 
    left: "45%", 
    delay: "7s", 
    duration: "18s",
    html: `  /\\___/\\
 ( o   o )
 (  =^=  )
  (____)`
  },
  // Graph theory
  { 
    left: "65%", 
    delay: "10s", 
    duration: "19s",
    html: `<span style="color: ${syntaxColors.keyword}">type</span> <span style="color: ${syntaxColors.type}">Graph</span> = Map&lt;Node, Set&lt;Edge&gt;&gt;`
  },
  // Hex patterns
  { 
    left: "95%", 
    delay: "2s", 
    duration: "17s",
    html: `<span style="color: ${syntaxColors.number}">0xDEAD_BEEF</span> <span style="color: ${syntaxColors.operator}">&</span> <span style="color: ${syntaxColors.number}">0xFFFF_0000</span>`
  },
];

const FloatingCode: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: -1,
      pointerEvents: 'none',
      backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
    }}>
      {codeSnippets.map((snippet, index) => (
        <FloatingSnippet
          key={index}
          left={snippet.left}
          delay={snippet.delay}
          duration={snippet.duration}
        >
          <div dangerouslySetInnerHTML={{ __html: snippet.html }} />
        </FloatingSnippet>
      ))}
    </div>
  );
};

export default FloatingCode;
