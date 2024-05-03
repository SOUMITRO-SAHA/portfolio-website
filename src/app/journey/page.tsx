"use client";

import About from "@/components/home/About";
import TrainingsCertifications from "@/components/home/TrainingsCertifications";
import WorkExperience from "@/components/home/WorkExperience";
import { PageWrapper } from "@/components/PageWrapper";
import { Divider } from "@/components/common";

export default function JourneyPage() {
  return (
    <PageWrapper>
      {/* About */}
      <About />
      <Divider />

      {/* Work Experience */}
      <WorkExperience />
      <Divider />

      {/* Trainings / Certifications */}
      <TrainingsCertifications />
    </PageWrapper>
  );
}
