import React from "react"
import ParaContainer from "./ParaContainer"
import Button from "@material-ui/core/Button"
import Success from "./Success"

const BookingConfirmation = props => {
  return (
    <div>
      <ParaContainer style={{ textAlign: "left" }}>
        <h3 style={{ textDecoration: "underline" }}>Existing Booking</h3>
        <p>Confirmation number : {props.confirmation}.</p>
        <p>Arrival Date :{props.arrivalDate}</p>
        <p>Departure Date : {props.departureDate}.</p>

        <p>
          Total Night : {props.totalNight}. Rate/Night/Room : £{" "}
          {props.ratePerNight}. Total Amount:{" "}
          {props.totalPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "GBP",
          })}
        </p>
        <Button
          size="small"
          onClick={props.cancel}
          variant="contained"
          color="secondary"
        >
          Cancel This Booking
        </Button>
      </ParaContainer>
      <Success open={props.open} handleClose={props.handleClose} />
    </div>
  )
}

export default BookingConfirmation
