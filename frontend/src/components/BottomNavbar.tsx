import { FaHome} from "react-icons/fa"; // Importing icons
import { PiTargetBold } from "react-icons/pi";
import profilepic from "../assets/ProfilePic.svg"
import questionsIcon from "../assets/questionIcon.svg"

import connectIcon from "../assets/connectIcon.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context";

const BottomNavbar = ({ showNavbar }: any) => {

    const {id} = useContext(UserContext)

    const idFromLocalStorage = localStorage.getItem("Id")

   const  userid  = id || idFromLocalStorage


  return (
    <div
      className={`absolute bottom-0 left-0 w-full bg-white shadow-md z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-around items-center">
        <Link
          to="/"
          className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-500"
        >
          <FaHome size="1.4rem" />
          <span className="text-[0.65rem]">Home</span>
        </Link>
        <Link
          to="/questions"
          className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-500"
        >
          <div className="w-6">
            <img className="w-6" src={questionsIcon} alt="questions icon" />
          </div>
          <span className="text-[0.65rem]">Questions</span>
        </Link>
        <Link
          to="/careers"
          className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-500"
        >
          <PiTargetBold size={"1.4rem"} />
          <span className="text-[0.65rem]">Careers</span>
        </Link>
        <Link
          to={`/connections/${userid}`}
          className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-500"
        >
          <div className="w-5">
            <img className="w-5" src={connectIcon} alt="Connect" />
          </div>
          <span className="text-[0.65rem]">Connect</span>
        </Link>
        <Link
        
          to={`/profile/${userid}`}
          className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-500"
        >
            <div className="rounded-full">
                <img className="w-5" src={profilepic} alt="profile pic" />
            </div>
          <span className="text-[0.65rem]">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavbar;
