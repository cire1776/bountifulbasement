require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
  siteMetadata: {
    title: `Bountiful Basement`,
    description: ``,
    author: `Eric Russell`,
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: `https://www.bountifulbasement.com/`, // required!
      },
    },

    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
