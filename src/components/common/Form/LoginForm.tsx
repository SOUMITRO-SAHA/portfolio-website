import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleIcon, TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

export const LoginForm = () => {
  const [success, setSuccess] = React.useState<string>("");
  const [error, setError] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // Before Calling the Server Actions Clearing the States
    setSuccess("");
    setError("");

    // Calling the Server Actions
    startTransition(async () => {
      try {
        const response = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (response?.ok) {
          setSuccess("Successfully Login!!!");
          redirect("/");
        }
        if (response?.error) {
          setError(response?.error);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
        setError("Something went wrong during login!!!");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[25%] space-y-2"
      >
        <div className="space-y-4 p-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="i.e. john.demo@emample.com"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormSuccess message={success} />
        <FormError message={error} />
        <div className="w-full px-4">
          <Button loading={isPending} type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const FormSuccess = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="text-success flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm">
      <CheckCircleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export const FormError = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-red-800/15 p-3 text-sm text-destructive">
      <TriangleAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
