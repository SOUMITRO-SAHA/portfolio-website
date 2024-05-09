import { PageWrapper } from "@/components/PageWrapper";
import { PageTitle } from "@/components/common";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { cn } from "@/utils";
import { FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const certifications = [
  {
    id: "abcd",
    title: "Learn C++ Programming -Beginner to Advance- Deep Dive in C++",
    description:
      "Classroom and Hands-on sessions- Features of C++ 11 , Exception Handling and STL - for Both Academics and Industry",
    imageUrl:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-adc51a7e-82a1-4d4e-91e3-022647551d78.jpg?v=1663221675000",
    certificationLink:
      "https://www.udemy.com/certificate/UC-adc51a7e-82a1-4d4e-91e3-022647551d78/",
  },
  {
    id: "efgh",
    title: "The Complete JavaScript Course 2024: From Zero to Expert!",
    description:
      "The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!",
    imageUrl:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-b44ea18f-810a-40ab-b729-ab71d5f13829.jpg?v=1715249973000",
    certificationLink:
      "https://www.udemy.com/certificate/UC-b44ea18f-810a-40ab-b729-ab71d5f13829/",
  },
];

const CertificationsPage = () => {
  return (
    <PageWrapper>
      <PageTitle
        title="Certifications"
        icon={<FileText className="h-5 w-5" />}
      />
      {/* Tags */}

      {/* Cards */}
      <div className="mt-8 grid grid-cols-12 items-center justify-between gap-14">
        {certifications.map((certification) => (
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
