import React, { useEffect } from "react"
import Layout from "../components/layout"
import Image from "../components/images/image"
import SEO from "../components/seo"
import SearchAvailability from "../components/search-availability"
import Grid from "@material-ui/core/Grid"
import axios from "axios"
import moment from "moment"
import animation from "./animation.module.css"

const IndexPage = () => {
  const [state, setSearchState] = React.useState({
    numChild: 0,
    numAdult: 1,
    arrivalDate: moment(),
    departureDate: moment(),
  })

  const handleSearchChange = event => {
    let nam = event.target.name
    let val = event.target.value

    setSearchState(prevState => {
      return {
        ...prevState,
        [nam]: val,
      }
    })
  }

  const handleDateChange = (event, param) => {
    let nam = param
    let val = event._d
    console.log(val, param)
    setSearchState(prevState => {
      return {
        ...prevState,
        [nam]: val,
      }
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(state)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Grid container>
        <Grid item xs={12}>
          <h1 className={`heading ${animation.trackingIn}`}>Hotel Paradise</h1>
        </Grid>
        <Grid item xs={12}>
          <Image className={animation.kenburnsTop} />
        </Grid>
        <Grid item xs={12}>
          <SearchAvailability
            changeDate={handleDateChange}
            change={handleSearchChange}
            numAdult={state.numAdult}
            submit={handleSubmit}
            numChild={state.numChild}
            arrivalDate={state.arrivalDate}
            departureDate={state.departureDate}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default IndexPage
