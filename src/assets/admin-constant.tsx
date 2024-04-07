import {
  GitPullRequestArrow,
  NotebookPen,
  Rss,
  SquareLibrary,
  User,
} from "lucide-react";
import type { MenuItem } from "./constant";

export const adminMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "User",
    link: "/admin/user",
    icon: <User className="text-primary" />,
  },
  {
    id: 2,
    name: "Experience",
    link: "/admin/experience",
    icon: <NotebookPen className="text-primary" />,
  },
  {
    id: 3,
    name: "Education",
    link: "/admin/education",
    icon: <SquareLibrary className="text-primary" />,
  },
  {
    id: 4,
    name: "Open Source",
    link: "/admin/open-source",
    icon: <GitPullRequestArrow className="text-primary" />,
  },
  {
    id: 5,
    name: "Blogs",
    link: "/admin/blogs",
    icon: <Rss className="text-primary" />,
  },
];
