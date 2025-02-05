import React from 'react';
import save1 from "../../assets/icon/save1.svg";
import share from "../../assets/icon/share.svg";
import like from "../../assets/icon/like1.svg";
import comment from "../../assets/icon/comment1.svg";
import repost from "../../assets/icon/repost.svg";
import more1 from "../../assets/icon/more1.svg";

interface PostCardProps {
  userImage: string;
  userName: string;
  postTitle: string;
  userTitle: string;
  timeAgo: string;
  content: string;
  images: string[];
  likes: number;
  comments:number;
  shares: number;
  reposts: number;
}

const PostCard: React.FC<PostCardProps> = ({
  userImage,
  userName,
  userTitle,
  postTitle,
  timeAgo,
  content,
  images,
  likes,
  comments,
  shares,
  reposts
}) => {

  type KeyValueObject = { [key: string]: string };
  
  function extractValues(data: (KeyValueObject | string)[]): string[] {
      return data.map(obj => typeof obj === 'string' ? obj : Object.values(obj)[0]);
  }
  
  const valuesArray = extractValues(images);



  return (
    <div className="bg-white rounded-lg p-3  max-w-xl">
     <article className="flex flex-col p-4 bg-white rounded-xl border border-gray-200 mt-2 font-fontsm">
          {/* Existing header section */}
          <div className="flex justify-between items-start relative">
            <div className="flex gap-3 items-center" >
              <div>
                <img src={userImage} alt={`${userName}'s profile`} className="w-[46px] h-[46px] rounded-full" />
              </div>
              <div className="pt-1">
                <h3 className="text-md font-medium text-neutral-700">{userName}</h3>
                <p className="text-fontlit text-neutral-500">{userTitle}</p>
                <p className="text-fontlit text-neutral-700">{timeAgo}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src={save1}  className="w-6 h-6" alt="" />
              <button 
               
                aria-label="More options" 
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <img src={more1} className="w-6 h-6" alt="" />
              </button>
            
            </div>
          </div>
          {/* Content section */}
          <div className="mt-4">
            <h4 className="text-sm font-medium text-neutral-700">{postTitle}</h4>
            <p className="mt-1 text-sm font-light text-neutral-500 line-clamp-2">
              {content}
            </p>
          
          </div>
          {/* Image slider section */}
          <div  className="relative w-full mb-4 group" >
            
            
            
        
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-300" >
                {valuesArray.map((image, index) => (
                  <div key={index} className="flex-none w-full lg:h-52 rounded-lg bg-gray-200">
                    <img  src={image} alt={`Post image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
            
          </div>
          {/* Interaction buttons section */}
          <div className="flex justify-between mt-4 pt-4 border-t border-neutral-300">
            <div className="flex">
              <div className="flex">
                <button  className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700">
                  <img src={ like} alt="" className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col justify-start text-xs pl-1">
                <p className="text-neutral-500 hover:text-slate-700">likes</p>
                <span>{likes}</span>
              </div>
            </div>

            
              <div className="flex">
              <div className="flex">
                <button
                  className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
                >
                  <img src={comment} alt="" className="w-5 h-5" />
                </button>
              </div>

             
              <div className="flex flex-col justify-start text-xs pl-1">
                <p className="text-neutral-500 hover:text-slate-700">comments</p>
                  
                  <span>{comments}</span>
              </div>
            </div>
                  
            
            <div className="flex">
              <div className="flex">
                <button  className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700">
                  <img src={share} className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col justify-start text-xs pl-1">
                <p className="text-neutral-500 hover:text-slate-700">shares</p>
                <span>{shares}</span>
              </div>
            </div>
            <div className="flex">
              <div className="flex">
                <button  className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700">
                  <img src={repost} alt="" className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col justify-start text-xs pl-1.5">
                <p className="text-neutral-500 hover:text-slate-700">reposts</p>
                <span>{reposts}</span>
              </div>
            </div>
          </div>
          
         
        </article>
    </div>
  );
};

export default PostCard;