import { config } from "@/shared";
import request, { gql } from "graphql-request";

const first = 10;
const host = "ssblogs.hashnode.dev";
const endpoint = config.NEXT_PUBLIC_HASHNODE_ENDPOINT;
const importantTags = ["java", "react", "node", "typescript"];
const uniqueTags = new Set();

export type PublicationName = {
  publication: {
    title?: string;
    displayTitle?: string;
    favicon?: string;
    posts: BlogType[];
  };
};

export type BlogType = {
  title: string;
  subtitle: string;
  brief: string;
  url: string;
  tags: {
    id: string;
    name: string;
  }[];
  coverImage: {
    url: string;
  };
  author: {
    username: string;
    profilePicture: string;
  };
};

export type BlogTagType = {
  id: string;
  name: string;
};

export const getBlogs = async () => {
  const query = gql`
    query Publication($first: Int!, $host: String) {
      publication(host: $host) {
        posts(first: $first) {
          edges {
            node {
              title
              subtitle
              brief
              url
              tags {
                id
                name
              }
              coverImage {
                url
              }
              author {
                username
                profilePicture
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `;

  const response = await request<PublicationName>(endpoint, query, {
    first,
    host,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const blogs = response?.publication?.posts?.edges?.map(({ node }) => ({
    ...node,
  })) as BlogType[];

  const blogTags = blogs
    .flatMap(({ tags }) => {
      return (
        tags?.map((tag) => ({ id: tag.id, name: tag.name.toLowerCase() })) ?? []
      );
    })
    .filter(({ name }) => {
      const lowerCaseName = name.toLowerCase();
      if (!uniqueTags.has(lowerCaseName)) {
        uniqueTags.add(lowerCaseName);
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      // Check if any tag name matches with the importantTags array
      const aIndex = importantTags.findIndex((tag) => a.name.includes(tag));
      const bIndex = importantTags.findIndex((tag) => b.name.includes(tag));

      // If both have matching important tags, sort alphabetically
      if (aIndex !== -1 && bIndex !== -1) {
        return a.name.localeCompare(b.name);
      }

      // If only a has an important tag, prioritize it
      if (aIndex !== -1 && bIndex === -1) {
        return -1;
      }

      // If only b has an important tag, prioritize it
      if (aIndex === -1 && bIndex !== -1) {
        return 1;
      }

      // If none have important tags, sort alphabetically
      return a.name.localeCompare(b.name);
    });

  return { blogs, blogTags };
};
