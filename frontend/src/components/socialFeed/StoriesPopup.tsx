import  { useState, useEffect,useCallback  } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Story {
  id: number;
  username: string;
  avatarUrl: string;
  imageUrl: string;
  viewed: boolean;
}

const StoriesSection = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const [stories] = useState<Story[]>([
    {
      id: 1,
      username: "Dr. Smith",
      avatarUrl: "/api/placeholder/40/40",
      imageUrl: "/api/placeholder/400/600",
      viewed: false
    },
    {
      id: 2,
      username: "Dr. Johnson",
      avatarUrl: "/api/placeholder/40/40",
      imageUrl: "/api/placeholder/400/600",
      viewed: false
    },
    {
      id: 3,
      username: "Dr. Williams",
      avatarUrl: "/api/placeholder/40/40",
      imageUrl: "/api/placeholder/400/600",
      viewed: true
    },
    {
      id: 4,
      username: "Dr. Brown",
      avatarUrl: "/api/placeholder/40/40",
      imageUrl: "/api/placeholder/400/600",
      viewed: false
    }
  ]);

  const handleNextStory = useCallback(() => {
    if (activeStoryIndex !== null && activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      setProgress(0);
    } else if (activeStoryIndex === stories.length - 1) {
      setActiveStoryIndex(null);
    }
  }, [activeStoryIndex, stories.length]);

  const handlePreviousStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setProgress(0);
    }
  };

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    if (activeStoryIndex !== null && isPlaying) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNextStory();
            return 0;
          }
          return prev + 1;
        });
      }, 30);
    }
    return () => clearInterval(progressInterval);
  }, [activeStoryIndex, isPlaying, handleNextStory]);

  // Stories list component
  const StoriesList = () => (
    <div className="relative">
      <div 
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {stories.map((story, index) => (
          <div 
            key={story.id}
            className="flex flex-col items-center min-w-[80px]"
            onClick={() => {
              setActiveStoryIndex(index);
              setProgress(0);
              setIsPlaying(true);
            }}
          >
            <div className={`relative w-16 h-16 rounded-full mb-2 cursor-pointer
              ${story.viewed ? 'ring-gray-300' : 'ring-blue-500'} ring-2 p-1`}>
              <img
                src={story.avatarUrl}
                alt={story.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-sm text-gray-700 truncate w-full text-center">
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const StoryViewer = () => {
    if (activeStoryIndex === null) return null;
    
    return (
      <div 
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-full max-w-md">
            {/* Progress Bar */}
            <div className="absolute top-4 left-0 right-0 px-4 z-10">
              <div className="h-1 w-full bg-gray-600/50 rounded-full">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Previous Story Preview */}
            {activeStoryIndex > 0 && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-96 -translate-x-56 opacity-50 transition-all duration-300">
                <img
                  src={stories[activeStoryIndex - 1].imageUrl}
                  alt="Previous"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            {/* Current Story */}
            <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden">
              <img
                src={stories[activeStoryIndex].imageUrl}
                alt="Current Story"
                className="w-full h-full object-contain"
              />

              {/* User Info */}
              <div className="absolute top-8 left-4 flex items-center space-x-2">
                <img
                  src={stories[activeStoryIndex].avatarUrl}
                  alt={stories[activeStoryIndex].username}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white font-semibold">
                  {stories[activeStoryIndex].username}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveStoryIndex(null);
                }}
                className="absolute top-8 right-4 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Next Story Preview */}
            {activeStoryIndex < stories.length - 1 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-96 translate-x-56 opacity-50 transition-all duration-300">
                <img
                  src={stories[activeStoryIndex + 1].imageUrl}
                  alt="Next"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {activeStoryIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePreviousStory();
              }}
              className="absolute left-8 top-1/2 -translate-y-1/2 text-white p-2"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {activeStoryIndex < stories.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextStory();
              }}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-white p-2"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4">
      <StoriesList />
      <StoryViewer />
    </div>
  );
};

export default StoriesSection;