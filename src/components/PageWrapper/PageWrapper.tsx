"use client";

import { StoreProvider } from "@/store/store";
import React from "react";
import { SideMenu } from "../Sidebar";
import MobileMenu from "../Sidebar/Mobile";
import { ThemeProvider } from "../ui/theme-provider";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <main className="grid grid-cols-12 gap-4">
          {/* Mobile Menu */}
          <main className="col-span-full md:hidden">
            <MobileMenu />
          </main>

          {/* Desktop Menu */}
          <main className="hidden md:col-span-3 md:block xl:col-span-2">
            <SideMenu />
          </main>

          {/* Body */}
          <main className="col-span-full md:col-span-9 xl:col-span-10">
            {children}
          </main>
        </main>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default PageWrapper;
