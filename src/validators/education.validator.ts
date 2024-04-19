import * as z from "zod";

export const EducationSchema = z.object({
  courseName: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
  certificationLink: z.string().optional(),
  tags: z.union([z.array(z.string()), z.string()]),
  topics: z.string(),
});
