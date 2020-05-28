import React, { useState } from "react"
import firebase from "../components/Firebase"
import moment from "moment"
import FormControl from "@material-ui/core/FormControl"
import MomentUtils from "@date-io/moment"
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"

const SetAvailability = () => {
  const [state, setState] = useState({
    startDate: moment().startOf("day")._d,
    endDate: moment().add(1, "days").startOf("day")._d,
    availability: 1,
    stdRoomRate: 170,
  })

  // stdRoom.get().then(query => {
  //   query.forEach(result => {
  //     batch.update(testStd.doc(result.id), {"avail": 50})
  //   })
  //   batch.commit().then(() => {
  //     console.log("success")
  //     })
  // })

  // stdRoom
  //   .add({
  //     avail: 2,
  //     date: new Date("May 29 2020"),
  //   })
  //   .then(resp => console.log("success " + resp))
  //   .catch(err => {
  //     console.log("error " + err)
  //   })

  // supRoom
  //   .add({
  //     avail: 3,
  //     date: new Date("June 2 2020"),
  //   })
  //   .then(resp => console.log("success " + resp))
  //   .catch(err => {
  //     console.log("error " + err)
  //   })
  const handleChange = (event, param) => {
    if (param) {
      console.log(event, " ", param)
      let name = param

      setState(prevState => {
        return { ...prevState, [name]: event._d }
      })
    }
  }

  let roomTypeOne
  const handleMisc = event => {
    if (event.target.name === "roomTypeOne") {
      roomTypeOne = event.target.value
      console.log(roomTypeOne)
    }
    const name = event.target.name
    const value = event.target.value
    console.log(name, " ", event.target.value)
    setState(prevState => {
      return { ...prevState, [name]: value }
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const testStd = firebase.firestore().collection("stdRoom")
    const batch = firebase.firestore().batch()

    const stdRoom = firebase.firestore().collection("stdRoom")
    const supRoom = firebase.firestore().collection("supRoom")

    let momentDate = moment("2020-05-28").startOf("day")._d

    // let interval = setInterval(() => {
    //   stdRoom
    //     .add({ avail: 7, date: momentDate, rate: 170 })
    //     .then(function () {
    //       console.log("Document successfully written!")
    //     })
    //     .catch(function (error) {
    //       console.error("Error writing document: ", error)
    //     })
    //   momentDate = moment(momentDate).add(1, "d").startOf("day")._d
    //   console.log(momentDate)
    //   console.log("stdRoom , wait,,,3 sec")
    //   if (momentDate >= moment("2020-06-07").startOf("day")._d) {
    //     clearInterval(interval)
    //     momentDate = moment("2020-05-28").startOf("day")._d
    //     runSupRoom()
    //   }
    // }, 3000)

    // const runSupRoom = () => {
    //   setTimeout(() => {
    //     let supInterval = setInterval(() => {
    //       supRoom
    //         .add({ avail: 7, date: momentDate, rate: 200 })
    //         .then(function () {
    //           console.log("supRoom Document successfully written!")
    //         })
    //         .catch(function (error) {
    //           console.error("supRoom Error writing document: ", error)
    //         })
    //       momentDate = moment(momentDate).add(1, "d").startOf("day")._d
    //       console.log(momentDate)
    //       console.log("supRoom,wait,,,5 sec")
    //       if (momentDate >= moment("2020-06-07").startOf("day")._d) {
    //         clearInterval(supInterval)
    //       }
    //     }, 3000)
    //   }, 3000)
    // }
  }

  // stdRoom.get().then(query => {
  //   query.forEach(result => {
  //     let i;
  //     for ( i=0 ; i<365 ; i++){}
  //     console.log(result.id," = > ", result.data())
  //   })
  // })

  // console.log(state.availability)

  // const end = moment(state.endDate).startOf("day")

  // const start = moment(state.startDate).startOf("day")
  // stdRoom
  //   .where("date", ">", state.startDate)
  //   .delete()
  //   .then(resp => {
  //     resp.forEach(doc => {
  //       console.log(doc.data())
  //     })
  //   })

  return (
    <div>
      <h1>Set availability</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              disableToolbar
              disablePast
              variant="inline"
              format="DD MMM YYYY"
              id="startDate"
              label="Start Date"
              value={state.startDate}
              onChange={date => handleChange(date, "startDate")}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <FormControl>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              disableToolbar
              disablePast
              variant="inline"
              format="DD MMM YYYY"
              id="endDate"
              label="End Date"
              value={state.endDate}
              onChange={date => handleChange(date, "endDate")}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <p>Room Type :</p>
        <input
          type="checkbox"
          name="roomTypeOne"
          id="stdRoom"
          value="stdRoom"
          onChange={handleMisc}
        />
        Standard Room
        <p>Availability</p>
        <input
          id="avail"
          name="availability"
          type="number"
          value={state.availability}
          onChange={handleMisc}
        />
        <p>Rate</p>
        <input
          name="stdRoomRate"
          type="number"
          value={state.stdRoomRate}
          onChange={handleMisc}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SetAvailability
