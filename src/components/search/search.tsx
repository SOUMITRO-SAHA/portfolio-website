"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

interface SearchProps {
  placeholder?: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: React.FC<SearchProps> = ({
  state,
  setState,
  placeholder = "Search...",
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [systemKey, setSystemKey] = React.useState<string>("Ctrl");

  React.useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (inputRef.current) inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", downHandler);
    return () => document.removeEventListener("keydown", downHandler);
  }, []);

  React.useEffect(() => {
    const platform = navigator.platform.toLowerCase();
    setSystemKey(platform.startsWith("mac") ? "⌘" : "Ctrl");
  }, []);

  return (
    <div className="group flex h-10 w-[300px] items-center rounded-md bg-background focus-within:ring-1 focus-within:ring-primary">
      <Button
        variant="ghost"
        className="hover:bg-background"
        size="icon"
        onClick={() => {
          if (inputRef.current) inputRef.current.focus();
        }}
      >
        <SearchIcon className="h-4 w-4" />
      </Button>

      <input
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
        ref={inputRef}
        className="placeholder-italic h-full w-full bg-background py-2 outline-none"
      />

      <kbd className="mr-2 flex items-center justify-center gap-1 rounded-md bg-muted p-1 px-2 text-xs">
        <span>{systemKey}</span>
        <span>+</span>
        <span>k</span>
      </kbd>
    </div>
  );
};
