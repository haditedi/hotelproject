import React from "react"
import animation from "../pages/animation.module.css"

const HeadingText = props => {
  return (
    <section
      style={{
        padding: "1.5em 0",
        textAlign: "center",
        backgroundColor: "#fcbf1e",
      }}
    >
      <h1 className={animation.trackingIn}>{props.children}</h1>
    </section>
  )
}

export default HeadingText
