import { useEffect, useState } from 'react';
import { getProfile, getSkills, getProjects, Profile, Skill, Project } from './lib/mongodb';
import ProfileHeader from './components/ProfileHeader';
import SkillsHighlights from './components/SkillsHighlights';
import ProjectsGrid from './components/ProjectsGrid';
import Sidebar from './components/Sidebar';
import SignInModal from './components/SignInModal';
import { Loader2, LogOut, Download } from 'lucide-react';

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetchData();
    checkAuth();
    applyTheme();
  }, []);

  const applyTheme = () => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const isDark = savedDarkMode === null ? true : JSON.parse(savedDarkMode);
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleThemeChange = (isDark: boolean) => {
    console.log('handleThemeChange called with:', isDark);
    setDarkMode(isDark);
    if (isDark) {
      console.log('App: Adding dark class');
      document.documentElement.classList.add('dark');
    } else {
      console.log('App: Removing dark class');
      document.documentElement.classList.remove('dark');
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.reload();
  };

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
      <div className="min-h-screen bg-black dark:bg-black text-white flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 flex">
      <Sidebar isLoggedIn={isLoggedIn} activeTab={activeTab} onTabChange={setActiveTab} onThemeChange={handleThemeChange} />

      <main className="flex-1 lg:ml-0 overflow-auto relative">
        {/* Download Resume Icon and Sign In / Logout Button - Top Right */}
        <div className="fixed top-6 right-6 z-40 flex items-center gap-4">
          <a
            href="/resume.pdf"
            download
            className="p-2 text-orange-500 hover:text-orange-400 transition-colors hover:scale-110 transform"
            title="Download Resume"
          >
            <Download size={24} />
          </a>
          {!isLoggedIn ? (
            <button
              onClick={() => setIsSignInOpen(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>

        <div className="max-w-5xl mx-auto">
          <ProfileHeader profile={profile} />
          <SkillsHighlights skills={skills} />
          <ProjectsGrid projects={projects} />
        </div>
      </main>

      {/* Sign In Modal */}
      <SignInModal isOpen={isSignInOpen} onClose={() => {
        setIsSignInOpen(false);
        checkAuth();
      }} />
    </div>
  );
}

export default App;