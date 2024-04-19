import { getServerAuthSession } from "@/server/auth";
import { config } from "@/shared";
import { notFound, redirect } from "next/navigation";
import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = async ({ children }) => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return redirect("/auth/login");
  }

  if (!config.ADMIN_EMAIL.includes(session.user.email)) {
    return notFound();
  }
  return <>{children}</>;
};

export default AdminLayout;
