import { PageWrapper } from "@/components/PageWrapper";
import React from "react";

interface OpenSourceLayoutProps {
  children: React.ReactNode;
}

const OpenSourceLayout: React.FC<OpenSourceLayoutProps> = ({ children }) => {
  return <PageWrapper>{children}</PageWrapper>;
};

export default OpenSourceLayout;
