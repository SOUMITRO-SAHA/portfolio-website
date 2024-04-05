import * as z from "zod";

// Define input and response schemas
export const createWorkExperienceInputSchema = z.object({
  company: z.string(),
  description: z.string(),
  projects: z
    .array(
      z.object({
        title: z.string(),
        link: z.string(),
      }),
    )
    .optional(),
  start: z.date(),
  end: z.date(),
});

// Define input schema for adding projects
export const addProjectsInputSchema = z.object({
  id: z.string(),
  projects: z.array(
    z.object({
      title: z.string(),
      link: z.string(),
    }),
  ),
});
