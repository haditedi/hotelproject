import React, { useState, useEffect, useContext } from "react"
import classes from "./layout.module.css"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import useFirebase from "./useFirebase"
import moment from "moment"
import { GlobalSetSearchContext } from "../context/GlobalContextProvider"

const Layout = props => {
  const setSearchState = useContext(GlobalSetSearchContext)
  const [userState, setUser] = useState({ user: " " })
  const firebase = useFirebase()

  useEffect(() => {
    if (!firebase) return
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(prevValue => {
          return {
            ...prevValue,
            user: user,
          }
        })
      } else {
        setUser(prevValue => {
          return {
            ...prevValue,
            user: false,
          }
        })
      }
    })
  }, [firebase])

  const handleLogOut = () => {
    firebase.auth().signOut()
    setSearchState(prevValue => {
      return {
        ...prevValue,
        room: 1,
        arrivalDate: moment.utc().startOf("d").format(),
        departureDate: moment.utc().startOf("d").add(1, "days").format(),
        searchResult: false,
        available: false,
        loading: false,
        rate: 0,
        totalNight: 0,
        totalPrice: 0,
      }
    })
  }

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Header userState={userState.user} handleLogOut={handleLogOut} />

        <main>{props.children}</main>
      </div>
      <footer style={{ textAlign: "center", color: "white" }}>
        <p>© {new Date().getFullYear()} Hotel Paradise</p>
      </footer>
    </div>
  )
}

export default Layout
