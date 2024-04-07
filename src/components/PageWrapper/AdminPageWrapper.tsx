"use client";

import { adminMenuItems } from "@/assets/admin-constant";
import { ThemeProvider } from "@/components/common/theme-provider";
import { StoreProvider } from "@/store/store";
import React from "react";
import { SideMenu } from "../sidebar";

export const AdminPageWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main className="grid h-screen w-screen grid-cols-12 gap-4 dark:bg-secondary">
          {/* Desktop Menu */}
          <main className="col-span-3 xl:col-span-2">
            <SideMenu menuItems={adminMenuItems} />
          </main>

          {/* Body */}
          <main className="col-span-full p-6 px-4 md:col-span-9 xl:col-span-10">
            {children}
          </main>
        </main>
      </ThemeProvider>
    </StoreProvider>
  );
};
