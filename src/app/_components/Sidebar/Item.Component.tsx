import { type MenuItem } from "@/app/assets/constant";
import { cn } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MenuItems: React.FC<MenuItem> = ({ id, name, link, icon, iconLight }) => {
  return (
    <Link key={id} href={link}>
      <div className="font-font-secondary grid cursor-pointer grid-cols-12 items-center gap-2 p-1 px-3 text-lg leading-loose hover:bg-slate-700">
        {icon && (
          <div className={cn(icon ? "col-span-2" : "")}>
            <Image src={icon} alt={name + "_icon"} />
          </div>
        )}
        <div className={cn(icon ? "col-span-10" : "col-span-full")}>{name}</div>
      </div>
    </Link>
  );
};

export default MenuItems;
