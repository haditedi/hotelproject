import React, { useEffect } from "react"
import axios from "axios"

const SetAvailability = () => {
  useEffect(() => {
    axios
      .post("https://hooks-e34c3.firebaseio.com/availability.json", {
        standard: {
          date: "May 20 2020",
          availability: "5",
        },
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return <div>Set availability</div>
}

export default SetAvailability
