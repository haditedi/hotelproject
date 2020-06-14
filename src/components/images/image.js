import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import classes from "./image.module.css"

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      outdoorMobile: file(relativePath: { eq: "hotel-paradise.jpg" }) {
        child: childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      outdoorDesktop: file(relativePath: { eq: "hotel-paradise.jpg" }) {
        child: childImageSharp {
          fluid(maxWidth: 1700, maxHeight: 800, quality: 100) {
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
          fluid(maxWidth: 1700, maxHeight: 800, quality: 100) {
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
          fluid(maxWidth: 1700, maxHeight: 800, quality: 100) {
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

  const [state, setState] = useState({
    picOne: true,
    picTwo: false,
    picThree: false,
  })

  useEffect(() => {
    let interval = setInterval(() => {
      if (state.picOne) {
        setState(prev => {
          return {
            ...prev,
            picOne: false,
            picTwo: true,
            picThree: false,
          }
        })
      } else if (state.picTwo) {
        setState(prev => {
          return {
            ...prev,
            picOne: false,
            picTwo: false,
            picThree: true,
          }
        })
      } else {
        setState(prev => {
          return {
            ...prev,
            picOne: true,
            picTwo: false,
            picThree: false,
          }
        })
      }
    }, 5000)
    return () => clearInterval(interval)
  })

  return (
    <>
      {state.picOne && (
        <div className={classes.slideInBlurredLeft}>
          <Img
            style={{ margin: "20px auto" }}
            className={classes.img}
            fluid={sourceOutdoor}
          />
        </div>
      )}
      {state.picTwo && (
        <div className={classes.slideInBlurredLeft}>
          <Img
            style={{ margin: "20px auto" }}
            className={classes.img}
            fluid={sourcePool}
          />
        </div>
      )}

      {state.picThree && (
        <div className={classes.slideInBlurredLeft}>
          <Img
            style={{ margin: "20px auto" }}
            className={classes.img}
            fluid={sourceNight}
          />
        </div>
      )}
    </>

    // <Carousel showThumbs={false}>
    //   <div>
    //     <Img
    //       style={{ width: "90vw", height: "70vh" }}
    //       fixed={sourceOutdoor}
    //       imgStyle={{ objectFit: "contain" }}
    //     />
    //     <p className="legend">Outdoor</p>
    //   </div>
    //   <div>
    //     <Img
    //       style={{ width: "90vw", height: "70vh" }}
    //       fixed={sourcePool}
    //       imgStyle={{ objectFit: "contain" }}
    //     />
    //     <p className="legend">Pool</p>
    //   </div>
    //   <div>
    //     <Img
    //       style={{ width: "90vw", height: "70vh" }}
    //       fixed={sourceNight}
    //       imgStyle={{ objectFit: "contain" }}
    //     />
    //     <p className="legend">Evening</p>
    //   </div>
    // </Carousel>
  )
}

export default Image
