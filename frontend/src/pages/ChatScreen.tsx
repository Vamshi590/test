import { useState } from 'react';
import dots from "../assets/3dots.svg";
import profileimg from "../assets/profile.svg"
import { CgAddR } from "react-icons/cg";
import { FaMicrophone } from "react-icons/fa6";
import { AiOutlineFile, AiOutlineCamera, AiOutlinePicture, AiOutlineGif } from "react-icons/ai";
import { VscMention } from "react-icons/vsc";
import MessagePost from '@/components/MessagePost';
import { IoVideocamOutline } from "react-icons/io5";

interface UserInfo {
  name: string;
  lastActive: string;
}

const ChatHeader = ({ user }: { user: UserInfo }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 border-b border-gray-200 shadow-sm">
      <div className="flex items-center">
        <button className="text-gray-600 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div>
          <img
            src={profileimg}
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500"> {user.lastActive}</p>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-4">
        <button className="text-gray-600 pr-4">
          <IoVideocamOutline size={23} />
        </button>
        <button className="text-gray-600">
          <img src={dots} width={17} alt="3dots" className='pr-3' />
        </button>
      </div>
    </div>
  );
};

const ChatInput = ({ onSendMessage }: { onSendMessage: (message: string) => void }) => {
  const [message, setMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center p-4 bg-gray-100 border-t border-gray-200">
        <button className="text-gray-600 mr-3" onClick={() => setShowOptions(!showOptions)}>
          <CgAddR size={24} />
        </button>

        <input
          type="text"
          placeholder="Write a message..."
          className="flex-1 p-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />

        <button className="text-gray-600 ml-3" onClick={handleSend}>
          <FaMicrophone size={19} />
        </button>
      </div>

      {showOptions && (
        <div className="absolute bottom-16 left-0 w-full bg-white shadow-lg rounded-xl p-4 flex justify-between">
          <button className="flex flex-col items-center text-gray-600">
            <AiOutlineFile size={24} />
            <span className="text-xs mt-1">Document</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <AiOutlineCamera size={24} />
            <span className="text-xs mt-1">Camera</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <AiOutlinePicture size={24} />
            <span className="text-xs mt-1">Media</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <AiOutlineGif size={24} />
            <span className="text-xs mt-1">GIF</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <VscMention size={24} />
            <span className="text-xs mt-1">@Mention</span>
          </button>
        </div>
      )}
    </div>
  );
};

const ChatScreen = () => {
  const [messages, setMessages] = useState<{ text: string; isSent: boolean; time: string }[]>([]);
  const user: UserInfo = {
    name: 'Kageyama bro',
    lastActive: '2d ago',
  };

  const handleSendMessage = (message: string) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([...messages, { text: message, isSent: false, time: currentTime }]); // Add timestamp to the new message
  };

  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen">
      <div className="bg-white flex flex-col rounded-lg p-1 max-w-md w-full h-full shadow-md">
        <ChatHeader user={user} />

        <div className="flex-1 flex flex-col overflow-y-auto p-4 bg-gray-50">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 px-4 my-1 rounded-lg ${
                  msg.isSent
                    ? 'bg-blue-100 self-end text-right'
                    : 'bg-gray-200 self-start text-left'
                }`}
              >
                <span>{msg.text}</span>
                <p className="text-xs flex text-gray-500 mt-1 ml-auto items-end justify-end">{msg.time}</p> {/* Display timestamp */}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
          )}
          <MessagePost />
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatScreen;
