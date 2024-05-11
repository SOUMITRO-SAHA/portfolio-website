import { getBlogs } from "@/server/blogs";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";

export const blogRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.blog.findMany();
  }),
  getAllBlogTags: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.blogTag.findMany();
  }),
  syncAllBlogs: publicProcedure.query(async ({ ctx }) => {
    try {
      // First Calling the APIs
      const { blogs, blogTags } = await getBlogs();

      // First Setting the Blog Tags in the DB
      const tags = await Promise.all(
        blogTags.map(async ({ id, name }) => {
          return await ctx.db.blogTag.upsert({
            where: { name },
            create: { name, id },
            update: { name, id },
          });
        }),
      );

      // Second Setting the Blogs in the DB
      if (Array.isArray(blogs)) {
        await Promise.all(
          blogs.map(async (blog) => {
            await ctx.db.blog.upsert({
              where: { url: blog.url },
              create: {
                title: blog.title,
                subtitle: blog.subtitle ?? "",
                brief: blog.brief ?? "",
                url: blog.url,
                coverImage: blog.coverImage.url,
                authorUserName: blog.author.username,
                authorProfilePicture: blog.author.profilePicture,
                tags: {
                  connectOrCreate: tags.map((tag) => ({
                    where: { name: tag.name },
                    create: { name: tag.name, id: tag.id },
                  })),
                },
              },
              update: {
                title: blog.title,
                subtitle: blog.subtitle ?? "",
                brief: blog.brief ?? "",
                coverImage: blog.coverImage.url,
                authorUserName: blog.author.username,
                authorProfilePicture: blog.author.profilePicture,
                tags: {
                  set: tags.map((tag) => ({ name: tag.name })),
                },
              },
            });
          }),
        );
      }

      return { success: true, message: "Blogs synced successfully" };
    } catch (error) {
      console.error("Error syncing blogs:", error);
      throw new Error("Failed to sync blogs");
    }
  }),
});
