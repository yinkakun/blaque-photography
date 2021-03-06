const path = require(`path`);
require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `Blaqie Photography`,
    description: 'Capturing Experience, Not Just Another Photograph.',
  },

  plugins: [
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: process.env.PRISMIC_REPOSITORY_NAME,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        schemas: {
          imagecollection: require('./src/schemas/imagecollection.json'),
          about: require('./src/schemas/about.json'),
          contact: require('./src/schemas/contact.json'),
          homepage: require('./src/schemas/homepage.json'),
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Playfair Display\:400`, `IBM Plex Sans\:400`],
        display: 'swap',
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blaqie Photography`,
        short_name: `Blaqie`,
        start_url: `/`,
        background_color: `#e7d4c1`,
        theme_color: `#e7d4c1`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
