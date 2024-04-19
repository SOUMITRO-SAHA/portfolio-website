import * as z from "zod";

// Define input and response schemas
export const ProjectSchema = z
  .array(
    z.object({
      name: z.string(),
      description: z.string(),
      url: z.string().optional(),
      duration: z.number().optional(),
    }),
  )
  .optional();

export const ExperienceSchema = z.object({
  company: z.string(),
  description: z.string(),
  projects: ProjectSchema,
  start: z.date().refine((date) => date !== null, {
    message: "Start Date is required.",
  }),
  end: z.date().optional(),
});
