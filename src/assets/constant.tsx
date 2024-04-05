import { cn } from "@/utils";
import { Atom, GitPullRequestArrow, Home, Rss } from "lucide-react";
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

export const menuItems: MenuItem[] = [
  { id: 1, name: "Home", link: "/", icon: <Home /> },
  {
    id: 2,
    name: "Projects",
    link: "/projects",
    icon: <Atom />,
  },
  {
    id: 3,
    name: "Open Source",
    link: "/open-source",
    icon: <GitPullRequestArrow />,
  },
  {
    id: 4,
    name: "Blogs",
    link: "/blogs",
    icon: <Rss />,
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
