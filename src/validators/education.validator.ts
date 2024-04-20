import * as z from "zod";

export const EducationSchema = z.object({
  courseName: z.string(),
  description: z.string(),
  certificationLink: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  tags: z.union([z.array(z.string()), z.string()]),
  topics: z.string(),
});
