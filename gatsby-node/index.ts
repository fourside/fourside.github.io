import path from "path";
import type { GatsbyNode } from "gatsby";

type Result = {
  contentful: {
    edges: {
      node: Node;
    }[];
  };
};

type Node = {
  body: {
    body: string;
  };
  title: string;
  slug: string;
  updatedAt: string;
};

export type BlogPageContext = {
  slug: string;
  next: Node | null;
  previous: Node | null;
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);
  const result = await graphql<Result>(
    `
      query BlogPost {
        contentful: allContentfulBlogPost(sort: { fields: publishDate, order: DESC }, limit: 1000) {
          edges {
            node {
              body {
                body
              }
              title
              slug
              updatedAt
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  if (result.data === undefined) {
    throw new Error("no data");
  }

  // Create blog posts pages.
  const posts = result.data.contentful.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage<BlogPageContext>({
      path: post.node.slug,
      component: blogPost,
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    });
  });
};
