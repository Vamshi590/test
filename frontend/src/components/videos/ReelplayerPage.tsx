import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Heart, MoreVertical, X } from 'lucide-react';
import rcomment from "../../assets/icon/rcomment.svg";
import rshare from "../../assets/icon/rshare.svg";
import rsave1 from "../../assets/icon/rsave1.svg";
import rsave2 from "../../assets/icon/rsave2.svg";
import pause from "../../assets/icon/pause.svg";
import share from "../../assets/icon/share.svg"
import liked from "../../assets/icon/liked.svg"
import comment1 from "../../assets/icon/comment1.svg"
import like from "../../assets/icon/like1.svg";
import { Navigation } from './Navigation';
import { Header } from './Header';
import JobFilterStatic from './JobFilterCard';
import axios from 'axios';

interface ReelData {
  id: string;
  reelMediaUrl: string;
  user: {
    name: string;
    profile_picture: string;
    title: string;
    date: string;
    department: string;
    organization_name: string;
  };
  likes: number;
  reelComments:Comment[];
  shares: number;
  reelDescription: string;
  referenceTags?: string[];
}

interface Comment {
  id: string;
  author: {
    name: string;
    profileImage: string;
    title: string;
  };
  content: string;
  likes: number;
  timestamp: string;
  replies?:Comment[];
}

const ReelsFeed = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [reelsState, setReelsState] = useState<{ [key: string]: {
    isPlaying: boolean;
    progress: number;
    isLiked: boolean;
    isSaved: boolean;
    isExpanded: boolean;
    showOptions: boolean;
    comments: Comment[];
    isError: boolean;
  } }>({});
  const [showComments, setShowComments] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  // const [likedPost, setLikedPost] = useState(false);

  const touchStartY = useRef(0);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const optionsRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const minSwipeDistance = 50;

  // Sample reels data
  // const reelsData = useMemo<ReelData[]>(() => [
  //   {
  //     id: '1',
  //     videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  //     author: {
  //       name: 'Pratham Jindal',
  //       profileImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6',
  //       title: 'Ophthalmologist | AIIMS Delhi`25 ',
  //       date: '22 Dec 2024'
  //     },
  //     likes: 126,
  //     comments:  [
  //       {
  //         id: '1',
  //         author: {
  //           name: 'Nampally Sriram',
  //           profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Ram_Charan_2024_%28cropped%29.jpg/800px-Ram_Charan_2024_%28cropped%29.jpg',
  //           title: 'Ophthalmologist | AIIMS Delhi`25'
  //         },
  //         content: 'Great insights!',
  //         likes: 15,
  //         timestamp: '3 days ago'
  //       }
  //     ],
  //     shares: 1,
  //     description: "Connecting ideas, growing networks, and building opportunities one reel at a time! #ProfessionalGrowth",
  //     hashtags: ['ProfessionalGrowth', 'Networking', 'Opportunities']
  //   },


  //   {
  //     id: '2',
  //     videoUrl: 'https://rr5---sn-cvh76ner.googlevideo.com/videoplayback?expire=1736511951&ei=b72AZ4O4EpGo9fwPgdDziAI&ip=2001%3A448a%3A2061%3Ac4ee%3Afd9c%3A2ec5%3Aeb62%3A4aa6&id=o-AAa3wLAwt4FFVtp0_oZ98f1ABFy7L9_UIAfDaEYcP76T&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&pcm2=no&bui=AY2Et-MZxdrCMMV_FJS6qyyXXUo7BUjIwERW2kmV5K0BI0Wj2cdJHB_WxpthqKa3PI8QwLILITlzVLt_&spc=9kzgDb6sIKtqEIVtOMfYdRiYvegs1OeCEz1rrvK6b_nwWJCKf1Sch0mFdkaKomz-yw&vprv=1&svpuc=1&mime=video%2Fmp4&ns=2l-AFHMPMlhMSPpACe8CC40Q&rqh=1&gir=yes&clen=604256&ratebypass=yes&dur=7.360&lmt=1730487188764776&fexp=24350590,24350737,24350827,24350975,51326932,51331020,51335594,51353497,51371294&c=MWEB&sefc=1&txp=5430434&n=mg3N1rL-8UyOkA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cpcm2%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgfhK-zl315_IhM6fNFF4r1hoVhR87sawr4vFAT518UTwCIQDALmZ7oolOYoHSjorJkieVWwbISUwtTEGXzP1XHg0lxQ%3D%3D&title=Haikyuu!!%20The%20Movie%202024%20Decisive%20Battle%20at%20the%20Garbage%20Dump%20%23shorts%20%23anime%20%23haikyuu%20%23haikyuumovie&rm=sn-2uuxa3vh-jb3sz7s,sn-nposr7l&rrc=79,104&req_id=34dcf1191fdfa3ee&rms=nxu,au&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1736490354,&mh=au&mip=110.235.225.146&mm=30&mn=sn-cvh76ner&ms=nxu&mt=1736489786&mv=m&mvi=5&pl=24&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRAIgGZWuOfNUlSb4sU8L_5vzC9GtPcNFl6s4y6PzvtjZTZoCIGx3GVJ7kfv7cx9Bbj-AGyB9osEkt9IFkrBDhdNMtg2l',
  //     author: {
  //       name: 'Pratham Jindal',
  //       profileImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6',
  //       title: 'Ophthalmologist | AIIMS Delhi`25 ',
  //       date: '22 Dec 2024'
  //     },
  //     likes: 126,
  //     comments: [
  //       {
  //         id: '1',
  //         author: {
  //           name: 'vanshi ',
  //           profileImage: '/profile2.jpg',
  //           title: 'Ophthalmologist | AIIMS Delhi`25'
  //         },
  //         content: 'Great insights!',
  //         likes: 15,
  //         timestamp: '3 days ago'
  //       }
  //     ],
  //     shares: 1,
  //     description: "Connecting ideas, growing networks, and building opportunities one reel at a time! #ProfessionalGrowth",
  //     hashtags: ['ProfessionalGrowth', 'Networking', 'Opportunities']
  //   },
  //   {
  //     id: '3',
  //     videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  //     author: {
  //       name: 'Pratham Jindal',
  //       profileImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6',
  //       title: 'Ophthalmologist | AIIMS Delhi`25 ',
  //       date: '22 Dec 2024'
  //     },
  //     likes: 126,
  //     comments: [
  //       {
  //         id: '1',
  //         author: {
  //           name: 'bhanu',
  //           profileImage: '/profile2.jpg',
  //           title: 'Ophthalmologist | AIIMS Delhi`25'
  //         },
  //         content: 'Great insights!',
  //         likes: 15,
  //         timestamp: '3 days ago'
  //       }
  //     ],
  //     shares: 1,
  //     description: "Connecting ideas, growing networks, and building opportunities one reel at a time! #ProfessionalGrowth",
  //     hashtags: ['ProfessionalGrowth', 'Networking', 'Opportunities']
  //   },
  //   {
  //     id: '4',
  //     videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  //     author: {
  //       name: 'Pratham Jindal',
  //       profileImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6',
  //       title: 'Ophthalmologist | AIIMS Delhi`25 ',
  //       date: '22 Dec 2024'
  //     },
  //     likes: 126,
  //     comments:  [
  //       {
  //         id: '1',
  //         author: {
  //           name: ' shashi',
  //           profileImage: '/profile2.jpg',
  //           title: 'Ophthalmologist | AIIMS Delhi`25'
  //         },
  //         content: 'Great insights!',
  //         likes: 15,
  //         timestamp: '3 days ago'
  //       }
  //     ],
  //     shares: 1,
  //     description: "Connecting ideas, growing networks, and building opportunities one reel at a time! #ProfessionalGrowth",
  //     hashtags: ['ProfessionalGrowth', 'Networking', 'Opportunities']
  //   },


  //   {
  //     id: '5',
  //     videoUrl: 'https://dev-docsile-media-upload.s3.ap-south-1.amazonaws.com/Mass+Dance+_+Dancer+Sharath+Latest+Hyderabad+Band+_+Teenmaar+Band+_+Abhilash+Boys+_+Vasu+Anna+%28online-video-cutter.com%29.mp4',
  //     author: {
  //       name: 'vamshidhar',
  //       profileImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6',
  //       title: 'Ophthalmologist | AIIMS Delhi`25 ',
  //       date: '22 Dec 2024'
  //     },
  //     likes: 126,
  //     comments:  [
  //       {
  //         id: '1',
  //         author: {
  //           name: 'Nampally Sriram',
  //           profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Ram_Charan_2024_%28cropped%29.jpg/800px-Ram_Charan_2024_%28cropped%29.jpg',
  //           title: 'Ophthalmologist | AIIMS Delhi`25'
  //         },
  //         content: 'Great insights!',
  //         likes: 15,
  //         timestamp: '3 days ago'
  //       }
  //     ],
  //     shares: 1,
  //     description: "Connecting ideas, growing networks, and building opportunities one reel at a time! #ProfessionalGrowth",
  //     hashtags: ['ProfessionalGrowth', 'Networking', 'Opportunities']
  //   },


  //   {
  //     id: '6',
  //     videoUrl: 'https://dev-docsile-media-upload.s3.ap-south-1.amazonaws.com/ivana+birthday+clip.mp4',
  //     author: {
  //       name: 'vamshidhar',
  //       profileImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6',
  //       title: 'Ophthalmologist | AIIMS Delhi`25 ',
  //       date: '22 Dec 2024'
  //     },
  //     likes: 126,
  //     comments:  [
  //       {
  //         id: '1',
  //         author: {
  //           name: 'Nampally Sriram',
  //           profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Ram_Charan_2024_%28cropped%29.jpg/800px-Ram_Charan_2024_%28cropped%29.jpg',
  //           title: 'Ophthalmologist | AIIMS Delhi`25'
  //         },
  //         content: 'Great insights!',
  //         likes: 15,
  //         timestamp: '3 days ago'
  //       }
  //     ],
  //     shares: 1,
  //     description: "Connecting ideas, growing networks, and building opportunities one reel at a time! #ProfessionalGrowth",
  //     hashtags: ['ProfessionalGrowth', 'Networking', 'Opportunities']
  //   },



  //   // Add more reels with the same structure
  // ], []);


  const [reelsData, setReelsBData] = useState<ReelData[]>([]);


  const userId = localStorage.getItem('Id');


  async function fetchReels() {

    try{
      const response = await axios.get(`https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/clinical/reels/${userId}`)

      console.log(response.data)

      setReelsBData(response.data.data.items)

    }
    catch(error){
      console.log(error)
    }

  }


  useEffect(() => {
    fetchReels()
  }, [userId])


  // Initialize state for each reel
  useEffect(() => {
    const initialState = reelsData.reduce((acc, reel) => ({
      ...acc,
      [reel.id]: {
        isPlaying: false,
        progress: 0,
        isLiked: false,
        isSaved: false,
        isExpanded: false,
        showOptions: false,
        isError: false,
        comments: reel.reelComments,
      }
    }), {});
    setReelsState(initialState);
  }, [reelsData]);

  const handleAddComment = (reelId: string, comment: Omit<Comment, 'id'>) => {
    setReelsState(prev => ({
      ...prev,
      [reelId]: {
        ...prev[reelId],
        comments: [
          ...prev[reelId].comments,
          { ...comment, id: crypto.randomUUID() }
        ]
      }
    }));
  };


  // Scroll handling
  const handleWheel = (event: React.WheelEvent) => {
    if (event.deltaY > 0 && currentReelIndex < reelsData.length - 1) {
      handleReelChange(currentReelIndex + 1);
    } else if (event.deltaY < 0 && currentReelIndex > 0) {
      handleReelChange(currentReelIndex - 1);
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touchEndY = event.changedTouches[0].clientY;
    const swipeDistance = touchStartY.current - touchEndY;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentReelIndex < reelsData.length - 1) {
        handleReelChange(currentReelIndex + 1);
      } else if (swipeDistance < 0 && currentReelIndex > 0) {
        handleReelChange(currentReelIndex - 1);
      }
    }
  };

  const handleReelChange = async (newIndex: number) => {
    // Pause current video
    const currentReel = reelsData[currentReelIndex];
    const currentVideo = videoRefs.current[currentReel.id];
    if (currentVideo) {
      currentVideo.pause();
      setReelsState(prev => ({
        ...prev,
        [currentReel.id]: { ...prev[currentReel.id], isPlaying: false }
      }));
    }

    // Play new video
    setCurrentReelIndex(newIndex);
    const newReel = reelsData[newIndex];
    const newVideo = videoRefs.current[newReel.id];
    if (newVideo) {
      try {
        await newVideo.play();
        setReelsState(prev => ({
          ...prev,
          [newReel.id]: { ...prev[newReel.id], isPlaying: true }
        }));
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  };

  const togglePlay = async (reelId: string) => {
    const video = videoRefs.current[reelId];
    if (!video) return;

    try {
      if (reelsState[reelId].isPlaying) {
        await video.pause();
      } else {
        await video.play();
      }
      setReelsState(prev => ({
        ...prev,
        [reelId]: { ...prev[reelId], isPlaying: !prev[reelId].isPlaying }
      }));
    } catch (error) {
      console.error('Error playing video:', error);
      setReelsState(prev => ({
        ...prev,
        [reelId]: { ...prev[reelId], isError: true }
      }));
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>, reelId: string) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percentageClicked = (clickPosition / progressBar.offsetWidth) * 100;
    
    const video = videoRefs.current[reelId];
    if (video) {
      const newTime = (percentageClicked / 100) * video.duration;
      video.currentTime = newTime;
      setReelsState(prev => ({
        ...prev,
        [reelId]: { ...prev[reelId], progress: percentageClicked }
      }));
    }
  };

  // Add this new function to check video orientation
  const handleLoadedMetadata = (video: HTMLVideoElement) => {
    const isVertical = video.videoHeight > video.videoWidth;
    video.classList.toggle('object-cover', isVertical);
    video.classList.toggle('object-contain', !isVertical);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const formatComment = (text: string) => {
    return text.split(' ').map((word, index) => {
      if (word.startsWith('@')) {
        return (
          <span key={index}>
            <span className="text-blue-500 hover:underline cursor-pointer">{word}</span>{' '}
          </span>
        );
      }
      return word + ' ';
    });
  };

  const handleLikeComment = (commentId: string) => {
    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      console.log('New comment:', commentText);
      setCommentText('');
    }
  };

  const handleSubmitReply = (commentId: string) => {
    if (replyText.trim()) {
      console.log('New reply to comment', commentId, ':', replyText);
      setReplyText('');
      setShowReplyInput(null);
    }
  };

  const toggleReplies = (commentId: string) => {
    setExpandedReplies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col min-h-screen  overflow-y-hidden no-scrollbar  mx-auto"> 
      <div className="bg-white border-b fixed w-full top-0 z-50 hidden lg:block">
        <Header
          onNotification={() => console.log("Notification clicked")}
          onMessage={() => console.log("Message clicked")}
          onProfile={() => console.log("Profile clicked")}
          onSearch={() => console.log("Profile clicked")}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-screen lg:pl-24 max-w-7xl mx-auto w-full gap-20 ">
        {/* Left Sidebar */}
          <div className="hidden lg:block w-[300px] flex-shrink-0 font-fontsm">
            <div className="sticky top-[calc(theme(spacing.20)+1px)] space-y-4">
              <JobFilterStatic/>
            </div>
          </div>

        {/* Main Feed and Comments Section */}
        <div className={`flex-1 flex  'max-w-[1000px]'   mx-auto transition-all duration-300`}>
          {/* Video Feed */}
          <div 
           className="relative  lg:rounded-xl lg:max-h-[90vh] bg-black font-fontsm transition-all duration-300"
           style={{
            height: "calc(100vh)",
            width: "calc((100vh - 88px) * (9 / 16))",
            minHeight: "560px",
            minWidth: "360px",
            maxWidth: "428px", 
            position: "sticky",
            top: "80px",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            touchAction: "pan-y pinch-zoom"
          }}
         
          onWheel={(e) => {
            e.preventDefault();
            handleWheel(e);
          }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {reelsData.map((reel, index) => (
              <div
                key={reel.id}
                className={`absolute w-full h-full transition-transform duration-300  ${
                  index === currentReelIndex ? 'translate-y-0' : 
                  index < currentReelIndex ? '-translate-y-full' : 'translate-y-full'
                }`}
                style={{
                  willChange: 'transform',
                  touchAction: 'none',
                  height: "100%",
                  transform: `translateY(${(index - currentReelIndex) * 100}%)`,
                  position: "absolute",
                  top: '',
                  left: 0,
                  right: 0
                }}
              >
                {/* Video Container */}
                <div className="relative h-full w-full bg-black   flex items-center justify-center">
                  {reelsState[reel.id]?.isError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
                      <p>Failed to load video</p>
                    </div>
                  ) : (
                    <video
                      ref={el => {
                        if (el) {
                          videoRefs.current[reel.id] = el;
                          // Handle already loaded videos
                          if (el.readyState >= 1) {
                            handleLoadedMetadata(el);
                          }
                        }
                      }}
                      className="h-full w-full"
                      onLoadedMetadata={(e) => handleLoadedMetadata(e.target as HTMLVideoElement)}
                      loop
                      playsInline
                      onClick={() => togglePlay(reel.id)}
                    >
                      <source src={reel.reelMediaUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}

                  {/* Play Button Overlay */}
                  {!reelsState[reel.id]?.isPlaying && !reelsState[reel.id]?.isError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <button 
                        onClick={() => togglePlay(reel.id)}
                        className="bg-white/30 rounded-full p-4 text-white hover:bg-white/40"
                      >
                        <img src={pause} alt="" className="w-8" />
                      </button>
                    </div>
                  )}

                  {/* Options Menu */}
                  <div className="absolute top-4 right-4 z-50" ref={el => el && (optionsRefs.current[reel.id] = el)}>
                    <button
                      onClick={() => setReelsState(prev => ({
                        ...prev,
                        [reel.id]: { ...prev[reel.id], showOptions: !prev[reel.id].showOptions }
                      }))}
                      className="bg-white/30 p-2 rounded-full text-white hover:bg-white/40 transition-colors"
                    >
                      <MoreVertical size={24} />
                    </button>
                    
                    {reelsState[reel.id]?.showOptions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
                        <button 
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setReelsState(prev => ({
                            ...prev,
                            [reel.id]: { ...prev[reel.id], showOptions: false }
                          }))}
                        >
                          Report
                        </button>
                        <button 
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setReelsState(prev => ({
                            ...prev,
                            [reel.id]: { ...prev[reel.id], showOptions: false }
                          }))}
                        >
                          Not Interested
                        </button>
                        <button 
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setReelsState(prev => ({
                            ...prev,
                            [reel.id]: { ...prev[reel.id], showOptions: false }
                          }))}
                        >
                          Copy Link
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div 
                    className="absolute bottom-16 lg:bottom-3  left-0 right-0 h-1 bg-gray-800 cursor-pointer"
                    onClick={(e) => handleProgressClick(e, reel.id)}
                  >
                    <div 
                      className="h-full bg-white transition-all duration-100 z-20"
                      style={{ width: `${reelsState[reel.id]?.progress || 0}%` }}
                    />
                  </div>

                  {/* Right Side Interaction Buttons */}
                  <div className="absolute right-4 bottom-24 mb-2 flex flex-col gap-4">
                    <button 
                      className="flex flex-col items-center text-white"
                      onClick={() => setReelsState(prev => ({
                        ...prev,
                        [reel.id]: { ...prev[reel.id], isLiked: !prev[reel.id].isLiked }
                      }))}
                    >
                      <div className="p-2 rounded-full hover:bg-black/40 transition-colors">
                        <Heart 
                          size={30} 
                          fill={reelsState[reel.id]?.isLiked ? "white" : "none"} 
                          color="white" 
                        />
                      </div>
                      <span className="text-sm">
                        {reelsState[reel.id]?.isLiked ? reel.likes + 1 : reel.likes}
                      </span>
                    </button>
                    
                    <button 
                      className="flex flex-col items-center text-white"
                      onClick={toggleComments}
                    >
                      <div className="p-2 rounded-full hover:bg-black/40 transition-colors">
                        <img src={rcomment} alt="" className="w-8" />
                      </div>
                      <span className="text-sm">{reel.reelComments.length}</span>
                    </button>
                    
                    <button className="flex flex-col items-center text-white">
                      <div className="p-2 rounded-full hover:bg-black/40 transition-colors">
                        <img src={rshare} alt="" className="w-8" />
                      </div>
                      <span className="text-sm">{"1"}</span>
                    </button>
                    
                    <button className="flex flex-col items-center text-white z-10">
                      <div className="p-2 rounded-full transition-colors">
                        <img
                          src={reelsState[reel.id]?.isSaved ? rsave2 : rsave1}
                          onClick={() => setReelsState(prev => ({
                            ...prev,
                            [reel.id]: { ...prev[reel.id], isSaved: !prev[reel.id].isSaved }
                          }))}
                          alt=""
                          className="w-5"
                        />
                      </div>
                    </button>
                  </div>

                  {/* Bottom Info Section */}
                  <div className="absolute bottom-16 lg:bottom-3 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center gap-3">
                      <img
                        src={reel.user.profile_picture}
                        alt={reel.user.name}
                        className="w-11 h-11 rounded-full ml-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-medium">{reel.user.name}</h3>
                          <button className="text-maincl text-xs ml-1 bg-buttonclr bg-opacity-40 px-3 py-0.5 rounded-full hover:bg-white/70 transition-colors">
                            Follow
                          </button>
                        </div>
                        <p className="text-white/80 text-xs">{`${reel.user.department} | ${reel.user.organization_name}`}</p>
                        <p className="text-white/80 text-xs">{"1d ago"}</p>
                      </div>
                    </div>
                    <div className={`mt-2 transition-all text-sm duration-300 ${
                      reelsState[reel.id]?.isExpanded ? 'h-auto' : 'h-[2.6em]'
                    } overflow-hidden relative`}>
                      <p className="text-white">{reel.reelDescription}</p>
                      {!reelsState[reel.id]?.isExpanded && reel.reelDescription.length > 70 && (
                        <div className="absolute bottom-0 right-0 bg-gradient-to-l from-black/10 pl-8 z-10">
                          <button 
                            onClick={() => setReelsState(prev => ({
                              ...prev,
                              [reel.id]: { ...prev[reel.id], isExpanded: true }
                            }))}
                            className="text-maincl hover:underline"
                          >
                            ..more
                          </button>
                        </div>
                      )}
                      {reelsState[reel.id]?.isExpanded && (
                        <button 
                          onClick={() => setReelsState(prev => ({
                            ...prev,
                            [reel.id]: { ...prev[reel.id], isExpanded: false }
                          }))}
                          className="text-maincl hover:underline ml-1"
                        >
                          less
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Comments Panel */}
          <div 
            className={`hidden lg:block bg-white  h-[100vh] ${showComments ? 'pl-4 pt-12' : ''}  font-fontsm  rounded-xl shadow-lg border-gray-300 overflow-hidden transition-all duration-300 ${
              showComments ? 'w-[440px]' : 'w-0'
            }`}
          >
            <div className="h-full flex flex-col">
              <div className="relative p-4 flex items-center justify-between">
                <button onClick={toggleComments} className='top-8 right-3 absolute'>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* Author info */}
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <img 
                      src={reelsData[currentReelIndex]?.user?.profile_picture} 
                      alt={reelsData[currentReelIndex]?.user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900">{reelsData[currentReelIndex]?.user.name}</h3>
                      <p className="text-xs text-gray-500">{reelsData[currentReelIndex]?.user.title}</p>
                      <p className="text-xs text-gray-500">{reelsData[currentReelIndex]?.user.date}</p>
                    </div>
                  </div>
                </div>

                {/* Description and Hashtags */}
                <div className="p-4 border-b">
                  <p className="text-gray-600 text-sm mb-2">{reelsData[currentReelIndex]?.reelDescription}</p>
                  {reelsData[currentReelIndex]?.referenceTags && reelsData[currentReelIndex]?.referenceTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {reelsData[currentReelIndex].referenceTags.map((tag, idx) => (
                        <span key={idx} className="text-blue-600 text-sm hover:underline cursor-pointer">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Interaction Stats */}
                <div className="flex items-start justify-between p-4 border-b">
                  <div className="flex gap-12">
                    <button 
                      onClick={() => setReelsState(prev => ({
                        ...prev,
                        [reelsData[currentReelIndex].id]: { 
                          ...prev[reelsData[currentReelIndex].id], 
                          isLiked: !prev[reelsData[currentReelIndex].id]?.isLiked 
                        }
                      }))}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <img 
                        src={reelsState[reelsData[currentReelIndex]?.id]?.isLiked ? liked : like} 
                        alt="" 
                        className='w-5' 
                      />
                      <div>
                        <p className='text-fontlit'>likes</p>
                        <span className='text-sm text-gray-800'>
                          {reelsState[reelsData[currentReelIndex]?.id]?.isLiked ? 
                            reelsData[currentReelIndex]?.likes + 1 : 
                            reelsData[currentReelIndex]?.likes}
                        </span>
                      </div>
                    </button>
                    <div className="flex items-center gap-2 text-gray-600">
                      <img src={comment1} alt="" className='w-5'/>
                      <div>
                        <p className='text-fontlit'>Comments</p>
                        <span className='text-sm text-gray-800'>{reelsData[currentReelIndex]?.reelComments.length}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <img src={share} alt="" className='w-5' />
                      <div>
                        <p className='text-fontlit'>Shares</p>
                        <span className='text-sm text-gray-800'>{reelsData[currentReelIndex]?.shares}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments list */}
                <div className="p-4 space-y-4">
                  <p className='text-maincl pt-1 font-semibold'>Comments</p>
                  {reelsState[reelsData[currentReelIndex]?.id]?.comments.map((comment) => (
                    <div key={comment.id} className="space-y-3">
                      <div className="flex gap-3">
                        <img
                          src={comment.author.profileImage}
                          alt={comment.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="bg-buttonclr rounded-2xl rounded-tl-none px-3 py-2 relative">
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <div>
                                  <span className="text-xs">{comment.author.name}</span>
                                  <span className="text-fontlit right-0 absolute pt-1 pr-3 text-gray-500">{comment.timestamp}</span>
                                </div>
                                <p className="text-fontlit text-gray-500 line-clamp-1">{comment.author.title}</p>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm">{formatComment(comment.content)}</p>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 ml-4">
                            <button
                              onClick={() => handleLikeComment(comment.id)}
                              className="hover:text-gray-700 flex text-xs"
                            >
                              <img src={likedComments.has(comment.id) ? liked : like} alt="" className='pr-1'/>
                              {comment.likes}
                            </button>
                            <button
                              onClick={() => setShowReplyInput(comment.id)}
                              className="hover:text-gray-700 text-xs flex gap-1"
                            >
                              <img src={comment1} alt="" />
                              Reply
                            </button>
                          </div>

                          {/* Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-2 ml-4">
                              <button
                                className="text-sm text-gray-500 hover:text-gray-700"
                                onClick={() => toggleReplies(comment.id)}
                              >
                                {expandedReplies.has(comment.id) ? `Hide all ${comment.replies.length} replies` : `View all ${comment.replies.length} replies`}
                              </button>
                              
                              {expandedReplies.has(comment.id) && (
                                <div className="mt-3 space-y-3">
                                  {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex gap-3">
                                      <img
                                        src={reply.author.profileImage}
                                        alt={reply.author.name}
                                        className="w-6 h-6 rounded-full"
                                      />
                                      <div className="flex-1">
                                        <div className="bg-gray-100 rounded-2xl rounded-tl-none px-3 py-2 relative">
                                          <div className="flex items-center justify-between mb-1">
                                            <div>
                                              <span className="text-xs">{reply.author.name}</span>
                                              <span className="text-fontlit right-0 absolute pr-2 text-gray-500">{reply.timestamp}</span>
                                              <p className="text-fontlit line-clamp-1 text-gray-500">{reply.author.title}</p>
                                            </div>
                                          </div>
                                          <p className="text-gray-600 text-sm">{formatComment(reply.content)}</p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 ml-4">
                                          <button className="hover:text-gray-700 flex gap-1 items-center">
                                            <img 
                                              src={liked} 
                                              alt="" 
                                            /> 
                                            {reply.likes}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}


                          {/* Reply Input */}
                          {showReplyInput === comment.id && (
                            <div className="flex gap-3 items-center mt-3 ml-6">
                              <img
                                src={reelsData[currentReelIndex].user.profile_picture}
                                alt=""
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex-1 flex gap-2">
                                <input
                                  type="text"
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="Write a reply..."
                                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm"
                                />
                                <button 
                                  onClick={() => handleSubmitReply(comment.id)}
                                  disabled={!replyText.trim()}
                                  className="bg-maincl text-white px-4 py-2 rounded-full text-sm disabled:opacity-50"
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment Input */}
              <div className="p-4 border-t">
                <div className="flex gap-3 items-center">
                  <img
                    src={reelsData[currentReelIndex]?.user.profile_picture}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm"
                    />
                    <button
                      onClick={handleSubmitComment}
                      disabled={!commentText.trim()}
                      className="bg-maincl text-white px-4 py-2 rounded-full text-sm disabled:opacity-50"
                    >
                      comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Comments Panel */}
          {showComments && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="sticky top-0 bg-white border-b p-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Comments</h2>
                      <button onClick={toggleComments}>
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    {/* Author info */}
                    <div className="p-4 border-b">
                      <div className="flex items-center gap-3">
                        <img 
                          src={reelsData[currentReelIndex]?.user.profile_picture} 
                          alt={reelsData[currentReelIndex]?.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{reelsData[currentReelIndex]?.user.name}</h3>
                          <p className="text-sm text-gray-600">{reelsData[currentReelIndex]?.user.title}</p>
                          <p className="text-xs text-gray-500">{reelsData[currentReelIndex]?.user.date}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description and Hashtags */}
                    <div className="p-4 border-b">
                      <p className="text-gray-600 text-sm mb-2">{reelsData[currentReelIndex]?.reelDescription}</p>
                      {reelsData[currentReelIndex]?.referenceTags && reelsData[currentReelIndex]?.referenceTags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {reelsData[currentReelIndex].referenceTags.map((tag, idx) => (
                            <span key={idx} className="text-blue-600 text-sm hover:underline cursor-pointer">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Comments list */}
                    <div className="p-4 space-y-4">
                      <p className='text-maincl pt-1 font-semibold'>Comments</p>
                      {reelsState[reelsData[currentReelIndex]?.id]?.comments.map((comment) => (
                        <div key={comment.id} className="space-y-3">
                          <div className="flex gap-3">
                            <img
                              src={comment.author.profileImage}
                              alt={comment.author.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="bg-buttonclr rounded-2xl rounded-tl-none px-3 py-2">
                                <div className="flex items-center justify-between mb-1">
                                  <div>
                                    <span className="text-sm font-medium">{comment.author.name}</span>
                                    <p className="text-xs text-gray-500">{comment.author.title}</p>
                                  </div>
                                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm">{formatComment(comment.content)}</p>
                              </div>

                              <div className="flex items-center gap-4 mt-2 ml-2">
                                <button
                                  onClick={() => handleLikeComment(comment.id)}
                                  className="flex items-center gap-1 text-sm text-gray-500"
                                >
                                  <img src={likedComments.has(comment.id) ? liked : like} alt="" className="w-4 h-4" />
                                  <span>{comment.likes}</span>
                                </button>
                                <button
                                  onClick={() => setShowReplyInput(comment.id)}
                                  className="text-sm text-gray-500"
                                >
                                  Reply
                                </button>
                              </div>

                              {/* Replies */}
                              {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-2 ml-4">
                                  <button
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                    onClick={() => toggleReplies(comment.id)}
                                  >
                                    {expandedReplies.has(comment.id) ? 
                                      `Hide ${comment.replies.length} replies` : 
                                      `View ${comment.replies.length} replies`}
                                  </button>
                                  
                                  {expandedReplies.has(comment.id) && (
                                    <div className="mt-3 space-y-3">
                                      {comment.replies.map((reply) => (
                                        <div key={reply.id} className="flex gap-3">
                                          <img
                                            src={reply.author.profileImage}
                                            alt={reply.author.name}
                                            className="w-6 h-6 rounded-full"
                                          />
                                          <div className="flex-1">
                                            <div className="bg-buttonclr rounded-2xl rounded-tl-none px-3 py-2">
                                              <div className="flex items-center justify-between mb-1">
                                                <div>
                                                  <span className="text-sm font-medium">{reply.author.name}</span>
                                                  <p className="text-xs text-gray-500">{reply.author.title}</p>
                                                </div>
                                                <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                              </div>
                                              <p className="text-sm">{formatComment(reply.content)}</p>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Reply Input */}
                              {showReplyInput === comment.id && (
                                <div className="mt-3 ml-8">
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={replyText}
                                      onChange={(e) => setReplyText(e.target.value)}
                                      placeholder="Write a reply..."
                                      className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm"
                                    />
                                    <button
                                      onClick={() => handleSubmitReply(comment.id)}
                                      disabled={!replyText.trim()}
                                      className="bg-maincl text-white px-4 py-2 rounded-full text-sm disabled:opacity-50"
                                    >
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comment Input */}
                  <div className="sticky bottom-0 bg-white border-t p-4">
                    <div className="flex gap-3 items-center">
                      <img
                        src={reelsData[currentReelIndex].user.profile_picture}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Write a comment..."
                          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm"
                        />
                        <button
                          onClick={() => handleAddComment(reelsData[currentReelIndex].id, {
                            author: {
                              name: 'Current User', // Replace with actual user data
                              profileImage: reelsData[currentReelIndex].user.profile_picture,
                              title: 'User Title'
                            },
                            content: commentText,
                            likes: 0,
                            timestamp: 'Just now'
                          })}
                          disabled={!commentText.trim()}
                          className="bg-maincl text-white px-4 py-2 rounded-full text-sm disabled:opacity-50"
                        >
                          comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="hidden lg:block w-[300px] flex-shrink-0 font-fontsm">
          </div>

      <div className="lg:hidden">
        <Navigation />
      </div>
    </div>
    </div>
    </div>
  );
};

export default ReelsFeed;