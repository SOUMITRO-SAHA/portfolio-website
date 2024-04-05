import { createTRPCRouter } from "../trpc";
import { experienceRouter } from "./publicViewer/experience";
import { testRouter } from "./publicViewer/test";

export const appRouter = createTRPCRouter({
  test: testRouter,
  experience: experienceRouter,
});

export type AppRouter = typeof appRouter;
