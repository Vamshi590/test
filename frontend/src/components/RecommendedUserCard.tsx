import { capitalizeFirstLetter, truncateString } from "@/functions";
import profilepic from "../assets/ProfilePic.svg";
import { useState } from "react";
import { toast } from "sonner";

interface RecommendedUserCardProps {

  user: any;

  onFollow: (followerId: string) => void;

  isFollowing: boolean;

}


// interface RecommendedUserCardProps {
//   user: {
//     id: string;
//     name: string;
//     department: string;
//     organisation_name: string;
//     city: string;
//     profile_picture?: string;
//     isFollowing? : boolean,
//   };
//   onFollow: (userId: string) => void;
// }

function RecommendedUserCard({ user, onFollow , isFollowing : initialIsFollowing = false }: RecommendedUserCardProps) {


  const [isFollowing, setIsFollowing] = useState(false)

  async function handleFollowClick(){
    setIsFollowing(true)

    try{
      await onFollow(user.id)
    } catch (e){
      setIsFollowing(false)
      toast.error("Failed to follow user");
      console.error(e)
    }

  }

  
  
  return (
    <div className="flex items-center p-2 cursor-pointer bg-white overflow-hidden">
      <img
        src={user.profile_picture || profilepic}
        alt={`${user.name}'s profile`}
        className="w-11 h-11 rounded-full mr-2 object-cover"
      />
      <div className="flex-1 text-left">
        <p className="font-semibold text-xs text-gray-800">
          {capitalizeFirstLetter(user.name)}
        </p>
        <p className="text-[0.7rem] text-gray-600">
          {truncateString(
            `${user.department} | ${user.organisation_name} | ${user.city}`,
            50
          )}
        </p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <button 
          onClick={handleFollowClick}
          className={`py-1 px-3 text-xs mt-2 rounded-3xl font-semibold ${
            isFollowing 
              ? 'bg-gray-100 text-gray-700' 
              : 'bg-white text-main hover:text-white hover:bg-main'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
}

export default RecommendedUserCard; 