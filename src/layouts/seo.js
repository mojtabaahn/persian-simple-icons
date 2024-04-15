import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import favicon from "../assets/favicon.png"

export const Seo = ({ description, lang, meta, title }) => {
    const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
    )

    const metaDescription = description || site.siteMetadata.description
    const defaultTitle = site.siteMetadata?.title

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            bodyAttributes={{class: 'bg-slate-100'}}
            title={title ? `${title} — ${defaultTitle}` : defaultTitle}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
            ].concat(meta)}
        >
            <link
                rel="icon"
                type="image/png"
                href={favicon}
                sizes="128x172"
            />
        </Helmet>
    )
}

Seo.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
}
