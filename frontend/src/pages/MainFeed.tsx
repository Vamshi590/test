import logo from "../assets/finalLogo.svg";
import {
  FaBehance,
  FaDribbble,
  FaLinkedin,
  FaRegBell,
  FaTwitter,
} from "react-icons/fa";
import messageicon from "../assets/messageicon.svg";
import cardprofileimg from "../assets/cardprofileimg.svg";
import PostCard from "../components/PostCard";
import profilepic from "../assets/ProfilePic.svg";
import BottomNavbar from "../components/BottomNavbar";
import { useEffect, useRef, useState } from "react";
import { UserContext } from "../Context";
import questionIcon from "../assets/mainfeedquestionicon.svg";
import posticon from "../assets/posticon.svg";
import reporticon from "../assets/reporticon.svg";

// backend imports
import { useLocation, useNavigate } from "react-router-dom";
import TopNavbar from "@/components/TopNavbar";

import { capitalizeFirstLetter, truncateString } from "@/functions";

import test4profilepic from "../assets/test4.jpg";

import { Dialog } from "@/components/Dialog";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { toast, Toaster } from "sonner";
import QuestionCard from "../components/QuestionCard";
import RecommendedUserCard from "@/components/RecommendedUserCard";
import { StudentVerificationDialog } from "../components/StudentVerificationDialog";
import { DoctorVerificationDialog } from "../components/DoctorVerificationDialog";
import { Post } from "@/components/Post";

function MainFeed() {
  const location = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const id = location.state;

  const userId = localStorage.getItem("Id") || id;

  const [showDialog, setShowDialog] = useState(false);

  const [showHeader, setShowHeader] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollY, setScrollY] = useState("overflow-y-auto");
  const contentRef = useRef<HTMLDivElement | null>(null); // Ref for scrollable content
  const [isFollowing, setIsFollowing] = useState(false);

  // Handle scrolling inside the content div
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollY = contentRef.current.scrollTop;
        if (scrollY > lastScrollY) {
          // If scrolling down, hide the header and navbar
          setShowHeader(false);
          setShowNavbar(false);
        } else {
          // If scrolling up, show the header and navbar
          setShowHeader(true);
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

  function handleMouseEnter() {
    setScrollY("");
  }

  function handleMouseLeave() {
    setScrollY("overflow-y-auto");
  }

  async function handleAskQuestion() {
    const loading = toast.loading("Checking verification status");
    try {
      const response = await axios.get(`${BACKEND_URL}/check-verification`, {
        params: { id: userId },
      });
      
      if (response.data.verified) {
        toast.dismiss(loading);
        toast.success("Verified redirecting to ask question");
        navigate(`/ask-question/${userId}`);
      } else {

        console.log(response);
        toast.dismiss(loading);
        toast.warning("Please complete your verification");
        
        // Show appropriate dialog based on user category
        if (response.data.category === 'student') {
          setShowStudentDialog(true);
        } else {
          setShowDoctorDialog(true);
        }
      }
    } catch (e) {
      toast.dismiss(loading);
      toast.error("Something went wrong. Please try again later");
      console.error(e);
    }
  }

  async function handleAddPost() {
    const loading = toast.loading("Checking verification status");

    console.log(typeof userId);

    try {
      const response = await axios.get(`https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/api/check-verification`, {
        params: { id: userId },
      });
      const verified = response.data.verified;

      if (verified) {
        toast.dismiss(loading);
        toast.success("Verified redirecting to add post");
        navigate(`/publish-post/${userId}`);
      } else {
        toast.dismiss(loading);
        toast.warning("Please verify your medical registration first");
        setShowDialog(true);
      }
    } catch (e) {
      toast.dismiss(loading);
      toast.error("Something went wrong. Please try again later");
      console.error(e);
    }
  }
  function handleShareReport() {}

  //backend

  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [recommendedUsers, setRecommendedUsers] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<any>({});

  async function getFeed() {
    const loadingToast = toast.loading("Loading feed...");

    try {
      const response = await axios.get(`https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/feed/${userId}`);
      console.log("Response:", response.data);

      if (response.data.status === "success") {
        const items = response.data.data.data || [];
        const recommendedUsers = response.data.data.recommendedUsers || [];
        const userDetails = response.data.data.userDetails || {};

        setFeedItems(items);
        setRecommendedUsers(recommendedUsers);
        setUserDetails(userDetails);
        toast.success(`Loaded ${items.length} items`);
      }

      toast.dismiss(loadingToast);
    } catch (e) {
      console.error("Error fetching feed:", e);
      toast.dismiss(loadingToast);
      toast.error("Failed to load feed");
    }
  }

  // Simple useEffect to load data once
  useEffect(() => {
    getFeed();
  }, [userId]);

  function handleCloseDialog() {
    setShowDialog(false);
  }

  function handleInputChange(e: any) {
    setText(e.target.value);
  }

  async function handleRegisterClick() {
    const loading = toast.loading("Verifying doctor details");
    try {
      const response = await axios.post(`https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/verify-doctor`, {
        registrationNo: text,
        medicalCouncil: "Andhra Pradesh Medical Council",
        userId: userId,
      },{withCredentials: true});

      console.log(response.data);

      if (response.data.error) {
        toast.dismiss(loading);
        toast.error(response.data.error);
        console.error("Doctor not found or invalid registration number");
      } else {
        toast.dismiss(loading);
        setShowDialog(false);
      }
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Something went wrong. Please try again later");
      console.error("Error fetching doctor details:", error);
    }
  }

  async function handleFollowClick(followerId: string) {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/follow/${userId}/${followerId}`
      );
      if (response) {
        toast.success("Successfully followed!");
      }
    } catch (error) {
      toast.error("Failed to follow user");
      console.error(error);
    }
  }

  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  async function handleLikeClick(postId: number) {
    // Optimistically update UI
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });

    try {
      if (likedPosts.has(postId)) {
        await axios.delete(`${BACKEND_URL}/likes/like`, {
          data: { userId, postId }
        });
      } else {
        await axios.post(`${BACKEND_URL}/likes/like`, {
          userId, postId
        });
      }
    } catch (e) {
      // Revert UI on error
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
          newSet.delete(postId);
        } else {
          newSet.add(postId);
        }
        return newSet;
      });
      toast.error("Failed to update like status");
    }
  }

  // Add state for comments
  const [comments, setComments] = useState<Record<number, Array<any>>>({});

  // Add comment handler
  async function handleComment(postId: number, content: string) {
    // Optimistically add comment
    const tempComment = {
      id: Date.now(),
      comment: content,
      user: { name: "You" }
    };
    
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), tempComment]
    }));

    try {
      const response = await axios.post(`${BACKEND_URL}/comments/comment`, {
        postId,
        userId,
        content
      });
      
      if (!response.data.success) {
        // Remove temp comment if failed
        setComments(prev => ({
          ...prev,
          [postId]: prev[postId].filter(c => c.id !== tempComment.id)
        }));
        toast.error("Failed to add comment");
      }
    } catch (error) {
      setComments(prev => ({
        ...prev,
        [postId]: prev[postId].filter(c => c.id !== tempComment.id)
      }));
      toast.error("Failed to add comment");
    }
  }

  async function handleProfileClick(connectId : string){
    navigate(`/connections-profile/${connectId}`);
  }

  const [showStudentDialog, setShowStudentDialog] = useState(false);
  const [showDoctorDialog, setShowDoctorDialog] = useState(false);

  async function handleDoctorVerification({ registrationNumber, council }: { registrationNumber: string, council: string }) {
    const loading = toast.loading("Verifying doctor details");
    try {
      const response = await axios.post(`${BACKEND_URL}/verify-doctor`, {
        registrationNo: registrationNumber,
        medicalCouncil: council,
        userId: userId,
      });

      if (response.data.error) {
        toast.dismiss(loading);
        toast.error(response.data.error);
      } else {
        toast.dismiss(loading);
        setShowDoctorDialog(false);
        toast.success("Verification successful");
      }
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Something went wrong. Please try again later");
    }
  }

  async function handleStudentVerification({ idCard, startYear, endYear }: { idCard: File, startYear: string, endYear: string }) {
    const loading = toast.loading("Verifying student details");
    try {
      const formData = new FormData();
      formData.append('idCard', idCard);
      formData.append('startYear', startYear);
      formData.append('endYear', endYear);
      formData.append('userId', userId);

      const response = await axios.post(`${BACKEND_URL}/verify-student`, formData);
      
      if (response.data.success) {
        toast.dismiss(loading);
        setShowStudentDialog(false);
        toast.success("Verification submitted successfully");
      } else {
        toast.dismiss(loading);
        toast.error(response.data.error || "Verification failed");
      }
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Something went wrong. Please try again later");
    }
  }

  // Add state for liked questions
  const [likedQuestions, setLikedQuestions] = useState<Set<number>>(new Set());
  const [dislikedQuestions, setDislikedQuestions] = useState<Set<number>>(new Set());

  async function handleQuestionLike(questionId: number) {
    // If question was disliked, remove dislike
    if (dislikedQuestions.has(questionId)) {
      setDislikedQuestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    }

    // Toggle like
    setLikedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });

    try {
      if (likedQuestions.has(questionId)) {
        await axios.delete(`${BACKEND_URL}/question-likes/like`, {
          data: { userId, questionId }
        });
      } else {
        await axios.post(`${BACKEND_URL}/question-likes/like`, {
          userId, questionId
        });
      }
    } catch (error) {
      // Revert on error
      toast.error("Failed to update like status");
      // ... revert logic ...
    }
  }

  async function handleQuestionDislike(questionId: number) {
    // If question was liked, remove like
    if (likedQuestions.has(questionId)) {
      setLikedQuestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    }

    // Toggle dislike
    setDislikedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });

    try {
      if (dislikedQuestions.has(questionId)) {
        await axios.delete(`${BACKEND_URL}/question-likes/dislike`, {
          data: { userId, questionId }
        });
      } else {
        await axios.post(`${BACKEND_URL}/question-likes/dislike`, {
          userId, questionId
        });
      }
    } catch (error) {
      toast.error("Failed to update dislike status");
      // ... revert logic ...
    }
  }

  return (
    <UserContext.Provider value={{ id: userId }}>
      <div className="bg-white flex  min-h-screen  flex-col ">
        <TopNavbar />
        <Toaster />

        <Dialog isOpen={showDialog} onClose={handleCloseDialog}>
          <div className="text-center p-2">
            <p className="text-lg">Register</p>

            <div className="border border-main rounded-3xl ">
              <input
                onChange={handleInputChange}
                className="focus:outline-none p-2"
                type="text"
              />
            </div>

            <div className="cursor-pointer" onClick={handleRegisterClick}>
              <p className="p-2">submit</p>
            </div>
          </div>
        </Dialog>

        <div className="container mx-auto flex flex-col lg:flex-row lg:pt-20 px-4 lg:gap-8 max-w-7xl">
          <div className="hidden lg:block lg:w-[25%]">
            <div className="flex bg-gray-50 justify-center rounded-xl  shadow-sm sticky top-20 ">
              <div className=" max-w-xs w-full rounded-xl p-6 text-center">
                {/* Profile Image with shadow */}
                <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden shadow-lg">
                  <img
                    src={test4profilepic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-20 rounded-full" />
                </div>

                {/* Name and Title */}
                <h2 className="mt-4 text-3xl font-bold text-main">
                  {userDetails ? capitalizeFirstLetter(userDetails.name) : ""}
                </h2>
                <p className="text-gray-700 font-medium">
                  {userDetails
                    ? capitalizeFirstLetter(userDetails.department)
                    : ""}
                </p>
                <p className="text-sm text-gray-500">
                  {userDetails
                    ? capitalizeFirstLetter(userDetails.organisation_name)
                    : ""}
                </p>
                <p className="text-sm text-gray-500">
                  {userDetails ? capitalizeFirstLetter(userDetails.city) : ""}
                </p>

                {/* Social Icons */}
                <div className="flex items-center justify-center space-x-3 mt-6">
                  <a
                    href="#"
                    className="bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200"
                  >
                    <FaBehance size={18} className="text-gray-600" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200"
                  >
                    <FaLinkedin size={18} className="text-gray-600" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200"
                  >
                    <FaTwitter size={18} className="text-gray-600" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200"
                  >
                    <FaDribbble size={18} className="text-gray-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[45%] w-full ">
            <div className="relative flex-col w-full  ">
              <div
                ref={contentRef}
                className={`bg-white flex-col rounded-lg px-2 h-screen ${scrollY} no-scrollbar  pt-20 lg:pt-4 pb-16`}
              >
                {/* header */}

                <div className=" lg:hidden ">
                  <div
                    className={`absolute flex flex-row justify-between items-center p-4 top-0 left-0 w-full bg-white z-50 transition-transform duration-150 ${
                      showHeader ? "translate-y-0" : "-translate-y-full"
                    }`}
                  >
                    <img className="w-28" src={logo} alt="logo" />

                    <div className="flex flex-row gap-4 items-center">
                      <div className="text-slate-600">
                        <FaRegBell size={"1.4rem"} />
                      </div>

                      <div>
                        <img
                          className="w-5"
                          src={messageicon}
                          alt="message icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>

             

                <div className="flex flex-row justify-around items-center p-2">
                  <div
                    onClick={handleAskQuestion}
                    className="flex flex-row  items-center justify-center hover:cursor-pointer"
                  >
                    <img className="w-6" src={questionIcon} alt="question" />
                    <p className="text-xs font-semibold text-main">
                      Ask Question
                    </p>
                  </div>

                  <div
                    onClick={handleAddPost}
                    className="flex flex-row justify-center items-center hover:cursor-pointer"
                  >
                    <img className="w-6" src={posticon} alt="question" />
                    <p className="text-xs font-semibold text-main">Add Post</p>
                  </div>

                  <div
                    onClick={handleShareReport}
                    className="flex flex-row  justify-center items-center hover:cursor-pointer"
                  >
                    <img className="w-6" src={reporticon} alt="question" />
                    <p className="text-xs font-semibold text-main">
                      Share Report
                    </p>
                  </div>
                </div>

                {/* post card */}

                {feedItems?.length > 0 ? (
                  <div className="space-y-4">
                    {feedItems.map((item: any, index: number) => {
                      return item.posted_at ? ( 

                        <PostCard
                          key={`post-${item.id}-${index}`}
                          poster={item.User.name}
                          posttitle={item.title}
                          posterdetails={`${item.User.department} | ${item.User.organisation_name}`}
                          date={new Date(item.posted_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                          postimg={item.postImageLinks}
                          postcontent={item.description}
                          cardprofileimg={
                            item.User.profile_picture || cardprofileimg
                          }
                          likeClick={() => handleLikeClick(item.id)}
                          isLiked={likedPosts.has(item.id)}
                          comments={comments[item.id] || []}
                          onComment={(content) => handleComment(item.id, content)}
                          handleProfileClick={() => handleProfileClick(item.userId)}
                        />
                      ) : (
                        <QuestionCard
                          key={`question-${item.id}-${index}`}
                          cardprofileimg={item.User.profile_picture || cardprofileimg}
                          questionimg={item.question_image_links}
                          questioner={item.User.name}
                          questionerdetails={`${item.User.department} | ${item.User.organisation_name}`}
                          questiondate={new Date(item.asked_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                          question={item.question}
                          questiondescription={item.question_description}
                          commentimg={cardprofileimg}
                          id={item.id}
                          handleProfileClick={() => handleProfileClick(item.userId)}
                          isLiked={likedQuestions.has(item.id)}
                          isDisliked={dislikedQuestions.has(item.id)}
                          onLike={() => handleQuestionLike(item.id)}
                          onDislike={() => handleQuestionDislike(item.id)}
                          likeClick={() => handleQuestionLike(item.id)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center py-4">No items available</p>
                )}

                {/* bottom navbar */}

                <div className=" lg:hidden">
                  <BottomNavbar showNavbar={showNavbar} id={id} />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:w-[30%]">
            <div className="sticky top-20">
              <div className="flex flex-col p-2 bg-white rounded-xl">
                <p className="flex flex-row items-start justify-start w-full p-2">
                  People you may know:{" "}
                </p>

                {recommendedUsers?.map((user) => (
                  <RecommendedUserCard
                    key={user.id}
                    user={user}
                    onFollow={handleFollowClick}
                    isFollowing={isFollowing}
                  />
                ))}

                {recommendedUsers?.length === 0 && (
                  <p className="text-sm text-gray-500 p-2">
                    No recommendations available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <StudentVerificationDialog 
        isOpen={showStudentDialog}
        onClose={() => setShowStudentDialog(false)}
        organisationName={userDetails?.organisation_name || ''}
        onSubmit={handleStudentVerification}
      />
      <DoctorVerificationDialog 
        isOpen={showDoctorDialog}
        onClose={() => setShowDoctorDialog(false)}
        onSubmit={handleDoctorVerification}
      />
    </UserContext.Provider>
  );
}

export default MainFeed;
