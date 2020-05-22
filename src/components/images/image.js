import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = props => {
  const data = useStaticQuery(graphql`
    query {
      outdoor: file(relativePath: { eq: "hotel-paradise.jpg" }) {
        child: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pool: file(relativePath: { eq: "hotel-pool.jpg" }) {
        child: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      night: file(relativePath: { eq: "hotel-outdoor.jpg" }) {
        child: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const [hero, setHero] = useState(
    <Img
      style={{ maxHeight: "70vh" }}
      imgStyle={{ objectFit: "cover" }}
      className={props.className}
      fluid={data.outdoor.child.fluid}
      alt="hotel paradise"
    />
  )

  useEffect(() => {
    setTimeout(() => {
      setHero(
        <Img
          style={{ maxHeight: "70vh" }}
          imgStyle={{ objectFit: "cover" }}
          className={props.className}
          fluid={data.pool.child.fluid}
          alt="hotel swimming pool"
        />
      )
    }, 5000)
    setTimeout(() => {
      setHero(
        <Img
          style={{ maxHeight: "70vh" }}
          imgStyle={{ objectFit: "cover" }}
          className={props.className}
          fluid={data.night.child.fluid}
          alt="hotel night view"
        />
      )
    }, 10000)
  }, [])

  return <div>{hero}</div>
}

export default Image
