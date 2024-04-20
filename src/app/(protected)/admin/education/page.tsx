"use client";

import CEEducation from "@/components/CRUD/education/template/_template";
import { AdminPageWrapper } from "@/components/PageWrapper";
import { AppHeader } from "@/components/app-header";
import CardSkeleton from "@/components/cards/card-skeleton";
import EducationCard from "@/components/cards/education-card";
import { H3, Section, Title } from "@/components/common";
import { Search } from "@/components/search";
import { Button, buttonVariants } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { cn } from "@/utils";
import { Plus, RotateCcw } from "lucide-react";
import * as React from "react";

const EducationPage = () => {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [editEducation, setEditEducation] = React.useState(null);

  const { data: education, isLoading: educationLoading } =
    api.education.getAll.useQuery();

  const { data: educationTags, isLoading: educationTagsLoading } =
    api.education.getAllTags.useQuery();

  const filteredSearchResult = () => {
    if (search || filter) {
      return education?.filter((edu) => {
        const { courseName, tags, topics } = edu;
        const lowercaseTags = (tags || []).map((tag) => tag.toLowerCase());

        const termsToSearch = [
          courseName.toLowerCase(),
          ...lowercaseTags,
          topics.toLowerCase(),
        ];

        return termsToSearch.some((value) =>
          value.includes((search || filter).toLowerCase()),
        );
      });
    }
    return education;
  };

  console.log("Filter =====> ", filter);

  return (
    <AdminPageWrapper>
      <AppHeader>
        <div className="flex w-[50%] items-center justify-between xl:w-[40%]">
          <Title>Education</Title>
          <Button asChild onClick={() => setIsOpen(!isOpen)}>
            <div className="flex cursor-pointer items-center">
              <Plus />
              <span>Create New Education</span>
            </div>
          </Button>
        </div>
        <Search state={search} setState={setSearch} />
      </AppHeader>
      <CEEducation isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
      <Section className="h-[calc(100%-3rem)] w-full overflow-y-auto">
        <div className="flex items-center gap-3">
          <H3 className="mb-2">Filter By Tags</H3>
          {filter && (
            <div
              className="cursor-pointer rounded-md bg-background p-2"
              onClick={() => setFilter("")}
            >
              <RotateCcw className="h-3 w-3" />
            </div>
          )}
        </div>
        <div className="flex max-h-[8rem] flex-wrap overflow-y-auto">
          {educationTagsLoading ? (
            <div className="h-[20px] w-[30%] animate-pulse rounded-md bg-slate-500" />
          ) : (
            educationTags?.map((tag, index) => (
              <div
                key={index}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                  }),
                  "cursor-pointer hover:bg-primary/10",
                  tag === filter && "bg-primary/10",
                )}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </div>
            ))
          )}
        </div>
        <div className="mt-3 grid grid-cols-12 gap-3">
          {educationLoading
            ? [...Array(4)].map((_, index) => (
                <div key={index} className="col-span-3 row-span-4">
                  <CardSkeleton />
                </div>
              ))
            : filteredSearchResult()?.map((edu, index) => (
                <div
                  key={index}
                  className="col-span-6 mb-4 lg:col-span-4 xl:col-span-3"
                >
                  <EducationCard
                    id={edu.id}
                    courseName={edu.courseName}
                    description={edu.description}
                    imageUrl={edu.imageUrl ?? undefined}
                    certificationLink={edu.certificationLink ?? undefined}
                    tags={edu.tags}
                    topics={edu.topics}
                    setState={setEditEducation}
                  />
                </div>
              ))}
        </div>
      </Section>
    </AdminPageWrapper>
  );
};

export default EducationPage;
