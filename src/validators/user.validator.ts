import * as z from "zod";

export const UserSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  image: z.string().url().optional(),
  bio: z.string().optional(),
  shortBio: z.string().optional(),
  github: z.string().url().optional(),
  linkedInLink: z.string().url().optional(),
  twitterLink: z.string().url().optional(),
});

export type UserInput = z.infer<typeof UserSchema>;
