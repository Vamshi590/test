import TopNavbar from "@/components/TopNavbar";
import { useState, useEffect, useRef } from "react";
import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";

// Socket.io setup for real-time communication

type Friend = {
  id: number;
  name: string;
  imageUrl: string;
  lastMessage: string;
  lastActive: string;
};

type Message = {
  sender: string;
  content: string;
  timestamp: string;
};

// Dummy friend data
const dummyFriends: Friend[] = [
  {
    id: 1,
    name: "Kailey",
    imageUrl: "https://via.placeholder.com/48",
    lastMessage: "Say My Name",
    lastActive: "9:36 AM",
  },
  {
    id: 2,
    name: "Maryjane",
    imageUrl: "https://via.placeholder.com/48",
    lastMessage: "Check On It",
    lastActive: "12:02 PM",
  },
  {
    id: 3,
    name: "Niko",
    imageUrl: "https://via.placeholder.com/48",
    lastMessage: "You Send Me",
    lastActive: "10:35 AM",
  },
  {
    id: 4,
    name: "Agustin",
    imageUrl: "https://via.placeholder.com/48",
    lastMessage: "The Tide Is High",
    lastActive: "4:00 AM",
  },
];

// Dummy message data
const dummyMessages: Record<number, Message[]> = {
  1: [
    { sender: "Kailey", content: "Hey, how are you?", timestamp: "9:35 AM" },
    {
      sender: "You",
      content: "Not bad, what about you?",
      timestamp: "9:36 AM",
    },
  ],
  2: [
    {
      sender: "Maryjane",
      content: "Did you check that?",
      timestamp: "12:01 PM",
    },
    { sender: "You", content: "Yes, all good!", timestamp: "12:02 PM" },
  ],
  3: [
    { sender: "Niko", content: "What’s the plan?", timestamp: "10:30 AM" },
    { sender: "You", content: "Let’s meet at 5!", timestamp: "10:35 AM" },
  ],
  4: [
    { sender: "Agustin", content: "Are we still on?", timestamp: "3:55 AM" },
    { sender: "You", content: "Yep, see you at 6.", timestamp: "4:00 AM" },
  ],
};

function ChatApp() {
  const [friends, setFriends] = useState<Friend[]>(dummyFriends);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Listen for real-time messages
//     socket.on("message", (newMessage: Message) => {
//       setMessages((prev) => [...prev, newMessage]);
//     });

//     return () => {
//       socket.off("message");
//     };
//   }, []);

  const handleFriendClick = (friend: Friend) => {
    setSelectedFriend(friend);
    setMessages(dummyMessages[friend.id] || []);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0; // Reset scroll to the top
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedFriend) {
      const messageToSend = {
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, messageToSend]);
    //   socket.emit("sendMessage", messageToSend);
      setNewMessage("");

      // Scroll to the bottom after sending a message
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }, 0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-white min-h-screen">
      {/* Top Navbar */}
      <TopNavbar />

      {/* Chat Container */}
      <div className="container max-w-7xl shadow-xl rounded-lg mt-12 overflow-hidden flex h-[87vh] bg-white ">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b bg-gray-50">
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full p-2 border border-gray-300 rounded-full focus:outline-none"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className={`flex items-center p-4 cursor-pointer ${
                  selectedFriend?.id === friend.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleFriendClick(friend)}
              >
                <img
                  src={friend.imageUrl}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold">{friend.name}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {friend.lastMessage}
                  </p>
                </div>
                <p className="text-sm text-gray-400 ml-auto">
                  {friend.lastActive}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-2/3 flex flex-col">
          {selectedFriend ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center p-4 border-b bg-gray-50">
                <img
                  src={selectedFriend.imageUrl}
                  alt={selectedFriend.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold">{selectedFriend.name}</p>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
                <button className="ml-auto">
                  <FaEllipsisV className="text-gray-500" />
                </button>
              </div>

              {/* Chat Messages */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 bg-gray-100"
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "You" ? "justify-end" : "justify-start"
                    } mb-4`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        msg.sender === "You"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 text-gray-500 ${
                        msg.sender === "You"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-gray-50 border-t flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 bg-blue-500 text-white p-2 rounded-full"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1">
              <p className="text-gray-500">Select a friend to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
