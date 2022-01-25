import React, { VFC } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { rhythm } from "../utils/typography"

const Bio: VFC = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      gravatar {
        url
      }
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        alignItems: `center`,
        marginBottom: rhythm(2.5),
      }}
    >
      <img
        src={data.gravatar.url}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
      />
      <p
        style={{
          margin: `0`,
        }}
      >
        Written by <strong>{author.name}</strong>
      </p>
    </div>
  )
}

export default Bio
