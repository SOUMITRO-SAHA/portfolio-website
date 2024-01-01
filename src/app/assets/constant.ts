import {
  BlogIcon,
  GitHubIcon,
  HomeIcon,
  LinkedIcon,
  OpenSourceIcon,
  ProjectIcon,
  TwitterIcon,
} from "public/svg";
import { type ReactNode } from "react";

export interface MenuItem {
  id: number;
  name: string;
  link: string;
  icon?: string | object;
  iconLight?: string | object;
}

export const userInfo = {
  name: "Soumitra Saha",
  shortInfo: "Full - Stack Developer",
};

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const menuItems: MenuItem[] = [
  { id: 1, name: "Home", link: "/", icon: HomeIcon, iconLight: "" },
  {
    id: 2,
    name: "Projects",
    link: "/projects",
    icon: ProjectIcon,
    iconLight: "",
  },
  {
    id: 3,
    name: "Open Source",
    link: "/open-source",
    icon: OpenSourceIcon,
    iconLight: "",
  },
  {
    id: 4,
    name: "Blog",
    link: "/blog",
    icon: BlogIcon,
    iconLight: "",
  },
];

export interface Social {
  id: number;
  title: string;
  icon: ReactNode;
  link: string;
}

export const socials: Social[] = [
  {
    id: 1,
    title: "github",
    icon: GitHubIcon,
    link: "https://github.com/SOUMITRO-SAHA",
  },
  {
    id: 2,
    title: "linkedin",
    icon: LinkedIcon,
    link: "https://www.linkedin.com/in/soumitra-saha-a9810622a/",
  },
  {
    id: 3,
    title: "twitter | X",
    icon: TwitterIcon,
    link: "https://www.linkedin.com/in/soumitra-saha-a9810622a/",
  },
];
