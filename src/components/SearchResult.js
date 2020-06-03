import React from "react"
import animation from "../pages/animation.module.css"
import StdRoom from "./StdRoom"
import ParaContainer from "./ParaContainer"
import Button from "@material-ui/core/Button"

const SearchResult = props => {
  return (
    <div>
      {props.available ? (
        <section
          className={animation.scaleInCenter}
          style={{ textAlign: "center", margin: "25px auto", padding: "10px" }}
        >
          <StdRoom />

          <ParaContainer>
            <h3>Availability</h3>
            <hr style={{ width: "50%" }} />
            <p>Arrival Date : {props.arrivalDate}</p>
            <p>Departure Date : {props.departureDate}</p>
            <p>Rate / Night : £ {props.rate}</p>
            <p>
              Number of room{props.room > 1 && "s"} : {props.room}
            </p>
            <p>
              Total Night{props.totalNight > 1 && "s"} : {props.totalNight}
            </p>
            <p>
              Total Price :
              {props.totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "GBP",
              })}
            </p>
            {props.showButton && (
              <Button
                style={{ marginBottom: "20px" }}
                id="bookButton"
                variant="contained"
                type="submit"
                onClick={props.navigate}
              >
                Book Now
              </Button>
            )}
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
