import React from "react"
import classes from "./ParaContainer.module.css"

const ParaContainer = props => {
  return <div className={classes.para}>{props.children}</div>
}

export default ParaContainer
