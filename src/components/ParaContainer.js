import React from "react"
import classes from "./ParaContainer.module.css"

const ParaContainer = props => {
  return (
    <div style={props.style} className={classes.para}>
      {props.children}
    </div>
  )
}

export default ParaContainer
