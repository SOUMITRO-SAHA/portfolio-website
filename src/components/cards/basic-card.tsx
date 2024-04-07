import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

interface BasicCardProps {
  imageUrl: string | StaticImport;
  institude: string;
  certificationLink: string;
  startDate: string;
  endDate: string;
}

const BasicCard: React.FC<BasicCardProps> = (props) => {
  return (
    <Card>
      <CardContent>
        <Image
          src={props.imageUrl}
          alt={`${props.institude}__image_preview`}
          width={100}
          height={100}
        />
      </CardContent>
      <CardTitle>{props.institude}</CardTitle>
      <CardDescription>
        <div>
          <span>{props.startDate}</span>
          <span>-</span>
          <span>{props.endDate}</span>
        </div>
      </CardDescription>
      <CardFooter>
        <Link
          href={props.certificationLink}
          target="_blank"
          className={cn(
            buttonVariants({
              size: "sm",
            }),
          )}
        >
          Explore
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BasicCard;
