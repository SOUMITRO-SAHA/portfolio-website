import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/trpc";
import { EducationSchema } from "@/validators";
import * as z from "zod";

export const educationRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.education.findMany();
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.db.education.findUnique({
        where: { id },
      });
    }),
  getAllTags: publicProcedure.query(async ({ ctx }) => {
    const educationTags = await ctx.db.education.findMany({
      select: {
        tags: true,
      },
    });

    // Flatten the array of tags and convert them to lowercase for case-insensitive comparison
    const uniqueTags = Array.from(
      new Set(
        educationTags
          .flatMap((education) => education.tags)
          .map((tag) => tag.toLowerCase()),
      ),
    );
    return uniqueTags;
  }),
  create: protectedProcedure
    .input(EducationSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        courseName,
        description,
        imageUrl,
        topics,
        certificationLink,
        tags,
      } = input;

      let newTags: string | string[];
      // Format the Tags:
      if (typeof tags === "string")
        newTags = tags.split(",").map((str) => str.trim());
      else newTags = tags;

      return await ctx.db.education.create({
        data: {
          courseName,
          description,
          tags: newTags,
          imageUrl,
          topics,
          certificationLink,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return await ctx.db.education.delete({
        where: {
          id,
        },
      });
    }),
});
