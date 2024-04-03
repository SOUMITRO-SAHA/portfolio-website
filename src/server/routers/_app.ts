import { createTRPCRouter } from "../trpc";
import { testRouter } from "./publicViewer/test";

export const appRouter = createTRPCRouter({
  test: testRouter,
});

export type AppRouter = typeof appRouter;
