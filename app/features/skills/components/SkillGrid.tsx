import { Grid } from '@/components/ui';
import SkillCard from './SkillCard';

interface Skill {
  name: string;
  icon?: React.ReactNode;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description?: string;
}

interface SkillGridProps {
  skills: Skill[];
  className?: string;
  animate?: boolean;
}

export default function SkillGrid({
  skills,
  className = '',
  animate = true
}: SkillGridProps) {
  return (
    <Grid 
      cols={{
        default: 1,
        sm: 2,
        lg: 3
      }}
      gap={6}
      className={`
        ${animate ? '[&>*:nth-child(3n+2)]:translate-y-4' : ''}
        ${animate ? '[&>*:nth-child(3n+3)]:-translate-y-4' : ''}
        ${className}
      `}
    >
      {skills.map((skill, index) => (
        <SkillCard
          key={`${skill.name}-${index}`}
          name={skill.name}
          icon={skill.icon}
          level={skill.level}
          description={skill.description}
          className={animate ? 'transition-transform duration-300' : ''}
        />
      ))}
    </Grid>
  );
}

