import React, { useState } from "react"
import "react-credit-cards/es/styles-compiled.css"
import moment from "moment"
import StdRoom from "./StdRoom"
import Cards from "react-credit-cards"
import classes from "./BookingProceed.module.css"

const BookingProceed = props => {
  const [cardState, setCardState] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  })
  const state = props.prevValue

  const handleInputFocus = e => {
    const name = e.target.name
    setCardState(prevValue => {
      return { ...prevValue, focus: name }
    })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setCardState(prevValue => {
      return { ...prevValue, [name]: value }
    })
  }

  return (
    <div className={classes.outer}>
      {state && (
        <>
          <section className={classes.container}>
            <p style={{ display: "block" }}>Proceeding with your booking</p>

            <p>
              Arrival Date: {moment(state.arrivalDate).format("Do MMM YYYY")},
              Departure Date:{" "}
              {moment(state.departureDate).format("Do MMM YYYY")}
            </p>
            <p>
              Number of room{state.room > 1 && "s"} : {state.room}
            </p>
            <p>Rate/night/room : £{state.rate} </p>
            <p>Total Night : {state.totalNight}</p>
            <p>
              Total :{" "}
              {state.totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "GBP",
              })}
            </p>
            <p>Your email: {props.email}</p>

            {/* <SearchResult
            style={{ margin: "0" }}
            available={state.available}
            arrivalDate={moment(state.arrivalDate).format("Do MMM YYYY")}
            departureDate={moment(state.departureDate).format("Do MMM YYYY")}
            rate={state.rate}
            room={state.room}
            totalNight={state.totalNight}
            totalPrice={state.totalPrice}
            navigate={false}
            showButton={false}
          /> */}
            <div id="PaymentForm">
              <Cards
                cvc={cardState.cvc}
                expiry={cardState.expiry}
                focused={cardState.focus}
                name={cardState.name}
                number={cardState.number}
              />
              <form autoComplete="true">
                <input
                  type="tel"
                  name="number"
                  placeholder="Card Number"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <input
                  type="tel"
                  name="expiry"
                  placeholder="Expiry Date"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <input
                  type="num"
                  name="cvc"
                  placeholder="CVC"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </form>
            </div>
          </section>
          <StdRoom />
        </>
      )}
    </div>
  )
}

export default BookingProceed
