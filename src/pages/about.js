import React from "react"
import Layout from "../components/layout"
import animation from "./animation.module.css"
import AboutImg from "../components/images/AboutImg"
import ParaContainer from "../components/ParaContainer"

const about = () => {
  return (
    <Layout>
      <div>
        <section>
          <h1 className={`heading ${animation.trackingIn}`}>About us</h1>
        </section>
        <section>
          <AboutImg />
        </section>
        <section>
          <ParaContainer>
            Established in 1980, we have been around for quite a while. We are
            passionate in eveything that we do especially hospitality. We love
            your guests and our guests love us ! doing all that we can to ensure
            our guest enjoyed not just a good night sleep but also a memorable
            experiences that worth sharing and cherishing.
          </ParaContainer>
        </section>
      </div>
    </Layout>
  )
}

export default about
