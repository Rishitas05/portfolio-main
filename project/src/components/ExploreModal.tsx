import { useState, useEffect } from 'react';
import { Sparkles, Zap, Trophy, Lightbulb, Cpu, X, Flame } from 'lucide-react';
import InstagramProjectPost from './InstagramProjectPost';

interface WorkItem {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  image_urls: string[];
  project_url: string;
  technologies: string[];
  order_index: number;
  created_at?: string;
}

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CategoryData {
  label: string;
  icon: React.ReactNode;
  items: WorkItem[];
  color: string;
  lightColor: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ExploreModal({ isOpen, onClose }: ExploreModalProps) {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [categories, setCategories] = useState<{ [key: string]: CategoryData }>({});
  const [allItems, setAllItems] = useState<(WorkItem & { category: string; categoryLabel: string; icon: React.ReactNode; color: string })[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchWorkData();
    }
  }, [isOpen]);

  const fetchWorkData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/explore`);
      if (response.ok) {
        const data = await response.json();
        
        const categoryConfig = [
          { key: 'projects', label: 'Projects', icon: <Sparkles size={20} />, color: 'from-blue-500 to-cyan-500', lightColor: 'bg-blue-500/10' },
          { key: 'experiments', label: 'Experiments', icon: <Zap size={20} />, color: 'from-purple-500 to-pink-500', lightColor: 'bg-purple-500/10' },
          { key: 'hackathons', label: 'Hackathons', icon: <Trophy size={20} />, color: 'from-yellow-500 to-orange-500', lightColor: 'bg-yellow-500/10' },
          { key: 'side_ideas', label: 'Side Ideas', icon: <Lightbulb size={20} />, color: 'from-green-500 to-emerald-500', lightColor: 'bg-green-500/10' },
          { key: 'iot_works', label: 'IoT Works', icon: <Cpu size={20} />, color: 'from-red-500 to-pink-500', lightColor: 'bg-red-500/10' },
        ];

        const categoriesMap: { [key: string]: CategoryData } = {};
        const flatItems: any[] = [];

        categoryConfig.forEach(cat => {
          const items = data[cat.key] || [];
          categoriesMap[cat.key] = {
            label: cat.label,
            icon: cat.icon,
            items,
            color: cat.color,
            lightColor: cat.lightColor,
          };

          items.forEach((item: WorkItem) => {
            flatItems.push({
              ...item,
              category: cat.key,
              categoryLabel: cat.label,
              icon: cat.icon,
              color: cat.color,
            });
          });
        });

        setCategories(categoriesMap);
        setAllItems(flatItems.sort((a, b) => (a.order_index || 0) - (b.order_index || 0)));
      }
    } catch (error) {
      console.error('Error fetching work data:', error);
    }
  };

  if (!isOpen) return null;

  if (selectedWork) {
    return <InstagramProjectPost project={selectedWork} onClose={() => setSelectedWork(null)} />;
  }

  return (
    <div
      className="fixed inset-0 bg-black z-50 overflow-hidden flex flex-col"
      onClick={onClose}
    >
      {/* Header - Fixed */}
      <div className="bg-black border-b border-gray-800 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="inline-block p-2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full">
            <Sparkles size={20} />
          </div>
          <h1 className="text-xl font-bold">Explore</h1>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Feed Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-0">
          {allItems.length > 0 ? (
            allItems.map((item, index) => (
              <div
                key={item._id || `${item.category}-${index}`}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('button')) return;
                  setSelectedWork(item);
                }}
                className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors cursor-pointer group"
              >
                {/* Category Header - Show first item or when category changes */}
                {(index === 0 || allItems[index - 1]?.category !== item.category) && (
                  <div className={`px-4 pt-4 pb-2 ${item.color} bg-opacity-5`}>
                    <div className="flex items-center gap-2">
                      <div className="text-gray-400">{item.icon}</div>
                      <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">{item.categoryLabel}</h2>
                      <span className="text-xs text-gray-500 ml-auto">
                        {allItems.filter(i => i.category === item.category).length} items
                      </span>
                    </div>
                  </div>
                )}

                {/* Feed Item */}
                <div className="p-4 flex gap-4">
                  {/* Image */}
                  <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                    <img
                      src={item.image_urls[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`inline-block px-2 py-1 rounded text-xs font-semibold bg-gradient-to-r ${item.color} bg-opacity-20 text-transparent bg-clip-text`}>
                        {item.categoryLabel}
                      </div>
                      {item.image_urls.length > 1 && (
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Flame size={12} className="fill-orange-500 text-orange-500" />
                          {item.image_urls.length} images
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="inline-block px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">
                          +{item.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    <a
                      href={item.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex px-3 py-1 text-xs bg-gradient-to-r from-orange-500 to-pink-500 rounded hover:opacity-90 transition-opacity font-semibold"
                    >
                      View on GitHub →
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-96 text-gray-400">
              <div className="text-center">
                <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
                <p>No items found</p>
              </div>
            </div>
          )}

          {/* End of feed */}
          <div className="px-4 py-8 text-center text-gray-500 border-t border-gray-800">
            <p className="text-sm">That's all for now! More coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
