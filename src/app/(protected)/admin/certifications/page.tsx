"use client";

import CECertification from "@/components/CRUD/certifications/template/__template";
import { AdminPageWrapper } from "@/components/PageWrapper";
import { PageTitle } from "@/components/common";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { cn } from "@/utils";
import { FileText, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const CertificationPage = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editCertification, setCertification] = React.useState(null);

  const { data: certifications, isLoading: certificationsLoading } =
    api.certification.getAll.useQuery();

  return (
    <AdminPageWrapper>
      {/* App Header */}
      <div className="flex items-center justify-between">
        <PageTitle
          icon={<FileText className="h-4 w-4" />}
          title="Certification"
        />

        {/* CE Button */}
        <Button className="" size={"sm"} onClick={() => setIsOpen(!isOpen)}>
          <Plus className="h-4 w-4" />
          <span className="ml-2">Create New Certification</span>
        </Button>
      </div>

      {/* Modal */}
      <CECertification isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />

      {/* Body */}
      <div className="mt-10 grid grid-cols-12 items-center gap-6">
        {certificationsLoading ? (
          <div></div>
        ) : (
          certifications?.map((certification) => (
            <div className="col-span-3" key={certification.id}>
              <div key={certification.id} className="col-span-4">
                <BackgroundGradient
                  className={cn("rounded-lg bg-white p-3 dark:bg-zinc-900")}
                >
                  <Link href={certification.certificationLink} target="__black">
                    <Image
                      src={certification.imageUrl}
                      alt={certification.title}
                      width={400}
                      height={400}
                      className="rounded-lg"
                    />
                  </Link>
                </BackgroundGradient>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminPageWrapper>
  );
};

export default CertificationPage;
