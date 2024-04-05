"use client";

import { LoginForm } from "@/components/common/Form/LoginForm";
import { cn } from "@/utils";

const LoginPage = () => {
  return (
    <main
      className={cn(
        "flex h-screen w-screen items-center justify-center bg-background",
      )}
    >
      <LoginForm />
    </main>
  );
};

export default LoginPage;
