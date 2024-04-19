import * as z from "zod";

export const UserSchema = z.object({
  name: z.string().optional(),
  username: z.string(),
  image: z.string().url().optional(),
  bio: z.string().optional(),
  shortBio: z
    .string()
    .max(255, { message: "Please keep the short bio within 255 characters" })
    .optional(),
  githubLink: z.string().url().optional(),
  linkedInLink: z.string().url().optional(),
  twitterLink: z.string().url().optional(),
  youtubeLink: z.string().url().optional(),
});

export type UserInput = z.infer<typeof UserSchema>;
