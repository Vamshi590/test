import { BriefcaseIcon } from "lucide-react";
import JobCard from "../components/JobCard";

import TopNavbar from "@/components/TopNavbar";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import googleicon from "../assets/googleicon.svg";
import appleicon from "../assets/appleicon.svg";
function Jobs() {
  const [jobopen, setJobOpen] = useState(true);
  const [workTypeopen, setWorkTypeOpen] = useState(false);
  const [EmployementTypeopen, setEmployementOpen] = useState(false);
  const jobs = [
    {
      image: googleicon,
      title: "Medical Transciptionaist",
      organisation: "Gandhi medical college, Hyderabad",
      applications: "123",
      time: "4",
      interests: ["vamshi", "sriprada", "lavanya"],
    },

    {
      image: appleicon,
      title: "Software developer",
      organisation: "Appolo hospitals, Hyderabad",
      applications: "300",
      time: "5",
      interests: ["vamshi", "sriprada", "lavanya"],
    },

    {
      image: googleicon,
      title: "Software developer",
      organisation: "Appolo hospitals, Hyderabad",
      applications: "300",
      time: "5",
      interests: ["vamshi", "sriprada", "lavanya"],
    },

    {
      image: appleicon,
      title: "Software developer",
      organisation: "Appolo hospitals, Hyderabad",
      applications: "300",
      time: "5",
      interests: ["vamshi", "sriprada", "lavanya"],
    },

    {
      image: googleicon,
      title: "Software developer",
      organisation: "Appolo hospitals, Hyderabad",
      applications: "300",
      time: "5",
      interests: ["vamshi", "sriprada", "lavanya"],
    },
  ];

  function handleJobTypeClick() {
    setJobOpen((e) => !e);
  }

  function handleWorkTypeClick() {
    setWorkTypeOpen((e) => !e);
  }

  function handleEmployementTypeClick() {
    setEmployementOpen((e) => !e);
  }

  // Define the available color classes
  const colors = [
    "bg-jobColor1",
    "bg-jobColor2",
    "bg-jobColor3",
    "bg-jobColor4",
    "bg-jobColor5",
    "bg-jobColor6",
  ];

  // Function to get a random color from the colors array
  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="bg-white flex items-center justify-center min-h-screen overflow-y-scroll no-scrollbar">
      <TopNavbar />

      <div className="container mx-auto flex flex-col pt-20  px-4 lg:gap-8 max-w-7xl">
        <div className="w-full rounded-3xl flex flex-row px-2 py-3 bg-gray-50 gap-3 shadow-lg">
          <div className="flex items-center border-r border-r-gray-400 bg-gray-50  p-2 flex-grow">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-700 mr-2" />
            <input
              type="text"
              placeholder="Opthalmology"
              className="bg-gray-50 focus:outline-none flex-grow placeholder:text-gray-600"
            />
          </div>

          <div className="flex items-center border-r border-r-gray-400 bg-gray-50  p-2 flex-grow">
            <HiOutlineLocationMarker className="w-5 h-5 text-gray-700 mr-2" />
            <input
              type="text"
              placeholder="Hyderabad, Telangana"
              className="focus:outline-none flex-grow bg-gray-50 placeholder:text-gray-600"
            />
          </div>

          <div className="flex items-center border-r border-r-gray-400 bg-gray-50 p-2 flex-grow">
            <BriefcaseIcon className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="2+ years of experience"
              className="focus:outline-none flex-grow bg-gray-50 placeholder:text-gray-600"
            />
          </div>

          <div className="flex items-center border-r border-r-gray-400 bg-gray-50  p-1 flex-grow">
            <div className="flex flex-col w-full">
              <p>Salary</p>
              <input
                type="range"
                className="focus:outline-none flex-grow bg-gray-50 placeholder:text-gray-600 w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-center bg-gray-50  flex-grow">
            <div className="bg-black px-8 py-2 rounded-lg flex flex-row items-center gap-1 cursor-pointer hover:bg-main">
              <MagnifyingGlassIcon color="white" />
              <p className="text-white font-light">Search</p>
            </div>
          </div>
        </div>

        <div className="flex mx-auto lg:flex-row w-full lg:gap-8 ">
          <div className="w-[27%] hidden lg:block">
            <div className="flex flex-col bg-white p-4 rounded-xl">
              <div className="flex flex-row justify-between items-center px-2">
                <p className="text-xl font-bold text-black">Filters</p>
                <p className="text-sm  text-gray-400 cursor-pointer">
                  Clear all
                </p>
              </div>

              <div className="mt-4  rounded-lg divide-y divide-main shadow-md">
                <div className="flex flex-col ">
                  <div className="">
                    <div
                      onClick={handleJobTypeClick}
                      className="px-2 py-3  cursor-pointer flex flex-row items-center justify-between"
                    >
                      <p className="font-semibold">Job type</p>

                      <div className="flex flex-row items-center justify-center p-2">
                        {jobopen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </div>
                    </div>

                    <div
                      className={
                        jobopen ? "p-2 pb-4 max-h-36 overflow-auto" : "hidden"
                      }
                    >
                      <div className="flex items-center mb-4">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Full time
                        </label>
                      </div>


                      <div className="flex items-center mb-4">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Part time
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div
                    onClick={handleWorkTypeClick}
                    className="px-2 py-3  flex flex-row items-center justify-between cursor-pointer"
                  >
                    <p className="font-semibold">Department</p>

                    <div className="flex flex-row items-center justify-center p-2">
                      {workTypeopen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </div>
                  </div>

                  <div
                    className={
                      workTypeopen ? "p-2 max-h-36 overflow-auto" : "hidden"
                    }
                  >
                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Opthalmology
                      </label>
                    </div>

                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Opthalmology
                      </label>
                    </div>



                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Radiology
                      </label>
                    </div>



                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Dental
                      </label>
                    </div>


                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Cardiology
                      </label>
                    </div>

                  </div>
                </div>

                <div className="flex flex-col">
                  <div
                    onClick={handleEmployementTypeClick}
                    className="px-2 py-3 flex flex-row items-center justify-between cursor-pointer"
                  >
                    <p className="font-semibold">State</p>

                    <div className="flex flex-row items-center justify-center p-2">
                      {EmployementTypeopen ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      EmployementTypeopen
                        ? "p-2 max-h-36 overflow-auto"
                        : "hidden"
                    }
                  >
                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Telangana
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Andhra pradesh
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Karnataka
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Tamil nadu
                      </label>
                    </div>

                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Kerala
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Delhi
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Madhya pradesh
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Rajasthan
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[73%] w-full">
            <div className="relative w-full h-full ">
              <div className="bg-white rounded-xl px-2 pt-4  w-full  h-screen overflow-y-scroll no-scrollbar pb-16">
                <div>
                  <p className="text-xl font-bold">Jobs for you</p>
                </div>

                {/* Job card */}

                <div className="w-full grid grid-cols-12 gap-4">
                  {jobs.map((job, index): any => (
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                      <JobCard
                        title={job.title}
                        organisation={job.organisation}
                        applications={job.applications}
                        time={job.time}
                        jobimage={job.image}
                        i={index}
                        interests={job.interests}
                        color={getRandomColor()}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
