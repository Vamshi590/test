import shareicon from "../assets/shareicon.svg";
import reposticon from "../assets/reposticon.svg";
import defaultpostimg from "../assets/post_moti_logo.jpg"
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BsDot } from 'react-icons/bs';
import { BACKEND_URL } from "@/config";

interface PostImageLinks {
  id: number;
  postImageLink: string;
}

interface PostCardProps {
  cardprofileimg: string;
  poster: string;
  posterdetails: string;
  date: string;
  posttitle: string;
  postimg: PostImageLinks[];
  postcontent: string;
  likeClick: () => void;
  isLiked: boolean;
  comments: Array<{ id: number; comment: string; user: { name: string } }>;
  onComment: (content: string) => void;
  handleProfileClick : () => void;
}

const ImageCarousel = ({ images }: { images: PostImageLinks[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!Array.isArray(images) || images.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full mb-2">
      {/* Image container */}
      <div className="relative h-[400px] w-full rounded-2xl overflow-hidden">
        <img
          src={images[currentIndex].postImageLink}
          alt={`Question image ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
            >
              <IoIosArrowBack size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
            >
              <IoIosArrowForward size={20} />
            </button>
          </>
        )}

        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all ${
                  currentIndex === index ? 'text-white' : 'text-white/50'
                }`}
              >
                <BsDot size={24} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function PostCard({ comments, onComment, handleProfileClick, ...props }: PostCardProps) {
  const [commentInput, setCommentInput] = useState("");

  const handleCommentSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && commentInput.trim()) {
      onComment(commentInput);
      setCommentInput("");
    }
  };

  return (
    <div className="flex flex-col border border-gray-400 p-4 rounded-xl  mt-4">
      <div className="flex flex-row  cursor-pointer" onClick={handleProfileClick}>
        <div className="flex items-center rounded-full">
          <img
            className="rounded-full w-12 h-12 object-cover "
            src={props.cardprofileimg}
            alt="card profile img"
          />
        </div>

        <div className="flex flex-col p-2">
          <div >
            <p className="text-sm font-medium">
              {props.poster}{" "}
              <span className="text-xs font-normal">{props.posterdetails}</span>
              <span className="text-xs font-normal"> | </span>
              <span className="text-xs font-normal">{props.date}</span>
            </p>
          </div>

          <div>
            <p className="text-xs font-normal">Published a post</p>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-main pb-2">
        <div className="pt-3 ">
          <p className="text-sm font-medium">{props.posttitle} </p>
        </div>

        {
          props.postimg && Array.isArray(props.postimg) && props.postimg.length > 0 && (
            <ImageCarousel images={props.postimg}/>
          )
        }
        <div className="py-2 ">
          <p className="text-sm">{props.postcontent}</p>
        </div>
      </div>

      <div className="flex flex-row justify-between mt-3 px-1 items-center gap-3">
        <div className="flex flex-col gap-2 items-center">
          <button 
            onClick={props.likeClick}
            className={`${props.isLiked ? 'text-red-500' : 'text-gray-500'}`}
          >
            {props.isLiked ? 'Unlike' : 'Like'}
          </button>
        </div>

        <div className="w-full pl-1.5">
          <input
            className="text-xs w-full border border-main rounded-full shadow-sm py-1.5 px-2"
            placeholder="Comment on Post"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="text-slate-500">
            <img className="w-7" src={reposticon} alt="answer icon" />
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="text-slate-400">
            <img
              className="w-5 text-slate-500"
              src={shareicon}
              alt="share icon"
            />
          </div>
        </div>
      </div>

      {/* Comments section */}
      <div className="mt-2 space-y-2">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-2 text-sm">
            <span className="font-medium">{comment.user.name}:</span>
            <span>{comment.comment}</span>
          </div>
        ))}
      </div>

      {/* Comment input */}
      <div className="w-full pl-1.5">
        <input
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyDown={handleCommentSubmit}
          className="text-xs w-full border border-main rounded-full shadow-sm py-1.5 px-2"
          placeholder="Comment on Post"
          type="text"
        />
      </div>
    </div>
  );
}

export default PostCard;


