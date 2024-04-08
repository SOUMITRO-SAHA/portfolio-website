"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { CreateBlogSchema } from "@/validators/blog.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const BlogsPage = () => {
  const [isPending, startTransition] = React.useTransition();
  const { mutate: createBlog, isLoading } = api.blog.create.useMutation({
    onError: async (error) => {
      toast({
        title: "Something went wrong!!!",
        description: error.message,
        variant: "destructive",
      });
      console.error(error);
    },
    onSuccess: async () => {
      toast({
        title: "Successfully added new blog!!!",
      });
    },
  });

  const form = useForm<z.infer<typeof CreateBlogSchema>>({
    resolver: zodResolver(CreateBlogSchema),
  });

  const onSubmit = (value: z.infer<typeof CreateBlogSchema>) => {
    startTransition(async () => {
      createBlog({
        title: value.title,
        metadata: value.metadata,
      });
    });
  };

  return (
    <PageWrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Title */}
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Blog Title"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Metadata */}
          <div>
            <FormField
              control={form.control}
              name="metadata"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metadata*</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="Paste the Metadata here..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end">
            <Button size={"lg"} loading={isLoading ?? isPending}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </PageWrapper>
  );
};

export default BlogsPage;
