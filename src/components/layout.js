import React from "react"
import classes from "./layout.module.css"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
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
        <Header siteTitle={data.site.siteMetadata.title} />

        <main>{children}</main>
      </div>
      <footer style={{ textAlign: "center" }}>
        <p>© {new Date().getFullYear()} Hotel Paradise</p>
      </footer>
    </div>
  )
}

export default Layout
