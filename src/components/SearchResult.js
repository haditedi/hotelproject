import React, { useState, useEffect } from "react"
import animation from "../pages/animation.module.css"
import StdRoom from "./StdRoom"
import ParaContainer from "./ParaContainer"

const SearchResult = props => {
  const [backGround, setBackground] = useState({ backgroundColor: "#40bad5" })
  useEffect(() => {
    setBackground({ backgroundColor: "yellow" })

    setTimeout(() => {
      setBackground({ backgroundColor: "#40bad5" })
    }, 1500)
    console.log("useEffect - result")
  }, [
    props.room,
    props.arrivalDate,
    props.departureDate,
    props.totalNight,
    props.rate,
  ])

  return (
    <div>
      {props.available ? (
        <section
          className={animation.scaleInCenter}
          style={{ textAlign: "center", margin: "25px auto", padding: "10px" }}
        >
          <div id="destination"></div>
          <StdRoom />

          <ParaContainer>
            <h3>Availability</h3>
            <hr style={{ width: "50%" }} />
            <p style={backGround}>Arrival Date : {props.arrivalDate}</p>
            <p style={backGround}>Departure Date : {props.departureDate}</p>
            <p style={backGround}>Rate / Night : £ {props.rate}</p>
            <p style={backGround}>
              Number of room{props.room > 1 && "s"} : {props.room}
            </p>
            <p style={backGround}>
              Total Night{props.totalNight > 1 && "s"} : {props.totalNight}
            </p>
            <p style={backGround}>
              Total Price :
              {props.totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "GBP",
              })}
            </p>
          </ParaContainer>
        </section>
      ) : (
        <h3 style={{ textAlign: "center", marginTop: "25px" }}>
          Sorry, no Availability
        </h3>
      )}
    </div>
  )
}

export default SearchResult
