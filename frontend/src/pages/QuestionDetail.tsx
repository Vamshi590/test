import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import save1 from "../assets/icon/save1.svg";

import save2 from "../assets/icon/save2.svg";
import rightarrow from "../assets/icon/rightarrow.svg";
import disagree1 from "../assets/icon/disagree1.svg";
import disagree2 from "../assets/icon/disagree2.svg";
import share from "../assets/icon/share.svg";
import like from "../assets/icon/like1.svg";
import liked from "../assets/icon/liked.svg";
import more1 from "../assets/icon/more1.svg";
import comment from "../assets/icon/comment1.svg";
import { Header } from '@/components/questionFeed/Header';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

interface Author {
  name: string;
  avatar: string;
  bio: string;
  timeAgo: string;
}

interface Reply {
  id: string;
  author: Author;
  content: string;
  likes: number;
  dislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
}

interface Answer {
  id: string;
  author: Author;
  content: string;
  likes: number;
  dislikes: number;
  replies: Reply[];
  showReplies?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
}

interface QuestionStats {
  answers: number;
  shares: number;
}

interface QuestionData {
  author: Author;
  title: string;
  content: string;
  images: string[];
  stats: QuestionStats;
  answers: Answer[];
  isUrgent?: boolean;
}

interface RelatedQuestion {
  id: string;
  title: string;
  answersCount: number;
  author: {
    avatar: string;
  };
}

const QuestionDetail: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [isSaved, setIsSaved] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [relatedQuestions, setRelatedQuestions] = useState<RelatedQuestion[]>([]);
 

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Mock data for frontend development
        setQuestionData({
          author: {
            name: "Nampally Sriram",
            avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
            bio: "Ophthalmologist (AIIMS) | JIPMER | Aspiring Medical Professional",
            timeAgo: "2 hrs ago"
          },
          title: "Where do you see the Advancements in Ophthalmology: The Future of Eye Care in coming few years??",
          content: "",
          images: [
            "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
            "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
            "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
            "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
          ],
          stats: {
            answers: 0,
            shares: 0
          },
          answers: [],
          isUrgent: true
        });

        setRelatedQuestions([
          {
            id: '1',
            title: "Where do you see the Advancements in Ophthalmology: The Future of Eye Care in coming few years??",
            answersCount: 12,
            author: {
              avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
            }
          },
          {
            id: '2',
            title: "Where do you see the Advancements in Ophthalmology: The Future of Eye Care in coming few years??",
            answersCount: 12,
            author: {
              avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
            }
          },
          {
            id: '3',
            title: "Where do you see the Advancements in Ophthalmology: The Future of Eye Care in coming few years??",
            answersCount: 12,
            author: {
              avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
            }
          }
        ]);

      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (questionId) {
      fetchQuestionData();
    }
  }, [questionId]);

  const handleAnswerSubmit = () => {
    if (!answerText.trim()) return;

    const newAnswer: Answer = {
      id: Date.now().toString(),
      author: {
        name: "Current User",
        avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
        bio: "Medical Student",
        timeAgo: "Just now"
      },
      content: answerText,
      likes: 0,
      dislikes: 0,
      replies: [],
      showReplies: false
    };

    setQuestionData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: [newAnswer, ...prev.answers],
        stats: {
          ...prev.stats,
          answers: prev.answers.length + 1
        }
      };
    });

    setAnswerText('');
  };

  const handleReplySubmit = (answerId: string) => {
    if (!replyText.trim()) return;

    const newReply: Reply = {
      id: Date.now().toString(),
      author: {
        name: "Current User",
        avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
        bio: "Medical Student",
        timeAgo: "Just now"
      },
      content: replyText,
      likes: 0,
      dislikes: 0
    };

    setQuestionData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: prev.answers.map(answer => {
          if (answer.id === answerId) {
            return {
              ...answer,
              replies: [...answer.replies, newReply]
            };
          }
          return answer;
        })
      };
    });

    setReplyText('');
    setReplyingTo(null);
  };

  const handleLike = (answerId: string) => {
    setQuestionData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: prev.answers.map(answer => {
          if (answer.id === answerId) {
            // If already liked, remove like
            if (answer.isLiked) {
              return {
                ...answer,
                likes: answer.likes - 1,
                isLiked: false
              };
            }
            // If disliked, remove dislike and add like
            if (answer.isDisliked) {
              return {
                ...answer,
                likes: answer.likes + 1,
                dislikes: answer.dislikes - 1,
                isLiked: true,
                isDisliked: false
              };
            }
            // Normal like
            return {
              ...answer,
              likes: answer.likes + 1,
              isLiked: true
            };
          }
          return answer;
        })
      };
    });
  };

  const handleDislike = (answerId: string) => {
    setQuestionData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: prev.answers.map(answer => {
          if (answer.id === answerId) {
            // If already disliked, remove dislike
            if (answer.isDisliked) {
              return {
                ...answer,
                dislikes: answer.dislikes - 1,
                isDisliked: false
              };
            }
            // If liked, remove like and add dislike
            if (answer.isLiked) {
              return {
                ...answer,
                likes: answer.likes - 1,
                dislikes: answer.dislikes + 1,
                isLiked: false,
                isDisliked: true
              };
            }
            // Normal dislike
            return {
              ...answer,
              dislikes: answer.dislikes + 1,
              isDisliked: true
            };
          }
          return answer;
        })
      };
    });
  };

  const handleReplyLike = (answerId: string, replyId: string) => {
    setQuestionData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: prev.answers.map(answer => {
          if (answer.id === answerId) {
            return {
              ...answer,
              replies: answer.replies.map(reply => {
                if (reply.id === replyId) {
                  // If already liked, remove like
                  if (reply.isLiked) {
                    return {
                      ...reply,
                      likes: reply.likes - 1,
                      isLiked: false
                    };
                  }
                  // If disliked, remove dislike and add like
                  if (reply.isDisliked) {
                    return {
                      ...reply,
                      likes: reply.likes + 1,
                      dislikes: reply.dislikes - 1,
                      isLiked: true,
                      isDisliked: false
                    };
                  }
                  // Normal like
                  return {
                    ...reply,
                    likes: reply.likes + 1,
                    isLiked: true
                  };
                }
                return reply;
              })
            };
          }
          return answer;
        })
      };
    });
  };

  const handleReplyDislike = (answerId: string, replyId: string) => {
    setQuestionData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: prev.answers.map(answer => {
          if (answer.id === answerId) {
            return {
              ...answer,
              replies: answer.replies.map(reply => {
                if (reply.id === replyId) {
                  // If already disliked, remove dislike
                  if (reply.isDisliked) {
                    return {
                      ...reply,
                      dislikes: reply.dislikes - 1,
                      isDisliked: false
                    };
                  }
                  // If liked, remove like and add dislike
                  if (reply.isLiked) {
                    return {
                      ...reply,
                      likes: reply.likes - 1,
                      dislikes: reply.dislikes + 1,
                      isLiked: false,
                      isDisliked: true
                    };
                  }
                  // Normal dislike
                  return {
                    ...reply,
                    dislikes: reply.dislikes + 1,
                    isDisliked: true
                  };
                }
                return reply;
              })
            };
          }
          return answer;
        })
      };
    });
  };
  
  const toggleReplies = (answerId: string) => {
    setQuestionData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: prev.answers.map(answer => {
          if (answer.id === answerId) {
            return {
              ...answer,
              showReplies: !answer.showReplies
            };
          }
          return answer;
        })
      };
    });
  };

  const handleShare = () => {
    setQuestionData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        stats: {
          ...prev.stats,
          shares: prev.stats.shares + 1
        }
      };
    });
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  
  const startXRef = useRef<number | null>(null);
  const currentTranslate = useRef(0);

  
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current !== null) {
      const currentX = e.touches[0].clientX;
      currentTranslate.current = currentX - startXRef.current;
    }
  };

  const handleTouchEnd = () => {
    if (!questionData?.images) return;
    
    if (currentTranslate.current > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (currentTranslate.current < -50 && currentIndex < questionData.images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    startXRef.current = null;
    currentTranslate.current = 0;
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    if (questionData && currentIndex < questionData.images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const getVisibleDots = () => {
    if (!questionData) return [];
    
    const maxVisibleDots = 5;
    const half = Math.floor(maxVisibleDots / 2);
    return questionData.images.map((_, index) => {
      const diff = Math.abs(index - currentIndex);
      if (diff <= half) return 1;
      return Math.max(0.3, 1 - (diff - half) * 0.2);
    });
  };

  const visibleDots = getVisibleDots();



  if (loading) return <div className="max-w-7xl mx-auto p-4">Loading...</div>;
  if (error) return <div className="max-w-7xl mx-auto p-4 text-red-500">Error: {error}</div>;
  if (!questionData) return <div className="max-w-7xl mx-auto p-4">No question data available.</div>;

  return (
    
    <div className="flex flex-col min-h-screen  mx-auto font-fontsm">

      
        <div className="bg-white border-b sticky top-0 z-50">
              <Header
                onNotification={() => console.log("Notification clicked")}
                onMessage={() => console.log("Message clicked")}
                onProfile={() => console.log("Profile clicked")}
                onSearch={() => console.log("Profile clicked")}

              />
              </div>

     {/* Main Content Area */}
     <div className="flex flex-1 px-4 lg:pl-16 max-w-7xl mx-auto w-full gap-8 pt-2">
        <div className="flex-1">
          {/* Question Card */}
          <div className="bg-white rounded-lg shadow mt-2">
            {questionData.isUrgent && (
              <div className="bg-urgentbg  rounded-t-xl text-urgenttxt  px-4 py-1  text-xs">
                Urgent
              </div>
            )}
            
            <div className="p-4">
              {/* Author Info */}
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <img
                    src={questionData.author.avatar}
                    alt={questionData.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-sm text-[#1F2937]">{questionData.author.name}</h3>
                    <p className="text-fontlit text-[#6B7280]">{questionData.author.bio}</p>
                    <span className="text-xs text-[#9CA3AF]">{questionData.author.timeAgo}</span>
                  </div>
                </div>
                <div className="flex ">
                  <button 
                    onClick={() => setIsSaved(!isSaved)}
                    className="hover:bg-gray-50 p-2 rounded-full"
                  >
                    <img src={isSaved ? save2 : save1} alt="Save" className="w-5 h-5" />
                  </button>
                  <button className="hover:bg-gray-50 p-1 rounded-full">
                    <img src={more1} alt="Share" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Question Content */}
              <h2 className="text-sm font-medium mt-4 text-[#1F2937]">
                {questionData.title}
              </h2>








              {/* Question Images */}
    

<div className="relative w-full mb-4 group mt-2" onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}>
          <div className="absolute top-2 right-4 z-10 bg-gray-400 bg-opacity-50 text-white text-xs py-1 px-2 rounded-full">
            {currentIndex + 1}/{questionData.images.length }
          </div>
          {showArrows && currentIndex > 0 && (
            <button
              className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-gray bg-opacity-50 text-white p-2 rounded-full group-hover:opacity-80"
              onClick={handlePrev}
            >
              <IoIosArrowDropleftCircle size={30} className='text-yellow-600 opacity-80' />
            </button>
          )}
          {showArrows && currentIndex < questionData.images.length  - 1 && (
            <button
              className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-gray bg-opacity-50 text-white p-2 rounded-full group-hover:opacity-80"
              onClick={handleNext}
            >
              <IoIosArrowDroprightCircle size={30} className='text-yellow-600 opacity-80' />
            </button>
          )}
          <div className="relative overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {questionData.images.map((image, index) => (
                <div key={index} className="flex-none w-full lg:h-[400px] rounded-lg bg-gray-200">
                  <img src={image} alt={`Post image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-2 space-x-1">
            {questionData.images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-yellow-600" : "bg-gray-400"}`}
                style={{ opacity: visibleDots[index] }}
              ></div>
            ))}
          </div>
        </div>









              {/* Question Stats */}
              <div className="flex justify-between mt-4 pt-4 pb-3 px-3 border-t border-neutral-200">
                <div className="flex bg-gray-100 rounded-lg p-1 cursor-pointer">
                  <div className="flex">
                    <button className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700">
                      <img src={comment} alt="" className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col justify-start text-xs pl-1">
                    <p className="text-neutral-500 hover:text-slate-700">Answer</p>
                    <span>{questionData.stats.answers}</span>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1 text-xs text-neutral-500 hover:text-slate-700"
                    >
                      <img src={share} alt="" className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col justify-start text-xs pl-1.5">
                    <p className="text-neutral-500 hover:text-slate-700">shares</p>
                    <span>{questionData.stats.shares}</span>
                  </div>
                </div>
              </div>

              {/* Answer Input */}
              <div className="mt-4">
                <div className="flex gap-3 items-center">
                  <img
                    src={questionData.author.avatar}
                    alt="Your avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      placeholder="Write your answer..."
                      className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
                    />
                    <button
                      onClick={handleAnswerSubmit}
                      disabled={!answerText.trim()}
                      className={`px-3 py-0.5 bg-maincl text-white rounded-full text-sm font-medium ${
                        !answerText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-fillc'
                      }`}
                    >
                      Answer
                    </button>
                  </div>
                </div>
              </div>

              {/* Answers Section */}
              <div className="mt-8">
                <h3 className="text-[#1F2937] font-medium mb-4">Answers</h3>
                {questionData.answers.map((answer) => (
                  <div key={answer.id} className="mb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <img
                          src={answer.author.avatar}
                          alt={answer.author.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm text-[#1F2937]">{answer.author.name}</h4>
                            <span className="text-xs text-[#9CA3AF]">{answer.author.timeAgo}</span>
                          </div>
                          <p className="text-sm text-[#6B7280]">{answer.author.bio}</p>
                          <p className="mt-2 text-sm text-[#374151]">{answer.content}</p>

                          <div className="flex items-center gap-4 mt-3">
                            <button
                              onClick={() => handleLike(answer.id)}
                              className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#374151]"
                            >
                              <img src={answer.isLiked ? liked : like} alt="Like" className="w-4 h-4" />
                              <span className="text-sm">{answer.likes}</span>
                            </button>
                            <button
                              onClick={() => handleDislike(answer.id)}
                              className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#374151]"
                            >
                              <img src={answer.isDisliked ? disagree2 : disagree1} alt="Dislike" className="w-4 h-4" />
                              <span className="text-sm">{answer.dislikes}</span>
                            </button>
                            <button
                              onClick={() => setReplyingTo(answer.id)}
                              className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#374151]"
                            >
                              <img src={comment} alt="" className="w-4 h-4" />
                              <span className="text-sm">Reply</span>
                            </button>
                          </div>

                          {/* Reply Input */}
                          {replyingTo === answer.id && (
                            <div className="mt-3">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="Write your reply..."
                                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
                                />
                                <button
                                  onClick={() => handleReplySubmit(answer.id)}
                                  disabled={!replyText.trim()}
                                  className={`px-3 py-0.5 bg-maincl text-white rounded-full text-sm font-medium ${
                                    !replyText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-fillc'
                                  }`}
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Replies */}
                          {answer.replies.length > 0 && (
                            <div className="mt-4">
                              <button
                                onClick={() => toggleReplies(answer.id)}
                                className="text-fillc text-xs hover:underline"
                              >
                                {answer.showReplies ? 'Hide Replies' : `View ${answer.replies.length} Replies`}
                              </button>
                              
                              {answer.showReplies && (
                                <div className="mt-3 space-y-4">
                                  {answer.replies.map((reply) => (
                                    <div key={reply.id} className="ml-8 border-l-2 border-gray-100 pl-4">
                                      <div className="flex gap-3">
                                        <img
                                          src={reply.author.avatar}
                                          alt={reply.author.name}
                                          className="w-8 h-8 rounded-full"
                                        />
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2">
                                            <h4 className="font-medium text-sm text-[#1F2937]">{reply.author.name}</h4>
                                            <span className="text-xs text-[#9CA3AF]">{reply.author.timeAgo}</span>
                                          </div>
                                          <p className="text-sm text-[#374151]">{reply.content}</p>
                                          <div className="flex items-center gap-4 mt-2">
                                            <button
                                              onClick={() => handleReplyLike(answer.id, reply.id)}
                                              className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#374151]"
                                            >
                                              <img src={reply.isLiked ? liked : like} alt="Like" className="w-4 h-4" />
                                              <span className="text-sm">{reply.likes}</span>
                                            </button>
                                            <button
                                              onClick={() => handleReplyDislike(answer.id, reply.id)}
                                              className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#374151]"
                                            >
                                              <img src={reply.isDisliked ? disagree2 : disagree1} alt="Dislike" className="w-4 h-4" />
                                              <span className="text-sm">{reply.dislikes}</span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Questions Sidebar */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-main  ">Explore Related Questions</h3>
              <button className="text-[#2563EB] hover:bg-gray-50 p-2 rounded-full"><img src={rightarrow} alt="" /></button>
            </div>
            {relatedQuestions.map((question) => (
              <div key={question.id} className="flex gap-3 mb-4 last:mb-0 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                <img
                  src={question.author.avatar}
                  alt=""
                  className="w-16 h-16 rounded-md"
                />
                <div>
                  <p className="text-sm text-[#1F2937] line-clamp-2">{question.title}</p>
                  <span className="text-xs text-[#6B7280]">
                    {question.answersCount} people have answered
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
