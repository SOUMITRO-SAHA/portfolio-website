import React from "react";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { config } from "@/shared";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = async ({ children }) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    return redirect("/auth/login");
  }

  if (!config.ADMIN_EMAIL.includes(session.user.email)) {
    return notFound();
  }
  return <>{children}</>;
};

export default AdminLayout;
