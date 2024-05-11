import * as z from "zod";

export const CertificationSchema = z.object({
  title: z.string(),
  imageUrl: z.string().url(),
  certificationLink: z.string().url(),
  dateOfCompletion: z.date().optional(),
});
