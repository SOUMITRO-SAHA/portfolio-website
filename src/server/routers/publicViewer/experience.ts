import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/trpc";
import {
  addProjectsInputSchema,
  createWorkExperienceInputSchema,
} from "@/validators/experience.validator";
import * as z from "zod";

export const experienceRouter = createTRPCRouter({
  // Fetch all work experiences
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.workExperience.findMany({
      select: {
        id: true,
        company: true,
        description: true,
        projects: true,
      },
    });
  }),

  // Fetch a work experience by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.db.workExperience.findUnique({
        where: { id },
      });
    }),

  // Create a new work experience
  create: protectedProcedure
    .input(createWorkExperienceInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { company, description, projects, start, end } = input;

      // First, Create a new work experience
      const workEx = await ctx.db.workExperience.create({
        data: {
          company,
          description,
          start,
          end,
        },
        select: {
          id: true,
        },
      });

      // Second, Create new projects for the new work experience
      let projectsFromDB: any = null;
      if (projects && projects.length > 0) {
        projectsFromDB = await Promise.all(
          projects.map(async (project) => {
            const { link, title } = project;
            return await ctx.db.workExperienceProject.create({
              data: {
                workExperienceId: workEx.id,
                title,
                link,
              },
            });
          }),
        );
      }

      return {
        ...workEx,
        projects: projectsFromDB,
      };
    }),

  // Add projects to a work experience
  addProjects: protectedProcedure
    .input(addProjectsInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, projects } = input;
      return await Promise.all(
        projects.map(async (project) => {
          const { link, title } = project;
          return await ctx.db.workExperienceProject.create({
            data: {
              workExperienceId: id,
              title,
              link,
            },
          });
        }),
      );
    }),

  // Delete a work experience by ID
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.db.workExperience.delete({
        where: {
          id,
        },
      });
    }),
});
