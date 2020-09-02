require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `fourside.github.io`,
    author: {
      name: `fourside`,
    },
    description: `programmer's note`,
    siteUrl: `https://fourside.github.io/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-embed-gist",
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, contentful } }) => {
              return contentful.edges.map(edge => {
                return Object.assign({}, {
                  title: edge.node.title,
                  description: edge.node.body.childMarkdownRemark.excerpt,
                  date: edge.node.publishDate,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  custom_elements: [{ "content:encoded": edge.node.body.childMarkdownRemark.html }],
                })
              })
            },
            query: `
              {
                contentful: allContentfulBlogPost(
                  sort: {fields: publishDate, order: DESC}, limit: 1000
                ) {
                  edges {
                    node {
                      title
                      slug
                      body {
                        childMarkdownRemark {
                          excerpt
                          html
                        }
                      }
                      publishDate(formatString: "YYYY/MM/DD")
                    }
                  }
                }
              }
            `,
            output: "/feed.xml",
            title: "fourside.github.io",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `fourside.github.io`,
        short_name: `fourside`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-gravatar`,
      options: {
        emails: [
          { email: `fourside@gmail.com`, query: `?size=64` }
        ]
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}
