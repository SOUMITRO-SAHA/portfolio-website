"use client";

import { getOverlayStyle, getPopupStyle } from "@/assets/constant";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { XIcon } from "lucide-react";
import * as React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  overlayClassName?: string;
  popupClassName?: string;
  className?: string;
  targetID?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  isOpen,
  overlayClassName,
  popupClassName,
  className,
  onClose,
}) => {
  const [isClient, setIsClient] = React.useState(false);

  // Side Effect
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={cn(getOverlayStyle(isOpen), overlayClassName)}>
      <div
        className={cn(
          getPopupStyle(isOpen),
          popupClassName,
          "relative dark:bg-slate-900",
        )}
      >
        <div>
          <h2 className="text-lg font-semibold capitalize leading-relaxed">
            {title}
          </h2>

          <Button
            variant={"outline"}
            className={cn("absolute right-2 top-2 h-10 w-10 rounded-full p-1")}
            onClick={onClose}
          >
            <XIcon />
          </Button>
        </div>

        {/* Body */}
        <div className={className}>{children}</div>
      </div>
    </div>,
    modalRoot,
  );
};
