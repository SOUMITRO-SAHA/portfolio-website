import { createTRPCRouter } from "../trpc";
import {
  blogRouter,
  educationRouter,
  experienceRouter,
  openSourceRouter,
  testRouter,
} from "./publicViewer";

export const appRouter = createTRPCRouter({
  test: testRouter,
  experience: experienceRouter,
  blog: blogRouter,
  openSource: openSourceRouter,
  education: educationRouter,
});

export type AppRouter = typeof appRouter;
