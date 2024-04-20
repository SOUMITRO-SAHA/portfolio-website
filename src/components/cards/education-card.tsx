import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils";
import { colors } from "@/assets";

interface EducationCardProps {
  state?: any;
  setState?: (value: any) => void;
  id?: string;
  tags?: Array<string>;

  courseName: string;
  description: string;
  imageUrl?: string;
  certificationLink?: string;
  topics: string;
}

const EducationCard: React.FC<EducationCardProps> = (props) => {
  const hadleClick = () => {
    if (props.id && props.setState) {
      props.setState(props.id);
    }
  };

  return (
    <Card className="overflow-hidden shadow-2xl">
      <CardHeader className="p-0">
        <Link href={props.certificationLink ?? "#"}>
          <Image
            width={100}
            height={60}
            className={cn("h-auto w-full rounded rounded-b-none")}
            src={props.imageUrl ?? ""}
            alt={`${props.courseName}__image`}
          />
        </Link>
      </CardHeader>
      <div onClick={hadleClick}>
        <CardContent className="p-3 py-1">
          <CardTitle className="text-xl">{props.courseName}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
          <div className="my-2 flex w-full items-center gap-3">
            {props.topics &&
              props.topics.split("-").map((topic, index) => {
                if (topic.length > 0)
                  return (
                    <div className="relative flex items-center justify-center gap-1 rounded-full border border-neutral-200 p-1 px-3 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          colors[index % colors.length]
                        }`}
                      />
                      <div>{topic.trim()}</div>
                      <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500  to-transparent" />
                    </div>
                  );
              })}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center gap-1 p-3 pb-4 pt-1  ">
          {props.tags?.map((tag) => (
            <div className="relative flex items-center justify-center gap-1 rounded border border-neutral-200 p-1 px-3 text-xs font-thin italic text-black dark:border-white/[0.2] dark:text-white">
              <span className="absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500  to-transparent" />
              <span>#</span>
              <span>{tag}</span>
              <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500  to-transparent" />
            </div>
          ))}
        </CardFooter>
      </div>
    </Card>
  );
};

export default EducationCard;
