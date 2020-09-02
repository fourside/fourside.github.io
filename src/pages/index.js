import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.contentful.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.title || node.slug
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
              <small>{node.updatedAt}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.body.childMarkdownRemark.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    contentful: allContentfulBlogPost(sort: {fields: updatedAt, order: DESC}, limit: 1000) {
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
          updatedAt(formatString: "YYYY/MM/DD")
        }
      }
    }
  }
`
