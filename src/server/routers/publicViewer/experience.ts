import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/trpc";
import { ExperienceSchema } from "@/validators/experience.validator";
import * as z from "zod";

export const experienceRouter = createTRPCRouter({
  // Fetch all work experiences
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.experience.findMany({
      select: {
        id: true,
        company: true,
        description: true,
        logo: true,
        projects: {
          select: {
            id: true,
            description: true,
            duration: true,
            name: true,
            url: true,
          },
        },
        start: true,
        end: true,
      },
    });
  }),

  // Fetch a work experience by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.db.experience.findUnique({
        where: { id },
        include: {
          projects: true,
        },
      });
    }),

  // Create a new work experience
  create: protectedProcedure
    .input(ExperienceSchema)
    .mutation(async ({ ctx, input }) => {
      const { company, description, projects, start, end } = input;

      // First, Create a new work experience
      const experience = await ctx.db.experience.create({
        data: {
          company,
          description,
          start,
          end,
          projects: {
            create: projects,
          },
        },
        include: {
          projects: true,
        },
      });

      return experience;
    }),

  // Delete a work experience by ID
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return await ctx.db.experience.delete({
        where: {
          id,
        },
      });
    }),
});
