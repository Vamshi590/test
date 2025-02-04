import profileimg from "../assets/profile.svg";


const MessagePost = ({
  userName = "Roshan S",
  userFollowers = "80K+",
  profileImage = profileimg ,
  postText = "Remote Internship Alert at MathonGo",
  postImage =profileimg,
}) => {
  return (
    <div className="w-60 h-80 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-300">
      {/* Header Section: User Info */}
      <div className="flex items-center p-2 border-b border-gray-200">
        <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full" />
        <div className="flex flex-col flex-1 px-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">{userName}</span>
            <button className="text-blue-500 text-md font-semibold">+ Follow</button>
          </div>
          <p className="text-sm text-gray-500">{userFollowers}</p>
        </div>
      </div>

      {/* Post Content Section */}
      <div className="p-2">
        <p className="text-gray-700 mb-2">{postText}</p>
        <div className="bg-gray-100 rounded-lg flex justify-center items-center">
          <img src={postImage} alt="Post Illustration" className="w-full h-auto object-cover" />
        </div>
      </div>
    </div>
  );
};

export default MessagePost;