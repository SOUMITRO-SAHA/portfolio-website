import * as React from "react";
import {
  Home,
  GitPullRequestArrow,
  Rss,
  Atom,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

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
    name: "Blog",
    link: "/blog",
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
    icon: <Github />,
    link: "https://github.com/SOUMITRO-SAHA",
  },
  {
    id: 2,
    title: "linkedin",
    icon: <Linkedin />,
    link: "https://www.linkedin.com/in/soumitra-saha-a9810622a/",
  },
  {
    id: 3,
    title: "twitter | X",
    icon: <Twitter />,
    link: "https://www.linkedin.com/in/soumitra-saha-a9810622a/",
  },
];
