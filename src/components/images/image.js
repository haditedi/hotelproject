import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = props => {
  const data = useStaticQuery(graphql`
    query {
      outdoorMobile: file(relativePath: { eq: "hotel-paradise.jpg" }) {
        child: childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      outdoorDesktop: file(relativePath: { eq: "hotel-desktop.jpg" }) {
        child: childImageSharp {
          fluid(maxWidth: 1800, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      poolMobile: file(relativePath: { eq: "hotel-pool.jpg" }) {
        child: childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      poolDesktop: file(relativePath: { eq: "hotel-pool.jpg" }) {
        child: childImageSharp {
          fluid(maxWidth: 1800, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      nightMobile: file(relativePath: { eq: "hotel-night.jpg" }) {
        child: childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      nightDesktop: file(relativePath: { eq: "hotel-night.jpg" }) {
        child: childImageSharp {
          fluid(maxWidth: 1800, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const sourceOutdoor = [
    data.outdoorMobile.child.fluid,
    {
      ...data.outdoorDesktop.child.fluid,
      media: `(min-width: 800px)`,
    },
  ]
  const sourcePool = [
    data.poolMobile.child.fluid,
    {
      ...data.poolDesktop.child.fluid,
      media: `(min-width: 800px)`,
    },
  ]
  const sourceNight = [
    data.nightMobile.child.fluid,
    {
      ...data.nightDesktop.child.fluid,
      media: `(min-width: 800px)`,
    },
  ]

  const style = { height: "70vh" }
  const imgHeight = "100%"
  const [hero, setHero] = useState(
    <Img
      style={style}
      imgStyle={{ objectFit: "cover", height: imgHeight }}
      className={props.className}
      fluid={sourceOutdoor}
      alt="hotel paradise"
    />
  )

  useEffect(() => {
    setTimeout(() => {
      setHero(
        <Img
          style={style}
          imgStyle={{
            objectFit: "cover",
            height: imgHeight,
          }}
          className={props.className}
          fluid={sourcePool}
          alt="hotel swimming pool"
        />
      )
    }, 5000)
    setTimeout(() => {
      setHero(
        <Img
          style={style}
          imgStyle={{
            objectFit: "cover",
            height: imgHeight,
          }}
          className={props.className}
          fluid={sourceNight}
          alt="hotel night view"
        />
      )
    }, 10000)
  }, [])

  return <section>{hero}</section>
}

export default Image
