"use client";
import { cn } from "@/utils";
import { userInfo } from "@/assets/constant";
import { GanttChart } from "lucide-react";
import Image from "next/image";
import { ProfilePhoto } from "public/photos";
import React, { useState } from "react";
import { SideMenu } from ".";

const MobileMenu: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  return (
    <section className="overflow-x-hidden">
      <div className="container mx-auto flex h-20 w-full items-center justify-between bg-black px-3">
        {/* Profile Icon Small */}
        <div className="flex items-center justify-center gap-2">
          <Image
            src={ProfilePhoto}
            alt={"Profile Photo Small"}
            className={cn("h-12 w-12 rounded")}
          />
          <div className="text-gray-1 uppercase">{userInfo.name}</div>
        </div>

        {/* Burgur Icon for Opening the Menu */}
        <div
          className="cursor-pointer rounded-full p-1 hover:bg-slate-700 active:bg-slate-700"
          onClick={() => setToggleMenu((prev) => !prev)}
        >
          <GanttChart className={cn("text-white")} />
        </div>
      </div>

      {/* Conditionally Show the Menu */}
      {toggleMenu && (
        <div className="h-[100vh] w-full overflow-y-auto bg-slate-950">
          <SideMenu />
        </div>
      )}
    </section>
  );
};

export default MobileMenu;
