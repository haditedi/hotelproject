module.exports = {
  siteMetadata: {
    title: `Hotel Paradise`,
    description: `Beautiful hotel conveniently located by the sea, shopping centre, food court`,
    author: `hadi tedi`,
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyBXz5G4pCgwK6ZVb04q6FJ9Br6vatxlJUU",
          authDomain: "firestore-b0c8c.firebaseapp.com",
          databaseURL: "https://firestore-b0c8c.firebaseio.com",
          projectId: "firestore-b0c8c",
          storageBucket: "firestore-b0c8c.appspot.com",
          messagingSenderId: "807714406546",
          appId: "1:807714406546:web:113f0477e066118c8be64b",
        },
      },
    },
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
