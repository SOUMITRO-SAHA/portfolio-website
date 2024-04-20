import React from "react";
import { Card } from "../ui/card";

const CardSkeleton = () => {
  return (
    <>
      <Card>
        <div className="h-full min-h-[200px] w-full animate-pulse rounded-md bg-slate-500" />
      </Card>
    </>
  );
};

export default CardSkeleton;
