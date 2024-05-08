import { PageWrapper } from "@/components/PageWrapper";
import { PageTitle } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils";
import { Atom, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const projectTags = ["Frontend", "Backend", "DSA", "Java"];
const projects = [
  {
    id: "1",
    name: "Web Development Project",
    description: "Building a website for a client",
    techStack: ["ReactJS", "NodeJS", "JavaScript", "TailwindCSS"],
    url: "https://example.com",
    duration: 6,
  },
  {
    id: "2",
    name: "Web Development Project",
    description: "Building a website for a client",
    techStack: ["ReactJS", "NodeJS", "Typescript", "TailwindCSS"],
    url: "https://example.com",
    duration: 6,
  },
  {
    id: "3",
    name: "Web Development Project",
    description: "Building a website for a client",
    url: "https://example.com",
    duration: 6,
  },
  {
    id: "4",
    name: "Web Development Project",
    description: "Building a website for a client",
    url: "https://example.com",
    duration: 6,
  },
  {
    id: "5",
    name: "Web Development Project",
    description: "Building a website for a client",
    url: "https://example.com",
    duration: 6,
  },
];

const ProjectPage = () => {
  return (
    <PageWrapper>
      <ScrollArea className="h-screen">
        <div>
          <PageTitle
            icon={<Atom className="h-5 w-5 stroke-primary" />}
            title="Project"
          />

          {/* Tags */}
          <div className="my-6 flex items-center gap-2">
            {projectTags.map((project) => (
              <div
                className={cn(
                  "cursor-pointer",
                  buttonVariants({
                    variant: "default",
                    size: "xs",
                  }),
                )}
              >
                {project}
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="grid grid-cols-12 items-center justify-between gap-8">
            {projects.map((project) => (
              <div className="col-span-6 flex w-full justify-between rounded border-white bg-slate-700">
                <div className="py-8 pl-8">
                  <h3 className="text-2xl font-bold capitalize leading-loose">
                    {project.name}
                  </h3>
                  <p className="text-gray-400">{project.description}</p>
                  <div className="my-5 flex flex-wrap items-center gap-1">
                    {project.techStack?.map((ts) => <Badge>{ts}</Badge>)}
                  </div>

                  <div className="flex items-center gap-8">
                    <Link
                      href={"www.github.com/SOUMITRO-SAHA/s"}
                      className={cn(
                        "",
                        buttonVariants({
                          variant: "secondary",
                          size: "sm",
                        }),
                      )}
                    >
                      <FaGithub className="h-5 w-5" />
                      <span className="ml-3">Github</span>
                    </Link>
                    <Link
                      href={project.url}
                      className={cn(
                        "",
                        buttonVariants({
                          variant: "default",
                          size: "sm",
                        }),
                      )}
                    >
                      <span className="mr-2">View Project</span>
                      <MoveUpRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
                <div>
                  <Image
                    src={"/photos/MyImage-Small.png"}
                    alt={project.name}
                    width={180}
                    height={100}
                    className={cn(
                      "rounded rounded-es-full border-s-4 border-white",
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </PageWrapper>
  );
};

export default ProjectPage;
