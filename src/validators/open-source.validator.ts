import { z } from "zod";

export const OpenSourceSchema = z.object({
  id: z.string(),
  repository: z.string().url(),
  description: z.string(),
  prLink: z.string().url(),
  issueLink: z.string().url(),
  metadata: z.string(),
  isPRMerged: z.boolean(),
});

export const CreateOpenSourceSchema = z.object({
  repository: z.string().url(),
  prLink: z.string().url().optional(),
  issueLink: z.string().url().optional(),
  isPRMerged: z.boolean().default(false).optional(),
  description: z.string().optional(),
});
