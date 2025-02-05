// import React, { useState } from 'react';
// import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
// import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';

// interface Event {
//   id: string;
//   title: string;
//   date: Date;
//   time: string;
//   type: 'Job Interview' | 'Conference' | 'Mentor Session' | 'Anniversary' | 'Event' | 'Post Schedule';
//   location?: string;
// }

// const EventCalendar: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedView, setSelectedView] = useState<'Day' | 'Month' | 'Year'>('Month');
//   const [showEventTypeSelect, setShowEventTypeSelect] = useState(false);
//   const [events, setEvents] = useState<Event[]>([
//     {
//       id: '1',
//       title: 'Job Interview',
//       date: new Date(2025, 0, 29),
//       time: '4:00PM',
//       type: 'Job Interview',
//       location: 'Bhaskararama Hospital & Research Institute'
//     },
//     {
//       id: '2',
//       title: 'Conference',
//       date: new Date(2025, 0, 2),
//       time: '1:00PM',
//       type: 'Conference',
//       location: 'India Ophthalmology Forum: Advancing Eye...'
//     }
//   ]);
//   const [showAddEvent, setShowAddEvent] = useState(false);
//   const [newEvent, setNewEvent] = useState<Partial<Event>>({});

//   const eventTypes = [
//     { type: 'Job Interview', color: 'bg-red-200 border-red-400 text-red-800' },
//     { type: 'Conference', color: 'bg-green-200 border-green-400 text-green-800' },
//     { type: 'Mentor Session', color: 'bg-purple-200 border-purple-400 text-purple-800' },
//     { type: 'Anniversary', color: 'bg-pink-200 border-pink-400 text-pink-800' },
//     { type: 'Event', color: 'bg-blue-200 border-blue-400 text-blue-800' },
//     { type: 'Post Schedule', color: 'bg-orange-200 border-orange-400 text-orange-800' }
//   ];

//   const eventColors = {
//     'Job Interview': 'bg-red-100 text-red-800',
//     'Conference': 'bg-green-100 text-green-800',
//     'Mentor Session': 'bg-purple-100 text-purple-800',
//     'Anniversary': 'bg-pink-100 text-pink-800',
//     'Event': 'bg-blue-100 text-blue-800',
//     'Post Schedule': 'bg-orange-100 text-orange-800'
//   };

//   const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
//   const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

//   const daysInMonth = eachDayOfInterval({
//     start: startOfMonth(currentDate),
//     end: endOfMonth(currentDate)
//   });

//   const getEventsForDay = (date: Date) => {
//     return events.filter(event => 
//       event.date.getDate() === date.getDate() &&
//       event.date.getMonth() === date.getMonth() &&
//       event.date.getFullYear() === date.getFullYear()
//     );
//   };

//   const handleEventTypeSelect = (type: Event['type']) => {
//     setNewEvent({ ...newEvent, type });
//     setShowEventTypeSelect(false);
//     setShowAddEvent(true);
//   };

//   const handleAddEvent = () => {
//     if (newEvent.title && newEvent.date && newEvent.time && newEvent.type) {
//       setEvents([...events, { id: Date.now().toString(), ...newEvent } as Event]);
//       setShowAddEvent(false);
//       setNewEvent({});
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-lg">
//       <div className="flex flex-col space-y-4">
//         {/* Month and Year Selection */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <select 
//               value={format(currentDate, 'MMMM')}
//               onChange={(e) => {
//                 const newDate = new Date(currentDate);
//                 newDate.setMonth(new Date(Date.parse(`${e.target.value} 1, 2025`)).getMonth());
//                 setCurrentDate(newDate);
//               }}
//               className="text-lg font-medium text-gray-700 border-none focus:ring-0"
//             >
//               {Array.from({ length: 12 }, (_, i) => new Date(2025, i, 1)).map(date => (
//                 <option key={format(date, 'MMMM')} value={format(date, 'MMMM')}>
//                   {format(date, 'MMMM')}
//                 </option>
//               ))}
//             </select>
//             <select
//               value={format(currentDate, 'yyyy')}
//               onChange={(e) => {
//                 const newDate = new Date(currentDate);
//                 newDate.setFullYear(parseInt(e.target.value));
//                 setCurrentDate(newDate);
//               }}
//               className="text-lg font-medium text-gray-700 border-none focus:ring-0"
//             >
//               {[2024, 2025, 2026].map(year => (
//                 <option key={year} value={year}>{year}</option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center space-x-4 hidden lg:block">
//             <button
//               onClick={() => setSelectedView('Day')}
//               className={`px-4 py-1 rounded-full text-sm ${
//                 selectedView === 'Day' ? 'bg-maincl text-white' : 'bg-gray-100 text-fillc'
//               }`}
//             >
//               Day
//             </button>
//             <button
//               onClick={() => setSelectedView('Month')}
//               className={`px-4 py-1 rounded-full text-sm ${
//                 selectedView === 'Month' ? 'bg-maincl text-white' : 'bg-gray-100 text-fillc'
//               }`}
//             >
//               Month
//             </button>
//             <button
//               onClick={() => setSelectedView('Year')}
//               className={`px-4 py-1 rounded-full text-sm ${
//                 selectedView === 'Year' ? 'bg-maincl text-white' : 'bg-gray-100 text-fillc'
//               }`}
//             >
//               Year
//             </button>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={handlePrevMonth}
//               className="p-1 hover:bg-gray-100 rounded-full"
//             >
//               <FaChevronLeft className="w-4 h-4" />
//             </button>
//             <button
//               onClick={handleNextMonth}
//               className="p-1 hover:bg-gray-100 rounded-full"
//             >
//               <FaChevronRight className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => setShowEventTypeSelect(true)}
//               className="flex items-center space-x-1 bg-maincl text-white px-2 py-2 rounded-full hover:bg-fillc text-sm"
//             >
//               <FaPlus className="w-3 h-3" />
//             </button>
//           </div>
//         </div>

//         {/* Event Type Legend */}
//         <div className="flex flex-wrap gap-2 pt-4 items-center text-sm">
//           {eventTypes.map(({ type, color }) => (
//             <div key={type} className="flex items-center space-x-1">
//               <div className={`w-3 h-3 rounded-full  ${color.replace('bg-', 'bg-')}`}></div>
//               <span>{type}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-7 gap-1 mt-4">
//         {['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'].map(day => (
//           <div key={day} className="text-center bg-buttonclr text-sm font-medium py-2">
//             {day}
//           </div>
//         ))}
//         {daysInMonth.map((day, index) => (
//           <div
//             key={index}
//             className={`min-h-[120px] p-2 border ${
//               !isSameMonth(day, currentDate)
//                 ? 'bg-gray-50'
//                 : isToday(day)
//                 ? 'bg-blue-50'
//                 : 'bg-white'
//             }`}
//           >
//             <div className="text-right mb-2 text-sm">
//               {format(day, 'd')}
//             </div>
//             <div className="space-y-1">
//               {getEventsForDay(day).map(event => (
//                 <div
//                   key={event.id}
//                   className={`${eventColors[event.type]} p-1 rounded text-sm`}
//                 >
//                   <div className="font-semibold">{event.title}</div>
//                   <div className="text-xs">{event.time}</div>
//                   {event.location && (
//                     <div className="text-xs truncate">{event.location}</div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Event Type Selection Modal */}
//       {showEventTypeSelect && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h3 className="text-lg font-medium text-gray-700 mb-4">Select Event Type</h3>
//             <div className="grid grid-cols-2 gap-3">
//               {eventTypes.map(({ type, color }) => (
//                 <button
//                   key={type}
//                   onClick={() => handleEventTypeSelect(type as Event['type'])}
//                   className={`${color} p-3 rounded-lg border text-left hover:opacity-90 transition-opacity`}
//                 >
//                   {type}
//                 </button>
//               ))}
//             </div>
//             <button
//               onClick={() => setShowEventTypeSelect(false)}
//               className="mt-4 w-full bg-gray-200 p-2 rounded-3xl hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Add Event Modal */}
//       {showAddEvent && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h3 className="text-lg font-medium text-gray-700 mb-4">Add New Event</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block mb-1">Title</label>
//                 <input
//                   type="text"
//                   className="w-full border rounded p-2"
//                   value={newEvent.title || ''}
//                   onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Date</label>
//                 <input
//                   type="date"
//                   className="w-full border  text-gray-700 rounded p-2"
//                   onChange={e => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Time</label>
//                 <input
//                   type="time"
//                   className="w-full border rounded p-2"
//                   onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Location <span className='text-gray-500'> (optional) </span></label>
//                 <input
//                   type="text"
//                   className="w-full border rounded p-2"
//                   value={newEvent.location || ''}
//                   onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
//                 />
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={handleAddEvent}
//                   className="bg-maincl text-white px-4 py-1 rounded-3xl hover:bg-blue-600"
//                 >
//                   Add Event
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowAddEvent(false);
//                     setNewEvent({});
//                   }}
//                   className="bg-gray-200 text-maincl px-4 py-1 rounded-3xl hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventCalendar;



import React, { useEffect, useState } from 'react';
import add from "../../assets/icon/add.svg";
import backbutton from "../../assets/icon/backbutton.svg";
import more1 from "../../assets/icon/more1.svg";
import pmessage from "../../assets/icon/pmessage.svg";
import add2 from "../../assets/icon/add2.svg";
import { FaLink, FaPlus } from "react-icons/fa";
import { Header } from './Header';
import location from "../../assets/icon/location.svg";
import edit from "../../assets/icon/edit.svg";
import arrowright from "../../assets/icon/arrowright.svg";
import PostCard from './PostCard';
import QuestionCard from './QuestionCard';
import ResourceCard from './ResourceCard';
import MentionedCard from './MentionedCard';
import { Link } from 'react-router-dom';
import { JobsCard } from '../jobs/JobCard';
import ConferenceCard from './ConferenceCard';
import EventCalendar from './EventCalendar';




interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  description?: string;
  img:string;
}


interface Education {
  institution: string;
  degree: string;
  year: string;
  logo: string;
}

interface Interest {
  id: string;
  name: string;
}
interface Certification {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  logo: string;
}


interface Membership {
  id: number;
  name: string;
  category: string;
  image: string;
}


interface Award {
  id: number;
  title: string;
  organization: string;
  year: string;
  description: string;
  credentialLink?: string;
}

interface Workplace {
  id: number;
  organization: string;
  img: string;
}

interface Post {
  id: number;
  content: string;
  likes: number;
  shares:number;
  reposts:number;
  comments: number;
  time: string;
  images: string[];
  userImage: string;
  userName: string;
  userTitle: string;
  postImage: string;
}

interface Question {
  id: string;
  title: string;
  content: string;
  images: string[];
  answers: number;
  shares: number;
  author: {
    image: string;
    name: string;
    title: string;
  };
  timeAgo: string;
}

interface Resource {
  id: string;
  type: string;
  title: string;
  description: string;
  image: string;
  
}

interface MediaItem {
  id: string;
  type: 'photo' | 'video' | 'other';
  url: string;
  additionalCount?: number;
}

interface MentionedPost {
  id: string;
  userImage: string;
  userName: string;
  userTitle: string;
  timeAgo: string;
  title: string;
  content: string;
  images: string[];
  likes: number;
  comments:number;
  shares: number;
  reposts: number;
}

  interface Job {
    id: number;
    image: string;
    date: string;
    name: string;
    location: string;
    amount: string;
    department: string;
  }
  interface Conference {
    id: string;
    title: string;
    date: string;
    avatar: string;
    location: string;
    speaker: string;
    image: string;
    price?: string;
    speciality: string;
  }
  

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [expanded, setExpanded] = useState(false);
  const [interestsexpanded, setInterestsExpanded] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [showAllResources, setShowAllResources] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<'Photos' | 'Videos' | 'Other'>('Photos');
  const [showAllMentioned, setShowAllMentioned] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [activeDesktopTab, setActiveDesktopTab] = useState<string>('activity');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    setActiveDesktopTab('activity');

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const tabs = ['About', 'Activity', 'Events', 'Memberships', 'Saved', 'Draft'];
  const Desktoptabs = [ 'Activity', 'Jobs', 'Events', 'Saved', 'Draft'];

  // Sample data for posts and questions
  const posts: Post[] = [
    {
      id: 1,
      content: "Just completed a successful cataract surgery using the latest minimally invasive technique. The patient's vision improved significantly...",
      likes: 45,
      comments: 12,
      userTitle:'Opthomology the future of eye care',
      shares :12,
      reposts:12,
      time: "2 hours ago",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      userImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      userName: "Seelam Vamshidhar Goud",
      postImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c"
    },
    {
      id: 2,
      content: "Excited to share my research findings on advanced IOL technologies at the upcoming ophthalmology conference...",
      likes: 32,
      comments: 8,
      userTitle:'Opthomology the future of eye care',
      shares :12,
      reposts:12,
      time: "5 hours ago",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      userImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      userName: "Seelam Vamshidhar Goud",
      postImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c"
    }
  ];

  

  const aboutText = "An experienced ophthalmologist passionate about advancing care through sustainable eye care. Specializing in cataract and refractive surgery with a focus on advanced surgical ophthalmology. I combine cutting-edge technology with a patient-centered approach...";


  const experiences: ExperienceItem[] = [
    {
      title: 'Ophthalmology Clinical Intern',
      company: 'Aravind Eye Hospital, Madurai, Tamil Nadu',
      date: 'Jun 2023 - Present',
      description: '',
      img:'https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08'
    },
    {
      title: 'Ophthalmology Clinical Intern',
      company: 'Sankara Nethralaya, Chennai, Tamil Nadu',
      date: 'Jun 2023 - Present',
      description: 'Clinical rotations in various ophthalmology departments',
      img:'https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08'
    },
    {
      title: 'Ophthalmology Clinical Intern',
      company: 'AIIMS',
      date: 'Jun 2023 - Present',
      description: 'Clinical rotations in various ophthalmology departments',
      img:'https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08'
    },
    // Add more experiences...
  ];

  const educationData: Education[] = [
    {
      institution: "All India Institute of Medical Sciences (AIIMS), New Delhi",
      degree: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
      year: "2020 - 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    },
    {
      institution: "St. Xavier’s High School, Mumbai",
      degree: "Higher Secondary Education (Class 12)",
      year: "2020 - 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    },
    {
      institution: "All India Institute of Medical Sciences (AIIMS), New Delhi",
      degree: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
      year: "2020 - 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    },
    {
      institution: "St. Xavier’s High School, Mumbai",
      degree: "Higher Secondary Education (Class 12)",
      year: "2020 - 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    },
    // Add more education...
  ];

  const interestData: Interest[] = [
    {
      id: '1',
      name: "Cataract Surgery",
    },
    {
      id: '2',
      name: "Corneal Disorders and Treatment",
    },
    {
      id: '3',
      name: "Pediatric Ophthalmology",
    },
    {
      id: '4',
      name: "Retinal Surgery",
    },
    {
      id: '5',
      name: "Corneal Disorders and Treatment",
    },
    {
      id: '6',
      name: "Pediatric Ophthalmology",
    },
    {
      id: '7',
      name: "Retinal Surgery",
    }
  ];

  const certificationData: Certification[] = [
    {
      id: '1',
      title: "Ophthalmology Clinical Skills Workshop",
      organization: "Sankara Nethralaya, Chennai",
      issueDate: "March 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    },
    {
      id: '2',
      title: "Advanced Cataract Surgery Certification",
      organization: "AIIMS Delhi",
      issueDate: "January 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    },
    {
      id: '3',
      title: "Ophthalmology Clinical Skills Workshop",
      organization: "Sankara Nethralaya, Chennai",
      issueDate: "March 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    },
    {
      id: '4',
      title: "Advanced Cataract Surgery Certification",
      organization: "AIIMS Delhi",
      issueDate: "January 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    }
  ];


  const memberships: Membership[] = [
    { id: 1, name: "Visionary Care Society", category: "Ophthalmology", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { id: 2, name: "Visionary Care Society", category: "Ophthalmology", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { id: 3, name: "Visionary Care Society", category: "Ophthalmology", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { id: 4, name: "Visionary Care Society", category: "Ophthalmology", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { id: 5, name: "Visionary Care Society", category: "Ophthalmology", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
    { id: 6, name: "Visionary Care Society", category: "Ophthalmology", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
  ];


  const awards: Award[] = [
  {
    id: 1,
    title: "Best Student Research Project Award",
    organization: "Indian Medical Research Council (IMRC)",
    year: "2021",
    description:
      'For research on "Prevalence of Diabetic Retinopathy in Urban Slum Populations in Mumbai."',
    credentialLink: "#",
  },
  {
    id: 2,
    title: "Best Student Research Project Award",
    organization: "Indian Medical Research Council (IMRC)",
    year: "2021",
    description:
      'For research on "Prevalence of Diabetic Retinopathy in Urban Slum Populations in Mumbai."',
    credentialLink: "#",
  },
  {
    id: 3,
    title: "Best Paper Presentation Award",
    organization: "National Conference on Biomedical Research",
    year: "2022",
    description: "Recognized for outstanding contribution in biomedical innovations.",
    credentialLink: "#",
  },
];



const workplaces: Workplace[] = [
  { id: 1, organization: "Aravind Eye Hospital, Madurai, Tamil Nadu", img: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
  { id: 2, organization: "All India Institute of Medical Sciences, Delhi", img: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08" },
];

const questions: Question[] = [
  {
    id: '1',
    title: "Latest advancements in cataract surgery techniques?",
    content: "I'm interested in learning about the newest developments in cataract surgery. What are the most promising techniques being used or researched currently?",
    images: [
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    ],
    answers: 12,
    shares: 8,
    author: {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      name: "Dr. Seelam Vamshidhar",
      title: "Ophthalmologist | AIIMS Delhi"
    },
    timeAgo: "2 days ago"
  },
  {
    id: '2',
    title: "Best practices for post-LASIK care?",
    content: "Looking for recommendations on post-LASIK patient care protocols. What has been your experience with different approaches?",
    images: [
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    ],
    answers: 8,
    shares: 5,
    author: {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      name: "Dr. Seelam Vamshidhar",
      title: "Ophthalmologist | AIIMS Delhi"
    },
    timeAgo: "5 days ago"
  }
];

const resources: Resource[] = [
  {
    id: '1',
    type: 'Article',
    title: 'The Future of AI in Ophthalmology',
    description: 'Artificial intelligence (AI) is revolutionizing various fields of medicine, and ophthalmology is no exception. With the rapid advancement of machine learning, deep learning, and computer vision, AI is enhancing diagnostic accuracy, streamlining workflows, and improving patient outcomes. The integration of AI into ophthalmology is set to redefine the way eye diseases are detected, monitored, and treated.',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08',
    
  },
  {
    id: '2',
    type: 'Research',
    title: 'Latest Advances in Glaucoma Treatment',
    description: 'Recent developments in glaucoma treatment have opened new possibilities for patients. This comprehensive review explores innovative therapeutic approaches, surgical techniques, and medication delivery systems that are transforming the management of glaucoma.',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08',
    
  }
];

const mediaItems: MediaItem[] = [
  {
    id: '1',
    type: 'photo',
    url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08',
    additionalCount: 5
  },
  {
    id: '2',
    type: 'photo',
    url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08',
    additionalCount: 5
  },
  {
    id: '3',
    type: 'photo',
    url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08',
    additionalCount: 5
  },
  {
    id: '4',
    type: 'photo',
    url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08',
    additionalCount: 5
  },
  {
    id: '5',
    type: 'photo',
    url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08'
  },
  {
    id: '6',
    type: 'photo',
    url: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08'
  }
];

const jobs: Job[] = [
  {
    id: 1,
    department: "Senior Ophthalmologist",
    
    name: "City Eye Hospital",
    location: "Mumbai, India",
    amount:'$22,000-44,000',
    date: "Posted 2 days ago",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
  },
  {
    id: 2,
    department: "Eye Surgeon",

    name: "Apollo Hospitals",
    location: "Delhi, India",
    amount:'$22,000-44,000',

    date: "Posted 3 days ago",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
  }
];

const mentionedPosts: MentionedPost[] = [
  {
    id: '1',
    userImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
    userName: "Nampally Sriram",
    userTitle: "Ophthalmologist | AIIMS Delhi'25 | Aspiring Medical Professional",
    timeAgo: "3 days ago",
    title: "Ophthalmology: The Future of Eye Care",
    content: "Ophthalmology has seen incredible advancements in recent years, particularly in surgical techniques and diagnostic tools. Ophthalmology has seen incredible advancements in recent years, particularly in surgical techniques and diagnostic tools.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    ],
    likes: 120,
    comments: 70,
    shares: 37,
    reposts: 51
  },
  {
    id: '2',
    userImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
    userName: "Nampally Sriram",
    userTitle: "Ophthalmologist | AIIMS Delhi'25 | Aspiring Medical Professional",
    timeAgo: "3 days ago",
    title: "Ophthalmology: The Future of Eye Care",
    content: "Ophthalmology has seen incredible advancements in recent years, particularly in surgical techniques and diagnostic tools. Ophthalmology has seen incredible advancements in recent years, particularly in surgical techniques and diagnostic tools.",
    images: [
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    ],
    likes: 120,
    comments: 70,
    shares: 37,
    reposts: 51
  }
];

const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Sample saved data
  const savedPosts: Post[] = [
    {
      id: 1,
      content: "Just completed a successful cataract surgery using the latest minimally invasive technique. The patient's vision improved significantly...",
      likes: 45,
      comments: 12,
      userTitle:'Opthomology the future of eye care',
      shares :12,
      reposts:12,
      time: "2 hours ago",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      userImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      userName: "Seelam Vamshidhar Goud",
      postImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c"
    },
    {
      id: 2,
      content: "Excited to share my research findings on advanced IOL technologies at the upcoming ophthalmology conference...",
      likes: 32,
      comments: 8,
      userTitle:'Opthomology the future of eye care',
      shares :12,
      reposts:12,
      time: "5 hours ago",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      userImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      userName: "Seelam Vamshidhar Goud",
      postImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c"
    }
  ];

  const savedQuestions: Question[] = [
    {
      id: '1',
      title: "Latest advancements in cataract surgery techniques?",
      content: "I'm interested in learning about the newest developments in cataract surgery. What are the most promising techniques being used or researched currently?",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      answers: 12,
      shares: 8,
      author: {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
        name: "Dr. Seelam Vamshidhar",
        title: "Ophthalmologist | AIIMS Delhi"
      },
      timeAgo: "2 days ago"
    },
    {
      id: '2',
      title: "Best practices for post-LASIK care?",
      content: "Looking for recommendations on post-LASIK patient care protocols. What has been your experience with different approaches?",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      answers: 8,
      shares: 5,
      author: {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
        name: "Dr. Seelam Vamshidhar",
        title: "Ophthalmologist | AIIMS Delhi"
      },
      timeAgo: "2 days ago"
    }
  ];

  const savedResources: Resource[] = [
    {
      id: '1',
      type: 'Article',
      title: 'The Future of AI in Ophthalmology',
      description: 'Artificial intelligence (AI) is revolutionizing various fields of medicine, and ophthalmology is no exception. With the rapid advancement of machine learning, deep learning, and computer vision, AI is enhancing diagnostic accuracy, streamlining workflows, and improving patient outcomes. The integration of AI into ophthalmology is set to redefine the way eye diseases are detected, monitored, and treated.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08',
      
    },
    {
      id: '2',
      type: 'Research',
      title: 'Latest Advances in Glaucoma Treatment',
      description: 'Recent developments in glaucoma treatment have opened new possibilities for patients. This comprehensive review explores innovative therapeutic approaches, surgical techniques, and medication delivery systems that are transforming the management of glaucoma.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08',
      
    }
  ];

  const savedJobs: Job[] = [
    {
      id: 1,
      department: "Senior Ophthalmologist",
      
      name: "City Eye Hospital",
      location: "Mumbai, India",
      amount:'$22,000-44,000',
      date: "Posted 2 days ago",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    },
    {
      id: 2,
      department: "Eye Surgeon",
  
      name: "Apollo Hospitals",
      location: "Delhi, India",
      amount:'$22,000-44,000',
  
      date: "Posted 3 days ago",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    }
  ];

  const savedConferences: Conference[] = [
    {
      id: '1',
      title: "International Ophthalmology Conference 2022",
      date: "June 15-17, 2022",
      avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      location: "New York, USA",
      speaker: "Dr. Seelam Vamshidhar",
      speciality: "Ophthalmology",
      price: "$299",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    },
    {
      id: '2',
      title: "World Retina Congress 2022",
      date: "July 20-22, 2022",
      avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      location: "Paris, France",
      speaker: "Dr. Seelam Vamshidhar",
      speciality: "Retina",
      price: "$399",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
    }
  ];


  const ActivitySection = () => (
    <div className="space-y-8">
      {/* Posts Section */}
      <div className="mb-8">
        <div className="flex  justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Posts</h2>
          <button>
            <img src={more1} alt="" className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 overflow-scroll gap-4">
          {posts.map((post) => (
            <PostCard 
              key={post.id}
              userImage={post.userImage}
              userName={post.userName}
              userTitle={post.userTitle}
              timeAgo={post.time}
              content={post.content}
              images={post.images}
              likes={post.likes}
              comments={post.comments}
              shares={post.shares}
              reposts={post.reposts}
            />
          ))}
                 </div>
                 <div className='flex justify-end'>

                   <button 
                  onClick={() => setShowAllPosts(!showAllPosts)}
                  className="text-fillc text-sm font-medium flex  items-center gap-1"
                  >
                  {showAllPosts ? "Show Less" : "See all Posts"} 
                  <img src={arrowright} alt="" className={`transform ${showAllPosts ? 'rotate-180' : ''} w-4 h-4`} />
                   </button>
                  </div>
      </div>
  
      {/* Questions Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Questions</h2>
          <button>
            <img src={more1} alt="" className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              userImage={question.author.image}
              userName={question.author.name}
              userTitle={question.author.title}
              timeAgo={question.timeAgo}
              questionTitle={question.title}
              questionContent={question.content}
              images={question.images}
              answers={question.answers}
              shares={question.shares}
            />
          ))}
        </div>
        <div className='flex justify-end'>

        <button 
            onClick={() => setShowAllQuestions(!showAllQuestions)}
            className="text-fillc text-sm font-medium flex items-center gap-1"
            >
            {showAllQuestions ? "Show Less" : "See all Questions"}
            <img src={arrowright} alt="" className={`transform ${showAllQuestions ? 'rotate-180' : ''} w-4 h-4`} />
          </button>
            </div>
      </div>
  
      {/* Resources Section */}
      <div className="mb-8 pb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Resources</h2>
          <button>
            <img src={more1} alt="" className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} {...resource} />
          ))}
        </div>
        <div className='flex justify-end'>
        <button 
             onClick={() => setShowAllResources(!showAllResources)}
             className="text-fillc text-sm font-medium flex items-center gap-1"
           >
             {showAllResources ? "Show Less" : "See all Resources"}
             <img src={arrowright} alt="" className={`transform ${showAllResources ? 'rotate-180' : ''} w-4 h-4`} />
           </button>
          
        </div>

      </div>
    </div>
  );
  


  return (
    <div className="min-h-screen font-fontsm mx-auto ">
      {/* Mobile Header - Only visible on mobile */}
      <div className="lg:hidden flex items-center justify-between p-4  bg-white ">
        <div className="flex items-center gap-3">
          <img src={backbutton} alt="" className="w-5" />
          <span className="text-xl font-medium text-maincl ">Profile</span>
        </div>
        <div className="flex items-center gap-4">
         <img src={pmessage} alt="" />
          <button className="w-8 h-8">
            <img src={more1} alt="Profile" className="w-full h-full rounded-full" />
          </button>
        </div>
      </div>

      {/* Desktop Header - Only visible on desktop */}
      <div className="hidden lg:block bg-white border-b sticky top-0 z-50">
      <Header
        onNotification={() => console.log("Notification clicked")}
        onMessage={() => console.log("Message clicked")}
        onProfile={() => console.log("Profile clicked")}
        onSearch={() => console.log("Profile clicked")}

      />
        
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4   lg:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Profile Info */}
          <div className="lg:col-span-3 py-2  ">
            <div className="bg-white   ">
              <div className="flex flex-col  items-center text-center">
                  <div className='lg:border p-3 lg:py-8 shadow-sm rounded-xl border-gray-200'>
                <div className='flex lg:flex-col  items-center' >

                <div className="relative ">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c"
                    alt="Profile"
                    className=" w-28 lg:w-20  rounded-full object-cover"
                    />
                  <div className="absolute bottom-0 right-0  w-6 h-6 flex items-center justify-center text-xs">
                  <img src={add} alt="" />
                  </div>
                </div>
                <div>

                <h1 className="text-lg font-medium text-gray-700   mt-4">Seelam Vamshidhar Goud</h1>
                <p className="text-gray-600 text-sm mt-1 lg:mx-2 px-4 ">Ophthalmologist | AIIMS Delhi |Aspiring Medical Professional</p>
                <p className="text-gray-500 text-sm mt-4 flex items-center justify-center gap-1">
                  <img src={location} alt="" className='w-4' />
                  Mumbai, Maharashtra, India
                </p>
                </div>
                    </div>

                  



                  <div className='hidden lg:block'>
                    <div className='p-3 px-4 '>
                      {/* recent positions */}
                      <div className="flex flex-col items-center gap-2 mt-6 border-b pb-1">
                        
                       
                      {workplaces.map((work) => (
                            <div key={work.id} className="flex items-center gap-3 mb-2">
                              <img src={work.img} alt={work.organization} className="w-6 h-6 rounded-full" />
                              <p className="text-xs text-left">{work.organization}</p>
                            </div>
                          ))}
                       </div>

                    </div>

                <div className="flex justify-between  mt-6 mx-3">
                  <div className="text-center">
                    <div className="font-semibold text-sm text-fillc">546</div>
                    <div className="text-sm text-gray-700">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm text-fillc">478</div>
                    <div className="text-sm text-gray-700">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm text-fillc">5</div>
                    <div className="text-sm text-gray-700">Questions</div>
                  </div>
                </div>
                  </div>

                <div className="flex gap-4 mt-6 w-full text-sm font-normal">
                  <button className="flex-1 px-3 py-1 bg-maincl text-white rounded-3xl hover:bg-fillc">
                    Edit Profile
                  </button>
                  <button className="flex px-3 py-1 border rounded-3xl hover:bg-gray-50">
                    <img src={add2} alt="" />
                    Be Mentor
                  </button>
                </div>

                <div className="w-full lg:hidden sm:block max-w-4xl mx-auto relative mt-4 h-[180px] overflow-hidden ">
                    {/* First Custom Section */}
                    <div
                      className={`absolute border rounded-lg   p-4 w-full h-full transform transition-transform duration-700 ease-in-out ${
                        activeIndex === 0 
                          ? 'translate-x-0' 
                          : '-translate-x-full'
                      }`}
                    >
                      <div className=''> 
                     <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold">About</h2>
                      <button className="text-gray-500">
                        <img src={edit} alt="edit" className="w-5 h-5" />
                      </button>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 ">
                        Aspiring ophthalmologist with a keen interest in surgical techniques and patient care.  Currently pursuing MBBS at AIIMS Delhi with a focus on ophthalmology.  Passionate about leveraging technology in healthcare and contributing to medical research.
                      </p>
                    </div>

                      </div>
                    </div>

                    {/* Second Custom Section */}
                    <div
                      className={`absolute w-full h-full transform transition-transform duration-700 ease-in-out ${
                        activeIndex === 1 
                          ? 'translate-x-0' 
                          : activeIndex < 1 
                            ? 'translate-x-full' 
                            : '-translate-x-full'
                      }`}
                    >
                     <div className="w-full  h-[200px] border border-gray-200 p-4 rounded-lg">
                          
                          <div className="flex   justify-between items-start mb-4">
                            <div className='mr-4'>
                            <h2 className="text-sm flex items-start font-medium text-gray-800">Profile Completion</h2>
                            <div className="space-y-1 grid grid-cols-2 ">
                            <button className=" flex  items-center  bg-gray-50 rounded-full py-2 px-2">
                              <span className="text-xs text-gray-700">Education</span>
                              <span className="text-sm">+</span>
                            </button>
                            <button className=" flex items-center justify-between bg-gray-50 rounded-full py-2 px-4">
                              <span className="text-xs text-gray-700">Experience</span>
                              <span className="text-sm">+</span>
                            </button>
                            <button className=" flex items-center justify-between bg-gray-50 rounded-full py-2 px-4">
                              <span className="text-xs text-gray-700">Skills</span>
                              <span className="text-sm">+</span>
                            </button>
                            <button className=" flex items-center justify-between bg-gray-50 rounded-full py-2 px-4">
                              <span className="text-xs text-gray-700">Awards</span>
                              <span className="text-sm">+</span>
                            </button>
                          </div>
                          </div> 
                            <div className="relative mt-4">
                              <div className="w-14 h-14 rounded-full border-2 border-gray-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-maincl">75%</span>
                              </div>
                              <svg className="absolute top-0 left-0 w-14 h-14 -rotate-90">
                                <circle
                                  cx="28"
                                  cy="28"
                                  r="26"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                  className="text-maincl"
                                  strokeDasharray="163.36"
                                  strokeDashoffset="40.84"
                                />
                              </svg>
                            </div>
                          </div>
                          
                        </div>
                      
                    </div>

                    {/* Third Custom Section */}
                    <div
                      className={`absolute  w-full h-full transform transition-transform duration-700 ease-in-out ${
                        activeIndex === 2 
                          ? 'translate-x-0' 
                          : activeIndex < 2 
                            ? 'translate-x-full' 
                            : '-translate-x-full'
                      }`}
                    > 
                     <div className='p-4 border h-[200px] border-gray-200 rounded-lg'>
                      {/* recent positions */}
                      <div className="flex flex-col items-center gap-2 pt-2 border-b last:border-none  pb-">
                        <div className='flex items-center justify-between w-full'>
                          <p className='text-sm' >Recent positions</p>
                          <img src={edit} alt="" />
                        </div>
                       
                      {workplaces.map((work) => (
                            <div key={work.id} className="flex justify-start items-center  gap-3 mb-2">
                              <img src={work.img} alt={work.organization} className="w-8 h-8 rounded-full" />
                              <p className="text-sm text-left">{work.organization}</p>
                            </div>
                          ))}
                       </div>

                    </div>
                      
                    </div>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {[0, 1, 2].map((index) => (
                        <button
                          key={index}
                          onClick={() => setActiveIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            index === activeIndex ? 'bg-maincl' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>            



                </div>



























                 
















                {/* Profile Completion */}
                <div className="w-full mt-6 hidden lg:block border border-gray-200 p-4 rounded-lg">
                  
                  <div className="flex   justify-between items-start mb-4">
                    <div className='mr-4'>
                    <h2 className="text-sm flex items-start font-medium text-gray-800">Profile Completion</h2>
                    <div className="space-y-1 grid grid-cols-2 ">
                    <button className=" flex  items-center  bg-gray-50 rounded-full py-2 px-2">
                      <span className="text-xs text-gray-700">Education</span>
                      <span className="text-sm">+</span>
                    </button>
                    <button className=" flex items-center justify-between bg-gray-50 rounded-full py-2 px-4">
                      <span className="text-xs text-gray-700">Experience</span>
                      <span className="text-sm">+</span>
                    </button>
                    <button className=" flex items-center justify-between bg-gray-50 rounded-full py-2 px-4">
                      <span className="text-xs text-gray-700">Skills</span>
                      <span className="text-sm">+</span>
                    </button>
                    <button className=" flex items-center justify-between bg-gray-50 rounded-full py-2 px-4">
                      <span className="text-xs text-gray-700">Awards</span>
                      <span className="text-sm">+</span>
                    </button>
                  </div>
                  </div> 
                    <div className="relative mt-4">
                      <div className="w-14 h-14 rounded-full border-2 border-gray-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-maincl">75%</span>
                      </div>
                      <svg className="absolute top-0 left-0 w-14 h-14 -rotate-90">
                        <circle
                          cx="28"
                          cy="28"
                          r="26"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          className="text-maincl"
                          strokeDasharray="163.36"
                          strokeDashoffset="40.84"
                        />
                      </svg>
                    </div>
                  </div>
                  
                </div>

                {/* Profile Link */}
                <div className="mt-6 w-full text-left border border-gray-200 p-4 rounded-lg hidden lg:block">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaLink className="text-gray-400" />
                    Profile Link
                  </p>
                  <p className="text-xs text-gray-600 mt-1 cursor-pointer">profile.seelam.vamshidhar.goud</p>
                </div>

                
              </div>
            </div>
          </div>




          {/* Right Content Area */}
          <div className="lg:col-span-9">
            {/* Mobile Tabs - Only visible on mobile */}
            <div className="lg:hidden border-b bg-white mb-4">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-4 py-3 text-sm whitespace-nowrap ${
                      activeTab === tab.toLowerCase()
                        ? 'border-b-2 border-blue-500 text-blue-500'
                        : 'text-gray-500'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm lg:hidden">
                {/* Show ActivitySection for both mobile and desktop when activity tab is active */}
                {(activeTab === 'activity' || (!isMobile && activeDesktopTab === 'activity')) && (
                  <ActivitySection />
                )}
                
              </div>
            <div className="bg-white rounded-lg shadow-sm lg:hidden">
                {/* Show ActivitySection for both mobile and desktop when activity tab is active */}
                {(activeTab === 'events' || (!isMobile && activeDesktopTab === 'events')) && (
                  <EventCalendar />
                )}
                
              </div>
            <div className="bg-white rounded-lg shadow-sm lg:hidden">
                {/* Show ActivitySection for both mobile and desktop when activity tab is active */}
                {(activeTab === 'saved' || (!isMobile && activeDesktopTab === 'saved')) && (


                          
                            <div className="space-y-8">
                              {/* Saved Posts Section */}
                              <div className="space-y-4">
                                <h2 className="text-xl font-medium">Saved Posts</h2>
                                {savedPosts.length > 0 ? (
                                  <div className="grid grid-cols-1 gap-1 transition-all duration-300">
                                  {savedPosts.map((post) => (
                                    <PostCard
                                      key={post.id}
                                      userTitle={post.userTitle}
                                      userImage={post.userImage}
                                      userName={post.userName}
                                      timeAgo={post.time}
                                      content={post.content}
                                      likes={post.likes}
                                      reposts={post.reposts}
                                      comments={post.comments}
                                      images={post.images}
                                      shares={post.shares}
                                    />
                                  ))}
                                  <div className='flex justify-end'>
                                  <button 
                                    onClick={() => setShowAllPosts(!showAllPosts)}
                                    className="text-fillc text-sm font-medium flex items-center gap-1"
                                  >
                                    {showAllPosts ? "Show Less" : "See all Posts"} 
                                    <img src={arrowright} alt="" className={`transform ${showAllPosts ? 'rotate-180' : ''} w-4 h-4`} />
                                  </button>
                                  </div>
                                  
                                </div>
                                
                                ) : (
                                  <div className="text-center text-gray-500 py-4">
                                    No saved posts yet
                                  </div>
                                )}
                              </div>

                              {/* Saved Questions Section */}
                              <div className="space-y-4">
                                <h2 className="text-xl font-medium">Saved Questions</h2>
                                {savedQuestions.length > 0 ? (
                                  <div className="grid grid-cols-1 gap-4 transition-all duration-300">
                                  {savedQuestions.map((question) => (
                                    <QuestionCard
                                      key={question.id}
                                      userImage={question.author.image}
                                      userName={question.author.name}
                                      userTitle={question.author.title}
                                      timeAgo={question.timeAgo}
                                      questionTitle={question.title}
                                      questionContent={question.content}
                                      images={question.images}
                                      answers={question.answers}
                                      shares={question.shares}
                                    />
                                  ))}
                                    <div className='flex justify-end'>
                                    <button 
                                    onClick={() => setShowAllQuestions(!showAllQuestions)}
                                    className="text-fillc text-sm font-medium flex items-center gap-1"
                                  >
                                    {showAllQuestions ? "Show Less" : "See all Questions"}
                                    <img src={arrowright} alt="" className={`transform ${showAllQuestions ? 'rotate-180' : ''} w-4 h-4`} />
                                  </button>
                                    </div>

                                  </div>
                                ) : (
                                  <div className="text-center text-gray-500 py-4">
                                    No saved questions yet
                                  </div>
                                )}
                              </div>

                              {/* Saved Resources Section */}
                              <div className="space-y-4">
                                <h2 className="text-xl font-medium">Saved Resources</h2>
                                {savedResources.length > 0 ? (
                                  <div className="grid grid-cols-1 gap-8 p-2">
                                  {savedResources.map((resource) => (
                                    <ResourceCard
                                      key={resource.id}
                                      type={resource.type}
                                      title={resource.title}
                                      description={resource.description}
                                      image={resource.image}
                                    />
                                  ))}
                                  <div className='flex justify-end'>
                                  <button 
                                  onClick={() => setShowAllResources(!showAllResources)}
                                  className="text-fillc text-sm font-medium flex items-center gap-1"
                                >
                                  {showAllResources ? "Show Less" : "See all Resources"}
                                  <img src={arrowright} alt="" className={`transform ${showAllResources ? 'rotate-180' : ''} w-4 h-4`} />
                                </button>
                                  </div>
                                  </div>
                                ) : (
                                  <div className="text-center text-gray-500 py-4">
                                    No saved resources yet
                                  </div>
                                )}
                              </div>

                              {/* Saved Jobs Section */}
                              <div className="space-y-4">
                                <h2 className="text-xl font-medium">Saved Jobs</h2>
                                {savedJobs.length > 0 ? (
                                  <div className="grid grid-cols-1 gap-4">
                                  {savedJobs.map((job) => (
                                    <JobsCard
                                      key={job.id}
                                      job={{
                                        ...job,
                                        startingDate: "",  
                                        applyBy: "",
                                        numberOfApplicants: 0
                                      }}
                                    />
                                  )) }
                                  </div>
                                ) : (
                                  <div className="text-center text-gray-500 py-4">
                                    No saved jobs yet
                                  </div>
                                )}
                              </div>

                              {/* Saved Conferences Section */}
                              <div className="space-y-4">
                                <h2 className="text-xl font-medium">Saved Conferences</h2>
                                {savedConferences.length > 0 ? (
                                  <div className="grid grid-cols-1 gap-4">
                                  {savedConferences.map((conference) => (
                                    <ConferenceCard
                                      key={conference.id}
                                      title={conference.title}
                                      date={conference.date}
                                      speaker={conference.speaker}
                                      price={conference.price}
                                      location={conference.location}
                                      speciality={conference.speciality}
                                      image={conference.image}
                                      avatar={conference.avatar}
                                      id={conference.id}
                                    
                                    />
                                  ))}
                                  </div>
                                ) : (
                                  <div className="text-center text-gray-500 py-4">
                                    No saved conferences yet
                                  </div>
                                )}
                                </div>
                            </div>
                          )}


             
                
              </div>




            <div className="bg-white rounded-lg shadow-sm">
              {/* Post Input */}
              <div className="p-4 border border-gray-100 rounded-xl hidden lg:block">
                <div className="flex items-center gap-3">
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c" alt="" className="w-10 h-10 rounded-full" />
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    className="flex-1  px-4 py-2"
                  />
                  <button className="px-4 py-1.5 flex items-center text-sm text-nowrap bg-maincl text-white rounded-3xl">
                    <img src={add} alt="" className='w-5 ' />
                    Add Post
                  </button>
                </div>
              </div>

              {/* Content Sections */}
              <div className="divide-">
                {/* About Section - Only visible when About tab is active on mobile */}
                <div className={`${activeTab === 'about' || activeTab === 'About' ? 'block' : 'hidden lg:block'}`}>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-medium">About</h2>
                      <button className="text-gray-500">
                        <img src={edit} alt="" />
                      </button>
                    </div>
                    <p className="text-gray-600">{aboutText}</p>
                  </div>
                </div>

                {/* Experience Section */}
                <div className={`p-6 border border-gray-100 rounded-xl my-3 group relative ${activeTab === 'about' || activeTab === 'About' ? 'block' : 'hidden lg:block'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <div className='flex gap-4'>
                      <h2 className="text-xl font-medium">Experience</h2>
                      <button className="text-gray-500">
                        <img src={edit} alt="" />
                      </button>
                      <button className="flex items-center space-x-1 bg-maincl text-white px-2 py-2 rounded-full hover:bg-fillc text-sm">
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    {experiences.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600 text-sm">
                          Adding your work experience will highlight your professional journey and showcase your skills, making your profile more compelling and complete!
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Desktop View */}
                        <div className="hidden lg:block relative">
                          {experiences.length > 3 && (
                            <>
                              <button 
                                className="absolute left-0 top-1/3 z-50 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                                onClick={() => {
                                  const container = document.getElementById('experience-scroll');
                                  if (container) container.scrollLeft -= 300;
                                }}
                              >
                                <img src={arrowright} alt="Previous" className="w-4 h-4 transform rotate-180" />
                              </button>

                              <button 
                                className="absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                                onClick={() => {
                                  const container = document.getElementById('experience-scroll');
                                  if (container) container.scrollLeft += 300;
                                }}
                              >
                                <img src={arrowright} alt="Next" className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          
                          <ol id="experience-scroll" className="flex overflow-x-auto scrollbar-hide scroll-smooth">
                            {experiences.map((exp, index) => (
                              <li key={index} className="relative flex-none w-72 mb-6 mr-8 last:mr-0">
                                <div className="flex items-center">
                                  <div className="z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full ring-0 ring-white sm:ring-8 shrink-0 overflow-hidden">
                                    <img 
                                      src={exp.img} 
                                      alt={`${exp.company} logo`}
                                      className="w-12 h-12 object-cover rounded-full"
                                    />
                                  </div>
                                  {index < experiences.length - 1 && (
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
                                  )}
                                </div>
                                <div className="mt-3 sm:pe-8">
                                  <h3 className="text-sm font-normal text-gray-900 line-clamp-1">{exp.title}</h3>
                                  <p className="text-xs font-light text-gray-600 line-clamp-1">{exp.company}</p>
                                  <time className="block mb-2 text-xs font-normal text-gray-500">{exp.date}</time>
                                  {exp.description && (
                                    <p className="text-sm font-normal text-gray-500 line-clamp-2">{exp.description}</p>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Mobile View */}
                        <div className="lg:hidden flex flex-col space-y-8">
                          {experiences.slice(0, expanded ? experiences.length : 3).map((exp, index) => (
                            <div key={index} className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <img 
                                  src={exp.img} 
                                  alt={`${exp.company} logo`}
                                  className="w-12 h-12 object-cover rounded-full"
                                />
                              </div>
                              <div>
                                <h3 className="text-sm font-normal text-gray-900">{exp.title}</h3>
                                <p className="text-xs font-light text-gray-600">{exp.company}</p>
                                <time className="block text-xs font-normal text-gray-500">{exp.date}</time>
                                {exp.description && (
                                  <p className="text-sm font-normal text-gray-500 mt-1">{exp.description}</p>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {/* Show "See all" button only on mobile if more than 3 experiences */}
                          {experiences.length > 3 && (
                            <button
                              onClick={() => setExpanded(!expanded)}
                              className="text-fillc text-sm font-medium flex items-center gap-1"
                            >
                              {expanded ? "Show Less" : "See all Experience"} 
                              <img src={arrowright} alt="" className={`transform ${expanded ? 'rotate-180' : ''} w-4 h-4`} />
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>


                  {/* Education Section */}
                  <div className={`p-6 border border-gray-100 rounded-xl overflow-hidden my-5 group relative ${activeTab === 'about' || activeTab === 'About' ? 'block' : 'hidden lg:block'}`}>
                    <div className="flex gap-4 items-center mb-6">
                      <h2 className="text-xl font-medium">Education</h2>
                      <button className="text-gray-500">
                        <img src={edit} alt="" />
                      </button>
                      <button className="flex items-center space-x-1 bg-maincl text-white px-2 py-2 rounded-full hover:bg-fillc text-sm">
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="relative">
                      {educationData.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-600 text-sm">
                            Adding your educational background will help demonstrate your qualifications and expertise, making your profile more well-rounded and informative!
                          </p>
                        </div>
                      ) : (
                        <>
                          {/* Desktop View */}
                          <div className="hidden lg:block">
                            {/* Left scroll button - Only show if more than 3 items */}
                            {educationData.length > 3 && (
                              <button 
                                className="absolute left-0 top-1/3 z-50 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                                onClick={() => {
                                  const container = document.getElementById('education-scroll');
                                  if (container) container.scrollLeft -= 300;
                                }}
                              >
                                <img src={arrowright} alt="Previous" className="w-4 h-4 transform rotate-180" />
                              </button>
                            )}

                            {/* Right scroll button - Only show if more than 3 items */}
                            {educationData.length > 3 && (
                              <button 
                                className="absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                                onClick={() => {
                                  const container = document.getElementById('education-scroll');
                                  if (container) container.scrollLeft += 300;
                                }}
                              >
                                <img src={arrowright} alt="Next" className="w-4 h-4" />
                              </button>
                            )}

                            <ol id="education-scroll" className="flex overflow-x-auto scrollbar-hide scroll-smooth">
                              {educationData.map((edu, index) => (
                                <li key={index} className="relative flex-none w-72 mb-6   mr-8 last:mr-0">
                                  <div className="flex items-center">
                                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full ring-0 ring-white sm:ring-8 shrink-0 overflow-hidden border-2 border-gray-100">
                                      <img src={edu.logo} alt={`${edu.institution} logo`} className="w-12 h-12 object-cover" />
                                    </div>
                                    {index < educationData.length - 1 && (
                                      <div className="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
                                    )}
                                  </div>
                                  <div className="mt-3  sm:pe-8">
                                    <h3 className="text-sm w-72 overflow-hidden text-ellipsis whitespace-wrap font-normal text-gray-900">{edu.institution}</h3>
                                    <p className="text-xs font-light text-gray-600">{edu.degree}</p>
                                    <time className="block mb-2 text-xs font-normal text-gray-500">{edu.year}</time>
                                  </div>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Mobile View */}
                          <div className="lg:hidden flex flex-col space-y-8">
                            {educationData.slice(0, expanded ? educationData.length : 3).map((edu, index) => (
                              <div key={index} className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                  <img src={edu.logo} alt={`${edu.institution} logo`} className="w-12 h-12 rounded-full border-2 border-gray-100" />
                                </div>
                                <div>
                                  <h3 className="text-sm font-normal text-gray-900">{edu.institution}</h3>
                                  <p className="text-xs font-light text-gray-600">{edu.degree}</p>
                                  <time className="block text-xs font-normal text-gray-500">{edu.year}</time>
                                </div>
                              </div>
                            ))}
                            
                            {/* Show "See all" button only on mobile if more than 3 items */}
                            {educationData.length > 3 && (
                              <button
                                onClick={() => setExpanded(!expanded)}
                                className="text-fillc text-sm font-medium flex items-center gap-1 lg:hidden"
                              >
                                {expanded ? "Show Less" : "See all Education"} 
                                <img src={arrowright} alt="" className={`transform ${expanded ? 'rotate-180' : ''} w-4 h-4`} />
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>


                  <div className={`flex flex-col lg:flex-row gap-6 ${activeTab === 'about' || activeTab === 'About' ? 'block' : 'hidden lg:block'}`}>

                    {/* Areas of Interest Card */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-between bg-white shadow-md rounded-xl p-6">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-medium">Areas of Interest</h2>
                          <div className='flex gap-4'>
                            <button className="text-gray-500 hover:text-blue-500">
                              <img src={edit} alt="" />
                            </button>
                            <button
                              className="flex items-center space-x-1 bg-maincl text-white px-1 py-1 rounded-full hover:bg-fillc text-sm"
                            >
                              <FaPlus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Interest List */}
                        {interestData.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-gray-600 text-sm">
                              Adding your areas of interest will help showcase your passions and strengths, making your profile more personalized and impactful!
                            </p>
                          </div>
                        ) : (
                          <ul className="space-y-3">
                            {interestData.slice(0, interestsexpanded ? interestData.length : 4).map((interest, index) => (
                              <li key={index} className="border-b py-2 last:border-none">
                                <p className="text-sm text-gray-600">{interest.name}</p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Footer Link - Only show if there are more than 4 interests */}
                      {interestData.length > 4 && (
                        <button
                          onClick={() => setInterestsExpanded(!interestsexpanded)}
                          className="mt-4 text-blue-600 text-sm font-medium cursor-pointer flex items-center gap-1"
                        >
                          {interestsexpanded ? "Show Less" : "See all Areas of Interest"} →
                        </button>
                      )}
                    </div>

                    {/* Licenses and Certification Card */}
                    <div className={`w-full lg:w-1/2 bg-white shadow-md rounded-xl p-6 ${activeTab === 'about' || activeTab === 'About' ? 'block' : 'hidden lg:block'}`}>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Licenses and Certification</h2>
                        <div className='flex gap-4'>
                          <button className="text-gray-500 hover:text-blue-500">
                            <img src={edit} alt="" />
                          </button>
                          <button
                            className="flex items-center space-x-1 bg-maincl text-white px-1 py-1 rounded-full hover:bg-fillc text-sm"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Certification List */}
                      {certificationData.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-600 text-sm">
                            Including your licenses and certifications highlights your expertise and qualifications, boosting your profile's credibility and professionalism.
                          </p>
                        </div>
                      ) : (
                        <>
                          <ul className="space-y-4">
                            {certificationData.slice(0, showAllCertifications ? certificationData.length : 2).map((cert, index) => (
                              <li key={index} className="border-b pb-2 last:border-none">
                                <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 bg-gray-200 rounded-full">
                                    <img src={cert.logo} alt={cert.title} className="w-full h-full rounded-full" />
                                  </div>
                                  <div>
                                    <p className="font-normal text-sm line-clamp-1">{cert.title}</p>
                                    <p className="text-sm text-gray-400 line-clamp-1">{cert.organization}</p>
                                    <p className="text-xs text-gray-700">Issued: {cert.issueDate}</p>
                                    <button className="mt-2 px-2 py-1 border text-xs rounded-3xl text-maincl border-gray-200 hover:bg-blue-50">
                                      Show Credential
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>

                          {/* Footer Link - Only show if there are more than 2 certifications */}
                          {certificationData.length > 2 && (
                            <button
                              onClick={() => setShowAllCertifications(!showAllCertifications)}
                              className="mt-4 text-blue-600 text-sm font-medium cursor-pointer flex items-center gap-1"
                            >
                              {showAllCertifications ? "Show Less" : "See all Licenses and Certification"} →
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>



                {/* Memberships */}
                <div className={`bg-white shadow-md rounded-xl py-8 lg:px-6 px-4 my-4 ${activeTab === 'memberships' || activeTab === 'Memberships' ? 'block' : 'hidden lg:block'}`}>
                   
                  <div className="flex justify-between items-center mb-6">
                  <div className='flex gap-4'>
                    <h2 className="text-lg font-medium">Memberships</h2>
                    <button className="text-gray-500 hover:text-blue-500">
                    <img src={edit} alt="" />
                    </button>
                    <button className="flex items-center space-x-1 bg-maincl text-white px-2 py-1 rounded-full hover:bg-fillc text-sm">
                    <FaPlus className="w-3 h-3" />
                    </button>
                  </div>

                
                  </div>

                  {/* Membership List */}
                  {memberships.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 text-sm">
                    Adding your memberships will showcase your professional affiliations and involvement, helping to strengthen your profile and credibility!
                    </p>
                  </div>
                  ) : (
                  <div className="relative group">
                    {/* Scroll buttons - Only show on desktop */}
                    {!isMobile && memberships.length > 4 && (
                    <>
                      <button 
                      className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        const container = document.getElementById('memberships-scroll');
                        if (container) {
                        container.scrollLeft -= 200;
                        }
                      }}
                      >
                      <img src={arrowright} alt="Previous" className="w-4 h-4 transform rotate-180" />
                      </button>

                      <button 
                      className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        const container = document.getElementById('memberships-scroll');
                        if (container) {
                        container.scrollLeft += 200;
                        }
                      }}
                      >
                      <img src={arrowright} alt="Next" className="w-4 h-4" />
                      </button>
                    </>
                    )}

                    {/* Content container with different layouts for mobile and desktop */}
                    <div
                    id="memberships-scroll"
                    className={`${isMobile ? 'flex flex-col space-y-4' : 'overflow-x-auto scrollbar-hide scroll-smooth'}`}
                    >
                    <div className={`${isMobile ? 'space-y-4' : 'flex gap-6'}`}>
                      {memberships.map((membership) => (
                      <div 
                        key={membership.id} 
                        className={`flex items-center gap-3 ${!isMobile && 'min-w-[200px]'}`}
                      >
                        <img
                        src={membership.image}
                        alt={membership.name}
                        className="w-10 h-10 rounded-full"
                        />
                        <div>
                        <p className="font text-xs">{membership.name}</p>
                        <p className="text-fontlit text-gray-500">{membership.category}</p>
                        </div>
                      </div>
                      ))}
                    </div>
                    </div>

                    
                  </div>
                  )}
                </div>
                    

                    {/* Awards and Achievements */}
                    <div className={`bg-white shadow-md rounded-xl p-6 ${activeTab === 'about' || activeTab === 'About' ? 'block' : 'hidden lg:block'}`}>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium">Awards and Achievements</h2>
                      <div className='flex gap-4'>

                      <button className="text-gray-400 hover:text-gray-600">
                      <img src={edit} alt="" /> {/* Edit Icon */}
                      </button>
                      <button
                      className="flex items-center space-x-1 bg-maincl text-white px-1 py-1 rounded-full hover:bg-fillc text-sm"
                      >
                       <FaPlus className="w-3 h-3" />
                     </button>
                      </div>
                    </div>

                    {/* Awards List */}
                    <div>
                      {awards.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600 text-sm">
                        Adding your awards and achievements highlights your accomplishments and sets you apart, making your profile more impressive and memorable.
                        </p>
                      </div>
                      ) : (
                      <>
                        {awards.slice(0, expanded ? awards.length : 2).map((award) => (
                        <div key={award.id} className="border-b pb-4 mb-4 last:border-none">
                          <h3 className="text-sm font-medium">{award.title}</h3>
                          <p className="text-gray-600 font-light text-sm">
                          {award.organization} ({award.year})
                          </p>
                          <p className="text-gray-700 text-normal text-sm">{award.description}</p>
                          {award.credentialLink && (
                          <a
                            href={award.credentialLink}
                            className="mt-2 inline-block text-maincl border border-gray-200 rounded-3xl px-3 py-1 text-xs"
                          >
                            Show Credential
                          </a>
                          )}
                        </div>
                        ))}

                        {/* Expand Button - Only show if there are more than 2 awards */}
                        {awards.length > 2 && (
                        <button
                          onClick={() => setExpanded(!expanded)}
                          className="w-full text-blue-600 text-sm font-medium flex items-center mt-2"
                        >
                          {expanded ? "Show Less" : "See all Awards and Achievements"} →
                        </button>
                        )}
                      </>
                      )}
                    </div>
                    </div>


                      {/* tabs for the desktop */}
                      <div className="hidden lg:block mt-6">
                        <div className="border-b">
                          <div className="flex space-x-8">
                            {Desktoptabs.map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setActiveDesktopTab(tab.toLowerCase())}
                                className={`px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                                  activeDesktopTab === tab.toLowerCase()
                                    ? 'border-blue-500 text-blue-500'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                              >
                                {tab}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Tab content sections will be added here later */}
                        <div className="mt-6 ">
                          {(activeDesktopTab === 'activity' ) && (
                            <div className="space-y-1">
                              {/* Posts Section */}
                              <div className='mb-8' >
                                <div className="flex justify-between items-center">
                                  <h2 className="text-xl font-medium">Posts</h2>
                                  <button 
                                    onClick={() => setShowAllPosts(!showAllPosts)}
                                    className="text-fillc text-sm font-medium flex items-center gap-1"
                                  >
                                    {showAllPosts ? "Show Less" : "See all Posts"} 
                                    <img src={arrowright} alt="" className={`transform ${showAllPosts ? 'rotate-180' : ''} w-4 h-4`} />
                                  </button>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-1 transition-all duration-300">
                                  {posts.slice(0, showAllPosts ? posts.length : 2).map((post) => (
                                    <PostCard
                                      key={post.id}
                                      userTitle={post.userTitle}
                                      userImage={post.userImage}
                                      userName={post.userName}
                                      timeAgo ={post.time}
                                      content={post.content}
                                      likes={post.likes}
                                      reposts={post.reposts}
                                      comments={post.comments}
                                      images={post.images}
                                      shares={post.shares}
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Questions Section */}
                              <div className="mt-8">
                                <div className="flex justify-between items-center ">
                                  <h2 className="text-xl font-medium">Questions</h2>
                                  <button 
                                    onClick={() => setShowAllQuestions(!showAllQuestions)}
                                    className="text-fillc text-sm font-medium flex items-center gap-1"
                                  >
                                    {showAllQuestions ? "Show Less" : "See all Questions"}
                                    <img src={arrowright} alt="" className={`transform ${showAllQuestions ? 'rotate-180' : ''} w-4 h-4`} />
                                  </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 transition-all duration-300">
                                  {questions.slice(0, showAllQuestions ? questions.length : 2).map((question) => (
                                    <QuestionCard
                                    key={question.id}
                                    userImage={question.author.image}
                                    userName={question.author.name}
                                    userTitle={question.author.title}
                                    timeAgo={question.timeAgo}
                                    questionTitle={question.title}
                                    questionContent={question.content}
                                    images={question.images}
                                    answers={question.answers}
                                    shares={question.shares}
                                  />
                                  ))}
                                </div>
                              </div>

                            {/* Resources Section */}
                            <div className="pt-6">
                              <div className="flex justify-between items-center mb-4 ">
                                <h2 className="text-xl font-medium">Resources</h2>
                                <button 
                                  onClick={() => setShowAllResources(!showAllResources)}
                                  className="text-fillc text-sm font-medium flex items-center gap-1"
                                >
                                  {showAllResources ? "Show Less" : "See all Resources"}
                                  <img src={arrowright} alt="" className={`transform ${showAllResources ? 'rotate-180' : ''} w-4 h-4`} />
                                </button>
                              </div>
                              <div className="grid grid-cols-2 gap-8 p-2">
                                {resources.slice(0, showAllResources ? resources.length : 2).map((resource) => (
                                  <ResourceCard
                                    key={resource.id}
                                    type={resource.type}
                                    title={resource.title}
                                    description={resource.description}
                                    image={resource.image}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Media Section */}
                            <div className="pt-8">
                              <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-medium">Media</h2>
                                <button className="text-fillc text-sm font-medium flex items-center gap-1">
                                  See all Photos
                                  <img src={arrowright} alt="" className="w-4 h-4" />
                                </button>
                              </div>
                              
                              {/* Media Tabs */}
                              <div className="flex gap-2 mb-4">
                                {['Photos', 'Videos', 'Other'].map((tab) => (
                                  <button
                                    key={tab}
                                    onClick={() => setActiveMediaTab(tab as 'Photos' | 'Videos' | 'Other')}
                                    className={`px-4 py-2 rounded-full text-sm ${
                                      activeMediaTab === tab
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                  >
                                    {tab}
                                  </button>
                                ))}
                              </div>

                              {/* Media Grid */}
                              <div className="grid grid-cols-3 gap-3 p-4">
                                {mediaItems.map((item) => (
                                  <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden">
                                    <img
                                      src={item.url}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                    {item.additionalCount && (
                                      <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                        +{item.additionalCount}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                              
                              {/* See all Photos link */}
                              <div className="mt-4 text-right">
                                <Link to="#" className="text-blue-600 text-sm hover:underline">
                                  See all Photos →
                                </Link>
                              </div>
                            </div>


                                {/* Mentioned Section */}
                                <div className="pt-8">
                                  <div className="flex justify-between items-center mb-6 pr-2">
                                    <h2 className="text-xl font-medium">Mentioned</h2>
                                    <button>
                                      <img src={more1} alt="" className='w-6 h-6' />
                                    </button>
                                  </div>
                                  <div className="grid grid-cols-2 gap-6">
                                    {mentionedPosts.slice(0, showAllMentioned ? mentionedPosts.length : 2).map((post) => (
                                      <MentionedCard
                                        key={post.id}
                                        userImage={post.userImage}
                                        userName={post.userName}
                                        userTitle={post.userTitle}
                                        timeAgo={post.timeAgo}
                                        title={post.title}
                                        content={post.content}
                                        images={post.images}
                                        likes={post.likes}
                                        comments={post.comments}
                                        shares={post.shares}
                                        reposts={post.reposts}
                                      />
                                    ))}
                                  </div>

                                  <div className='flex justify-end'>
                                      <button 
                                      onClick={() => setShowAllMentioned(!showAllMentioned)}
                                      className="text-fillc text-sm font-medium flex just  items-center gap-1"
                                      >
                                      {showAllMentioned ? "Show Less" : "See all Mentioned"}
                                      <img src={arrowright} alt="" className={`transform ${showAllMentioned ? 'rotate-180' : ''} w-4 h-4`} />
                                    </button>
                                    </div>
                                </div>

                            </div>
                          )}


                          {/* Events Section */}
                          {activeDesktopTab === 'events' && (


                            <div>
                              

                              <div className="w-full">
                                <EventCalendar />
                              </div>
                                                
                              
                              
                              </div>
                          )}
                          {activeDesktopTab === 'jobs' && (
                            <div>
                              <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-medium">Jobs</h2>
                                
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                {jobs.map((job) => (
                                  <JobsCard
                                    key={job.id}
                                    job={{
                                      ...job,
                                      startingDate: "",  
                                      applyBy: "",
                                      numberOfApplicants: 0
                                    }}
                                  />
                                ))}
                              </div>
                              <button 
                                      onClick={() => setShowAllJobs(!showAllJobs)}
                                      className="text-fillc text-sm font-medium flex just  items-center gap-1"
                                      >
                                      {showAllJobs ? "Show Less" : "See all Jobs"}
                                      <img src={arrowright} alt="" className={`transform ${showAllJobs ? 'rotate-180' : ''} w-4 h-4`} />
                                    </button>
                            </div>
                          )}
                          {activeDesktopTab === 'saved' && (
                            <div className="space-y-8">
                              {/* Saved Posts Section */}
                              <div className="space-y-4">
                                <h2 className="text-xl font-medium">Saved Posts</h2>
                                {savedPosts.length > 0 ? (
                                  <div className="grid grid-cols-2 gap-1 transition-all duration-300">
                                  {savedPosts.map((post) => (
                                    <PostCard
                                      key={post.id}
                                      userTitle={post.userTitle}
                                      userImage={post.userImage}
                                      userName={post.userName}
                                      timeAgo={post.time}
                                      content={post.content}
                                      likes={post.likes}
                                      reposts={post.reposts}
                                      comments={post.comments}
                                      images={post.images}
                                      shares={post.shares}
                                    />
                                  ))}
                                </div>
                                ) : (
                                  <div className="text-center text-gray-500 py-4">
                                    No saved posts yet
                                  </div>
                                )}
                              </div>

                              {/* Saved Questions Section */}
                              <div className="space-y-4">
                                <h2 className="text-xl font-medium">Saved Questions</h2>
                                {savedQuestions.length > 0 ? (
                                  <div className="grid grid-cols-2 gap-4 transition-all duration-300">
                                  {savedQuestions.map((question) => (
                                    <QuestionCard
                                      key={question.id}
                                      userImage={question.author.image}
                                      userName={question.author.name}
                                      userTitle={question.author.title}
                                      timeAgo={question.timeAgo}
                                      questionTitle={question.title}
                                      questionContent={question.content}
                                      images={question.images}
                                      answers={question.answers}
                                      shares={question.shares}
                                    />
                                  ))}
                                  </div>
                                ) : (
                                  <div className="text-center text-gray-500 py-4">
                                    No saved questions yet
                                  </div>
                                )}
                              </div>

                              {/* Saved Resources Section */}
                              <div className="space-y-4">
                                <h2 className="text-xl font-medium">Saved Resources</h2>
                                {savedResources.length > 0 ? (
                                  <div className="grid grid-cols-2 gap-8 p-2">
                                  {savedResources.map((resource) => (
                                    <ResourceCard
                                      key={resource.id}
                                      type={resource.type}
                                      title={resource.title}
                                      description={resource.description}
                                      image={resource.image}
                                    />
                                  ))}
                                  </div>
                                ) : (
                                  <div className="text-center text-gray-500 py-4">
                                    No saved resources yet
                                  </div>
                                )}
                              </div>

                              {/* Saved Jobs Section */}
                              <div className="space-y-4">
                                <h2 className="text-xl font-medium">Saved Jobs</h2>
                                {savedJobs.length > 0 ? (
                                   <div className="grid grid-cols-2 gap-4">
                                  {savedJobs.map((job) => (
                                    <JobsCard
                                      key={job.id}
                                      job={{
                                        ...job,
                                        startingDate: "",  
                                        applyBy: "",
                                        numberOfApplicants: 0
                                      }}
                                    />
                                  )) }
                                  </div>
                                ) : (
                                  <div className="text-center text-gray-500 py-4">
                                    No saved jobs yet
                                  </div>
                                )}
                              </div>

                              {/* Saved Conferences Section */}
                              <div className="space-y-4">
                                <h2 className="text-xl font-medium">Saved Conferences</h2>
                                {savedConferences.length > 0 ? (
                                  <div className="grid grid-cols-2 gap-4">
                                  {savedConferences.map((conference) => (
                                    <ConferenceCard
                                      key={conference.id}
                                      title={conference.title}
                                      date={conference.date}
                                      speaker={conference.speaker}
                                      price={conference.price}
                                      location={conference.location}
                                      speciality={conference.speciality}
                                      image={conference.image}
                                      avatar={conference.avatar}
                                      id={conference.id}
                                     
                                    />
                                  ))}
                                  </div>
                                ) : (
                                  <div className="text-center text-gray-500 py-4">
                                    No saved conferences yet
                                  </div>
                                )}
                                </div>
                            </div>
                          )}
                          {activeTab === 'drafts' && (
                            <div>Drafts content will go here</div>
                          )}
                        </div>
                      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
