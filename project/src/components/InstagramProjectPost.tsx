import { useState } from 'react';
import { Project } from '../lib/mongodb';
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

interface InstagramProjectPostProps {
  project: Project;
  onClose: () => void;
}

export default function InstagramProjectPost({ project, onClose }: InstagramProjectPostProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  // Use the actual project images from the array
  const images = project.image_urls && project.image_urls.length > 0 
    ? project.image_urls 
    : ['http://localhost:5000/uploads/projects/placeholder.png'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-lg max-w-5xl w-full h-[90vh] flex overflow-hidden border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side - Image Carousel */}
        <div className="w-full md:w-1/2 relative bg-black flex items-center justify-center group">
          <img
            src={images[currentImageIndex]}
            alt={`${project.title} ${currentImageIndex + 1}`}
            className="w-full h-full object-contain"
          />

          {/* Image Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white w-6' : 'bg-gray-500 w-2'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full text-white transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Right Side - Project Details (Instagram Style) */}
        <div className="hidden md:flex md:w-1/2 flex-col bg-black text-white border-l border-gray-800">
          {/* Header */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500"></div>
              <div>
                <p className="font-semibold text-sm">{project.title}</p>
                <p className="text-xs text-gray-400">Portfolio Project</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <span className="text-2xl">...</span>
            </button>
          </div>

          {/* Description & Details */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Description */}
            <div>
              <p className="text-sm text-gray-200">{project.description}</p>
            </div>

            {/* Technologies */}
            {project.technologies.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-xs text-gray-300 hover:border-gray-500 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project URL */}
            {project.project_url && (
              <div>
                <p className="text-xs font-semibold text-gray-400 mb-2 uppercase">GitHub Link</p>
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-xs break-all"
                >
                  {project.project_url}
                </a>
              </div>
            )}
          </div>

          {/* Engagement Actions */}
          <div className="border-t border-gray-800 p-4 space-y-4">
            {/* Like, Comment, Share, Save */}
            <div className="flex gap-4">
              <button
                onClick={() => setLiked(!liked)}
                className="hover:text-gray-400 transition-colors"
              >
                <Heart
                  size={24}
                  fill={liked ? '#ef4444' : 'none'}
                  color={liked ? '#ef4444' : 'currentColor'}
                />
              </button>
              <button className="hover:text-gray-400 transition-colors">
                <MessageCircle size={24} />
              </button>
              <button className="hover:text-gray-400 transition-colors">
                <Send size={24} />
              </button>
              <button className="ml-auto hover:text-gray-400 transition-colors">
                <Bookmark size={24} />
              </button>
            </div>

            {/* Like Count */}
            <div>
              <p className="text-sm font-semibold">156 likes</p>
            </div>

            {/* Caption with Comments Button */}
            <div className="space-y-2">
              <p className="text-xs text-gray-400">View all comments</p>
            </div>

            {/* Comment Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs placeholder-gray-500 focus:outline-none focus:border-gray-500 text-white"
              />
              <button className="text-blue-400 hover:text-blue-300 font-semibold text-xs">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
