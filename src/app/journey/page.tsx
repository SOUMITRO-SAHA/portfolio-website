import { PageWrapper } from "@/components/PageWrapper";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { cn } from "@/utils";
import { Route } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const journeyDemoData = [
  {
    title: "Web Development Bootcamp",
    description:
      "This bootcamp covers the fundamentals of web development including HTML, CSS, and JavaScript. Participants will learn how to build static and dynamic websites.",
    topics: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    mentorName: "John Doe",
    imageLink: "/photos/image.png",
    timeStart: "2022-04-01",
    timeEnd: "2022-04-30",
  },
  {
    title: "Python for Data Science",
    description:
      "This course introduces participants to Python programming language and its applications in data science. Topics include data manipulation, visualization, and machine learning.",
    topics: ["Python", "Data Science", "Pandas", "NumPy", "Scikit-learn"],
    mentorName: "Jane Smith",
    imageLink: "/photos/image.png",
    timeStart: "2022-05-01",
    timeEnd: "2022-06-01",
  },
];

export default function JourneyPage() {
  return (
    <PageWrapper className={cn("overflow-y-auto")}>
      <div className="mb-12 flex w-full items-center justify-between">
        <div className="flex items-center gap-2 text-base font-bold capitalize leading-relaxed">
          <Route className="h-4 w-4 stroke-primary" />
          <span>My Journey</span>
        </div>
      </div>
      {/* Journey */}
      <TracingBeam>
        <div className="flex flex-col gap-16">
          {journeyDemoData?.map((journey) => (
            <div className="flex w-full justify-between">
              <div className="w-[40%]">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold capitalize leading-relaxed">
                    {journey.title}
                  </h3>
                  <div>
                    <Badge
                      variant={"outline"}
                      className="flex w-fit items-center gap-1"
                    >
                      <span>{journey?.timeStart}</span>
                      <span> - </span>
                      <span>{journey?.timeEnd}</span>
                    </Badge>
                  </div>
                </div>
                <p className="mb-3 text-gray-400">{journey.description}</p>
                <div className="flex flex-wrap items-center gap-1">
                  {journey.topics?.map((topic) => (
                    <Badge className="w-fit capitalize">{topic}</Badge>
                  ))}
                </div>
              </div>
              <div className="w-[60%] px-4">
                <BackgroundGradient>
                  <Image
                    src={journey.imageLink}
                    alt={journey.title}
                    width={500}
                    height={400}
                    className="rounded-xl"
                  />
                </BackgroundGradient>
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </PageWrapper>
  );
}
