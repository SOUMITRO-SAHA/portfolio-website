import { createTRPCRouter, publicProcedure } from "../trpc";

export const testRouter = createTRPCRouter({
  testing: publicProcedure.query(() => {
    return {
      message: "Testing !!! 🎉🎉🎉🎉",
    };
  }),
});
