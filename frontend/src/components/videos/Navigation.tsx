import * as React from "react";
import { useState } from "react";
import home1 from "../../assets/icon/home1.svg";
import home2 from "../../assets/icon/home2.svg";
import questions1 from "../../assets/icon/questions1.svg";
import questions2 from "../../assets/icon/questions2.svg";
import videos1 from "../../assets/icon/videos1.svg";
import videos2 from "../../assets/icon/videos2.svg";
import connect1 from "../../assets/icon/connect1.svg";
import connect2 from "../../assets/icon/connect2.svg";

import jobs1 from "../../assets/icon/jobs1.svg";
import jobs2 from "../../assets/icon/jobs2.svg";

 interface NavItemProps {
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  onClick?: () => void;
}


const defaultNavItems: NavItemProps[] = [
  {
    activeIcon: <img src={home2} className="w-12 h-12" alt="" />,
    inactiveIcon: <img src={home1} className="w-12 h-12" alt="" />,
    label: "Home",
    path: "/home",
    isActive: false,
  },
  {
    activeIcon: <img src={questions2} className="w-12 h-12" alt="" />,
    inactiveIcon: <img src={questions1} className="w-12 h-12" alt="" />,
    label: "Questions",
    path: "/questions",
    isActive: false,
  },
  {
    activeIcon: <img src={videos2} className="w-12 h-12" alt="" />,
    inactiveIcon: <img src={videos1} className="w-12 h-12" alt="" />,
    label: "Videos",
    path: "/videos",
    isActive: false,
  },
  {
    activeIcon: <img src={connect2} className="w-12 h-12" alt="" />,
    inactiveIcon: <img src={connect1} className="w-12 h-12" alt="" />,
    label: "Connect",
    path: "/connect",
    isActive: false,
  },
 
  {
    activeIcon: <img src={jobs2} className="w-12 h-12" alt="" />,
    inactiveIcon: <img src={jobs1} className="w-12 h-12" alt="" />,
    label: "Jobs",
    path: "/jobs",
    isActive: false,
  },
];

interface NavigationProps {
  items?: NavItemProps[];
}

export const Navigation: React.FC<NavigationProps> = ({
  items = defaultNavItems,
}) => {
  const [navItems, setNavItems] = useState<NavItemProps[]>(items);

  const handleNavClick = (index: number) => {
    const updatedItems = navItems.map((item, i) => ({
      ...item,
      isActive: i === index, 
    }));
    setNavItems(updatedItems);
  };

  return (
    <nav className="fixed  bottom-0 left-0 right-0 max-w-[360px]  mx-auto bg-gray-900  bg-opacity-80 shadow-lg ">
      <div className="flex justify-between  items-center mx-auto px-5 py-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(index)}
            className={`flex flex-col items-center gap-2 ${
              item.isActive ? "text-blue-600" : "text-neutral-500"
            }`}
          >
            {item.isActive ? item.activeIcon : item.inactiveIcon}
          </button>
        ))}
      </div>
    </nav>
  );
};
