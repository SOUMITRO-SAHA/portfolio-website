import React from "react";
import { H1, Section } from "../common";
import { api } from "@/trpc/react";

const WorkExperience = () => {
  const { data, error, isLoading, status } = api.experience.getAll.useQuery();
  return (
    <Section>
      <H1>Work Experience</H1>
    </Section>
  );
};

export default WorkExperience;
