import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/trpc";
import { CreateOpenSourceSchema } from "@/validators/open-source.validator";
import { z } from "zod";

export const openSourceRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.openSourceContribution.findMany();
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.db.openSourceContribution.findUnique({
        where: { id },
      });
    }),
  create: protectedProcedure
    .input(CreateOpenSourceSchema)
    .mutation(async ({ ctx, input }) => {
      const { description, repository, prLink, isPRMerged, issueLink } = input;
      return await ctx.db.openSourceContribution.create({
        data: {
          repository,
          description,
          isPRMerged,
          prLink,
          issueLink,
        },
      });
    }),
});
