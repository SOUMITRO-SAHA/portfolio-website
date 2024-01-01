import { cn } from "@/app/utils";
import React, { type ReactEventHandler } from "react";
import Loader from "../Loader";

interface PrimaryButtonProps {
  loading: boolean;
  text: string;
  type: string;
  buttonType: string;
  className: string;
  onClick: ReactEventHandler;
}

const Button: React.FC<PrimaryButtonProps> = ({
  loading,
  text,
  type,
  buttonType,
  className,
  onClick,
}) => {
  return React.createElement(
    buttonType,
    {
      className: cn(
        "px-10 p-3 flex justify-center items-center bg-primary-color text-white rounded cursor-pointer",
        className,
      ),
      onClick: onClick,
      type: type,
    },
    loading ? <Loader size={25} /> : text,
  );
};

export default Button;
