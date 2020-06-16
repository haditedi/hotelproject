import React, { useState, useEffect, useContext } from "react"
import classes from "./layout.module.css"
import Header from "./header"
import "./layout.css"
//import useFirebase from "./useFirebase"
import firebase from "gatsby-plugin-firebase"
import moment from "moment"
import { GlobalSetSearchContext } from "../context/GlobalContextProvider"

const Layout = props => {
  const setSearchState = useContext(GlobalSetSearchContext)
  const [userState, setUser] = useState({ user: " " })
  //const firebase = useFirebase()

  useEffect(() => {
    if (!firebase) return
    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
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
    return () => unsubscribe()
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

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Header userState={userState.user} handleLogOut={handleLogOut} />

        <main>{props.children}</main>
      </div>
      <footer style={{ textAlign: "center", color: "white" }}>
        <p>
          © {new Date().getFullYear()} Hotel Paradise. Created by{" "}
          <a
            href="https://www.it-tedi.tech"
            rel="noopener noreferrer"
            target="_blank"
          >
            IT - TEDI
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Layout
