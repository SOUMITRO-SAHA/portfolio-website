import { type MenuItem } from "@/app/assets/constant";
import React from "react";
import MenuItems from "./Item.Component";

interface MenusProps {
  menuItems: Array<MenuItem>;
}

const Menus: React.FC<MenusProps> = ({ menuItems }) => {
  return (
    <div className="flex flex-col gap-3">
      {menuItems.map((item) => (
        <MenuItems
          id={item?.id}
          name={item?.name}
          link={item?.link}
          icon={item?.icon}
        />
      ))}
    </div>
  );
};

export default Menus;
