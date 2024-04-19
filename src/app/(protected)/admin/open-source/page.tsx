"use client";

import { AdminPageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { CreateOpenSourceSchema } from "@/validators/open-source.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const OpenSourcePage = () => {
  const [isPending, startTransition] = React.useTransition();
  const { mutate: createOpenSource, isLoading } =
    api.openSource.create.useMutation({
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

  const form = useForm<z.infer<typeof CreateOpenSourceSchema>>({
    resolver: zodResolver(CreateOpenSourceSchema),
    defaultValues: {
      isPRMerged: false,
    },
  });

  const onSubmit = (value: z.infer<typeof CreateOpenSourceSchema>) => {
    startTransition(async () => {
      createOpenSource({
        repository: value.repository,
        description: value.description,
        prLink: value.prLink,
        issueLink: value.issueLink,
        isPRMerged: value.isPRMerged,
      });
    });
  };

  return (
    <AdminPageWrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-12 gap-5">
            {/* Repository */}
            <div className="col-span-6 items-center justify-between">
              <FormField
                control={form.control}
                name="repository"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repository*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Repository Link..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6 mb-3 flex items-end gap-1 space-x-2 space-y-2">
              <FormField
                control={form.control}
                name="isPRMerged"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-end gap-1 ">
                        <Checkbox
                          id="isPRMerged"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="isPRMerged"
                            className="text-sm font-medium uppercase leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Is PR Merged
                          </label>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 items-center justify-between gap-5">
            <div className="col-span-6">
              {/* PR URL */}
              <FormField
                control={form.control}
                name="prLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PR Link*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="PR Link..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Issue Link */}
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="issueLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Link*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Issue Link..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    placeholder="Write the Description here..."
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="flex items-center justify-end">
            <Button size={"lg"} loading={isLoading ?? isPending}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </AdminPageWrapper>
  );
};

export default OpenSourcePage;
