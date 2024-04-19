import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";

export interface ExperienceCardProps {
  id: string;
  logo?: string | StaticImport;
  company: string;
  description: string | null;
  start: Date | null;
  end: Date | null;
  projects: {
    name: string;
    url: string | null;
    duration: number | null;
    description: string | null;
  }[];
}

export const ExperienceCard: React.FC<ExperienceCardProps> = (props) => {
  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Image
            src={props.logo ?? ""}
            alt={`${props.company}__logo`}
            width={50}
            height={50}
            className="h-full rounded-md"
          />
          <CardTitle>
            <h3 className="tex-lg">{props.company}</h3>
          </CardTitle>
        </div>
        <div className="my-2">
          <CardDescription>{props.description}</CardDescription>
        </div>
        <CardContent>
          <h5 className="text-balance font-semibold leading-relaxed">
            Projects
          </h5>
          <div className="flex flex-wrap items-center gap-2 *:rounded-xl *:bg-blue-500 *:text-xs *:text-primary">
            {props.projects?.map((project) => (
              <Link
                className={cn(
                  buttonVariants({
                    variant: "default",
                    size: "sm",
                  }),
                  "",
                )}
                href={project.url ?? "#"}
              >
                {project.name}
              </Link>
            ))}
          </div>
        </CardContent>

        <div className="flex w-full items-center justify-between">
          <Badge className="bg-green-500">
            {!props.end && (
              <span className=" flex items-center justify-center">
                <span className="mr-1 h-2 w-2 rounded-full bg-green-600" />
                <span>Present</span>
              </span>
            )}
          </Badge>
          <Link
            href={`/experience/${props.id}`}
            className={cn(
              buttonVariants({
                size: "sm",
              }),
              "rounded-full bg-purple-500 px-5 text-primary",
            )}
          >
            Explore
          </Link>
        </div>
      </div>
    </Card>
  );
};
