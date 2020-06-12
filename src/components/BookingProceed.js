import React from "react"
import moment from "moment"
import StdRoom from "./StdRoom"
import classes from "./BookingProceed.module.css"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Alert from "@material-ui/lab/Alert"

const BookingProceed = ({
  state,
  userState,
  handleCardChange,
  handleCardSubmit,
  cardState,
  error,
  dismiss,
  errorMessage,
  searchAgain,
}) => {
  return (
    <div className={classes.outer}>
      <>
        <section className={classes.container}>
          <p>
            <b>Proceeding with your current query ?</b>
          </p>

          <p>
            Arrival Date: {moment(state.arrivalDate).format("Do MMM YYYY")},
            Departure Date: {moment(state.departureDate).format("Do MMM YYYY")}
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
          <p>Your email: {userState.email}</p>

          <form>
            <p>
              Credit card info:{" "}
              <b style={{ color: "red" }}>Testing mode - no validation</b>
            </p>
            <TextField
              style={{ margin: "5px" }}
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleCardChange}
              value={cardState.name}
              variant="outlined"
              inputProps={{ "aria-label": "card name" }}
            />
            <TextField
              style={{ margin: "5px" }}
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={handleCardChange}
              value={cardState.number}
              variant="outlined"
              inputProps={{ "aria-label": "card number" }}
            />
            <TextField
              style={{ width: "100px", margin: "5px" }}
              type="tel"
              name="expiry"
              placeholder="Exp Date"
              onChange={handleCardChange}
              value={cardState.expiry}
              variant="outlined"
              inputProps={{ "aria-label": "card expiry" }}
            />
            <p style={{ padding: "15px 15px 5px" }}>
              <b>Terms and Conditions</b>
            </p>
            <p style={{ padding: "5px 15px 15px" }}>
              Cancellation policy is 1 day before arrival day at no charge
              otherwise 1 day charge apply.
            </p>

            {error && (
              <section
                style={{
                  textAlign: "center",
                  margin: "10px auto",
                  width: "500px",
                }}
              >
                <Alert severity="error" onClose={dismiss}>
                  {errorMessage}
                </Alert>
              </section>
            )}
            <Button
              style={{ margin: "20px 15px" }}
              id="bookButton"
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleCardSubmit}
            >
              Looks good. Please book this.
            </Button>
            <Button
              style={{ margin: "20px 15px" }}
              variant="contained"
              onClick={searchAgain}
            >
              Search Another Date
            </Button>
          </form>
        </section>
        <StdRoom />
      </>
    </div>
  )
}

export default BookingProceed
