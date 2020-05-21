import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = props => {
  const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "hotel-paradise.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      desktopPool: file(relativePath: { eq: "hotel-pool.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mobile: file(relativePath: { eq: "hotel-outdoor.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 700) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const sources = [
    data.mobile.childImageSharp.fluid,
    {
      ...data.desktop.childImageSharp.fluid,
      media: `(min-width: 700px)`,
    },
  ]

  return (
    <Img
      // style={{ height: "70vh", objectFit: "contain" }}
      // imgStyle={{ height: "100%", width: "50%" }}
      className={props.className}
      fluid={sources}
      alt="hotel paradise"
    />
  )
}

export default Image
