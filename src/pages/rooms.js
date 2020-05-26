import React from "react"
import Layout from "../components/layout"
import animation from "./animation.module.css"
import SEO from "../components/seo"
import Card from "../components/card"
import StandardRoom from "../components/images/standard-room"
import SuperiorRoom from "../components/images/superior-room"
import HeadingText from "../components/HeadingText"

const Rooms = () => {
  return (
    <Layout>
      <div>
        <HeadingText>Our Beautiful Rooms</HeadingText>

        <section>
          <Card image={<StandardRoom />}>
            <h2>Standard Room</h2>
            <h3>Features: </h3>
            <ul>
              <li>King Size bed</li>
              <li>Size: 50 sqm</li>
              <li>Full breakfast included</li>
            </ul>
          </Card>
        </section>
        <section>
          <Card image={<SuperiorRoom />}>
            <h2>Superior Room</h2>
            <h3>Features: </h3>
            <ul>
              <li>Super King Size bed</li>
              <li>Size: 70 sqm</li>
              <li>Full breakfast included</li>
              <li>Sea view</li>
            </ul>
          </Card>
        </section>
      </div>
    </Layout>
  )
}

export default Rooms