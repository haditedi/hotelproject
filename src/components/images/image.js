import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"

const Image = props => {
  const data = useStaticQuery(graphql`
    query {
      outdoorMobile: file(relativePath: { eq: "hotel-paradise.jpg" }) {
        child: childImageSharp {
          fixed(width: 1000) {
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
          fixed(width: 1000) {
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
          fixed(width: 1000) {
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

  // const style = { height: "70vh" }
  // const imgHeight = "100%"
  // const [hero, setHero] = useState(
  //   <Img
  //     style={style}
  //     imgStyle={{ objectFit: "cover", height: imgHeight }}
  //     className={props.className}
  //     fluid={sourceOutdoor}
  //     alt="hotel paradise"
  //   />
  // )

  // useEffect(() => {
  //   setTimeout(() => {
  //     setHero(
  //       <Img
  //         style={style}
  //         imgStyle={{
  //           objectFit: "cover",
  //           height: imgHeight,
  //         }}
  //         className={props.className}
  //         fluid={sourcePool}
  //         alt="hotel swimming pool"
  //       />
  //     )
  //   }, 5000)
  //   setTimeout(() => {
  //     setHero(
  //       <Img
  //         style={style}
  //         imgStyle={{
  //           objectFit: "cover",
  //           height: imgHeight,
  //         }}
  //         className={props.className}
  //         fluid={sourceNight}
  //         alt="hotel night view"
  //       />
  //     )
  //   }, 10000)
  // }, [])

  return (
    <Carousel showThumbs={false}>
      <div>
        <Img
          fixed={sourceOutdoor}
          style={{ width: "90vw", height: "70vh" }}
          imgStyle={{ objectFit: "contain" }}
        />
        <p className="legend">Outdoor</p>
      </div>
      <div>
        <Img
          fixed={sourcePool}
          style={{ width: "90vw", height: "70vh" }}
          imgStyle={{ objectFit: "contain" }}
        />
        <p className="legend">Pool</p>
      </div>
      <div>
        <Img
          fixed={sourceNight}
          style={{ width: "90vw", height: "70vh" }}
          imgStyle={{ objectFit: "contain" }}
        />
        <p className="legend">Evening</p>
      </div>
    </Carousel>

    // {/* <section style={{ textAlign: "center", width: "100%" }}>
    // <Img
    //   fixed={sourceOutdoor}
    //   style={{ width: "90vw", height: "70vh" }}
    //   imgStyle={{ objectFit: "cover" }}
    // />
    // </section> */}
  )
}

export default Image
