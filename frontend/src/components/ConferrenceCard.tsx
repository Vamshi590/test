import { IoCalendarOutline } from "react-icons/io5";
import { GiHospitalCross } from "react-icons/gi";
import {   CiLocationOn } from "react-icons/ci";
import { MdArrowOutward, MdOutlineFileDownload } from "react-icons/md";
import { useState } from "react";

function ConferrenceCard({
  cmeimage,
  title,
  organisation,
  date,
  location,
}: any) {


  const[hover , setHover] = useState(false)


  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }



  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="flex flex-col rounded-3xl shadow-lg mt-4 hover:shadow-2xl pb-3">
      <img
        src={cmeimage}
        alt="conferrence image"
        className="flex rounded-t-2xl object-contain "
      />

  
      

      <div className="mt-2 px-3">
        <p className="font-semibold text-base">{title}</p>
      </div>

      <div className="flex flex-row mt-3 px-3 pt-2 justify-stretch items-center">
        <GiHospitalCross className="text-slate-500" />
        <p className="text-xs  px-2">{organisation}</p>
      </div>

      <div className="flex flex-col justify-center  w-full gap-4 p-3">
        <div className="flex flex-row  items-center  ">
          <IoCalendarOutline />
          <p className="text-xs px-2">{date}</p>
        </div>

        <div className="flex flex-row  items-center ">
          <CiLocationOn />

          <p className="text-xs px-2">{location}</p>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center px-5 mt-2">
        <div className="flex flex-row items-center justify-center">
          <p className="text-sm font-medium">Brochure</p>
          <MdOutlineFileDownload size={"1.5rem"} className="text-gray-600" />
        </div>

        <MdArrowOutward size={"2rem"} className={` ${hover ? 'bg-main rounded-full text-white shadow-2xl' : "text-gray-300"}`} />
      </div>
    </div>
  );
}

export default ConferrenceCard;
