import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/trpc";
import * as z from "zod";
import { CertificationSchema } from "@/validators/certification.validator";

export const certificationRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.certification.findMany();
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.db.certification.findUnique({
        where: { id },
      });
    }),
  mutate: protectedProcedure
    .input(CertificationSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, imageUrl, certificationLink, dateOfCompletion } = input;

      return await ctx.db.certification.create({
        data: {
          title,
          imageUrl,
          certificationLink,
          dateOfCompletion,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.db.certification.delete({
        where: {
          id,
        },
      });
    }),
});
