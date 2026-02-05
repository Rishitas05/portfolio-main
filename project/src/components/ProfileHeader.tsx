import { Profile } from '../lib/mongodb';
import { Globe } from 'lucide-react';
import { ReactTyped }  from "react-typed";

interface ProfileHeaderProps {
  profile: Profile | null;
}

const stringsToRender = [
  "Full Stack Developer",
  "C++",
  "Iot/Arduino",
  "Python"
]

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  if (!profile) return null;

  const viewsCount = (profile as any).views_count ?? (profile as any).followers_count ?? 0;


  return (
    <div className="flex flex-col items-center md:flex-row md:items-start gap-8 md:gap-16 px-4 py-8">
      <div className="flex-shrink-0">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500 p-3">
            <div className="w-full h-full rounded-full bg-black"></div>
          </div>
          <img
            src={profile.avatar_url || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={profile.full_name}
            className="relative rounded-full w-32 h-32 md:w-40 md:h-40 object-cover border-2 border-transparent" style={{ objectPosition: '20% 0%' }}
          />
        </div>
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-6">
          <h1 className="text-xl font-light text-black dark:text-white">{profile.username}</h1>
        </div>

        <div className="flex justify-center md:justify-start gap-8 mb-6">
          <div className="text-center">
            <div className="font-semibold text-black dark:text-white">{profile.projects_count}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">projects</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-black dark:text-white">{viewsCount}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">views</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-black dark:text-white">{profile.following_count}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">following</div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="font-bold text-black dark:text-white">{profile.full_name}</div>
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line"><ReactTyped strings={stringsToRender} typeSpeed={60}
      backSpeed={50} loop></ReactTyped></div>
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{profile.bio}</div>
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center justify-center md:justify-start gap-1 w-fit"
            >
              <Globe size={14} />
              <span>{profile.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
