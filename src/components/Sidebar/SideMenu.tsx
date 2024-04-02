import { cn } from "@/utils";
import { menuItems, socials, userInfo } from "@/assets/constant";
import Image from "next/image";
import Link from "next/link";
import { ProfilePhoto } from "public/photos";
import React from "react";
import { Menus } from "./Menus";

interface ProfileDetailsProps {
  name: string;
  shortInfo: string;
  imageURL?: string;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  imageURL,
  name,
  shortInfo,
}) => {
  return (
    <div className={cn("mb-6 w-full")}>
      <div
        className={cn(
          "flex h-44 w-full items-center justify-center p-4 px-8 pt-6",
          "gradient-1",
        )}
      >
        <Image
          src={imageURL ?? ProfilePhoto}
          alt="Profile Picture"
          width={150}
          height={150}
          className={cn("rounded-lg object-contain")}
        />
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-2 px-3">
        <h3 className="text-xl uppercase">{name}</h3>
        <p className="font-font-primary text-gray-1 text-sm">{shortInfo}</p>
      </div>
    </div>
  );
};

export const SideMenu: React.FC = () => {
  return (
    <section className="flex h-screen w-full flex-col justify-between bg-slate-950 text-white">
      <div className="flex flex-col gap-4">
        <ProfileDetails name={userInfo?.name} shortInfo={userInfo?.shortInfo} />
        <Menus menuItems={menuItems} />
      </div>
      <div className="flex w-full items-center justify-center gap-3 bg-slate-900">
        {socials.map(({ id, icon, title, link }) => (
          <Link href={link} key={id} title={title}>
            <div title={title} className="cursor-pointer py-2">
              <Image src={icon as string} alt={title} className="h-8 w-8 p-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SideMenu;
