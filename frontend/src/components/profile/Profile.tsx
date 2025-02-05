import React, { useEffect, useState } from "react";
import add from "../../assets/icon/add.svg";
import backbutton from "../../assets/icon/backbutton.svg";
import more1 from "../../assets/icon/more1.svg";
import pmessage from "../../assets/icon/pmessage.svg";
import add2 from "../../assets/icon/add2.svg";
import { FaLink, FaPlus } from "react-icons/fa";
import { Header } from "./Header";
import location from "../../assets/icon/location.svg";
import edit from "../../assets/icon/edit.svg";
import arrowright from "../../assets/icon/arrowright.svg";
import PostCard from "./PostCard";
import QuestionCard from "./QuestionCard";
import ResourceCard from "./ResourceCard";
import MentionedCard from "./MentionedCard";
import { Link } from "react-router-dom";
import { JobsCard } from "./JobCard";
import ConferenceCard from "./ConferenceCard";
import EventCalendar from "./EventCalendar";
import axios from "axios";
import AwardForm, { AwardFormData } from "./forms/AwardForm";
import MembershipForm, { MembershipFormData } from "./forms/MembershipForm";
import ExperienceForm, { ExperienceFormData } from "./forms/ExperienceForm";
import EducationForm, { EducationFormData } from "./forms/EducationForm";
import InterestForm, { InterestFormData } from "./forms/InterestForm";
import CertificationForm, {
  CertificationFormData,
} from "./forms/CertificationForm";

interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  description?: string;
  img: string;
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
  shares: number;
  reposts: number;
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
  type: "photo" | "video" | "other";
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
  comments: number;
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
  const [activeTab, setActiveTab] = useState("about");
  const [isAddMembershipFormOpen, setIsAddMembershipFormOpen] = useState(false);
  const [editingMembership, setEditingMembership] = useState<Membership | null>(
    null
  );
  const [showEditExperience, setShowEditExperience] = useState(false);
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<ExperienceItem | null>(null);

  const [expanded, setExpanded] = useState(false);
  const [interestsexpanded, setInterestsExpanded] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [showAllResources, setShowAllResources] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<
    "Photos" | "Videos" | "Other"
  >("Photos");
  const [showAllMentioned, setShowAllMentioned] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [activeDesktopTab, setActiveDesktopTab] = useState<string>("activity");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isAwardFormOpen, setIsAwardFormOpen] = useState(false);

  const [editingAward, setEditingAward] = useState<Award | null>(null);

  const [isAddInterestFormOpen, setIsAddInterestFormOpen] = useState(false);
  const [editingInterest, setEditingInterest] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [showInterestEditButtons, setShowInterestEditButtons] = useState(false);

  const [isEducationFormOpen, setIsEducationFormOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const [showCertEditButtons, setShowCertEditButtons] = useState(false);
  const [editingCertification, setEditingCertification] =
    useState<Certification | null>(null);
  const [isCertificationFormOpen, setIsCertificationFormOpen] = useState(false);

  useEffect(() => {
    setActiveDesktopTab("activity");

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tabs = ["About", "Activity", "Events", "Memberships", "Saved", "Draft"];
  const Desktoptabs = ["Activity", "Jobs", "Events", "Saved", "Draft"];

  // Sample data for posts and questions
  const posts: Post[] = [
    {
      id: 1,
      content:
        "Just completed a successful cataract surgery using the latest minimally invasive technique. The patient's vision improved significantly...",
      likes: 45,
      comments: 12,
      userTitle: "Opthomology the future of eye care",
      shares: 12,
      reposts: 12,
      time: "2 hours ago",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      userImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      userName: "Seelam Vamshidhar Goud",
      postImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
    },
    {
      id: 2,
      content:
        "Excited to share my research findings on advanced IOL technologies at the upcoming ophthalmology conference...",
      likes: 32,
      comments: 8,
      userTitle: "Opthomology the future of eye care",
      shares: 12,
      reposts: 12,
      time: "5 hours ago",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      userImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      userName: "Seelam Vamshidhar Goud",
      postImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
    },
  ];

  const aboutText =
    "An experienced ophthalmologist passionate about advancing care through sustainable eye care. Specializing in cataract and refractive surgery with a focus on advanced surgical ophthalmology. I combine cutting-edge technology with a patient-centered approach...";

  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      title: "Ophthalmology Clinical Intern",
      company: "Aravind Eye Hospital, Madurai, Tamil Nadu",
      date: "Jun 2023 - Present",
      description: "",
      img: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      title: "Ophthalmology Clinical Intern",
      company: "Sankara Nethralaya, Chennai, Tamil Nadu",
      date: "Jun 2023 - Present",
      description: "Clinical rotations in various ophthalmology departments",
      img: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      title: "Ophthalmology Clinical Intern",
      company: "AIIMS",
      date: "Jun 2023 - Present",
      description: "Clinical rotations in various ophthalmology departments",
      img: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    // Add more experiences...
  ]);

  const [educationData, setEducationData] = useState<Education[]>([
    {
      institution: "All India Institute of Medical Sciences (AIIMS), New Delhi",
      degree: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
      year: "2020 - 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      institution: "St. Xavier’s High School, Mumbai",
      degree: "Higher Secondary Education (Class 12)",
      year: "2020 - 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      institution: "All India Institute of Medical Sciences (AIIMS), New Delhi",
      degree: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
      year: "2020 - 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      institution: "St. Xavier’s High School, Mumbai",
      degree: "Higher Secondary Education (Class 12)",
      year: "2020 - 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    // Add more education...
  ]);

  const [interestsData, setInterestsData] = useState<Interest[]>([
    {
      id: "1",
      name: "Cataract Surgery",
    },
    {
      id: "2",
      name: "Corneal Disorders and Treatment",
    },
    {
      id: "3",
      name: "Pediatric Ophthalmology",
    },
    {
      id: "4",
      name: "Retinal Surgery",
    },
    {
      id: "5",
      name: "Corneal Disorders and Treatment",
    },
    {
      id: "6",
      name: "Pediatric Ophthalmology",
    },
    {
      id: "7",
      name: "Retinal Surgery",
    },
  ]);

  const [certificationData, setCertificationData] = useState<Certification[]>([
    {
      id: "1",
      title: "Ophthalmology Clinical Skills Workshop",
      organization: "Sankara Nethralaya, Chennai",
      issueDate: "March 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: "2",
      title: "Advanced Cataract Surgery Certification",
      organization: "AIIMS Delhi",
      issueDate: "January 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: "3",
      title: "Ophthalmology Clinical Skills Workshop",
      organization: "Sankara Nethralaya, Chennai",
      issueDate: "March 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: "4",
      title: "Advanced Cataract Surgery Certification",
      organization: "AIIMS Delhi",
      issueDate: "January 2023",
      logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
  ]);

  const [awards, setAwards] = useState<Award[]>([
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
      description:
        "Recognized for outstanding contribution in biomedical innovations.",
      credentialLink: "#",
    },
  ]);

  const [memberships, setMemberships] = useState<Membership[]>([
    {
      id: 1,
      name: "Visionary Care Society",
      category: "Ophthalmology",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: 2,
      name: "Visionary Care Society",
      category: "Ophthalmology",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: 3,
      name: "Visionary Care Society",
      category: "Ophthalmology",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: 4,
      name: "Visionary Care Society",
      category: "Ophthalmology",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: 5,
      name: "Visionary Care Society",
      category: "Ophthalmology",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: 6,
      name: "Visionary Care Society",
      category: "Ophthalmology",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
  ]);

  const workplaces: Workplace[] = [
    {
      id: 1,
      organization: "Aravind Eye Hospital, Madurai, Tamil Nadu",
      img: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: 2,
      organization: "All India Institute of Medical Sciences, Delhi",
      img: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
  ];

  const questions: Question[] = [
    {
      id: "1",
      title: "Latest advancements in cataract surgery techniques?",
      content:
        "I'm interested in learning about the newest developments in cataract surgery. What are the most promising techniques being used or researched currently?",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      answers: 12,
      shares: 8,
      author: {
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
        name: "Dr. Seelam Vamshidhar",
        title: "Ophthalmologist | AIIMS Delhi",
      },
      timeAgo: "2 days ago",
    },
    {
      id: "2",
      title: "Best practices for post-LASIK care?",
      content:
        "Looking for recommendations on post-LASIK patient care protocols. What has been your experience with different approaches?",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      answers: 8,
      shares: 5,
      author: {
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
        name: "Dr. Seelam Vamshidhar",
        title: "Ophthalmologist | AIIMS Delhi",
      },
      timeAgo: "5 days ago",
    },
  ];

  const resources: Resource[] = [
    {
      id: "1",
      type: "Article",
      title: "The Future of AI in Ophthalmology",
      description:
        "Artificial intelligence (AI) is revolutionizing various fields of medicine, and ophthalmology is no exception. With the rapid advancement of machine learning, deep learning, and computer vision, AI is enhancing diagnostic accuracy, streamlining workflows, and improving patient outcomes. The integration of AI into ophthalmology is set to redefine the way eye diseases are detected, monitored, and treated.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: "2",
      type: "Research",
      title: "Latest Advances in Glaucoma Treatment",
      description:
        "Recent developments in glaucoma treatment have opened new possibilities for patients. This comprehensive review explores innovative therapeutic approaches, surgical techniques, and medication delivery systems that are transforming the management of glaucoma.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
  ];

  const mediaItems: MediaItem[] = [
    {
      id: "1",
      type: "photo",
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      additionalCount: 5,
    },
    {
      id: "2",
      type: "photo",
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      additionalCount: 5,
    },
    {
      id: "3",
      type: "photo",
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      additionalCount: 5,
    },
    {
      id: "4",
      type: "photo",
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      additionalCount: 5,
    },
    {
      id: "5",
      type: "photo",
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: "6",
      type: "photo",
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
  ];

  const jobs: Job[] = [
    {
      id: 1,
      department: "Senior Ophthalmologist",

      name: "City Eye Hospital",
      location: "Mumbai, India",
      amount: "$22,000-44,000",
      date: "Posted 2 days ago",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: 2,
      department: "Eye Surgeon",

      name: "Apollo Hospitals",
      location: "Delhi, India",
      amount: "$22,000-44,000",

      date: "Posted 3 days ago",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
  ];

  const mentionedPosts: MentionedPost[] = [
    {
      id: "1",
      userImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      userName: "Nampally Sriram",
      userTitle:
        "Ophthalmologist | AIIMS Delhi'25 | Aspiring Medical Professional",
      timeAgo: "3 days ago",
      title: "Ophthalmology: The Future of Eye Care",
      content:
        "Ophthalmology has seen incredible advancements in recent years, particularly in surgical techniques and diagnostic tools. Ophthalmology has seen incredible advancements in recent years, particularly in surgical techniques and diagnostic tools.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      likes: 120,
      comments: 70,
      shares: 37,
      reposts: 51,
    },
    {
      id: "2",
      userImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      userName: "Nampally Sriram",
      userTitle:
        "Ophthalmologist | AIIMS Delhi'25 | Aspiring Medical Professional",
      timeAgo: "3 days ago",
      title: "Ophthalmology: The Future of Eye Care",
      content:
        "Ophthalmology has seen incredible advancements in recent years, particularly in surgical techniques and diagnostic tools. Ophthalmology has seen incredible advancements in recent years, particularly in surgical techniques and diagnostic tools.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      likes: 120,
      comments: 70,
      shares: 37,
      reposts: 51,
    },
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
      content:
        "Just completed a successful cataract surgery using the latest minimally invasive technique. The patient's vision improved significantly...",
      likes: 45,
      comments: 12,
      userTitle: "Opthomology the future of eye care",
      shares: 12,
      reposts: 12,
      time: "2 hours ago",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      userImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      userName: "Seelam Vamshidhar Goud",
      postImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
    },
    {
      id: 2,
      content:
        "Excited to share my research findings on advanced IOL technologies at the upcoming ophthalmology conference...",
      likes: 32,
      comments: 8,
      userTitle: "Opthomology the future of eye care",
      shares: 12,
      reposts: 12,
      time: "5 hours ago",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      userImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      userName: "Seelam Vamshidhar Goud",
      postImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
    },
  ];

  const savedQuestions: Question[] = [
    {
      id: "1",
      title: "Latest advancements in cataract surgery techniques?",
      content:
        "I'm interested in learning about the newest developments in cataract surgery. What are the most promising techniques being used or researched currently?",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      answers: 12,
      shares: 8,
      author: {
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
        name: "Dr. Seelam Vamshidhar",
        title: "Ophthalmologist | AIIMS Delhi",
      },
      timeAgo: "2 days ago",
    },
    {
      id: "2",
      title: "Best practices for post-LASIK care?",
      content:
        "Looking for recommendations on post-LASIK patient care protocols. What has been your experience with different approaches?",
      images: [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
      ],
      answers: 8,
      shares: 5,
      author: {
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
        name: "Dr. Seelam Vamshidhar",
        title: "Ophthalmologist | AIIMS Delhi",
      },
      timeAgo: "2 days ago",
    },
  ];

  const savedResources: Resource[] = [
    {
      id: "1",
      type: "Article",
      title: "The Future of AI in Ophthalmology",
      description:
        "Artificial intelligence (AI) is revolutionizing various fields of medicine, and ophthalmology is no exception. With the rapid advancement of machine learning, deep learning, and computer vision, AI is enhancing diagnostic accuracy, streamlining workflows, and improving patient outcomes. The integration of AI into ophthalmology is set to redefine the way eye diseases are detected, monitored, and treated.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: "2",
      type: "Research",
      title: "Latest Advances in Glaucoma Treatment",
      description:
        "Recent developments in glaucoma treatment have opened new possibilities for patients. This comprehensive review explores innovative therapeutic approaches, surgical techniques, and medication delivery systems that are transforming the management of glaucoma.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
  ];

  const savedJobs: Job[] = [
    {
      id: 1,
      department: "Senior Ophthalmologist",

      name: "City Eye Hospital",
      location: "Mumbai, India",
      amount: "$22,000-44,000",
      date: "Posted 2 days ago",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: 2,
      department: "Eye Surgeon",

      name: "Apollo Hospitals",
      location: "Delhi, India",
      amount: "$22,000-44,000",

      date: "Posted 3 days ago",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
  ];

  const savedConferences: Conference[] = [
    {
      id: "1",
      title: "International Ophthalmology Conference 2022",
      date: "June 15-17, 2022",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      location: "New York, USA",
      speaker: "Dr. Seelam Vamshidhar",
      speciality: "Ophthalmology",
      price: "$299",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
    {
      id: "2",
      title: "World Retina Congress 2022",
      date: "July 20-22, 2022",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c",
      location: "Paris, France",
      speaker: "Dr. Seelam Vamshidhar",
      speciality: "Retina",
      price: "$399",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    },
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
              postTitle="sjkkasjj"
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
        <div className="flex justify-end">
          <button
            onClick={() => setShowAllPosts(!showAllPosts)}
            className="text-fillc text-sm font-medium flex  items-center gap-1"
          >
            {showAllPosts ? "Show Less" : "See all Posts"}
            <img
              src={arrowright}
              alt=""
              className={`transform ${
                showAllPosts ? "rotate-180" : ""
              } w-4 h-4`}
            />
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
        <div className="flex justify-end">
          <button
            onClick={() => setShowAllQuestions(!showAllQuestions)}
            className="text-fillc text-sm font-medium flex items-center gap-1"
          >
            {showAllQuestions ? "Show Less" : "See all Questions"}
            <img
              src={arrowright}
              alt=""
              className={`transform ${
                showAllQuestions ? "rotate-180" : ""
              } w-4 h-4`}
            />
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
        <div className="flex justify-end">
          <button
            onClick={() => setShowAllResources(!showAllResources)}
            className="text-fillc text-sm font-medium flex items-center gap-1"
          >
            {showAllResources ? "Show Less" : "See all Resources"}
            <img
              src={arrowright}
              alt=""
              className={`transform ${
                showAllResources ? "rotate-180" : ""
              } w-4 h-4`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  //Backend api call

  const id = localStorage.getItem("Id");
  const intid = parseInt(id || "");

  const [userDetails, setUserDetails] = useState<any>(null); // State to hold user data

  useEffect(() => {
    if (id) {
      // First, check localStorage for data
      const storedUser = localStorage.getItem("User");
      if (storedUser) {
        // If data exists, render it immediately
        setUserDetails(JSON.parse(storedUser));

        // Then fetch new data from the server and compare
        fetchUserData(id, JSON.parse(storedUser));
        console.log("ikkada okasari ochindhi");
      } else {
        // If no data in localStorage, fetch data from the backend
        fetchUserData(id);
        console.log("ikkada inkokasari ochindhi");
      }
    }
  }, [id]);

  // Function to fetch user data from the backend
  const fetchUserData = async (userId: string, storedUserData: any = null) => {
    try {
      const response = await axios.get(
        `https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/profile/${userId}`
      );
      const userData = response.data.data; // New response structure

      console.log(response.data);

      const fetchedUser = {
        name: userData.name,
        bio: `${userData.specialisation_field_of_study} | ${userData.department} | ${userData.organisation_name} `,
        location: userData.city,
        profile_picture: userData.profile_picture,
        posts: userData.posts,
        certificates: userData.certifications,
        awards: userData.achievementsAwards,
        experiences: userData.professionalExperience,
        educations: userData.education,
        memberships: userData.memberships,
      };

      if (storedUserData) {
        if (JSON.stringify(fetchedUser) !== JSON.stringify(storedUserData)) {
          localStorage.setItem("User", JSON.stringify(fetchedUser));
          setUserDetails(fetchedUser);
        }
      } else {
        localStorage.setItem("User", JSON.stringify(fetchedUser));
        setUserDetails(fetchedUser);
      }
    } catch (err: any) {
      console.error("Error fetching data:", err.response?.data?.message || err);
    }
  };

  const [showEditButtons, setShowEditButtons] = useState(false);

  //add award

  async function handleaddaward(data: any) {
    console.log(data, data.title, data.organization);
    console.log(editingAward);
    console.log(!!editingAward);

    if (!!editingAward) {
      try {
        const response = await axios.post(
          `https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/add-achievements-awards/${id}`,
          {
            userId: intid,
            awardid: editingAward.id,
            awardName: data.title,
            awardedBy: data.organization,
            awardDate: data.year,
            descreption: data.description,
            awardMediaLink: data.credentialLink,
          }
        );

        console.log("updated successfully");
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await axios.post(
          `https://128i1lirkh.execute-api.ap-south-1.amazonaws.com/dev/add-achievements-awards/${id}`,
          {
            userId: intid,
            awardName: data.title,
            awardedBy: data.organization,
            awardDate: data.year,
            descreption: data.description,
            awardMediaLink: data.credentialLink,
          }
        );
        console.log("added successfully");

        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }
  }

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
            <img
              src={more1}
              alt="Profile"
              className="w-full h-full rounded-full"
            />
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
      <div className="max-w-7xl mx-auto px-4  lg:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Profile Info */}
          <div className="lg:col-span-3 py-2  ">
            <div className="bg-white   ">
              <div className="flex flex-col  items-center text-center">
                <div className="lg:border p-3 lg:py-8 shadow-sm rounded-xl border-gray-200">
                  <div className="flex lg:flex-col  items-center">
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
                      <h1 className="text-lg font-medium text-gray-700   mt-4">
                        {userDetails?.name}
                      </h1>
                      <p className="text-gray-600 text-sm mt-1 lg:mx-2 px-4 ">
                        {userDetails?.bio}
                      </p>
                      <p className="text-gray-500 text-sm mt-4 flex items-center justify-center gap-1">
                        <img src={location} alt="" className="w-4" />
                        {userDetails?.location}
                      </p>
                    </div>
                  </div>

                  <div className="hidden lg:block">
                    <div className="p-3 px-4 ">
                      {/* recent positions */}
                      <div className="flex flex-col items-center gap-2 mt-6 border-b pb-1">
                        {workplaces.map((work) => (
                          <div
                            key={work.id}
                            className="flex items-center gap-3 mb-2"
                          >
                            <img
                              src={work.img}
                              alt={work.organization}
                              className="w-6 h-6 rounded-full"
                            />
                            <p className="text-xs text-left">
                              {work.organization}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between  mt-6 mx-3">
                      <div className="text-center">
                        <div className="font-semibold text-sm text-fillc">
                          546
                        </div>
                        <div className="text-sm text-gray-700">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-sm text-fillc">
                          478
                        </div>
                        <div className="text-sm text-gray-700">Following</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-sm text-fillc">
                          5
                        </div>
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
                          ? "translate-x-0"
                          : "-translate-x-full"
                      }`}
                    >
                      <div className="">
                        <div className="flex justify-between items-start mb-2">
                          <h2 className="text-xl font-semibold">About</h2>
                          <button className="text-gray-500">
                            <img src={edit} alt="edit" className="w-5 h-5" />
                          </button>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 ">
                            Aspiring ophthalmologist with a keen interest in
                            surgical techniques and patient care. Currently
                            pursuing MBBS at AIIMS Delhi with a focus on
                            ophthalmology. Passionate about leveraging
                            technology in healthcare and contributing to medical
                            research.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Second Custom Section */}
                    <div
                      className={`absolute w-full h-full transform transition-transform duration-700 ease-in-out ${
                        activeIndex === 1
                          ? "translate-x-0"
                          : activeIndex < 1
                          ? "translate-x-full"
                          : "-translate-x-full"
                      }`}
                    >
                      <div className="w-full  h-[200px] border border-gray-200 p-4 rounded-lg">
                        <div className="flex   justify-between items-start mb-4">
                          <div className="mr-4">
                            <h2 className="text-sm flex items-start font-medium text-gray-800">
                              Profile Completion
                            </h2>
                            <div className="space-y-1 grid grid-cols-2 ">
                              <button className=" flex  items-center  bg-gray-50 rounded-full py-2 px-2">
                                <span className="text-xs text-gray-700">
                                  Education
                                </span>
                                <span className="text-sm">+</span>
                              </button>
                              <button className=" flex items-center justify-between bg-gray-50 rounded-full py-2 px-4">
                                <span className="text-xs text-gray-700">
                                  Experience
                                </span>
                                <span className="text-sm">+</span>
                              </button>
                              <button className=" flex items-center justify-between bg-gray-50 rounded-full py-2 px-4">
                                <span className="text-xs text-gray-700">
                                  Skills
                                </span>
                                <span className="text-sm">+</span>
                              </button>
                              <button className=" flex items-center justify-between bg-gray-50 rounded-full py-2 px-4">
                                <span className="text-xs text-gray-700">
                                  Awards
                                </span>
                                <span className="text-sm">+</span>
                              </button>
                            </div>
                          </div>
                          <div className="relative mt-4">
                            <div className="w-14 h-14 rounded-full border-2 border-gray-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-maincl">
                                75%
                              </span>
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
                          ? "translate-x-0"
                          : activeIndex < 2
                          ? "translate-x-full"
                          : "-translate-x-full"
                      }`}
                    >
                      <div className="p-4 border h-[200px] border-gray-200 rounded-lg">
                        {/* recent positions */}
                        <div className="flex flex-col items-center gap-2 pt-2 border-b last:border-none  pb-">
                          <div className="flex items-center justify-between w-full">
                            <p className="text-sm">Recent positions</p>
                            <img src={edit} alt="" />
                          </div>

                          {workplaces.map((work) => (
                            <div
                              key={work.id}
                              className="flex justify-start items-center  gap-3 mb-2"
                            >
                              <img
                                src={work.img}
                                alt={work.organization}
                                className="w-8 h-8 rounded-full"
                              />
                              <p className="text-sm text-left">
                                {work.organization}
                              </p>
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
                            index === activeIndex ? "bg-maincl" : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Profile Completion */}
                <div className="w-full mt-6 hidden lg:block border border-gray-200 p-4 rounded-lg">
                  <div className="flex   justify-between items-start mb-4">
                    <div className="mr-4">
                      <h2 className="text-sm flex items-start font-medium text-gray-800">
                        Profile Completion
                      </h2>
                      <div className="space-y-1 grid grid-cols-2 ">
                        <button className=" flex  items-center  bg-gray-50 rounded-full py-2 px-2">
                          <span className="text-xs text-gray-700">
                            Education
                          </span>
                          <span className="text-sm">+</span>
                        </button>
                        <button className=" flex items-center justify-between bg-gray-50 rounded-full py-2 px-4">
                          <span className="text-xs text-gray-700">
                            Experience
                          </span>
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
                        <span className="text-sm font-medium text-maincl">
                          75%
                        </span>
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
                  <p className="text-xs text-gray-600 mt-1 cursor-pointer">
                    profile.seelam.vamshidhar.goud
                  </p>
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
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm lg:hidden">
              {/* Show ActivitySection for both mobile and desktop when activity tab is active */}
              {(activeTab === "activity" ||
                (!isMobile && activeDesktopTab === "activity")) && (
                <ActivitySection />
              )}
            </div>
            <div className="bg-white rounded-lg shadow-sm lg:hidden">
              {/* Show ActivitySection for both mobile and desktop when activity tab is active */}
              {(activeTab === "events" ||
                (!isMobile && activeDesktopTab === "events")) && (
                <EventCalendar />
              )}
            </div>
            <div className="bg-white rounded-lg shadow-sm lg:hidden">
              {/* Show ActivitySection for both mobile and desktop when activity tab is active */}
              {(activeTab === "saved" ||
                (!isMobile && activeDesktopTab === "saved")) && (
                <div className="space-y-8">
                  {/* Saved Posts Section */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium">Saved Posts</h2>
                    {savedPosts.length > 0 ? (
                      <div className="grid grid-cols-1 gap-1 transition-all duration-300">
                        {savedPosts.map((post) => (
                          <PostCard
                            key={post.id}
                            postTitle="sduudfd"
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
                        <div className="flex justify-end">
                          <button
                            onClick={() => setShowAllPosts(!showAllPosts)}
                            className="text-fillc text-sm font-medium flex items-center gap-1"
                          >
                            {showAllPosts ? "Show Less" : "See all Posts"}
                            <img
                              src={arrowright}
                              alt=""
                              className={`transform ${
                                showAllPosts ? "rotate-180" : ""
                              } w-4 h-4`}
                            />
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
                        <div className="flex justify-end">
                          <button
                            onClick={() =>
                              setShowAllQuestions(!showAllQuestions)
                            }
                            className="text-fillc text-sm font-medium flex items-center gap-1"
                          >
                            {showAllQuestions
                              ? "Show Less"
                              : "See all Questions"}
                            <img
                              src={arrowright}
                              alt=""
                              className={`transform ${
                                showAllQuestions ? "rotate-180" : ""
                              } w-4 h-4`}
                            />
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
                        <div className="flex justify-end">
                          <button
                            onClick={() =>
                              setShowAllResources(!showAllResources)
                            }
                            className="text-fillc text-sm font-medium flex items-center gap-1"
                          >
                            {showAllResources
                              ? "Show Less"
                              : "See all Resources"}
                            <img
                              src={arrowright}
                              alt=""
                              className={`transform ${
                                showAllResources ? "rotate-180" : ""
                              } w-4 h-4`}
                            />
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
                              numberOfApplicants: 0,
                            }}
                          />
                        ))}
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
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c"
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    className="flex-1  px-4 py-2"
                  />
                  <button className="px-4 py-1.5 flex items-center text-sm text-nowrap bg-maincl text-white rounded-3xl">
                    <img src={add} alt="" className="w-5 " />
                    Add Post
                  </button>
                </div>
              </div>

              {/* Content Sections */}
              <div className="divide-">
                {/* About Section - Only visible when About tab is active on mobile */}
                <div
                  className={`${
                    activeTab === "about" || activeTab === "About"
                      ? "block"
                      : "hidden lg:block"
                  }`}
                >
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
                <div
                  className={`p-6 border border-gray-100 rounded-xl my-3 group relative ${
                    activeTab === "about" || activeTab === "About"
                      ? "block"
                      : "hidden lg:block"
                  }`}
                >
                  <div className="flex gap-4 justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">Experience</h2>
                    <div className="flex items-center gap-4">
                      <button
                        className="text-gray-500"
                        onClick={() =>
                          setShowEditExperience(!showEditExperience)
                        }
                      >
                        <img src={edit} alt="" />
                      </button>
                      <button
                        className="flex items-center space-x-1 bg-maincl text-white px-2 py-2 rounded-full hover:bg-fillc text-sm"
                        onClick={() => {
                          setEditingExperience(null);
                          setIsExperienceFormOpen(true);
                        }}
                      >
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    {userDetails?.experiences?.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600 text-sm">
                          Adding your work experience will highlight your
                          professional journey and showcase your skills, making
                          your profile more compelling and complete!
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Desktop View */}
                        <div className="hidden lg:block">
                          {userDetails?.experiences?.length > 3 && (
                            <>
                              <button
                                className="absolute left-0 top-1/3 z-50 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                                onClick={() => {
                                  const container =
                                    document.getElementById(
                                      "experience-scroll"
                                    );
                                  if (container) container.scrollLeft -= 300;
                                }}
                              >
                                <img
                                  src={arrowright}
                                  alt="Previous"
                                  className="w-4 h-4 transform rotate-180"
                                />
                              </button>
                              <button
                                className="absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                                onClick={() => {
                                  const container =
                                    document.getElementById(
                                      "experience-scroll"
                                    );
                                  if (container) container.scrollLeft += 300;
                                }}
                              >
                                <img
                                  src={arrowright}
                                  alt="Next"
                                  className="w-4 h-4"
                                />
                              </button>
                            </>
                          )}

                          <ol
                            id="experience-scroll"
                            className="flex overflow-x-auto scrollbar-hide scroll-smooth"
                          >
                            {experiences.map((exp, index) => (
                              <li
                                key={index}
                                className="relative flex-none w-72 mb-6 mr-8 last:mr-0"
                              >
                                <div className="flex items-center">
                                  <div className="z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full ring-0 ring-white sm:ring-8 shrink-0 overflow-hidden border-2 border-gray-100">
                                    <img
                                      src={exp.img}
                                      alt={`${exp.company} logo`}
                                      className="w-12 h-12 object-cover"
                                    />
                                  </div>
                                  {index < experiences.length - 1 && (
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
                                  )}
                                </div>
                                <div className="mt-3 sm:pe-8 relative">
                                  {showEditExperience && (
                                    <button
                                      onClick={() => {
                                        setEditingExperience(exp);
                                        setIsExperienceFormOpen(true);
                                      }}
                                      className="absolute right-0 top-0 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                      <img
                                        src={edit}
                                        alt="Edit"
                                        className="w-3 h-3"
                                      />
                                    </button>
                                  )}
                                  <h3 className="text-sm w-72 overflow-hidden text-ellipsis whitespace-wrap font-normal text-gray-900">
                                    {exp.title}
                                  </h3>
                                  <p className="text-xs font-light text-gray-600">
                                    {exp.company}
                                  </p>
                                  <time className="block mb-2 text-xs font-normal text-gray-500">
                                    {exp.date}
                                  </time>
                                  {exp.description && (
                                    <p className="text-sm font-normal text-gray-500">
                                      {exp.description}
                                    </p>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Mobile View */}
                        <div className="lg:hidden flex flex-col space-y-8">
                          {experiences
                            .slice(0, expanded ? experiences.length : 3)
                            .map((exp, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-4"
                              >
                                <div className="flex-shrink-0">
                                  <img
                                    src={exp.img}
                                    alt={`${exp.company} logo`}
                                    className="w-12 h-12 rounded-full border-2 border-gray-100"
                                  />
                                </div>
                                <div className="flex-grow relative">
                                  {showEditExperience && (
                                    <button
                                      onClick={() => {
                                        setEditingExperience(exp);
                                        setIsExperienceFormOpen(true);
                                      }}
                                      className="absolute right-0 top-0 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                      <img
                                        src={edit}
                                        alt="Edit"
                                        className="w-3 h-3"
                                      />
                                    </button>
                                  )}
                                  <h3 className="text-sm font-normal text-gray-900">
                                    {exp.title}
                                  </h3>
                                  <p className="text-xs font-light text-gray-600">
                                    {exp.company}
                                  </p>
                                  <time className="block text-xs font-normal text-gray-500">
                                    {exp.date}
                                  </time>
                                  {exp.description && (
                                    <p className="text-sm font-normal text-gray-500">
                                      {exp.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}

                          {experiences.length > 3 && (
                            <button
                              onClick={() => setExpanded(!expanded)}
                              className="text-fillc text-sm font-medium flex items-center gap-1 lg:hidden"
                            >
                              {expanded ? "Show Less" : "See all Experience"}
                              <img
                                src={arrowright}
                                alt=""
                                className={`transform ${
                                  expanded ? "rotate-180" : ""
                                } w-4 h-4`}
                              />
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Experience Form Modal */}
                {isExperienceFormOpen && (
                  <ExperienceForm
                    isOpen={isExperienceFormOpen}
                    onClose={() => {
                      setIsExperienceFormOpen(false);
                      setEditingExperience(null);
                    }}
                    onSubmit={(data: ExperienceFormData) => {
                      if (editingExperience) {
                        const updatedExperiences = experiences.map((exp) =>
                          exp === editingExperience
                            ? {
                                ...exp,
                                title: data.title,
                                company: data.company,
                                date: data.date,
                                description: data.description,
                                img:
                                  data.img instanceof File
                                    ? URL.createObjectURL(data.img)
                                    : exp.img,
                              }
                            : exp
                        );
                        setExperiences(updatedExperiences);
                      } else {
                        const newExperience: ExperienceItem = {
                          title: data.title,
                          company: data.company,
                          date: data.date,
                          description: data.description,
                          img:
                            data.img instanceof File
                              ? URL.createObjectURL(data.img)
                              : "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372",
                        };
                        setExperiences([...experiences, newExperience]);
                      }
                      setIsExperienceFormOpen(false);
                      setEditingExperience(null);
                    }}
                    initialData={
                      editingExperience
                        ? {
                            title: editingExperience.title,
                            company: editingExperience.company,
                            date: editingExperience.date,
                            description: editingExperience.description || "",
                            img: editingExperience.img,
                            notifyFollowers: false,
                          }
                        : undefined
                    }
                    isEditing={!!editingExperience}
                  />
                )}

                {/* Education Section */}
                <div
                  className={`p-6 border border-gray-100 rounded-xl overflow-hidden my-5 group relative ${
                    activeTab === "about" || activeTab === "About"
                      ? "block"
                      : "hidden lg:block"
                  }`}
                >
                  <div className="flex gap-4  justify-between items-center mb-6">
                    <h2 className="text-xl  font-medium">Education</h2>
                    <div className="flex items-center gap-4">
                      <button
                        className="text-gray-500"
                        onClick={() => setIsEditMode(!isEditMode)}
                      >
                        <img src={edit} alt="" />
                      </button>
                      <button
                        className="flex items-center space-x-1 bg-maincl text-white px-2 py-2 rounded-full hover:bg-fillc text-sm"
                        onClick={() => {
                          setEditingEducation(null);
                          setIsEducationFormOpen(true);
                        }}
                      >
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    {userDetails?.educations?.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600 text-sm">
                          Adding your educational background will help
                          demonstrate your qualifications and expertise, making
                          your profile more well-rounded and informative!
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Desktop View */}
                        <div className="hidden lg:block">
                          {/* Left scroll button - Only show if more than 3 items */}
                          {userDetails?.educations?.length > 3 && (
                            <button
                              className="absolute left-0 top-1/3 z-50 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                              onClick={() => {
                                const container =
                                  document.getElementById("education-scroll");
                                if (container) container.scrollLeft -= 300;
                              }}
                            >
                              <img
                                src={arrowright}
                                alt="Previous"
                                className="w-4 h-4 transform rotate-180"
                              />
                            </button>
                          )}

                          {/* Right scroll button - Only show if more than 3 items */}
                          {educationData.length > 3 && (
                            <button
                              className="absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                              onClick={() => {
                                const container =
                                  document.getElementById("education-scroll");
                                if (container) container.scrollLeft += 300;
                              }}
                            >
                              <img
                                src={arrowright}
                                alt="Next"
                                className="w-4 h-4"
                              />
                            </button>
                          )}

                          <ol
                            id="education-scroll"
                            className="flex overflow-x-auto scrollbar-hide scroll-smooth"
                          >
                            {educationData.map((edu, index) => (
                              <li
                                key={index}
                                className="relative flex-none w-72 mb-6 mr-8 last:mr-0"
                              >
                                <div className="flex items-center">
                                  <div className="z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full ring-0 ring-white sm:ring-8 shrink-0 overflow-hidden border-2 border-gray-100">
                                    <img
                                      src={edu.logo}
                                      alt={`${edu.institution} logo`}
                                      className="w-12 h-12 object-cover"
                                    />
                                  </div>
                                  {index < educationData.length - 1 && (
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
                                  )}
                                </div>
                                <div className="mt-3 sm:pe-8 relative">
                                  {isEditMode && (
                                    <button
                                      onClick={() => {
                                        setEditingEducation(edu);
                                        setIsEducationFormOpen(true);
                                      }}
                                      className="absolute right-0 top-0 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                      <img
                                        src={edit}
                                        alt="Edit"
                                        className="w-3 h-3"
                                      />
                                    </button>
                                  )}
                                  <h3 className="text-sm w-72 overflow-hidden text-ellipsis whitespace-wrap font-normal text-gray-900">
                                    {edu.institution}
                                  </h3>
                                  <p className="text-xs font-light text-gray-600">
                                    {edu.degree}
                                  </p>
                                  <time className="block mb-2 text-xs font-normal text-gray-500">
                                    {edu.year}
                                  </time>
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Mobile View */}
                        <div className="lg:hidden flex flex-col space-y-8">
                          {educationData
                            .slice(0, expanded ? educationData.length : 3)
                            .map((edu, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-4"
                              >
                                <div className="flex-shrink-0">
                                  <img
                                    src={edu.logo}
                                    alt={`${edu.institution} logo`}
                                    className="w-12 h-12 rounded-full border-2 border-gray-100"
                                  />
                                </div>
                                <div className="flex-grow relative">
                                  {isEditMode && (
                                    <button
                                      onClick={() => {
                                        setEditingEducation(edu);
                                        setIsEducationFormOpen(true);
                                      }}
                                      className="absolute right-0 top-0 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                      <img
                                        src={edit}
                                        alt="Edit"
                                        className="w-3 h-3"
                                      />
                                    </button>
                                  )}
                                  <h3 className="text-sm font-normal text-gray-900">
                                    {edu.institution}
                                  </h3>
                                  <p className="text-xs font-light text-gray-600">
                                    {edu.degree}
                                  </p>
                                  <time className="block text-xs font-normal text-gray-500">
                                    {edu.year}
                                  </time>
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
                              <img
                                src={arrowright}
                                alt=""
                                className={`transform ${
                                  expanded ? "rotate-180" : ""
                                } w-4 h-4`}
                              />
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* Education Form */}
                <EducationForm
                  isOpen={isEducationFormOpen}
                  onClose={() => {
                    setIsEducationFormOpen(false);
                    setEditingEducation(null);
                  }}
                  onSubmit={(data: EducationFormData) => {
                    if (editingEducation) {
                      // Update existing education
                      const updatedEducation = educationData.map((edu) =>
                        edu === editingEducation
                          ? {
                              ...data,
                              logo:
                                data.logo instanceof File
                                  ? URL.createObjectURL(data.logo)
                                  : data.logo,
                            }
                          : edu
                      );
                      setEducationData(updatedEducation);
                    } else {
                      // Add new education
                      const logoUrl =
                        data.logo instanceof File
                          ? URL.createObjectURL(data.logo)
                          : data.logo ||
                            "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372";

                      const newEducation: Education = {
                        institution: data.institution,
                        degree: data.degree,
                        year: data.year,
                        logo: logoUrl,
                      };
                      setEducationData([...educationData, newEducation]);
                    }
                    setIsEducationFormOpen(false);
                    setEditingEducation(null);
                  }}
                  initialData={
                    editingEducation
                      ? {
                          institution: editingEducation.institution,
                          degree: editingEducation.degree,
                          year: editingEducation.year,
                          logo: editingEducation.logo,
                          notifyFollowers: false,
                        }
                      : undefined
                  }
                  isEditing={!!editingEducation}
                  key={
                    editingEducation
                      ? editingEducation.institution
                      : "new-education"
                  }
                />

                <div
                  className={`flex flex-col lg:flex-row gap-6 ${
                    activeTab === "about" || activeTab === "About"
                      ? "block"
                      : "hidden lg:block"
                  }`}
                >
                  {/* Areas of Interest Card */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-between bg-white shadow-md rounded-xl p-6">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">
                          Areas of Interest
                        </h2>
                        <div className="flex gap-4">
                          <button
                            onClick={() =>
                              setShowInterestEditButtons(
                                !showInterestEditButtons
                              )
                            }
                            className="text-gray-500 hover:text-blue-500"
                          >
                            <img src={edit} alt="" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingInterest(null); // Clear any existing editing interest
                              setIsAddInterestFormOpen(true);
                            }}
                            className="flex items-center space-x-1 bg-maincl text-white px-1 py-1 rounded-full hover:bg-fillc text-sm"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Interest List */}
                      {interestsData.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-600 text-sm">
                            Adding your areas of interest will help showcase
                            your passions and strengths, making your profile
                            more personalized and impactful!
                          </p>
                        </div>
                      ) : (
                        <ul className="space-y-3">
                          {interestsData
                            .slice(
                              0,
                              interestsexpanded ? interestsData.length : 4
                            )
                            .map((interest, index) => (
                              <li
                                key={index}
                                className="border-b py-2 last:border-none"
                              >
                                <div className="flex justify-between items-center">
                                  <p className="text-sm text-gray-600">
                                    {interest.name}
                                  </p>
                                  {showInterestEditButtons && (
                                    <button
                                      onClick={() => {
                                        setEditingInterest({
                                          id: interest.id,
                                          name: interest.name,
                                        });
                                        setIsAddInterestFormOpen(true);
                                      }}
                                      className="text-gray-400 hover:text-gray-600"
                                    >
                                      <img
                                        src={edit}
                                        alt="Edit"
                                        className="w-4 h-4"
                                      />
                                    </button>
                                  )}
                                </div>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>

                    {/* Footer Link - Only show if there are more than 4 interests */}
                    {interestsData.length > 4 && (
                      <button
                        onClick={() => setInterestsExpanded(!interestsexpanded)}
                        className="mt-4 text-blue-600 text-sm font-medium cursor-pointer flex items-center gap-1"
                      >
                        {interestsexpanded
                          ? "Show Less"
                          : "See all Areas of Interest"}{" "}
                        →
                      </button>
                    )}
                  </div>
                  <InterestForm
                    isOpen={isAddInterestFormOpen}
                    onClose={() => {
                      setIsAddInterestFormOpen(false);
                      setEditingInterest(null);
                    }}
                    onSubmit={(data: InterestFormData) => {
                      if (editingInterest) {
                        // Update existing interest
                        const updatedInterests = interestsData.map((interest) =>
                          interest.id === editingInterest.id
                            ? { ...interest, name: data.name }
                            : interest
                        );
                        setInterestsData(updatedInterests);
                      } else {
                        // Add new interest
                        const newInterest = {
                          id: String(Date.now()),
                          name: data.name,
                        };
                        setInterestsData((prevInterests) => [
                          ...prevInterests,
                          newInterest,
                        ]);
                      }
                      setIsAddInterestFormOpen(false);
                      setEditingInterest(null);
                    }}
                    initialData={{
                      name: editingInterest ? editingInterest.name : "",
                      notifyFollowers: false,
                    }}
                    isEditing={!!editingInterest}
                    key={editingInterest ? editingInterest.id : "new"}
                  />

                  {/* Licenses and Certification Card */}
                  <div
                    className={`w-full lg:w-1/2 bg-white shadow-md rounded-xl p-6 ${
                      activeTab === "about" || activeTab === "About"
                        ? "block"
                        : "hidden lg:block"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium">
                        Licenses and Certification
                      </h2>
                      <div className="flex gap-4">
                        <button
                          onClick={() =>
                            setShowCertEditButtons(!showCertEditButtons)
                          }
                          className="text-gray-500 hover:text-blue-500"
                        >
                          <img src={edit} alt="" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingCertification(null);
                            setIsCertificationFormOpen(true);
                          }}
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
                          Including your licenses and certifications highlights
                          your expertise and qualifications, boosting your
                          profile's credibility and professionalism.
                        </p>
                      </div>
                    ) : (
                      <>
                        <ul className="space-y-4">
                          {certificationData
                            .slice(
                              0,
                              showAllCertifications
                                ? certificationData.length
                                : 2
                            )
                            .map((cert) => (
                              <li
                                key={cert.id}
                                className="border-b pb-2 last:border-none"
                              >
                                <div className="flex items-start gap-4 relative">
                                  <div className="w-12 h-12 bg-gray-200 rounded-full">
                                    <img
                                      src={cert.logo}
                                      alt={cert.title}
                                      className="w-full h-full rounded-full"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-normal text-sm line-clamp-1">
                                          {cert.title}
                                        </p>
                                        <p className="text-sm text-gray-400 line-clamp-1">
                                          {cert.organization}
                                        </p>
                                        <p className="text-xs text-gray-700">
                                          Issued: {cert.issueDate}
                                        </p>
                                        <button className="mt-2 px-2 py-1 border text-xs rounded-3xl text-maincl border-gray-200 hover:bg-blue-50">
                                          Show Credential
                                        </button>
                                      </div>
                                      {showCertEditButtons && (
                                        <button
                                          onClick={() => {
                                            setEditingCertification(cert);
                                            setIsCertificationFormOpen(true);
                                          }}
                                          className="text-gray-400 hover:text-gray-600"
                                        >
                                          <img
                                            src={edit}
                                            alt="Edit"
                                            className="w-4 h-4"
                                          />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>

                        {/* Footer Link - Only show if there are more than 2 certifications */}
                        {certificationData.length > 2 && (
                          <button
                            onClick={() =>
                              setShowAllCertifications(!showAllCertifications)
                            }
                            className="mt-4 text-blue-600 text-sm font-medium cursor-pointer flex items-center gap-1"
                          >
                            {showAllCertifications
                              ? "Show Less"
                              : "See all Licenses and Certification"}{" "}
                            →
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/* Certification Form */}
                <CertificationForm
                  isOpen={isCertificationFormOpen}
                  onClose={() => {
                    setIsCertificationFormOpen(false);
                    setEditingCertification(null);
                  }}
                  onSubmit={(data: CertificationFormData) => {
                    if (editingCertification) {
                      // Update existing certification
                      const updatedCertifications = certificationData.map(
                        (cert) =>
                          cert.id === editingCertification.id
                            ? {
                                ...cert,
                                title: data.title,
                                organization: data.organization,
                                issueDate: data.issueDate,
                                logo:
                                  data.logo instanceof File
                                    ? URL.createObjectURL(data.logo)
                                    : cert.logo,
                              }
                            : cert
                      );
                      setCertificationData(updatedCertifications);
                    } else {
                      // Add new certification
                      const newCertification = {
                        id: String(Date.now()),
                        title: data.title,
                        organization: data.organization,
                        issueDate: data.issueDate,
                        logo:
                          data.logo instanceof File
                            ? URL.createObjectURL(data.logo)
                            : "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372",
                      };
                      setCertificationData([
                        ...certificationData,
                        newCertification,
                      ]);
                    }
                    setIsCertificationFormOpen(false);
                    setEditingCertification(null);
                  }}
                  initialData={
                    editingCertification
                      ? {
                          title: editingCertification.title,
                          organization: editingCertification.organization,
                          issueDate: editingCertification.issueDate,
                          logo: editingCertification.logo,
                          notifyFollowers: false,
                        }
                      : undefined
                  }
                  isEditing={!!editingCertification}
                />

                {/* Memberships */}
                {/* Memberships */}
                <div
                  className={`bg-white shadow-md rounded-xl py-8 lg:px-6 px-4 my-4 ${
                    activeTab === "memberships" || activeTab === "Memberships"
                      ? "block"
                      : "hidden lg:block"
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium">Memberships</h2>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowEditButtons(!showEditButtons)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <img src={edit} alt="" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingMembership(null); // Clear any existing editing membership
                          setIsAddMembershipFormOpen(true);
                        }}
                        className="flex items-center space-x-1 bg-maincl text-white px-1 py-1 rounded-full hover:bg-fillc text-sm"
                      >
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Membership List */}
                  {memberships.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 text-sm">
                        Adding your memberships will showcase your professional
                        affiliations and involvement, helping to strengthen your
                        profile and credibility!
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
                              const container =
                                document.getElementById("memberships-scroll");
                              if (container) {
                                container.scrollLeft -= 200;
                              }
                            }}
                          >
                            <img
                              src={arrowright}
                              alt="Previous"
                              className="w-4 h-4 transform rotate-180"
                            />
                          </button>

                          <button
                            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const container =
                                document.getElementById("memberships-scroll");
                              if (container) {
                                container.scrollLeft += 200;
                              }
                            }}
                          >
                            <img
                              src={arrowright}
                              alt="Next"
                              className="w-4 h-4"
                            />
                          </button>
                        </>
                      )}

                      {/* Content container with different layouts for mobile and desktop */}
                      <div
                        id="memberships-scroll"
                        className={`${
                          isMobile
                            ? "flex flex-col space-y-4"
                            : "overflow-x-auto scrollbar-hide scroll-smooth"
                        }`}
                      >
                        <div
                          className={`${isMobile ? "space-y-4" : "flex gap-6"}`}
                        >
                          {memberships.map((membership) => (
                            <div
                              key={membership.id}
                              className={`flex items-center justify-between ${
                                !isMobile && "min-w-[200px]"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={membership.image}
                                  alt={membership.name}
                                  className="w-10 h-10 rounded-full"
                                />
                                <div>
                                  <p className="font text-xs">
                                    {membership.name}
                                  </p>
                                  <p className="text-fontlit text-gray-500">
                                    {membership.category}
                                  </p>
                                </div>
                              </div>
                              {showEditButtons && (
                                <button
                                  onClick={() => {
                                    setEditingMembership(membership);
                                    setIsAddMembershipFormOpen(true);
                                  }}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <img
                                    src={edit}
                                    alt="Edit"
                                    className="w-4 h-4"
                                  />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Membership Form Modal */}
                {isAddMembershipFormOpen && (
                  <MembershipForm
                    isOpen={isAddMembershipFormOpen}
                    onClose={() => {
                      setIsAddMembershipFormOpen(false);
                      setEditingMembership(null);
                    }}
                    onSubmit={(data: MembershipFormData) => {
                      if (editingMembership) {
                        // Update existing membership
                        const updatedMemberships = memberships.map(
                          (membership) =>
                            membership.id === editingMembership.id
                              ? {
                                  ...membership,
                                  name: data.name,
                                  category: data.category,
                                  // Keep the existing image if no new file is provided
                                  image: data.image
                                    ? URL.createObjectURL(data.image)
                                    : membership.image,
                                }
                              : membership
                        );
                        setMemberships(updatedMemberships);
                      } else {
                        // Add new membership
                        const newMembership: Membership = {
                          id: Date.now(),
                          name: data.name,
                          category: data.category,
                          image: data.image
                            ? URL.createObjectURL(data.image)
                            : "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372",
                        };
                        setMemberships([...memberships, newMembership]);
                      }
                      setIsAddMembershipFormOpen(false);
                      setEditingMembership(null);
                    }}
                    initialData={
                      editingMembership
                        ? {
                            name: editingMembership.name,
                            category: editingMembership.category || "",
                            image: null,
                            notifyFollowers: false,
                          }
                        : undefined
                    }
                    isEditing={!!editingMembership}
                  />
                )}

                {/* Awards and Achievements */}
                <div
                  className={`bg-white shadow-md rounded-xl p-6 ${
                    activeTab === "about" || activeTab === "About"
                      ? "block"
                      : "hidden lg:block"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">
                      Awards and Achievements
                    </h2>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowEditButtons(!showEditButtons)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <img src={edit} alt="" /> {/* Edit Icon */}
                      </button>
                      <button
                        onClick={() => {
                          setEditingAward(null); // Clear any existing editing award
                          setIsAwardFormOpen(true);
                        }}
                        className="flex items-center space-x-1 bg-maincl text-white px-1 py-1 rounded-full hover:bg-fillc text-sm"
                      >
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Awards List */}
                  <div>
                    {userDetails?.awards?.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600 text-sm">
                          Adding your awards and achievements highlights your
                          accomplishments and sets you apart, making your
                          profile more impressive and memorable.
                        </p>
                      </div>
                    ) : (
                      <>
                        {userDetails?.awards
                          ?.slice(0, expanded ? awards.length : 2)
                          .map((award: any) => (
                            <div
                              key={award.id}
                              className="border-b pb-4 mb-4 last:border-none"
                            >
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="text-sm font-medium">
                                    {award.awardName}
                                  </h3>
                                  <p className="text-gray-600 font-light text-sm">
                                    {award.awardedBy} ({award.awardedOn})
                                  </p>
                                  <p className="text-gray-700 text-normal text-sm">
                                    {award.descreption}
                                  </p>
                                  {award.credentialLink && (
                                    <a
                                      href={award.credentialLink}
                                      className="mt-2 inline-block text-maincl border border-gray-200 rounded-3xl px-3 py-1 text-xs"
                                    >
                                      Show Credential
                                    </a>
                                  )}
                                </div>
                                {showEditButtons && (
                                  <button
                                    onClick={() => {
                                      // Set the award data to edit
                                      setEditingAward({
                                        id: award.id,
                                        title: award.awardName,
                                        organization: award.awardedBy,
                                        year: award.awardedOn,
                                        description: award.descreption,
                                        credentialLink:
                                          award.credentialLink || "",
                                      });
                                      setIsAwardFormOpen(true);
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                  >
                                    <img
                                      src={edit}
                                      alt="Edit"
                                      className="w-4 h-4"
                                    />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}

                        {/* Expand Button - Only show if there are more than 2 awards */}
                        {userDetails?.awards.length > 2 && (
                          <button
                            onClick={() => setExpanded(!expanded)}
                            className="w-full text-blue-600 text-sm font-medium flex items-center mt-2"
                          >
                            {expanded
                              ? "Show Less"
                              : "See all Awards and Achievements"}{" "}
                            →
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/* Award Form Modal */}
                <AwardForm
                  isOpen={isAwardFormOpen}
                  onClose={() => {
                    setIsAwardFormOpen(false);
                    setEditingAward(null);
                  }}
                  onSubmit={(data: AwardFormData) => {
                    if (editingAward) {
                      // Update existing award

                      handleaddaward(data);

                      const updatedAwards = awards.map((award) =>
                        award.id === editingAward.id
                          ? { ...award, ...data }
                          : award
                      );
                      setAwards(updatedAwards);
                    } else {
                      // Add new award
                      handleaddaward(data);
                    }
                    setIsAwardFormOpen(false);
                    setEditingAward(null);
                  }}
                  initialData={
                    editingAward
                      ? {
                          title: editingAward.title,
                          organization: editingAward.organization,
                          year: editingAward.year,
                          description: editingAward.description,
                          credentialLink: editingAward.credentialLink || "",
                        }
                      : undefined
                  } // Transform Award to AwardFormData
                  isEditing={!!editingAward}
                />

                {/* tabs for the desktop */}

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
                              ? "border-blue-500 text-blue-500"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Tab content sections will be added here later */}
                    <div className="mt-6 ">
                      {activeDesktopTab === "activity" && (
                        <div className="space-y-1">
                          {/* Posts Section */}
                          <div className="mb-8">
                            <div className="flex justify-between items-center">
                              <h2 className="text-xl font-medium">Posts</h2>
                              <button
                                onClick={() => setShowAllPosts(!showAllPosts)}
                                className="text-fillc text-sm font-medium flex items-center gap-1"
                              >
                                {showAllPosts ? "Show Less" : "See all Posts"}
                                <img
                                  src={arrowright}
                                  alt=""
                                  className={`transform ${
                                    showAllPosts ? "rotate-180" : ""
                                  } w-4 h-4`}
                                />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-1 transition-all duration-300">
                              {userDetails?.posts
                                .slice(0, showAllPosts ? posts.length : 2)
                                .map((post: any) => (
                                  <PostCard
                                    key={post.id}
                                    userTitle={userDetails.bio}
                                    postTitle={post.title}
                                    userImage={post.userImage}
                                    userName={userDetails.name}
                                    timeAgo={post.time}
                                    content={post.description}
                                    likes={post._count.likes}
                                    reposts={post.reposts}
                                    comments={post._count.comments}
                                    images={post?.postImageLinks}
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
                                onClick={() =>
                                  setShowAllQuestions(!showAllQuestions)
                                }
                                className="text-fillc text-sm font-medium flex items-center gap-1"
                              >
                                {showAllQuestions
                                  ? "Show Less"
                                  : "See all Questions"}
                                <img
                                  src={arrowright}
                                  alt=""
                                  className={`transform ${
                                    showAllQuestions ? "rotate-180" : ""
                                  } w-4 h-4`}
                                />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 transition-all duration-300">
                              {questions
                                .slice(
                                  0,
                                  showAllQuestions ? questions.length : 2
                                )
                                .map((question) => (
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
                                onClick={() =>
                                  setShowAllResources(!showAllResources)
                                }
                                className="text-fillc text-sm font-medium flex items-center gap-1"
                              >
                                {showAllResources
                                  ? "Show Less"
                                  : "See all Resources"}
                                <img
                                  src={arrowright}
                                  alt=""
                                  className={`transform ${
                                    showAllResources ? "rotate-180" : ""
                                  } w-4 h-4`}
                                />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-8 p-2">
                              {resources
                                .slice(
                                  0,
                                  showAllResources ? resources.length : 2
                                )
                                .map((resource) => (
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
                                <img
                                  src={arrowright}
                                  alt=""
                                  className="w-4 h-4"
                                />
                              </button>
                            </div>

                            {/* Media Tabs */}
                            <div className="flex gap-2 mb-4">
                              {["Photos", "Videos", "Other"].map((tab) => (
                                <button
                                  key={tab}
                                  onClick={() =>
                                    setActiveMediaTab(
                                      tab as "Photos" | "Videos" | "Other"
                                    )
                                  }
                                  className={`px-4 py-2 rounded-full text-sm ${
                                    activeMediaTab === tab
                                      ? "bg-blue-100 text-blue-600"
                                      : "text-gray-600 hover:bg-gray-100"
                                  }`}
                                >
                                  {tab}
                                </button>
                              ))}
                            </div>

                            {/* Media Grid */}
                            <div className="grid grid-cols-3 gap-3 p-4">
                              {mediaItems.map((item) => (
                                <div
                                  key={item.id}
                                  className="relative aspect-square rounded-lg overflow-hidden"
                                >
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
                              <Link
                                to="#"
                                className="text-blue-600 text-sm hover:underline"
                              >
                                See all Photos →
                              </Link>
                            </div>
                          </div>

                          {/* Mentioned Section */}
                          <div className="pt-8">
                            <div className="flex justify-between items-center mb-6 pr-2">
                              <h2 className="text-xl font-medium">Mentioned</h2>
                              <button>
                                <img src={more1} alt="" className="w-6 h-6" />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                              {mentionedPosts
                                .slice(
                                  0,
                                  showAllMentioned ? mentionedPosts.length : 2
                                )
                                .map((post) => (
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

                            <div className="flex justify-end">
                              <button
                                onClick={() =>
                                  setShowAllMentioned(!showAllMentioned)
                                }
                                className="text-fillc text-sm font-medium flex just  items-center gap-1"
                              >
                                {showAllMentioned
                                  ? "Show Less"
                                  : "See all Mentioned"}
                                <img
                                  src={arrowright}
                                  alt=""
                                  className={`transform ${
                                    showAllMentioned ? "rotate-180" : ""
                                  } w-4 h-4`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Events Section */}
                      {activeDesktopTab === "events" && (
                        <div>
                          <div className="w-full">
                            <EventCalendar />
                          </div>
                        </div>
                      )}
                      {activeDesktopTab === "jobs" && (
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
                                  numberOfApplicants: 0,
                                }}
                              />
                            ))}
                          </div>
                          <button
                            onClick={() => setShowAllJobs(!showAllJobs)}
                            className="text-fillc text-sm font-medium flex just  items-center gap-1"
                          >
                            {showAllJobs ? "Show Less" : "See all Jobs"}
                            <img
                              src={arrowright}
                              alt=""
                              className={`transform ${
                                showAllJobs ? "rotate-180" : ""
                              } w-4 h-4`}
                            />
                          </button>
                        </div>
                      )}
                      {activeDesktopTab === "saved" && (
                        <div className="space-y-8">
                          {/* Saved Posts Section */}
                          <div className="space-y-4">
                            <h2 className="text-xl font-medium">Saved Posts</h2>
                            {savedPosts.length > 0 ? (
                              <div className="grid grid-cols-2 gap-1 transition-all duration-300">
                                {savedPosts.map((post) => (
                                  <PostCard
                                    key={post.id}
                                    postTitle="hafih"
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
                            <h2 className="text-xl font-medium">
                              Saved Questions
                            </h2>
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
                            <h2 className="text-xl font-medium">
                              Saved Resources
                            </h2>
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
                                      numberOfApplicants: 0,
                                    }}
                                  />
                                ))}
                              </div>
                            ) : (
                              <div className="text-center text-gray-500 py-4">
                                No saved jobs yet
                              </div>
                            )}
                          </div>

                          {/* Saved Conferences Section */}
                          <div className="space-y-4">
                            <h2 className="text-xl font-medium">
                              Saved Conferences
                            </h2>
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
                      {activeTab === "drafts" && (
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
    </div>
  );
};

export default Profile;
