import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

const Image = props => {
  const data = useStaticQuery(graphql`
    query {
      outdoorMobile: file(relativePath: { eq: "hotel-paradise.jpg" }) {
        child: childImageSharp {
          fixed(width: 500) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      outdoorDesktop: file(relativePath: { eq: "hotel-paradise.jpg" }) {
        child: childImageSharp {
          fixed(width: 1500) {
            ...GatsbyImageSharpFixed
          }
        }
      }

      poolMobile: file(relativePath: { eq: "hotel-pool.jpg" }) {
        child: childImageSharp {
          fixed(width: 500) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      poolDesktop: file(relativePath: { eq: "hotel-pool.jpg" }) {
        child: childImageSharp {
          fixed(width: 1500) {
            ...GatsbyImageSharpFixed
          }
        }
      }

      nightMobile: file(relativePath: { eq: "hotel-night.jpg" }) {
        child: childImageSharp {
          fixed(width: 500) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      nightDesktop: file(relativePath: { eq: "hotel-night.jpg" }) {
        child: childImageSharp {
          fixed(width: 1500) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const sourceOutdoor = [
    data.outdoorMobile.child.fixed,

    {
      ...data.outdoorDesktop.child.fixed,
      media: `(min-width: 800px)`,
    },
  ]
  const sourcePool = [
    data.poolMobile.child.fixed,
    {
      ...data.poolDesktop.child.fixed,
      media: `(min-width: 800px)`,
    },
  ]
  const sourceNight = [
    data.nightMobile.child.fixed,
    {
      ...data.nightDesktop.child.fixed,
      media: `(min-width: 800px)`,
    },
  ]

  return (
    <Carousel showThumbs={false}>
      <div>
        <Img
          style={{ width: "90vw", height: "70vh" }}
          fixed={sourceOutdoor}
          imgStyle={{ objectFit: "contain" }}
        />
        <p className="legend">Outdoor</p>
      </div>
      <div>
        <Img
          style={{ width: "90vw", height: "70vh" }}
          fixed={sourcePool}
          imgStyle={{ objectFit: "contain" }}
        />
        <p className="legend">Pool</p>
      </div>
      <div>
        <Img
          style={{ width: "90vw", height: "70vh" }}
          fixed={sourceNight}
          imgStyle={{ objectFit: "contain" }}
        />
        <p className="legend">Evening</p>
      </div>
    </Carousel>
  )
}

export default Image
