import { Skill } from '../lib/mongodb';
import * as Icons from 'lucide-react';
import { FaBeer } from "react-icons/fa";

interface SkillsHighlightsProps {
  skills: Skill[];
}

export default function SkillsHighlights({ skills }: SkillsHighlightsProps) {
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent size={28} />;
    }
    return <span className="text-2xl">{iconName}</span>;
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 py-6">
      <div className="overflow-x-auto">
        <div className="flex gap-6 px-4 min-w-max justify-center md:justify-start">
          {skills.map((skill) => (
            <div key={skill._id || skill.id} className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform">
                {getIcon(skill.icon)}
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
