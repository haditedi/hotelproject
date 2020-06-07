import React from "react"
import animation from "../pages/animation.module.css"
import { jsx, css } from "@emotion/core"

const HeadingText = props => {
  const style = css`
    font-size: 1.5rem;
    @media (min-width: 500px) {
      font-size: 3rem;
    }
  `

  return (
    <section
      style={{
        padding: "1.5em 0",
        textAlign: "center",
        backgroundColor: "#fcbf1e",
      }}
    >
      <h1
        css={style}
        style={{ padding: "7px", margin: "0" }}
        className={animation.trackingIn}
      >
        {props.children}
      </h1>
    </section>
  )
}

export default HeadingText
