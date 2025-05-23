import { Badge } from '@/components/ui';

interface SkillCardProps {
  name: string;
  icon?: React.ReactNode;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description?: string;
  className?: string;
}

export default function SkillCard({
  name,
  icon,
  level,
  description,
  className = ''
}: SkillCardProps) {
  const getLevelVariant = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'info';
      case 'intermediate':
        return 'default';
      case 'advanced':
        return 'success';
      case 'expert':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className={`
      bg-white/80 dark:bg-slate-800/80
      backdrop-blur-sm
      rounded-lg 
      p-6
      shadow-md hover:shadow-lg
      transition-all duration-300
      group
      ${className}
    `}>
      <div className="flex items-start gap-4">
        {icon && (
          <div className="
            text-2xl text-blue-600 dark:text-blue-400
            transition-transform duration-300
            group-hover:scale-110
          ">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium text-blue-900 dark:text-blue-100">
              {name}
            </h3>
            {level && (
              <Badge 
                variant={getLevelVariant(level)} 
                size="sm"
                className="capitalize"
              >
                {level}
              </Badge>
            )}
          </div>
          {description && (
            <p className="
              text-sm text-slate-600 dark:text-slate-400
              transition-colors duration-200
            ">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

