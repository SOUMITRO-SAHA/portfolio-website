import { PageWrapper } from "@/components/PageWrapper";
import React from "react";

interface BlogsLayoutProps {
  children: React.ReactNode;
}

const BlogsLayout: React.FC<BlogsLayoutProps> = ({ children }) => {
  return <PageWrapper>{children}</PageWrapper>;
};

export default BlogsLayout;
