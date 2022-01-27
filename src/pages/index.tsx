import React, { VFC } from "react";
import { Link, graphql } from "gatsby";
import type { PageProps } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { rhythm } from "../utils/typography";

type Edge = {
  node: {
    title: string;
    slug: string;
    body: {
      body: string;
      childMarkdownRemark: {
        excerpt: string;
      };
    };
    publishDate: string;
  };
};

interface Props {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  contentful: {
    edges: Edge[];
  };
}

const BlogIndex: VFC<PageProps<Props>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.contentful.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.title || node.slug;
        return (
          <article key={node.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.publishDate}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.body.childMarkdownRemark.excerpt,
                }}
              />
            </section>
          </article>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }
    contentful: allContentfulBlogPost(sort: { fields: publishDate, order: DESC }, limit: 1000) {
      edges {
        node {
          title
          slug
          body {
            body
            childMarkdownRemark {
              excerpt
            }
          }
          publishDate(formatString: "YYYY/MM/DD")
        }
      }
    }
  }
`;
