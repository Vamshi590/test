import { GoArrowLeft } from "react-icons/go";
import { FaRegBell } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import ProfileCard from "../components/ProfileCard";
import profilepic from "../assets/ProfilePic.svg";
import topinterestsicon from "../assets/topinterestsicon.svg";
import activityicon from "../assets/activityicon.svg";
import certificationicon from "../assets/certificationsicon.svg";
import educationicon from "../assets/educationicon.svg";
import analyticsicon from "../assets/analyticsicon.svg";
import { useEffect, useRef, useState } from "react";
import AnalyticsCard from "../components/AnalyticsCard";
import jobimage from "../assets/JobImage.svg";
import EducationCard from "../components/EducationCard";
import MembershipCard from "../components/MembershipCard";
import CertificateCard from "../components/CertificateCard";
import AchievementsCard from "../components/AchievementsCard";
import ProffesionalExperienceCard from "../components/ProffesionalExperienceCard";
import ActivityCard from "../components/ActivityCard";
import BottomNavbar from "../components/BottomNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import noimagepost from "../assets/post_moti_logo.jpg";
import { capitalizeFirstLetter, truncateString } from "@/functions";

function ConnectionsProfile() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null); // Ref for scrollable content

  const { id } = useParams(); // Get user ID from URL params

  const [userDetails, setUserDetails] = useState<any>(null); // State to hold user data

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/profile/${userId}`);

      console.log(response)


      const userInfo = response.data.data;
      const questionInfo = response.data.data.questions;
      const postsInfo = response.data.data.posts;
      const certificatesInfo = response.data.certificates;
      const awardsInfo = response.data.awards;
      const experienceInfo = response.data.experiences;
      const educationInfo = response.data.educations;
      const membershipsInfo = response.data.memberships;

      const fetchedUser = {
        name: userInfo.name,
        headline: `${userInfo.department}`,
        userLocation: `${userInfo.city}`,
        workPlace: `${userInfo.organisation_name}`,
        questionCount: questionInfo.length,
        postsCount: postsInfo.length,
        posts: postsInfo,
        certificates: certificatesInfo,
        awards: awardsInfo,
        experiences: experienceInfo,
        educations: educationInfo,
        memberships: membershipsInfo,
      };

      setUserDetails(fetchedUser);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  // Function to fetch user data from the backend

  // Scroll handling to hide/show Navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = contentRef.current?.scrollTop || 0;
      if (scrollY > lastScrollY) {
        setShowNavbar(false); // Hide Navbar when scrolling down
      } else {
        setShowNavbar(true); // Show Navbar when scrolling up
      }
      setLastScrollY(scrollY); // Update lastScrollY state
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

  // Tab selection for Activity, Certifications, etc.
  const [values, setValues] = useState(0);

  const handleActivity = () => setValues(0);
  const handleCertifications = () => setValues(1);
  const handleEducation = () => setValues(2);
  const handleAnalytics = () => setValues(3);

  if (!userDetails) {
    return <p>Loading...</p>; // Loading state while fetching user data
  }

  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen overflow-y-scroll no-scrollbar">
      <div className="relative max-w-sm w-full h-full">
        <div
          className="bg-white flex-col rounded-lg px-2 pt-4 max-w-sm w-full h-screen overflow-y-scroll no-scrollbar pb-16"
          ref={contentRef}
        >
          {/* Header */}
          <div className="flex flex-row justify-between items-center">
            <GoArrowLeft className="text-slate-500 w-5 h-5" />
            <div className="flex flex-row justify-around gap-4">
              <FaRegBell className="text-slate-500 w-5 h-5 " />
              <LuMenu className="text-slate-500 w-5 h-5 " />
            </div>
          </div>

          {/* Profile Card */}
          <ProfileCard
            profilepic={profilepic}
            name={capitalizeFirstLetter(userDetails.name)}
            details={capitalizeFirstLetter(userDetails.headline)}
            activeloction={capitalizeFirstLetter(userDetails.userLocation)}
            currentWorkPlace={capitalizeFirstLetter(userDetails.workPlace)}
            questions={userDetails.questionCount}
            published={userDetails.postsCount}
            followers={userDetails.friendsCount}
            following={userDetails.friendsCount}
          />

          <div className="flex flex-row justify-between items-center mt-4">
            <div className=" flex justify-center items-center w-full border border-main rounded-3xl cursor-pointer hover:bg-main hover:text-white shadow-md">
              <p className="text-sm px-3 py-1">Follow</p>
            </div>

            <div className=" flex justify-center items-center rounded-3xl w-full border border-main cursor-pointer hover:bg-main hover:text-white shadow-md">
              <p className="text-sm px-3 py-1">Message</p>
            </div>
          </div>

          {/* Rest of the content (like floating cards, tabs, etc.) */}
          {/* Example: Floating Card */}
          <div className="flex flex-row border border-main rounded-2xl shadow-md mt-4 px-3 py-2">
            <img
              className="w-16"
              src={topinterestsicon}
              alt="top interests icon"
            />
            <div className="flex flex-col px-4">
              <p className="text-base font-semibold pb-1">Top Interests</p>
              <p className="text-xs pb-1 ">
                vision science, ocular surgery, medical research, Diagnostic
                tools, Treatment innovations
              </p>
            </div>
          </div>

          {/* Tabs: Activity, Certifications, Education, Analytics */}
          <div className="flex flex-row justify-between mt-6 px-3">
            <button
              onClick={handleActivity}
              className={
                values === 0 ? "p-1.5 border-b-2 border-b-main" : "p-1.5"
              }
            >
              <img src={activityicon} alt="activity icon" />
            </button>
            <button
              onClick={handleCertifications}
              className={
                values === 1 ? "p-1.5 border-b-2 border-b-main" : "p-1.5"
              }
            >
              <img src={certificationicon} alt="certifications icon" />
            </button>
            <button
              onClick={handleEducation}
              className={
                values === 2 ? "p-1.5 border-b-2 border-b-main" : "p-1.5"
              }
            >
              <img src={educationicon} alt="education icon" />
            </button>
            <button
              onClick={handleAnalytics}
              className={
                values === 3 ? "p-1.5 border-b-2 border-b-main" : "p-1.5"
              }
            >
              <img src={analyticsicon} alt="analytics icon" />
            </button>
          </div>

          {/* Conditionally render sections based on `values` */}
          {values === 0 && (
            <div className="grid grid-cols-12 mt-4 gap-3">
              {/* Check if there are posts */}
              {userDetails?.posts?.length > 0 ? (
                userDetails.posts.map((post: any) => (
                  <ActivityCard
                    key={post.id} // Assuming each post has a unique 'id'
                    activitycardimg={post.image || noimagepost} // Use post's image or fallback image
                    title={truncateString(
                      capitalizeFirstLetter(post.title),
                      50
                    )} // Assuming 'title' is part of the post object
                  />
                ))
              ) : (
                <div className="grid col-span-12">
                  <div className="flex flex-row justify-center">
                    <p>No Posts</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Add the other sections similarly for Certifications, Education, Analytics */}

          {values == 1 && (
            <div className="mt-4 px-3 pb-4">
              <div className="flex flex-row justify-between">
                <div>
                  <p className="text-base font-semibold">Certifications</p>
                </div>
              </div>

              {/* certifications card */}

              {userDetails?.certificates?.length > 0 ? (
                userDetails.certificates.map((certificate: any) => (
                  <CertificateCard
                    key={certificate.id} // Assuming each post has a unique 'id'
                    orginastionimage={jobimage}
                    title={capitalizeFirstLetter(certificate.certificateName)}
                    organisation={capitalizeFirstLetter(
                      certificate.issuingOrganisation
                    )}
                    date={certificate.issueDate}
                  />
                ))
              ) : (
                <div>hi</div>
              )}

              {/* Achievements and Awards  */}

              <div className="flex flex-row justify-between mt-4">
                <div>
                  <p className="text-base font-semibold">
                    Achievements And Awards
                  </p>
                </div>
              </div>

              {/* Achievments card */}

              {userDetails?.awards?.length > 0 ? (
                userDetails.awards.map((award: any) => (
                  <AchievementsCard
                    jobimage={jobimage}
                    title={award.awardName}
                    date={award.issueDate}
                  />
                ))
              ) : (
                <div>
                  hi
                </div>
              )}
            </div>
          )}

          {values == 2 && (
            <div className="mt-4 px-3 pb-4">
              <div className="flex flex-row justify-between">
                <div>
                  <p className="text-base font-semibold">
                    Proffesional Experience
                  </p>
                </div>
              </div>

              {userDetails?.experiences?.length > 0 ? (
                userDetails.experiences.map((experience: any) => (
                  <ProffesionalExperienceCard
                    key={experience.id}
                    jobimage={jobimage}
                    title={capitalizeFirstLetter(experience.title)}
                    organisation={capitalizeFirstLetter(
                      experience.organisation
                    )}
                    timeline={`${capitalizeFirstLetter(
                      experience.startDate
                    )} - ${capitalizeFirstLetter(experience.endDate)}`}
                  />
                ))
              ) : (
                <div>
                  hi
                </div>
              )}

              <div className="flex flex-row justify-between mt-4">
                <div>
                  <p className="text-base font-semibold">
                    Education Qualifications
                  </p>
                </div>
              </div>

              {userDetails?.educations?.length > 0 ? (
                userDetails.educations.map((education: any) => (
                  <EducationCard
                    jobimage={jobimage}
                    title={education.schoolName}
                    organisation={`${education.degree} | ${education.department}`}
                    timeline={`${education.startDate} - ${education.endDate}`}
                  />
                ))
              ) : (
                <div>
                  hi
                </div>
              )}

              <div className="mt-4">
                <div className="flex flex-row justify-between">
                  <div>
                    <p className="text-base font-semibold">Memberships</p>
                  </div>
                </div>
              </div>

              {userDetails?.memberships?.length > 0 ? (
                userDetails.memberships.map((membership: any) => (
                  <MembershipCard
                    image={jobimage}
                    title={membership.societyName}
                    position={membership.position}
                  />
                ))
              ) : (
                <div>
                  hi
                </div>
              )}
            </div>
          )}

          {values == 3 && (
            <div className="mt-4 px-3 pb-4">
              <div>
                <p className="text-base font-semibold">
                  Analytics and Data Points
                </p>
              </div>

              <div className="grid grid-cols-12 mt-4 gap-3">
                <AnalyticsCard
                  value="211"
                  label="Post impressions"
                  analytics="+2.1% past 7 days"
                />
                <AnalyticsCard
                  value="211"
                  label="Post impressions"
                  analytics="+2.1% past 7 days"
                />
                <AnalyticsCard
                  value="211"
                  label="Post impressions"
                  analytics="+2.1% past 7 days"
                />
                <AnalyticsCard
                  value="211"
                  label="Post impressions"
                  analytics="+2.1% past 7 days"
                />
                <AnalyticsCard
                  value="211"
                  label="Post impressions"
                  analytics="+2.1% past 7 days"
                />
                <AnalyticsCard
                  value="211"
                  label="Post impressions"
                  analytics="+2.1% past 7 days"
                />
              </div>
            </div>
          )}

          <BottomNavbar showNavbar={showNavbar} />
        </div>
      </div>
    </div>
  );
}

export default ConnectionsProfile;
