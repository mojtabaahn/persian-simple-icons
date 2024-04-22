module.exports = {
    siteMetadata: {
        title: 'Persian Simple Icons',
        description: '20+ free SVG icons for persian popular brands',
        siteUrl: `http://localhost:8000`
    },
    plugins: [
        'gatsby-plugin-postcss',
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        'gatsby-plugin-mdx-frontmatter',
        {
          resolve: `gatsby-omni-font-loader`,
          options: {
            enableListener: true,
            preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
            web: [
              {
                name: `Open Sans`,
                file: `https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&family=Vazirmatn:wght@100..900&display=swap`,
              },
            ],
          },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
              rule: {
                include: /.*\.svg$/
              }
            }
          },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "entries",
                "path": "./entries/"
            },
            __key: "entries"
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "icons",
                "path": "./icons/"
            },
            __key: "icons"
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {}
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
              options: {
                trackingIds: ["G-BTDS6S0YG7"],
                gtagConfig: {
                  anonymize_ip: true,
                  cookie_expires: 0,
                },
                pluginConfig: {
                  head: true,
                },
              },
        },
    ]
};
