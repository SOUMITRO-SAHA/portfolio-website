"use client";

import CEOpenSource from "@/components/CRUD/open-source/template/__template";
import { AdminPageWrapper } from "@/components/PageWrapper";
import { AppHeader } from "@/components/app-header";
import { H3, Section, Title } from "@/components/common";
import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Plus, RotateCcw } from "lucide-react";
import * as React from "react";

const OpenSourcePage = () => {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [editEducation, setEditEducation] = React.useState(null);

  const { data: openSource, isLoading: openSourceLoading } =
    api.openSource.getAll.useQuery();

  const { data: openSourceRepos, isLoading: openSourceReposLoading } =
    api.openSource.getAllRepos.useQuery();

  const filteredSearchResult = () => {
    if (search || filter) {
      return openSource?.filter((os) => {
        const { repository } = os;
        const lowercaseRepos = repository.toLowerCase();

        return lowercaseRepos.includes((search || filter).toLowerCase());
      });
    }
    return openSource;
  };
  return (
    <AdminPageWrapper>
      <AppHeader>
        <div className="flex w-[50%] items-center justify-between xl:w-[40%]">
          <Title>Open Source</Title>
          <Button asChild onClick={() => setIsOpen(!isOpen)}>
            <div className="flex cursor-pointer items-center">
              <Plus />
              <span>Create New Open Source</span>
            </div>
          </Button>
        </div>
        <Search state={search} setState={setSearch} />
      </AppHeader>
      {/* Create New OC */}
      <CEOpenSource isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
      {/* Edit New OC */}
      <Section>
        <div>
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
      </Section>
    </AdminPageWrapper>
  );
};

export default OpenSourcePage;
