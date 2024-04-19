import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = async ({ children }) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default LoginLayout;
