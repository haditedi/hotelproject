import React from "react"
import Layout from "../components/layout"
import animation from "./animation.module.css"
import ParaContainer from "../components/ParaContainer"

const contact = () => {
  return (
    <Layout>
      <div>
        <section>
          <h1 className={`heading ${animation.trackingIn}`}>Contact us</h1>
        </section>
      </div>
    </Layout>
  )
}

export default contact
