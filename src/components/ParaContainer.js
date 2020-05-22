import React from "react"
import classes from "./ParaContainer.module.css"

const ParaContainer = props => {
  return (
    <div className={classes.para}>
      <p>{props.children}</p>
    </div>
  )
}

export default ParaContainer
