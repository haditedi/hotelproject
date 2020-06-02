import React from "react"
import Layout from "../components/layout"
import ParaContainer from "../components/ParaContainer"
import { Link } from "gatsby"
import { auth } from "../components/Firebase"

const logout = () => {
  auth
    .signOut()
    .then(resp => {
      // Sign-out successful.
      console.log("log out success")
    })
    .catch(function (error) {
      logout = <p>opps sorry, there was an error</p>
      console.log(error.message)
    })

  return (
    <Layout>
      <ParaContainer>
        <div style={{ paddingBottom: "20px" }}>
          <p>Thank you for your visit. You are logged out.</p>
          <Link to="/booking">Click here if you wish to sign in again.</Link>
        </div>
      </ParaContainer>
    </Layout>
  )
}

export default logout
