module.exports = {
    siteMetadata: {
        title: `Persian Simple Icons`,
        siteUrl: `http://localhost:8000`
    },
    plugins: [
        'gatsby-plugin-postcss',
        "gatsby-plugin-image",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
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
                include: /icons/
              }
            }
          },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "images",
                "path": "./src/images/"
            },
            __key: "images"
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
            resolve: "gatsby-transformer-remark",
            options: {}
        },
    ]
};