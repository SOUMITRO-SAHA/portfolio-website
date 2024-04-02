"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/server";
import { cn } from "@/app/utils";
import * as React from "react";
import { useToast } from "@/components/ui/use-toast";

// Define the shape of form data
interface FormData {
  email: string;
  password: string;
}

// Initial state of form data
const initialStateOfFormData: FormData = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const { toast } = useToast();
  // State to manage form data
  const [formData, setFormData] = React.useState<FormData>(
    initialStateOfFormData,
  );
  const [isPending, startTransition] = React.useTransition();

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await api.user.login.mutate({
          email: formData.email,
          password: formData.password,
        });
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
        return response;
      } catch (error) {
        console.error("Error in Login Page", error);
        throw error;
      }
    });
  };

  return (
    <main
      className={cn(
        "flex h-screen w-screen items-center justify-center bg-background",
      )}
    >
      <form
        onSubmit={handleSubmit}
        className={cn("flex w-[30%] flex-col gap-5 rounded bg-secondary p-8")}
      >
        <div>
          <h3>Email*</h3>
          <Input
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <h3>Password*</h3>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Button loading={isPending} type="submit">
          Submit
        </Button>
      </form>
    </main>
  );
};

export default LoginPage;
