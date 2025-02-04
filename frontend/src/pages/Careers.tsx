import { GoArrowLeft } from "react-icons/go";
import Search from "../components/Search";
import jobimage from "../assets/JobImage.svg";
import JobCard from "../components/JobCard";
import cmeimage from "../assets/cmeimage.svg";

import { useEffect, useRef, useState } from "react";
import ConferrenceCard from "../components/ConferrenceCard";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "@/components/TopNavbar";

function Careers() {
  // const [showHeader, setShowHeader] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null); // Ref for scrollable content

  // Handle scrolling inside the content div
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollY = contentRef.current.scrollTop;
        if (scrollY > lastScrollY) {
          // If scrolling down, hide the header and navbar
          // setShowHeader(false);
          setShowNavbar(false);
        } else {
          // If scrolling up, show the header and navbar
          // setShowHeader(true);
          setShowNavbar(true);
        }
        setLastScrollY(scrollY);
      }
    };

    const scrollableDiv = contentRef.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [lastScrollY]);

  const [jobsActive, setJobsActive] = useState(true);

  const jobs = [
    {
      image: jobimage,
      title: "Medical Transciptionaist",
      organisation: "Gandhi medical college, Hyderabad",
      applications: "123",
      time: "4",
      interests: ["vamshi", "sriprada", "lavanya"],
    },

    {
      image: jobimage,
      title: "Software developer",
      organisation: "Appolo hospitals, Hyderabad",
      applications: "300",
      time: "5",
      interests: ["vamshi", "sriprada", "lavanya"],
    },

    {
      image: jobimage,
      title: "Software developer",
      organisation: "Appolo hospitals, Hyderabad",
      applications: "300",
      time: "5",
      interests: ["vamshi", "sriprada", "lavanya"],
    },
  ];

  const conferrence = [
    {
      image: cmeimage,
      title: "Advancements in optholmology : Futute of eye care technology",
      organisation: "Telangana optholmology society",
      date: "September 10th, tuesday, 9:00 AM",
      location: "Hyderabad",
    },
  ];

  function handleConferencess() {
    setJobsActive(false);
  }

  function handleOpportunities() {
    setJobsActive(true);
  }

  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen overflow-y-scroll no-scrollbar">
      <TopNavbar />
      <div className="relative max-w-sm w-full h-full ">
        <div className="bg-white flex-col rounded-lg px-2 pt-4 max-w-sm w-full  h-screen overflow-y-scroll no-scrollbar pb-16">
          {/* Header */}

          <div className="flex flex-row  items-center gap-2 ">
            <div>
              <GoArrowLeft className="w-5 h-5 text-slate-500" />
            </div>

            <Search />
          </div>
          <div className="flex justify-center">
            <div className="flex items-center justify-around w-fit border border-main rounded-full px-px mt-4">
              <div className="px-2 py-2">
                <button
                  onClick={handleOpportunities}
                  className={
                    jobsActive
                      ? "bg-main text-sm font-semibold text-white border border-main rounded-full px-2 py-1.5"
                      : "text-black text-sm px-2 py-1.5"
                  }
                >
                  Opportunities
                </button>
              </div>
              <div className="px-2 py-2">
                <button
                  className={
                    jobsActive
                      ? "text-black text-sm px-2 py-1.5 "
                      : "bg-main text-sm font-semibold text-white border border-main rounded-full px-2 py-1.5"
                  }
                  onClick={handleConferencess}
                >
                  Conferencess
                </button>
              </div>
            </div>
          </div>

          {/* Job card */}

          {jobsActive ? (
            <div>
              {jobs.map((job, index): any => (
                <JobCard
                  title={job.title}
                  organisation={job.organisation}
                  applications={job.applications}
                  time={job.time}
                  jobimage={job.image}
                  i={index}
                  interests={job.interests}
                />
              ))}
            </div>
          ) : (
            <div>
              {conferrence.map((conferrence, index) => (
                <div key={index}>
                  <ConferrenceCard
                    cmeimage={conferrence.image}
                    title={conferrence.title}
                    organisation={conferrence.organisation}
                    date={conferrence.date}
                    location={conferrence.location}
                  />
                </div>
              ))}
            </div>
          )}

          <BottomNavbar showNavbar={showNavbar} />
        </div>
      </div>
    </div>
  );
}

export default Careers;
