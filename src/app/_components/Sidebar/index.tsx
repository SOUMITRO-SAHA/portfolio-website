"use client";
import { menuItems, socials, userInfo } from "@/app/assets/constant";
import React from "react";
import ProfileDetails from "./ProfileDetails.Component";
import Menus from "./Menus.Component";
import Link from "next/link";
import Image from "next/image";

const SideMenu: React.FC = () => {
  return (
    <section className="flex h-screen w-full flex-col justify-between bg-slate-950 text-white">
      <div className="flex flex-col gap-4">
        {/* Profile */}
        <ProfileDetails name={userInfo?.name} shortInfo={userInfo?.shortInfo} />

        {/* Menu Items */}
        <Menus menuItems={menuItems} />
      </div>

      {/* Socials */}
      <div className="flex w-full items-center justify-center gap-3 bg-slate-900">
        {socials.map(({ id, icon, title, link }) => (
          <Link href={link} title={title}>
            <div key={id} title={title} className="py-2">
              <Image
                src={icon}
                alt={title}
                title={title}
                className="h-8 w-8 p-1"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SideMenu;
