import React, { useEffect } from "react"
import Layout from "../components/layout"
import Image from "../components/images/Image"
import SEO from "../components/seo"
import SearchAvailability from "../components/SearchAvailability"
import HeadingText from "../components/HeadingText"
import moment from "moment"
import animation from "./animation.module.css"
import firebase from "../components/Firebase"
import SearchResult from "../components/SearchResult"

const IndexPage = () => {
  const [state, setSearchState] = React.useState({
    room: 1,
    arrivalDate: moment.utc().startOf("d").format(),
    departureDate: moment.utc().startOf("d").add(1, "days").format(),
    searchResult: false,
    available: false,
    rate: 0,
    totalNight: 0,
    totalPrice: 0,
  })

  useEffect(() => {
    if (state.arrivalDate > state.departureDate) {
      setSearchState(prevState => {
        return {
          ...prevState,
          departureDate: moment
            .utc(state.arrivalDate)
            .startOf("d")
            .add(1, "days")
            .format(),
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
    let val = moment.utc(event).startOf("d").format()
    setSearchState(prevState => {
      return {
        ...prevState,
        [nam]: val,
      }
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    let startDate = moment(state.arrivalDate).startOf("d")._d
    let endDate = moment(state.departureDate).startOf("d")._d
    console.log(
      moment.utc(state.departureDate).diff(moment.utc(state.arrivalDate), "d")
    )
    console.log(moment.utc())
    console.log(moment())

    const stdView = firebase
      .firestore()
      .collection("stdRoom")
      .where("date", ">=", startDate)
      .where("date", "<", endDate)

    stdView
      .get()
      .then(function (query) {
        query.forEach(function (doc) {
          if (doc.data().avail >= state.room) {
            console.log(
              "[FIREBASE] ",
              doc.data(),
              " = > ",
              doc.data().date.toDate()
            )
            const totalNight = moment
              .utc(state.departureDate)
              .diff(moment.utc(state.arrivalDate), "d")
            const totalPrice = totalNight * doc.data().rate
            setSearchState(prevState => {
              return {
                ...prevState,
                searchResult: true,
                available: true,
                rate: doc.data().rate,
                totalNight: totalNight,
                totalPrice: totalPrice,
              }
            })
          } else {
            setSearchState(prevState => {
              return {
                ...prevState,
                searchResult: true,
                available: false,
              }
            })
            console.log("olalal")
          }
        })
      })
      .catch(err => console.log("error", err))
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

        {state.searchResult && (
          <SearchResult
            available={state.available}
            arrivalDate={moment(state.arrivalDate).format("Do MMM YYYY")}
            departureDate={moment(state.departureDate).format("Do MMM YYYY")}
            rate={state.rate}
            totalNight={state.totalNight}
            totalPrice={state.totalPrice}
          />
        )}
      </div>
    </Layout>
  )
}

export default IndexPage
