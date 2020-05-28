import React from "react"
import Layout from "../components/layout"
import Search from "../components/SearchAvailability"

const booking = ({ location }) => {
  console.log(location)
  return (
    <Layout>
      <div>
        <h1>hello</h1>
        <p>{location.state.room}</p>
        <p>{location.state.arrivalDate.toDateString()}</p>
        <p>{location.state.departureDate.toDateString()}</p>
      </div>
      <Search />
    </Layout>
  )
}

export default booking
