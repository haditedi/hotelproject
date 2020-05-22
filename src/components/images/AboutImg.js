import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const AboutImg = () => {
  const data = useStaticQuery(graphql`
    query {
      about: file(relativePath: { eq: "about.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Img
      style={{ maxHeight: "80vh" }}
      imgStyle={{ objectFit: "contain" }}
      fluid={data.about.childImageSharp.fluid}
      alt="About Us"
    />
  )
}

export default AboutImg
