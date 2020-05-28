import React from "react"

const SearchResult = props => {
  return (
    <div>
      {props.available ? (
        <section>
          <h3>Availability</h3>
          <p>Arrival Date : {props.arrivalDate}</p>
          <p>Departure Date : {props.departureDate}</p>
          <p>Rate / Night : {props.rate}</p>
          <p>Total Night : {props.totalNight}</p>
          <p>Total Price : {props.totalPrice}</p>
        </section>
      ) : (
        <h3>Sorry, no Availability</h3>
      )}
    </div>
  )
}

export default SearchResult
