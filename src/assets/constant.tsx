import { cn } from "@/utils";
import { Atom, GitPullRequestArrow, Home, Route, Rss } from "lucide-react";
import * as React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

export interface MenuItem {
  id: number;
  name: string;
  link: string;
  icon?: React.ReactNode;
}

export const userInfo = {
  name: "Soumitra Saha",
  shortInfo: "Full - Stack Developer",
};

export const defaultMenuItems: MenuItem[] = [
  { id: 1, name: "Home", link: "/", icon: <Home className="stroke-primary" /> },
  {
    id: 2,
    name: "Projects",
    link: "/projects",
    icon: <Atom className="stroke-primary" />,
  },
  {
    id: 3,
    name: "My Journey",
    link: "/journey",
    icon: <Route className="stroke-primary" />,
  },
  {
    id: 4,
    name: "Open Source",
    link: "/open-source",
    icon: <GitPullRequestArrow className="stroke-primary" />,
  },
  {
    id: 5,
    name: "Blogs",
    link: "/blogs",
    icon: <Rss className="stroke-primary" />,
  },
];

export interface Social {
  id: number;
  title: string;
  icon: React.ReactNode;
  link: string;
}

export const socials: Social[] = [
  {
    id: 1,
    title: "github",
    icon: <FaGithub />,
    link: "https://github.com/SOUMITRO-SAHA",
  },
  {
    id: 2,
    title: "linkedin",
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/soumitra-saha-a9810622a/",
  },
  {
    id: 3,
    title: "twitter | X",
    icon: <RiTwitterXFill />,
    link: "https://twitter.com/SoumitraSaha100",
  },
];

export const getOverlayStyle = (isOpen = false) => {
  const overlayClasses = cn(
    isOpen
      ? "h-screen w-screen fixed inset-0 backdrop-filter backdrop-blur-sm bg-opacity-50 transition-opacity duration-300 ease-in-out z-10"
      : "hidden",
  );

  return overlayClasses;
};

export const getPopupStyle = (isOpen = false) => {
  const popupClasses = cn(
    isOpen
      ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-md shadow-md w-[60%] bg-background transition-transform duration-300 ease-in-out shadow"
      : "hidden",
  );

  return popupClasses;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
