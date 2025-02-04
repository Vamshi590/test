import { FaHome, FaRegBell } from "react-icons/fa";
import logo from "../assets/finalLogo.svg";
import profilepic from "../assets/ProfilePic.svg";
import Search from "../components/Search";
import { Link, useLocation } from "react-router-dom";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import questionsIcon from "../assets/questionIcon.svg";
import connectIcon from "../assets/connectIcon.svg";
import { HiBriefcase } from "react-icons/hi";
import conferrenceIcon from "../assets/conferrenceIcon.svg"

function TopNavbar() {
  const location = useLocation();

  const id = location.state;

  const userid = localStorage.getItem("Id") || id;
  return (
    <header className="hidden lg:flex fixed  lg:items-center lg:justify-center top-0 left-0 right-0 bg-white shadow z-20 px-4">
      <div className="flex max-w-6xl w-full flex-row justify-between items-center">
        <div className="py-2 flex flex-row space-x-4">
          <img className="w-28" src={logo} alt="logo" />
          <Search />
        </div>

        <div className="flex flex-row space-x-4">
          <Link
            to="/feed"
            className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-500"
          >
            <FaHome size="1.7rem" />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/questions"
            className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-500"
          >
            <div className="w-8">
              <img className="w-7" src={questionsIcon} alt="questions icon" />
            </div>
            <span className="text-xs">Questions</span>
          </Link>
          <Link
            to={`/jobs/${userid}`}
            className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-500"
          >
            <HiBriefcase size={"1.7rem"} />
            <span className="text-xs">Jobs</span>
          </Link>

          <Link
            to={`/Conferrences/${userid}`}
            className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-500"
          >
            <div>
              <img className="w-7" src={conferrenceIcon} alt="conferrences" />
            </div>
            <span className="text-xs">Conferrences</span>
          </Link>






          <Link
            to={`/connections/${userid}`}
            className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-500"
          >
            <div className="w-7">
              <img className="w-7" src={connectIcon} alt="Connect" />
            </div>
            <span className="text-xs">Connect</span>
          </Link>

          <Link
            to={`/message`}
            className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-500"
          >
            <BiSolidMessageRoundedDetail size={"1.7rem"} />
            <span className="text-xs">Message</span>
          </Link>

          
          <Link
            to={`/notifications`}
            className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-500"
          >
            <FaRegBell size={"1.6rem"} />
            <span className="text-xs">Notifications</span>
          </Link>


          <Link
            to={`/profile/${userid}`}
            className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-500"
          >
            <div className="rounded-full">
              <img className="w-7" src={profilepic} alt="profile pic" />
            </div>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;
