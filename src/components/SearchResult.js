import React from "react"
import animation from "../pages/animation.module.css"
import StdRoom from "./StdRoom"
import ParaContainer from "./ParaContainer"
import Button from "@material-ui/core/Button"
import Alert from "@material-ui/lab/Alert"

const SearchResult = props => {
  return (
    <div>
      {props.available ? (
        <section
          className={animation.scaleInCenter}
          style={{ textAlign: "center", margin: "5px auto" }}
        >
          <StdRoom />

          <ParaContainer>
            <h3 style={{ marginTop: "1.45rem" }}>Availability</h3>
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

            <Button
              style={{ marginBottom: "20px" }}
              id="bookButton"
              variant="contained"
              color="primary"
              type="submit"
              onClick={props.navigate}
            >
              Book Now
            </Button>
          </ParaContainer>
        </section>
      ) : (
        <section
          style={{ textAlign: "center", margin: "auto", width: "500px" }}
        >
          <Alert severity="error">
            Sorry, there was no availability for the date you are searching for.
          </Alert>
        </section>
      )}
    </div>
  )
}

export default SearchResult
