export default function SkillLevelIndicator({ level }) {
  const totalDots = 5;
  const filledDots = level;
  
  return (
    <div className="flex space-x-0.5">
      {[...Array(totalDots)].map((_, i) => (
        <span 
          key={i} 
          className={`inline-block w-1 h-1 rounded-full ${
            i < filledDots 
              ? 'bg-blue-500 dark:bg-blue-400' 
              : 'bg-slate-200 dark:bg-slate-600'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
