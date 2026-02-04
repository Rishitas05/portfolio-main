import { useState } from 'react';
import { Instagram, Home, Search, Compass, Mail, Settings, Menu, X } from 'lucide-react';
import ContactModal from './ContactModal';
import SettingsModal from './SettingsModal';
import ExploreModal from './ExploreModal';
import SearchModal from './SearchModal';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', href: '#' },
    { icon: Search, label: 'Search', href: '#', onClick: () => setIsSearchOpen(true) },
    { icon: Compass, label: 'Explore', href: '#', onClick: () => setIsExploreOpen(true) },
    { icon: Mail, label: 'Contact', href: '#', onClick: () => setIsContactOpen(true) },
    { icon: Settings, label: 'Settings', href: '#', onClick: () => setIsSettingsOpen(true) },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 z-50 p-3 accent-gradient rounded-full lg:hidden hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`
        fixed lg:sticky lg:top-0 left-0 h-screen w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 z-40
        transform transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        overflow-y-auto flex flex-col
      `}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 accent-gradient rounded-full">
              <Instagram size={24} />
            </div>
            <span className="text-2xl font-bold text-black dark:text-white">Portfolio</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group cursor-pointer"
              >
                <Icon size={24} className="text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                <span className="text-lg text-black dark:text-white">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <button className="w-full py-3 accent-gradient-to-r rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Log Out
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-white/10 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <ExploreModal isOpen={isExploreOpen} onClose={() => setIsExploreOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
