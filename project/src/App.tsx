import { useEffect, useState } from 'react';
import { getProfile, getSkills, getProjects, Profile, Skill, Project } from './lib/mongodb';
import ProfileHeader from './components/ProfileHeader';
import SkillsHighlights from './components/SkillsHighlights';
import ProjectsGrid from './components/ProjectsGrid';
import Sidebar from './components/Sidebar';
import { Loader2 } from 'lucide-react';

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [profileData, skillsData, projectsData] = await Promise.all([
        getProfile(),
        getSkills(),
        getProjects(),
      ]);

      if (profileData) setProfile(profileData);
      if (skillsData) setSkills(skillsData);
      if (projectsData) setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <main className="flex-1 lg:ml-0 overflow-auto">
        {/* Download Resume (fixed top-right) */}
        <button
          onClick={() => {
            const resumeUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/resume.pdf';
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'resume.pdf';
            document.body.appendChild(link);
            link.click();
            link.remove();
          }}
          className="fixed top-4 right-4 z-50 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded shadow-lg hover:opacity-95 transition-opacity"
        >
          Download Resume
        </button>

        <div className="max-w-5xl mx-auto">
          <ProfileHeader profile={profile} />
          <SkillsHighlights skills={skills} />
          <ProjectsGrid projects={projects} />
        </div>
      </main>
    </div>
  );
}

export default App;
