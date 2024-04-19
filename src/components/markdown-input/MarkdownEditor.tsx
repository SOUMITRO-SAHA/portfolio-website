import * as React from "react";
import Markdown from "react-markdown";
import { Button } from "../ui/button";
import { cn } from "@/utils";

interface MarkdownEditorProps {
  initialState?: string;
  onChange?: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialState = "",
  onChange,
}) => {
  const [markdownContent, setMarkdownContent] =
    React.useState<string>(initialState);
  const [selectedTab, setSelectedTab] = React.useState<1 | 2>(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMarkdownContent(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="grid h-full max-h-[400px] w-full grid-cols-12 items-center gap-3 overflow-y-auto">
      <textarea
        value={markdownContent}
        onChange={handleInputChange}
        placeholder="Type your Markdown here..."
        className="col-span-6 h-full w-full resize-none rounded bg-background p-2 px-3"
      />

      <div className="col-span-6 h-full w-full overflow-y-auto rounded border p-2 px-8 shadow-lg dark:bg-slate-800">
        {markdownContent ? (
          <Markdown className={cn("[&>ul]:list-disc")}>
            {markdownContent}
          </Markdown>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg">
            No Preview Yet!!!
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
