'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from 'next-themes';

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

// Animation variants for sequential floating effect
const getFloatVariants = (isDark: boolean, pathIndex: number) => {
  const paths = [
    // Path 1: Diagonal up-right
    {
      initial: { y: "100%", x: "-50%", opacity: 0, scale: 0.8 },
      animate: { y: "-100%", x: "50%", opacity: isDark ? [0, 0.9, 0.9, 0] : [0, 0.7, 0.7, 0], scale: 1 },
      exit: { y: "-200%", x: "100%", opacity: 0, scale: 0.8 }
    },
    // Path 2: Vertical up with slight curve
    {
      initial: { y: "100%", x: "0%", opacity: 0, scale: 0.8 },
      animate: { y: "-100%", x: ["0%", "25%", "-25%", "0%"], opacity: isDark ? [0, 0.9, 0.9, 0] : [0, 0.7, 0.7, 0], scale: 1 },
      exit: { y: "-200%", x: "0%", opacity: 0, scale: 0.8 }
    },
    // Path 3: S-curve upward
    {
      initial: { y: "100%", x: "-25%", opacity: 0, scale: 0.8 },
      animate: { y: "-100%", x: ["-25%", "25%", "-25%", "25%"], opacity: isDark ? [0, 0.9, 0.9, 0] : [0, 0.7, 0.7, 0], scale: 1 },
      exit: { y: "-200%", x: "25%", opacity: 0, scale: 0.8 }
    },
    // Path 4: Gentle arc
    {
      initial: { y: "100%", x: "25%", opacity: 0, scale: 0.8 },
      animate: { y: "-100%", x: ["25%", "-25%", "25%"], opacity: isDark ? [0, 0.9, 0.9, 0] : [0, 0.7, 0.7, 0], scale: 1 },
      exit: { y: "-200%", x: "-25%", opacity: 0, scale: 0.8 }
    }
  ];
  
  return paths[pathIndex % paths.length];
};

// Define the snippet type
interface CodeSnippet {
  left: string;
  duration: string;
  html: string;
}

// Code snippets configuration with syntax highlighting
const codeSnippets: CodeSnippet[] = [
  { 
    left: "20%",
    duration: "5s",
    html: `<span style="color: ${syntaxColors.keyword}">async</span> <span style="color: ${syntaxColors.function}">fetchData</span>() {
  <span style="color: ${syntaxColors.keyword}">const</span> response = <span style="color: ${syntaxColors.keyword}">await</span> fetch(url);
  <span style="color: ${syntaxColors.keyword}">return</span> response.json();
}`
  },
  { 
    left: "50%",
    duration: "5s",
    html: `<span style="color: ${syntaxColors.comment}">// Reactive State</span>
<span style="color: ${syntaxColors.keyword}">const</span> [state, setState] = useState<${syntaxColors.type}>T</span>();`
  },
  { 
    left: "75%",
    duration: "5s",
    html: `<span style="color: ${syntaxColors.keyword}">interface</span> <span style="color: ${syntaxColors.type}">Component</span> {
  <span style="color: ${syntaxColors.variable}">props</span>: Props;
  <span style="color: ${syntaxColors.variable}">render</span>(): JSX.Element;
}`
  },
  { 
    left: "35%",
    duration: "5s",
    html: `<span style="color: ${syntaxColors.comment}">// Animation Frame</span>
requestAnimationFrame(<span style="color: ${syntaxColors.function}">animate</span>);`
  }
];

interface FloatingSnippetProps {
  snippet: CodeSnippet;
  isActive: boolean;
  onComplete: () => void;
  pathIndex: number;
}

const FloatingSnippet: React.FC<FloatingSnippetProps> = ({ snippet, isActive, onComplete, pathIndex }) => {
  const { theme } = useTheme();
  const controls = useAnimation();

  useEffect(() => {
    if (isActive) {
      controls.start("animate").then(onComplete);
    } else {
      controls.set("initial");
    }
  }, [isActive, controls, onComplete]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: snippet.left,
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        color: theme === 'dark' ? 'var(--circuit-color-dark, rgba(56, 189, 248, 0.8))' : 'var(--circuit-color, rgba(59, 130, 246, 0.8))',
        textShadow: theme === 'dark' 
          ? '0 0 8px var(--circuit-glow-dark, rgba(56, 189, 248, 0.4)), 0 0 12px var(--circuit-glow-dark, rgba(56, 189, 248, 0.2))'
          : '0 0 5px var(--circuit-glow, rgba(59, 130, 246, 0.3))',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        zIndex: -1,
      }}
      initial="initial"
      animate={controls}
      variants={getFloatVariants(theme === 'dark', pathIndex)}
      transition={{
        duration: parseFloat(snippet.duration),
        ease: customEasing,
        opacity: {
          duration: parseFloat(snippet.duration) * 0.8,
          ease: "easeInOut"
        }
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: snippet.html }} />
    </motion.div>
  );
};


const FloatingCode: React.FC = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAnimationComplete = useCallback(() => {
    setActiveIndex((current) => (current + 1) % codeSnippets.length);
  }, []);

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
      backgroundColor: 'transparent',
    }}>
      {codeSnippets.map((snippet, index) => (
        <FloatingSnippet
          key={index}
          snippet={snippet}
          isActive={index === activeIndex}
          onComplete={handleAnimationComplete}
          pathIndex={index}
        />
      ))}
    </div>
  );
};

export default FloatingCode;
