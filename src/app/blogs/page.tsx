"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { PageTitle } from "@/components/common";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { cn } from "@/utils";
import { ChevronRight, Rss } from "lucide-react";
import Image from "next/image";
import * as React from "react";

const BlogsPage = () => {
  const [tagsLimit, setTagsLimit] = React.useState<number>(25);
  const { data: blogs, isLoading: blogsLoading } = api.blog.getAll.useQuery();
  const { data: blogTags, isLoading: blogTagsLoading } =
    api.blog.getAllBlogTags.useQuery();

  return (
    <PageWrapper>
      <ScrollArea className="h-screen">
        {/* Page Title */}
        <PageTitle title="Blogs" icon={<Rss className="h-5 w-5" />} />

        {/* Topics */}
        {blogTagsLoading ? (
          <div className="my-6 flex w-full flex-wrap items-center gap-2">
            {new Array(15).fill(0).map(() => (
              <Skeleton className="h-6 w-[100px] rounded-lg bg-primary/50" />
            ))}
          </div>
        ) : (
          <div className="my-6 flex w-full flex-wrap items-center gap-2">
            {blogTags?.slice(0, tagsLimit)?.map(({ id, name }) => (
              <div
                key={id}
                className={cn(
                  "cursor-pointer",
                  buttonVariants({
                    variant: "default",
                    size: "xs",
                  }),
                )}
              >
                {name}
              </div>
            ))}
            {blogs && blogs.length >= 25 && (
              <div>
                <Button
                  size={"icon"}
                  className="h-6 w-6 shadow"
                  variant={"outline"}
                  title="explore more tags..."
                  onClick={() => setTagsLimit((prev) => prev + 10)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Blog Container */}
        {blogsLoading ? (
          <div className="grid grid-cols-12 gap-10 pb-16">
            {new Array(3).fill(0).map(() => (
              <div className={cn("col-span-4")}>
                <Skeleton className="bg-primary/20 p-1">
                  <div className="relative rounded bg-slate-800 p-4">
                    {/* Background Image */}
                    <div className="relative">
                      <Skeleton className="h-[150px] w-full rounded bg-primary/70" />
                      {/* Author Image */}
                      <div className="absolute -bottom-10 left-1">
                        <div className="rounded-full p-[2px]">
                          <Skeleton className="h-[80px] w-[80px] rounded-full bg-primary/60" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="mt-12 h-8 w-full bg-primary/70" />
                    <Skeleton className="mt-3 h-16 w-full bg-primary/70" />
                  </div>
                </Skeleton>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-10 pb-16">
            {blogs?.map((blog, index) => (
              <div key={index} className={cn("col-span-4 ")}>
                <BackgroundGradient className="">
                  <div className="relative rounded-lg bg-slate-800 p-4">
                    {/* Background Image */}
                    <div className="relative">
                      <Image
                        src={blog?.coverImage}
                        alt={blog.title}
                        width={400}
                        height={200}
                        className="h-[200px] w-full rounded bg-black"
                      />
                      {/* Author Image */}
                      <div className="absolute -bottom-10 left-1">
                        <div className="rounded-full bg-white p-[2px]">
                          <Image
                            src={blog.authorProfilePicture}
                            alt={blog.authorUserName}
                            width={80}
                            height={80}
                            className="h-[80px] w-[80px] rounded-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <h3 className="mt-12 text-xl font-bold">{blog.title}</h3>
                    <p className="text-gray-400">
                      {blog?.subtitle
                        ? blog?.subtitle?.slice(0, 80)
                        : blog?.brief?.slice(0, 80)}
                      {blog?.subtitle && "..."}
                    </p>
                  </div>
                </BackgroundGradient>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </PageWrapper>
  );
};

export default BlogsPage;
