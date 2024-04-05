import { cn } from "@/utils";
import type { MenuItem } from "@/assets";
import Link from "next/link";
import React from "react";

interface MenuProps {
  id: number;
  link: string;
  icon: React.ReactNode;
  name: string;
}

interface MenusProps {
  menuItems: MenuItem[];
}

export const Menus: React.FC<MenusProps> = ({ menuItems }) => {
  return (
    <div className="flex flex-col gap-3">
      {menuItems.map((item) => (
        <MenuItemComponent
          key={item.id}
          id={item.id}
          name={item.name}
          link={item.link}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export const MenuItemComponent: React.FC<MenuProps> = ({
  id,
  link,
  icon,
  name,
}) => {
  return (
    <Link href={link} key={id}>
      <div
        className={cn(
          "grid cursor-pointer grid-cols-12 items-center gap-2 p-1 px-3 text-sm leading-loose hover:bg-primary-foreground dark:hover:bg-slate-700",
        )}
      >
        {icon && <div className={cn(icon ? "col-span-2" : "")}>{icon}</div>}
        <div
          className={cn("text-primary", icon ? "col-span-10" : "col-span-full")}
        >
          {name}
        </div>
      </div>
    </Link>
  );
};
