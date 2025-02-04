import * as React from "react";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";
import { useEffect, useState, useRef } from "react";

import { Navigation } from "./Navigation";
import { QuestionPost } from "./questionPost";
import { toast } from "sonner";
import axios from "axios";
import JobFilterStatic from "./JobFilterCard";

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  stats: {
    followers: number;
    posts: number;
    questions: number;
  };
}

interface VideoCardProps {
  videoImage: string;
  avatarImage: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoImage, avatarImage }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-36 rounded-lg overflow-hidden">
        <img
          src={videoImage}
          alt="Video Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>
      <img
        src={avatarImage}
        alt="Avatar"
        className="w-10 h-10 rounded-full border  z-10 border-white -mt-6"
      />
    </div>
  );
};

export const QuestionFeed: React.FC = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  const [profileData] = React.useState<ProfileData>({
    name: "Seelam Yamshidhar Goud",
    title: "Ophthalmologist",
    bio: "AIIMS Delhi'25 | Aspiring Medical Professional",
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
    stats: {
      followers: 546,
      posts: 90,
      questions: 5,
    },
  });

  const videoData = [
    {
      videoImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      avatarImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      videoImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      avatarImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      videoImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      avatarImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      videoImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      avatarImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      videoImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      avatarImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
  ];

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleAskQuestion = () => {
    console.log("Asking new question");
  };

  const onAskQuestion = () => {
    console.log("asking a Question");
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  //BACKEND

  const userid = localStorage.getItem("Id");

  const [questions, setQuestions] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Create refs for intersection observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastQuestionRef = useRef<HTMLDivElement | null>(null);

  async function getQuestions(pageNum: number = 1, append: boolean = false) {
    if (isLoading) return;
    setIsLoading(true);

    const loadingToast = append ? null : toast.loading("Loading Questions...");

    try {
      const response = await axios.get(
        `https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/questions/${userid}?page=${pageNum}`
      );

      console.log("Questions response:", response.data);

      if (response.data.status === "success") {
        const { items: newQuestions, hasMore: moreItems } = response.data.data;
        
        if (Array.isArray(newQuestions)) {
          if (append) {
            setQuestions(prev => [...prev, ...newQuestions]);
          } else {
            setQuestions(newQuestions);
          }
          
          setHasMore(moreItems);

          if (!append) {
            toast.success(`Loaded ${newQuestions.length} questions`);
          }
        } else {
          console.error("Received non-array questions data:", newQuestions);
          toast.error("Invalid data format received");
        }
      }

      if (loadingToast) {
        toast.dismiss(loadingToast);
      }
    } catch (e) {
      console.error("Error fetching questions:", e);
      if (loadingToast) {
        toast.dismiss(loadingToast);
        toast.error("Failed to load questions");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Setup intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            getQuestions(nextPage, true);
            return nextPage;
          });
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading]);

  // Observe last question
  useEffect(() => {
    const observer = observerRef.current;
    const lastQuestion = lastQuestionRef.current;

    if (observer && lastQuestion) {
      observer.observe(lastQuestion);
    }

    return () => {
      if (observer && lastQuestion) {
        observer.unobserve(lastQuestion);
      }
    };
  }, [questions]);

  // Initial load
  useEffect(() => {
    setPage(1);
    getQuestions(1, false);
  }, [userid]);

  // Function to set ref for last question
  const setLastQuestionRef = (el: HTMLDivElement | null) => {
    lastQuestionRef.current = el;
  };

  return (
    <div className="flex flex-col min-h-screen  mx-auto  ">
      <div className="bg-white border-b sticky top-0 z-50">
        <Header
          onNotification={() => console.log("Notification clicked")}
          onMessage={() => console.log("Message clicked")}
          onProfile={() => console.log("Profile clicked")}
          onSearch={() => console.log("Profile clicked")}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 px-4 lg:pl-16 max-w-7xl mx-auto w-full gap-6 pt-4">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-[300px] flex-shrink-0 font-fontsm">
          <div className=" sticky top-[calc(theme(spacing.20)+1px)] space-y-4">
            <JobFilterStatic />
          </div>
        </div>

        <div className="flex-1 max-w-[560px]  w-full ">
          <div className=" bg-white font-fontsm flex justify-around  rounded-xl">
            <div className="lg:hidden w-full">
              <SearchBar
                onSearch={handleSearch}
                onAddPost={handleAskQuestion}
              />
            </div>

            <div className="hidden lg:block w-full">
              <div
                className="border border-gray-100  flex justify-between px-5 items-center py-5 rounded-xl shadow-sm gap-4  "
                onClick={onAskQuestion}
              >
                <div className="flex items-center gap-3">
                  <img src={profileData.avatar} className="w-8" alt="" />
                  <p className="text-gray-400">
                    {" "}
                    what would you like to ask?
                  </p>
                </div>

                <button
                  className="flex gap-2 justify-center items-center self-stretch py-1.5 pr-3 pl-1.5 my-auto text-xs text-white rounded-2xl bg-maincl min-h-[29px] hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  aria-label="Add post"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ee2fecfef7edf0f14d1ab33f1ada2f9d06a0c54e3ab3d353dc2c647c253134f?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                    alt="Add post icon"
                  />
                  <span>Ask Question</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {questions.map((question, index) => (
              <div
                key={question.id}
                ref={index === questions.length - 1 ? setLastQuestionRef : null}
                className="mb-4"
              >
                <QuestionPost
                  isUrgent={true}
                  postId={question.id}
                  avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                  name={question.User.name}
                  bio={`${question.User.department} | ${question.User.organisation_name}`}
                  timeAgo={new Date(question.asked_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  title={question.question}
                  content={question.question_description}
                  images={question.question_image_links}
                  agrees={120}
                  date={"22 dec 2024"}
                  shares={37}
                  onShare={() => console.log("Share clicked")}
                  onReply={() => console.log("Repost clicked")}
                  answers={0}
                  disagrees={54}
                />
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-[300px] flex-shrink-0 font-fontsm">
          <div className=" top-[calc(theme(spacing.20)+1px)] space-y-4">
            {/* Explore Videos */}
            <div className="px-4 py-4 bg-fillc bg-opacity-10 rounded-xl">
              {/* Heading Section */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-base  text-maincl font-medium">
                    Explore Videos
                  </h2>
                  <p className="text-gray-600 text-fontlit">
                    Videos to learn, connect, and grow in the medical field!
                  </p>
                </div>
                <button
                  onClick={handleScrollRight}
                  className="text-maincl hover:text-fillc focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              {/* Scrollable Video Cards */}
              <div
                ref={scrollContainerRef}
                className="flex space-x-4 overflow-x-auto scrollbar-hide"
                style={{
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                {videoData.map((video, index) => (
                  <VideoCard
                    key={index}
                    videoImage={video.videoImage}
                    avatarImage={video.avatarImage}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <Navigation />
      </div>
    </div>
   
  );
};
