import React, { VFC } from "react";
import { useStaticQuery, graphql } from "gatsby";

import { rhythm } from "../utils/typography";

const Bio: VFC = () => {
  const data = useStaticQuery<GatsbyTypes.BioQuery>(graphql`
    query Bio {
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
  `);
  if (data.site?.siteMetadata === undefined) {
    return <div>Error: site.siteMetadata is undefined</div>;
  }
  if (data.gravatar?.url === undefined) {
    return <div>Error: gravatar.url is undefined</div>;
  }

  const authorName = data.site.siteMetadata.author?.name || "";

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
        alt={authorName}
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
        Written by <strong>{authorName}</strong>
      </p>
    </div>
  );
};

export default Bio;
