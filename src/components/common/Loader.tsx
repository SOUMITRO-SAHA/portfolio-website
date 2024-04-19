import * as React from "react";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  size?: number;
  color?: string;
  speedMultiplier?: number;
}

export const Loader: React.FC<LoaderProps> = ({
  size,
  color = "var(color-light-blue)",
  speedMultiplier = 0.85,
}) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ClipLoader color={color} speedMultiplier={speedMultiplier} size={size} />
    </div>
  );
};
