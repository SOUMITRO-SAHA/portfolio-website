"use client";

import CEEducation from "@/components/CRUD/education/template/_template";
import { AdminPageWrapper } from "@/components/PageWrapper";
import { AppHeader } from "@/components/app-header";
import { H3, Section, Title } from "@/components/common";
import { Search } from "@/components/search";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { cn } from "@/utils";
import { Plus } from "lucide-react";
import * as React from "react";

const EducationPage = () => {
  const [search, setSearch] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const { data: education, isLoading: educationLoading } =
    api.education.getAll.useQuery();

  const { data: educationTags, isLoading: educationTagsLoading } =
    api.education.getAllTags.useQuery();

  return (
    <AdminPageWrapper>
      <AppHeader>
        <div className="flex w-[50%] items-center justify-between xl:w-[40%]">
          {/* Title */}
          <Title>Education</Title>

          {/* Create Button */}
          <Button asChild onClick={() => setIsOpen(!isOpen)}>
            <div className="cursor-pointer">
              <Plus />
              <span>Create New Education</span>
            </div>
          </Button>
        </div>

        {/* Search */}
        <Search state={search} setState={setSearch} />
      </AppHeader>

      {/* Modal */}
      <CEEducation isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />

      {/* Body || Education Card */}
      <Section>
        {/* Tags | Filter */}
        <H3 className="mb-2">Filter By Tags</H3>
        <div className="flex h-[8rem] flex-wrap overflow-y-auto">
          {educationTags ? (
            educationTags.map((tag, index) => (
              <div
                key={index}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                  }),
                  "cursor-pointer hover:bg-primary/10",
                )}
              >
                {tag}
              </div>
            ))
          ) : (
            <div className="h-[20px] w-[30%] animate-pulse rounded-md bg-slate-500" />
          )}
        </div>

        {/* Cards */}
        <div>{/* TODO: Add the Cards Here */}</div>
      </Section>
    </AdminPageWrapper>
  );
};

export default EducationPage;
