interface SkillLevelIndicatorProps {
  level: number;
}

export default function SkillLevelIndicator({ level }: SkillLevelIndicatorProps) {
  const totalDots = 5;
  const filledDots = level;
  
  return (
    <div className="flex space-x-1">
      {[...Array(totalDots)].map((_, i) => (
        <span 
          key={i} 
          className={`
            inline-block w-1.5 h-1.5 rounded-full 
            transition-all duration-300 ease-out
            hover:animate-skill-dot
            ${i < filledDots 
              ? 'bg-blue-500 dark:bg-blue-400 shadow-glow-sm' 
              : 'bg-slate-200/30 dark:bg-slate-600/30 hover:bg-slate-300/40 dark:hover:bg-slate-500/40'
            }
          `}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
