import React from "react"
import { css, jsx } from "@emotion/core"

const Error = props => {
  return (
    <div
      onClick={props.dismiss}
      css={css`
        margin: 20px;
        padding: 5px;
        background-color: salmon;
        text-align: center;
        border-radius: 5px;
        &:hover {
          background-color: white;
          cursor: pointer;
        }
      `}
    >
      <p>{props.errorMessage}. Click here to dismiss</p>
    </div>
  )
}

export default Error
