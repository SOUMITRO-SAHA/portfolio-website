"use client";

import { StoreProvider } from "@/store/store";
import React from "react";
import { SideMenu } from "../Sidebar";
import MobileMenu from "../Sidebar/Mobile";
import { ThemeProvider } from "@/components/common/theme-provider";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main className="grid grid-cols-12 gap-4 dark:bg-secondary">
          {/* Mobile Menu */}
          <main className="col-span-full md:hidden">
            <MobileMenu />
          </main>

          {/* Desktop Menu */}
          <main className="hidden md:col-span-3 md:block xl:col-span-2">
            <SideMenu />
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
