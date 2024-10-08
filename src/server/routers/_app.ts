import { createTRPCRouter } from "../trpc";
import {
  blogRouter,
  educationRouter,
  experienceRouter,
  openSourceRouter,
  testRouter,
  certificationRouter,
} from "./publicViewer";

export const appRouter = createTRPCRouter({
  test: testRouter,
  experience: experienceRouter,
  blog: blogRouter,
  openSource: openSourceRouter,
  education: educationRouter,
  certification: certificationRouter,
});

export type AppRouter = typeof appRouter;
