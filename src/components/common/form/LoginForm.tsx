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
        const response = await signIn<"credentials">("credentials", {
          ...values,
          redirect: false,
        });

        if (response && response.ok) {
          setSuccess("Successfully Login!!!");
        }
        if (response && response.error) {
          setError(response.error);
        }
        if (!response) {
          setError("");
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
        className="w-[40%] space-y-2 xl:w-[25%]"
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
        <div className="px-4">
          <FormSuccess message={success} />
          <FormError message={error} />
        </div>
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
