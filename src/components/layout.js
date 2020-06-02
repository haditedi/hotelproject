import React, { useState, useEffect } from "react"
import classes from "./layout.module.css"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import { auth } from "../components/Firebase"

const Layout = props => {
  const [userState, setUser] = useState({ user: " " })

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
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
  }, [auth.currentUser])

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
        <Header userState={userState.user} />

        <main>{props.children}</main>
      </div>
      <footer style={{ textAlign: "center" }}>
        <p>© {new Date().getFullYear()} Hotel Paradise</p>
      </footer>
    </div>
  )
}

export default Layout
