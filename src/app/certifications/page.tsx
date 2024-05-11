"use client";
import { PageWrapper } from "@/components/PageWrapper";
import { PageTitle } from "@/components/common";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { api } from "@/trpc/react";
import { cn } from "@/utils";
import { FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CertificationsPage = () => {
  const { data: certifications, isLoading } =
    api.certification.getAll.useQuery();

  return (
    <PageWrapper>
      <PageTitle
        title="Certifications"
        icon={<FileText className="h-5 w-5" />}
      />
      {/* Tags */}

      {/* Cards */}
      <div className="mt-8 grid grid-cols-12 items-center justify-between gap-14">
        {certifications?.map((certification) => (
          <div key={certification.id} className="col-span-4">
            <BackgroundGradient
              className={cn("rounded-lg bg-white p-10 dark:bg-zinc-900")}
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
        ))}
      </div>
    </PageWrapper>
  );
};

export default CertificationsPage;
