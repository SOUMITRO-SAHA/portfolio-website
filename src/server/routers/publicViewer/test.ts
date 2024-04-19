import * as z from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";

export const testRouter = createTRPCRouter({
  testing: publicProcedure
    .output(
      z.object({
        message: z.string(),
      }),
    )
    .query(() => {
      return {
        message: "Testing !!! 🎉🎉🎉🎉",
      };
    }),
});
