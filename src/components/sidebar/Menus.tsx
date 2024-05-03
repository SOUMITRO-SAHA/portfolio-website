import type { MenuItem } from "@/assets";
import { cn } from "@/utils";
import Link from "next/link";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { setActiveTab } from "@/store/slice/appSlice";

interface MenuProps {
  id: number;
  link: string;
  icon: React.ReactNode;
  name: string;
  active: boolean;
}

interface MenusProps {
  menuItems: MenuItem[];
}

export const Menus: React.FC<MenusProps> = ({ menuItems }) => {
  const { app } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  // Function to handle tab click
  const handleTabClick = (tabIndex: number) => {
    dispatch(setActiveTab(tabIndex));
  };

  return (
    <div className="flex flex-col gap-1">
      {menuItems.map((item) => (
        <div onClick={() => handleTabClick(item.id)}>
          <MenuItemComponent
            key={item.id}
            id={item.id}
            name={item.name}
            link={item.link}
            icon={item.icon}
            active={app.activeTab === item.id}
          />
        </div>
      ))}
    </div>
  );
};

export const MenuItemComponent: React.FC<MenuProps> = ({
  id,
  link,
  icon,
  name,
  active,
}) => {
  return (
    <Link href={link} key={id}>
      <div
        className={cn(
          "dark:highlight-white/20 dark:highlight-white/20 mx-1 grid h-12 w-full cursor-pointer grid-cols-12 items-center justify-center gap-2 rounded-lg bg-slate-900 p-2 px-3 text-sm font-semibold leading-loose text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2   focus:ring-offset-slate-50 dark:bg-transparent sm:w-auto",
          active && "dark:bg-sky-500",
          !active && "hover:bg-primary-foreground dark:hover:bg-sky-500/40",
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
