import * as React from "react";

interface Story {
  id: string;
  avatar: string;
  name: string;
  isViewed: boolean;
}

interface StoriesProps {
  stories: Story[];
}

export const Stories: React.FC<StoriesProps> = ({ stories }) => {


  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold text-gray-900">Stories</h2>
        <button className="text-[13px] text-blue-600 hover:text-blue-700">
          See all
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0">
            <div className={`w-14 h-14 rounded-full p-[2px] ${story.isViewed ? 'bg-gray-200' : 'bg-gradient to-yellow-500'}`}>
              <img
                src={story.avatar}
                alt={story.name}
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
            <p className="mt-1 text-[13px] text-gray-900 text-center truncate w-14">
              {story.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
