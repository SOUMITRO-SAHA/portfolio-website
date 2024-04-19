import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/trpc";
import { CreateBlogSchema } from "@/validators/blog.validator";
import { z } from "zod";

export const blogRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.blog.findMany();
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.db.blog.findUnique({
        where: { id },
      });
    }),
  create: protectedProcedure
    .input(CreateBlogSchema)
    .output(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { title, metadata } = input;
      return await ctx.db.blog.create({
        data: {
          title,
          metadata,
        },
      });
    }),
});
