"use client";

import { AdminPageWrapper } from "@/components/PageWrapper";
import { PageTitle } from "@/components/common";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Settings } from "lucide-react";
import * as React from "react";

const BlogsPage = () => {
  const { data: blogs, isLoading } = api.blog.syncAllBlogs.useQuery();

  return (
    <AdminPageWrapper>
      <PageTitle title="Settings" icon={<Settings className="h-5 w-5" />} />
      <div className="mt-8">
        <h5 className="mb-3 text-xl font-semibold">Blogs</h5>
        <Button size={"sm"} loading={isLoading}>
          <span>Sync All Blogs</span>
        </Button>
      </div>
    </AdminPageWrapper>
  );
};

export default BlogsPage;
