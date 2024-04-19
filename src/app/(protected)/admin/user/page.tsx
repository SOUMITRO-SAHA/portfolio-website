"use client";

import { AdminPageWrapper } from "@/components/PageWrapper";
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
import { UserSchema } from "@/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

const AdminUserPage = () => {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = (value: z.infer<typeof UserSchema>) => {
    startTransition(async () => {
      try {
        console.log(value);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Something went wrong!!!",
            description: error.message,
            variant: "destructive",
          });
        }
        console.error(error);
      }
    });
  };

  return (
    <AdminPageWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-3">
            {/* Name */}
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Ryan Jhons"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Image URL */}
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Profile Picture Link Here"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Github Link */}
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="githubLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Your GitHub link here"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* LinkedIn Link */}
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="linkedInLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="LinkedIn link here"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Twitter Link */}
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="twitterLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Twitter link here"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Youtube Link */}
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="youtubeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Youtube Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Youtube link here"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-full grid grid-cols-12 gap-5">
              {/* Short Bio */}
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="mr-2">Short Bio</span>
                        <span className="text-xs">(*255 Characters only)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="Hi, I'm Soumitra Saha."
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Bio */}
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="Hi, I'm Soumitra Saha."
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-end">
            <Button loading={isPending} type="submit" size={"lg"}>
              Update
            </Button>
          </div>
        </form>
      </Form>
    </AdminPageWrapper>
  );
};

export default AdminUserPage;
