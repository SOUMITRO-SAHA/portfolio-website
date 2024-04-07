"use client";

import { CEExperience } from "@/components/CRUD/Experience";
import { AdminPageWrapper } from "@/components/PageWrapper";
import { AppHeader } from "@/components/app-header/AppHeader";
import { ExperienceCard } from "@/components/cards";
import { Section, Title } from "@/components/common";
import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Loader2, Plus } from "lucide-react";
import * as React from "react";

const AdminExperiencPage = () => {
  const [search, setSearch] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  // tRPC Query
  const { data: experiences, isLoading } = api.experience.getAll.useQuery();

  return (
    <AdminPageWrapper>
      <AppHeader>
        <div className="flex w-[40%] items-center justify-between">
          {/* Title */}
          <Title>Experiences</Title>

          {/* Create Button */}
          <Button asChild onClick={() => setIsOpen(!isOpen)}>
            <div className="cursor-pointer">
              <Plus />
              <span>Create New Experience</span>
            </div>
          </Button>
        </div>

        {/* Search */}
        <Search state={search} setState={setSearch} />
      </AppHeader>

      {/* Modal */}
      <CEExperience
        title="Create"
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      />

      {/* Body || Expericenc Cards */}
      <Section>
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-20 w-20 animate-spin" />
          </div>
        ) : (
          <div className="grid h-full w-full grid-cols-12 gap-5">
            {experiences?.map((experience) => (
              <div className="col-span-4">
                <ExperienceCard
                  logo={experience.logo!}
                  company={experience.company}
                  description={experience.description}
                  id={experience.id}
                  key={experience.id}
                  projects={experience.projects}
                  start={experience.start}
                  end={experience.end}
                />
              </div>
            ))}
          </div>
        )}
      </Section>
    </AdminPageWrapper>
  );
};

export default AdminExperiencPage;
