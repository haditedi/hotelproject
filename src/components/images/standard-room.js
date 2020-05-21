import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const StandardRoom = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "standardRoom.jpg" }) {
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
      fluid={data.placeholderImage.childImageSharp.fluid}
      alt="Standard Room"
    />
  )
}

export default StandardRoom
