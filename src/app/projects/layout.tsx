import { PageWrapper } from "@/components/PageWrapper";
import React from "react";

interface ProjectLayoutProps {
  children: React.ReactNode;
}

const ProjectLayout: React.FC<ProjectLayoutProps> = ({ children }) => {
  return <PageWrapper>{children}</PageWrapper>;
};

export default ProjectLayout;
