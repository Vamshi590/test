import * as React from "react";
import { Header } from "./Header";
import { Story } from "./Story";
import { Post } from "./Post";
import { Navigation } from "./Navigation";
import question from "../../assets/icon/question.svg";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PostPopup from "./PostPopup";
import { toast } from "sonner";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { QuestionPost } from "../questionFeed/questionPost";
import VerifyForm from "@/pages/VerifyForm";

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

export const SocialFeed: React.FC = () => {
  const [stories] = React.useState([
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6093fa78a5975dce5cacdd69f3dc074d8a56ed1eef07c3b930dd6fa85cb956fe?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Your Story",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ab6937e93ef1ee7bddbbbf77a39d383095f69738f6470ae4ea7d346c46d2b699?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Mahesh",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b527f110a2eb672ae9e0b0bead1abbd22bc9bc28130e5503cc3abf13d16bee60?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Swathi",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ab6937e93ef1ee7bddbbbf77a39d383095f69738f6470ae4ea7d346c46d2b699?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Mahesh",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e11116406a9a6bca6e5c1de6ab87ff490cd336445d55d98097f72dbe60e3241d?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Swathi",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b527f110a2eb672ae9e0b0bead1abbd22bc9bc28130e5503cc3abf13d16bee60?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Swathi",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ab6937e93ef1ee7bddbbbf77a39d383095f69738f6470ae4ea7d346c46d2b699?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Mahesh",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e11116406a9a6bca6e5c1de6ab87ff490cd336445d55d98097f72dbe60e3241d?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      name: "Dr. Swathi",
    },
  ]);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const storiesContainerRef = useRef<HTMLDivElement>(null);
  const [isPostPopupOpen, setIsPostPopupOpen] = useState(false);

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleStoriesScroll = () => {
    if (storiesContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        storiesContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollStories = (direction: "left" | "right") => {
    if (storiesContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      storiesContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Navigation items for desktop header
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

  const [profileData] = useState<ProfileData>({
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

  const StatItem: React.FC<{
    value: number;
    label: string;
    className?: string;
  }> = ({ value, label, className = "" }) => (
    <div className={className}>
      <div className="font-semibold text-fillc">{value.toLocaleString()}</div>
      <div className="text-xs text-gray-800">{label}</div>
    </div>
  );

  //BACKEND
  const location = useLocation();
  const navigate = useNavigate();

  //id
  const id = location.state;
  const userId = localStorage.getItem("Id") || id;
  const intid = parseInt(userId);
  //feed items
  const [feedItems, setFeedItems] = useState<any[]>([]);
  //recommended users
  const [recommendedUsers, setRecommendedUsers] = useState<any[]>([]);
  //user details
  const [userDetails, setUserDetails] = useState<any>({});
  //verifyform popup
  const [isVerifyFormOpen, setIsVerifyFormOpen] = useState(false);
  // Add pagination state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // Add initialization flag
  const [isInitialized, setIsInitialized] = useState(false);

  // Create a ref for the intersection observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  //get feed
  async function getFeed(pageNum: number = 1, append: boolean = false) {
    if (isLoading) return;
    setIsLoading(true);

    const loadingToast = toast.loading("Loading feed...");

    try {
      const response = await axios.get(
        `https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/feed/${userId}?page=${pageNum}`
      );
      console.log("Response:", response.data);

      if (response.data.status === "success") {
        const items = response.data.data.items || [];
        const recommendedUsers = response.data.data.recommendedUsers || [];

        if (append) {
          setFeedItems((prev) => [...prev, ...items]);
        } else {
          setFeedItems(items);
        }

        setHasMore(items.length > 0);
        setRecommendedUsers(recommendedUsers);

        if (!append) {
          toast.success(`Loaded ${items.length} items`);
        }
      }

      toast.dismiss(loadingToast);
    } catch (e) {
      console.error("Error fetching feed:", e);
      toast.dismiss(loadingToast);
      toast.error("Failed to load feed");
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
            getFeed(nextPage, true);
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

  // Observe last post
  useEffect(() => {
    const observer = observerRef.current;
    const lastPost = lastPostRef.current;

    if (observer && lastPost) {
      observer.observe(lastPost);
    }

    return () => {
      if (observer && lastPost) {
        observer.unobserve(lastPost);
      }
    };
  }, [feedItems]);

  const [suggestedConnections, setSuggestedConnections] = useState<{
    organization_matches: any[];
    location_matches: any[];
    department_matches: any[];
    other_users: any[];
  }>({
    organization_matches: [],
    location_matches: [],
    department_matches: [],
    other_users: [],
  });

  // Initialize data
  useEffect(() => {
    async function initializeData() {
      if (!isInitialized && userId) {
        try {
          // Make API calls in parallel using Promise.all
          const [feedResponse, suggestedResponse] = await Promise.all([
            getFeed(1, false),
            axios.get(`https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/connections/${userId}`),
          ]);

          console.log("Suggested connections:", suggestedResponse);
          
          // Set user details and connections
          setSuggestedConnections(suggestedResponse.data);
          setUserDetails(suggestedResponse.data.user || {});
          setIsInitialized(true);
        } catch (e) {
          console.error("Error initializing data:", e);
          // Even if connections fail, we should still show the feed
          if (!feedItems.length) {
            getFeed(1, false);
          }
        }
      }
    }

    initializeData();
  }, [userId]);

  // Separate function for loading more feed items
  const loadMoreFeed = useCallback(async () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await getFeed(nextPage, true);
    }
  }, [isLoading, hasMore, page]);

  // Add this function to create a ref for the last post
  const setLastPostRef = (el: HTMLDivElement | null) => {
    lastPostRef.current = el;
  };

  //add post

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
        setIsPostPopupOpen(true);
      } else {
        toast.dismiss(loading);
        toast.warning("Please verify your medical registration first");
        setIsVerifyFormOpen(true);
      }
    } catch (e) {
      toast.dismiss(loading);
      toast.error("Something went wrong. Please try again later");
      console.error(e);
    }
  }

  //ask question

  async function handleAskQuestion() {
    const loading = toast.loading("Checking verification status");
    try {
      const response = await axios.get(`https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/api/check-verification`, {
        params: { id: userId },
      });
      
      if (response.data.verified) {
        toast.dismiss(loading);
        toast.success("Verified redirecting to ask question");
        setIsPostPopupOpen(true)
      } else {

        console.log(response);
        toast.dismiss(loading);
        toast.warning("Please complete your verification");
        setIsVerifyFormOpen(true);
      }
    } catch (e) {
      toast.dismiss(loading);
      toast.error("Something went wrong. Please try again later");
      console.error(e);
    }
  }

  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  // Initialize liked posts from feed data
  useEffect(() => {
    if (feedItems) {
      const initialLikedPosts = new Set(
        feedItems.filter((item) => item?.likes?.length > 0).map((item) => item.id)
      );
      setLikedPosts(initialLikedPosts);
    }
  }, [feedItems]);

  async function handleLikeClick(postId: number) {
    // Optimistically update UI

    console.log("likedPosts");

    setLikedPosts((prev) => {
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
        await axios.delete(`https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/dislike`, {
          data: { userId, postId },
        });

        console.log("removed like");
      } else {
        await axios.post(`https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/like`, {
          userId,
          postId,
        });
        console.log("added like");
      }
    } catch (e) {
      // Revert UI on error
      setLikedPosts((prev) => {
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

      console.log(content);


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
        const response = await axios.post(`https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/comment`, {
          postId,
          userId : intid,
          comment : content
        });
        console.log(response)
        
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

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <Header
          onNotification={() => console.log("Notification clicked")}
          onMessage={() => console.log("Message clicked")}
          onProfile={() => navigate("/profile")}
          onSearch={() => console.log("Profile clicked")}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 px-4 lg:px-14 max-w-7xl mx-auto w-full gap-6 pt-2">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-[270px] flex-shrink-0 font-fontsm">
          <div className="top-[calc(theme(spacing.24)+1px)] space-y-6">
            {/* Profile Card */}
            <div className="bg-fillc bg-opacity-10 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col items-center">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-20 h-20 rounded-full mb-3"
                />
                <h2 className="text-sm font-semibold text-gray-900 mb-0.5">
                  <span className="text-fillc font-semibold bg-fillc bg-opacity-30 px-2 mr-1 rounded-lg">
                    Dr.
                  </span>
                  {userDetails.name || "Seelam"}
                </h2>
                <p className="text-xs text-gray-600 mb-1">
                  {userDetails.department}
                </p>
                <p className="text-xs text-gray-500 text-center mb-5">
                  {`${userDetails.specialisation_field_of_study} | ${userDetails.organisation_name}`}                  
                </p>

                <div className="grid grid-cols-3 w-full gap-4 text-center text-sm  border-t pt-4">
                  <StatItem
                    value={profileData.stats.followers}
                    label="Followers"
                  />
                  <StatItem
                    value={profileData.stats.posts}
                    label="Posts"
                    className="border-x px-4"
                  />
                  <StatItem
                    value={profileData.stats.questions}
                    label="Questions"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="flex-1 max-w-[560px] mx- w-full ">
          {/* Stories Section */}
          <div className="bg-white rounded-2xl  mb-2  relative">
            {/* Left Arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scrollStories("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white opacity-70 rounded-full p-1 shadow-md hover:bg-gray-50"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}

            {/* Stories Container */}
            <div
              ref={storiesContainerRef}
              className="flex gap-4 p-2 overflow-x-auto scrollbar-hide relative"
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
              onScroll={handleStoriesScroll}
            >
              {stories.map((story, index) => (
                <Story
                  key={index}
                  {...story}
                  onClick={() => console.log(`Story ${index} clicked`)}
                />
              ))}
            </div>

            {/* Right Arrow */}
            {canScrollRight && (
              <button
                onClick={() => scrollStories("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white opacity-70 rounded-full p-1 shadow-md hover:bg-gray-50"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>

          {/*Posting Section */}

          <div className=" bg-white font-fontsm flex justify-around  rounded-xl">
            <button
              className="flex items-center px-2 py-3"
              onClick={handleAskQuestion}
            >
              <img src={question} alt="" />
              <p className="text-xs pl-1 text-gray-600">Ask Question</p>
            </button>
            <button
              className="flex items-center px-2 py-3"
              onClick={handleAddPost}
            >
              <img src={question} alt="" />
              <p className="text-xs pl-1 text-gray-600">Add Post</p>
            </button>
            <button
              className="flex items-center px-2 py-3"
              onClick={() => setIsPostPopupOpen(true)}
            >
              <img src={question} alt="" />
              <p className="text-xs text-gray-600 pl-1">Add Resources</p>
            </button>

            <PostPopup
              isOpen={isPostPopupOpen}
              onClose={() => setIsPostPopupOpen(false)}
              userAvatar={profileData.avatar}
            />
          </div>
          {/* Posts */}
          <div className="space-y-4 mb-16 lg:mb-1">
            {feedItems?.length > 0 ? (
              <div className="space-y-4">
                {feedItems.map((item: any, index: number) => {
                  return item.posted_at ? (
                    <div
                      key={`post-${item.id}-${index}`}
                      ref={
                        index === feedItems.length - 1 ? setLastPostRef : null
                      }
                    >
                      <Post
                      id={item.id}
                        avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                        name={item.User.name}
                        bio={`${item.User.department} | ${item.User.organisation_name}`}
                        timeAgo={new Date(item.posted_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                        title={item.title}
                        content={item.description}
                        images={item.postImageLinks}
                        likes={item._count.likes}
                        comments={item._count.comments}
                        readcomments = {item.comments}
                        shares={item._count.shares}
                        liked={likedPosts.has(item.id)}
                        reposts={51}
                        onLike={() => handleLikeClick(item.id)}
                        onComment={(postId, content) => handleComment(postId, content)}
                        onShare={() => console.log("Share clicked")}
                        onRepost={() => console.log("Repost clicked")}
                        onMoreOptions={() =>
                          console.log("More options clicked")
                        }
                      />
                    </div>
                  ) : (
                    <div
                      key={`question-${item.id}-${index}`}
                      ref={
                        index === feedItems.length - 1 ? setLastPostRef : null
                      }
                    >
                      <QuestionPost
                        postId={item.id}
                        isUrgent={true}
                        avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                        name={item.User.name}
                        bio={`${item.User.department} | ${item.User.organisation_name}`}
                        timeAgo={new Date(item.asked_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                        title={item.question}
                        content={item.question_description}
                        images={item.question_image_links}
                        agrees={120}
                        date={"22 dec 2024"}
                        shares={37}
                        onShare={() => console.log("Share clicked")}
                        onReply={() => console.log("Repost clicked")}
                        answers={32}
                        disagrees={54}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center py-4">No items available</p>
            )}

         
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-[300px] flex-shrink-0 font-fontsm">
          <div className="sticky top-[calc(theme(spacing.24)+1px)] space-y-4">
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

      <VerifyForm
        isOpen={isVerifyFormOpen}
        onClose={() => setIsVerifyFormOpen(false)}
      />

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <Navigation />
      </div>
    </div>
  );
};
