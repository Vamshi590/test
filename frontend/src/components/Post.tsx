import * as React from "react";
import save1 from "../assets/icons/save1.svg"
import more from "../assets/icons/more.svg"
import comment from "../assets/icons/comment1.svg"
import repost from "../assets/icons/repost.svg"
import share from "../assets/icons/share.svg"
import like from "../assets/icons/like1.svg"
import { useRef, useState } from "react";

export interface PostProps {
    avatar: string;
    name: string;
    bio: string;
    timeAgo: string;
    title: string;
    content: string;
    images: string[];
    likes: number;
    comments: number;
    shares: number;
    reposts: number;
    onLike?: () => void;
    onComment?: (content : any) => void;
    onShare?: () => void;
    onRepost?: () => void;
    onMoreOptions?: () => void;
  }

export const Post: React.FC<PostProps> = ({
  avatar,
  name,
  bio,
  timeAgo,
  title,
  content,
  images,
  likes,
  comments,
  shares,
  reposts,
  onLike,
  onComment,
  onShare,
  onRepost,
  onMoreOptions,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const startXRef = useRef<number | null>(null);
  const currentTranslate = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current !== null) {
      const currentX = e.touches[0].clientX;
      currentTranslate.current = currentX - startXRef.current;
    }
  };

  const handleTouchEnd = () => {
    if (currentTranslate.current > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Slide to the previous image
    } else if (currentTranslate.current < -50 && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1); // Slide to the next image
    }
    startXRef.current = null;
    currentTranslate.current = 0;
  };

  return (
    <article className="flex flex-col p-4 bg-white rounded-xl border border-gray-200 mt-2 shadow-lg font-fontsm">
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div>
          <img
            src={avatar}
            alt={`${name}'s profile`}
            className="w-[46px] h-[46px] rounded-full"
          /></div>

          <div className="pt-1">
            <h3 className="text-md font-medium text-neutral-700">{name}</h3>
            <p className="text-fontlit text-neutral-500">{bio}</p>
            <p className="text-fontlit text-neutral-700">{timeAgo}</p>
          </div>
        </div>
        <div className="flex items-center">
        <img src={save1} className="w-6 h-6" alt="" />
        <button
          onClick={onMoreOptions}
          aria-label="More options"
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <img src={more} className="w-6 h-6" alt="" />
        </button>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-neutral-700">{title}</h4>
        <p
          className={`mt-1 text-sm font-light text-neutral-500 ${
            isExpanded ? "" : "line-clamp-1"
          }`}
        >
          {content}
        </p>
        {content.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1 text-xs text-slate-500 hover:text-slate-700"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

     

       {/* Image Slider */}
      {images.length > 0 && (
        <div
          className="relative w-full  mb-4 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * 80}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`flex-none w-[80%] ${
                  index === currentIndex + 1 ? 'w-[20%]' : ''
                }  mr-2 rounded-lg bg-gray-200`}
              >
                <img
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-4 pt-4 border-t border-neutral-100">
        <div className="flex">
        <div className="flex ">
        <button
          onClick={onLike}
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
        >
         
          <img
            src={like}
             alt=""
            className="w-5 h-5"
          />

          
        </button>
        </div >
        <div className="flex flex-col justify-start text-xs pl-1">
          <p className=" text-neutral-500  hover:text-slate-700 ">likes</p>
          <span>{likes}</span>
          </div>
        </div>
        <div className="flex">
        <div className="flex ">
        <button
          onClick={onComment}
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
        >
         
          <img
            src={comment}
            alt=""
            className="w-5 h-5"
          />

          
        </button>
        </div >
        <div className="flex flex-col justify-start text-xs pl-1">
          <p className=" text-neutral-500  hover:text-slate-700 ">comments</p>
          <span>{comments}</span>
          </div>
        </div>

        <div className="flex">
        <div className="flex ">
        <button
          onClick={onShare}
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
        >
         
          <img
            src={share}
            className="w-5 h-5"
          />

          
        </button>
        </div >
        <div className="flex flex-col justify-start text-xs pl-1">
          <p className=" text-neutral-500  hover:text-slate-700 ">shares</p>
          <span>{shares}</span>
          </div>
        </div>



        <div className="flex">
        <div className="flex ">
        <button
          onClick={onRepost}
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
        >
         
          <img
            src={repost}
            alt=""
            className="w-5 h-5"
          />

          
        </button>
        </div >
        <div className="flex flex-col justify-start text-xs pl-1.5">
          <p className=" text-neutral-500  hover:text-slate-700  ">reposts</p>
          <span>{reposts}</span>
          </div>
        </div>
        
      </div>  
    </article>
  );
};