import React from "react"
import Card from "./card"
import StandardRoom from "./images/standard-room"

const stdRoom = () => {
  return (
    <Card image={<StandardRoom />}>
      <h2>Standard Room</h2>
      <hr style={{ width: "50%" }} />
      <h3>Features: </h3>
      <ul>
        <li>King Size bed</li>
        <li>Size: 50 sqm</li>
        <li>Full breakfast included</li>
      </ul>
    </Card>
  )
}

export default stdRoom
