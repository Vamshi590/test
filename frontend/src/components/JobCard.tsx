import { useState } from "react";
import applicationicon from "../assets/applicationIcon.svg";
import timeicon from "../assets/timeIcon.svg";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoWalletOutline } from "react-icons/io5";

function JobCard({
  i,
  jobimage,
  title,
  organisation,
  applications,
  time,
  color,
}: any) {
  const [save, setSave] = useState(false);

  const handleSaveJob = () => {
    setSave((e) => !e);
  };

  return (
    <div
      className={`${color} p-4 flex-justify-center w-full rounded-3xl mt-4 shadow-lg hover:shadow-xl `}
    >
      <div className="flex flex-row lg:flex-col" key={i}>
        <div className="lg:flex lg:flex-row lg:justify-between lg:items-center">
          <img
            className="rounded-full w-12 h-12 bg-white p-2"
            src={jobimage}
            alt="job"
          />

          <div
            onClick={handleSaveJob}
            className="cursor-pointer hidden lg:block"
          >
            {save ? (
              <FaBookmark size={"1.3rem"} />
            ) : (
              <CiBookmark size={"1.5rem"} />
            )}
          </div>
        </div>

        <div className="fle flex-col  lg:mt-3">
          <div className="">
            <p className="text-base font-semibold">{title}</p>
            <p className="text-xs">{organisation}</p>
          </div>

          <div className="flex flex-row justify-stretch items-center mt-4 w-full gap-4 lg:hidden ">
            <div className="flex flex-row justify-center items-center ">
              <img src={applicationicon} alt="application icon" />
              <p className="text-xs px-2">{applications} Applicants</p>
            </div>

            <div className="flex flex-row justify-center items-center ">
              <img src={timeicon} alt="time icon" />
              <p className="text-xs px-2">{time} days ago</p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="flex flex-row justify-center mt-4">
              <div className="flex flex-row gap-1 w-1/2">
                <IoWalletOutline className="text-gray-500" />

                <p className="text-xs">20000 - 30000</p>
              </div>

              <div className="flex flex-row gap-1 w-1/2">
                <HiOutlineLocationMarker className="text-gray-500" />

                <p className="text-xs truncate">Hyderabad, Telangana</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-5 w-full">
            <div className="col-span-5 border border-main bg-transparent text-center rounded-2xl px-3 py-2 cursor-pointer">
              <p className="text-black text-xs">Details</p>
            </div>

            <div className="col-span-5 border border-main bg-black rounded-2xl text-center px-4 py-2 cursor-pointer">
              <p className="text-white text-xs">Apply now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
