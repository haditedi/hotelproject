import React from "react"
import classes from "./card.module.css"

const card = props => {
  return (
    <div className={classes.container}>
      <section className={classes.imgCont}>{props.image}</section>
      <section className={classes.para}>{props.children}</section>
    </div>
  )
}

export default card
