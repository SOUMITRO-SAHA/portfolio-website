import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

interface WorkExperienceCardProps {
  id: string;
  company: string;
  description: string;
  start: string;
  end: string | null;
  projects: {
    title: string;
    link: string;
  }[];
}

export const WorkExperienceCard: React.FC<WorkExperienceCardProps> = (
  props,
) => {
  return (
    <Card>
      <CardTitle>{props.company}</CardTitle>
      <CardDescription>{props.description}</CardDescription>
      <CardContent>
        {props.projects?.map((project) => (
          <Link
            className={cn(
              buttonVariants({
                variant: "default",
              }),
            )}
            href={project.link}
          >
            {project.title}
          </Link>
        ))}
      </CardContent>
      <CardFooter>
        <div>
          <div>{!props.end && <span>Present</span>}</div>
          <Link href={`/work-experience/${props.id}`}>Explore</Link>
        </div>
      </CardFooter>
    </Card>
  );
};
