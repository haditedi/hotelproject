import React, { useState } from "react"
import Layout from "../components/layout"
import HeadingText from "../components/HeadingText"
import Formui from "../components/formui"
import axios from "axios"

const Contact = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
    number: "",
  })

  const handleChange = e => {
    const { name, value } = e.target
    console.log(name, value)
    setState(prevValue => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post("https://awe-ads.herokuapp.com/send-email", state)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <Layout>
      <div>
        <HeadingText>Contact Us</HeadingText>
      </div>
      <div>
        <Formui change={handleChange} submit={handleSubmit} state={state} />
      </div>
    </Layout>
  )
}

export default Contact
