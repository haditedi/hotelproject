import React, { useState, useEffect } from "react"
import classes from "./layout.module.css"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import useFirebase from "./useFirebase"

const Layout = props => {
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
      <footer style={{ textAlign: "center" }}>
        <p>© {new Date().getFullYear()} Hotel Paradise</p>
      </footer>
    </div>
  )
}

export default Layout
