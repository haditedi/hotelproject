import React, { useEffect } from "react"
import Layout from "../components/layout"
import Image from "../components/images/image"
import SEO from "../components/seo"
import SearchAvailability from "../components/SearchAvailability"
import HeadingText from "../components/HeadingText"
import moment from "moment"
import animation from "./animation.module.css"
import firebase from "../components/Firebase"

const IndexPage = () => {
  const [state, setSearchState] = React.useState({
    room: 1,
    arrivalDate: moment()._d,
    departureDate: moment().add(1, "days")._d,
  })

  useEffect(() => {
    if (state.arrivalDate > state.departureDate) {
      setSearchState(prevState => {
        return {
          ...prevState,
          departureDate: moment(state.arrivalDate).add(1, "days")._d,
        }
      })
    }
  }, [state.arrivalDate])

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

    setSearchState(prevState => {
      return {
        ...prevState,
        [nam]: val,
      }
    })
    console.log(state)
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(state)
  }
  console.log(state)
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <HeadingText>Hotel Paradise</HeadingText>

        <Image className={animation.kenburnsTop} />

        <SearchAvailability
          changeDate={handleDateChange}
          change={handleSearchChange}
          room={state.room}
          submit={handleSubmit}
          arrivalDate={state.arrivalDate}
          departureDate={state.departureDate}
        />
      </div>
    </Layout>
  )
}

export default IndexPage
