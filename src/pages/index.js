import React, { useEffect, useContext } from "react"
import Layout from "../components/layout"
import Image from "../components/images/image"
import SEO from "../components/seo"
import SearchAvailability from "../components/SearchAvailability"
import HeadingText from "../components/HeadingText"
import moment from "moment"
import useFirebase from "../components/useFirebase"
import SearchResult from "../components/SearchResult"
import Spinner from "../components/Spinner"
import { navigate } from "gatsby"
import {
  GlobalStateContext,
  GlobalSetSearchContext,
} from "../context/GlobalContextProvider"

const IndexPage = () => {
  const state = useContext(GlobalStateContext)
  const setSearchState = useContext(GlobalSetSearchContext)

  const firebase = useFirebase()

  // const [searchState, setSearchState] = React.useState({
  //   room: 1,
  //   arrivalDate: moment.utc().startOf("d").format(),
  //   departureDate: moment.utc().startOf("d").add(1, "days").format(),
  //   searchResult: false,
  //   available: false,
  //   loading: false,
  //   rate: 0,
  //   totalNight: 0,
  //   totalPrice: 0,
  // })

  useEffect(() => {
    if (state.arrivalDate >= state.departureDate) {
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
  }, [state.arrivalDate, state.departureDate])

  const handleSearchChange = (event, param) => {
    try {
      let nam = event.target.name
      let val = event.target.value
      setSearchState(prevState => {
        return {
          ...prevState,
          [nam]: val,
          searchResult: false,
        }
      })
    } catch (e) {
      let nam = param
      let val = moment.utc(event).startOf("d").format()
      setSearchState(prevState => {
        return {
          ...prevState,
          [nam]: val,
          searchResult: false,
        }
      })
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    setSearchState(prevState => {
      return { ...prevState, loading: true }
    })
    reqView(state, setSearchState)
  }

  const handleNavigate = () => {
    navigate("/booking")
  }

  const reqView = (state, setSearchState) => {
    let startDate = moment(state.arrivalDate).startOf("d")._d
    let endDate = moment(state.departureDate).startOf("d")._d

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
            let totalNight = moment
              .utc(state.departureDate)
              .diff(moment.utc(state.arrivalDate), "d")

            let totalPrice = totalNight * doc.data().rate * state.room

            setSearchState(prevState => {
              return {
                ...prevState,
                searchResult: true,
                available: true,
                rate: doc.data().rate,
                totalNight: totalNight,
                totalPrice: totalPrice,
                loading: false,
              }
            })
          } else {
            setSearchState(prevState => {
              return {
                ...prevState,
                searchResult: true,
                available: false,
                loading: false,
              }
            })
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

        <Image />

        {state.loading && <Spinner />}

        {state.searchResult && (
          <SearchResult
            available={state.available}
            arrivalDate={moment(state.arrivalDate).format("Do MMM YYYY")}
            departureDate={moment(state.departureDate).format("Do MMM YYYY")}
            rate={state.rate}
            room={state.room}
            totalNight={state.totalNight}
            totalPrice={state.totalPrice}
            navigate={handleNavigate}
          />
        )}

        <SearchAvailability
          changeDate={handleSearchChange}
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
