import { LoginSchema } from "@/validators/auth.validator";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  login: publicProcedure.input(LoginSchema).mutation(async ({ ctx, input }) => {
    return {
      data: { ctx },
      message: "Login",
    };
  }),
});
