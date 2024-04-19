import { z } from "zod";

export const BlogSchema = z.object({
  id: z.string(),
  title: z.string(),
  metadata: z.any().nullable(),
  content: z.string().nullable(),
  author: z.string().nullable(),
  authorEmail: z.string(),
});

export const CreateBlogSchema = z.object({
  title: z.string(),
  metadata: z.any().nullable(),
});
