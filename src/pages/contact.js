import React from "react"
import Layout from "../components/layout"
import HeadingText from "../components/HeadingText"
import Formui from "../components/formui"

const contact = () => {
  return (
    <Layout>
      <div>
        <HeadingText>Contact Us</HeadingText>
      </div>
      <div>
        <Formui />
      </div>
    </Layout>
  )
}

export default contact
