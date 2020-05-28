import React, { useState, useEffect } from "react"
import firebase from "../components/Firebase"

export default () => {
  const [myvar, setMyvar] = useState([])

  const hotelRef = firebase.firestore().collection("hotel")
  const viewAll = firebase
    .firestore()
    .collectionGroup("availability")
    .where("avail", ">", 2)

  // hotelRef
  //   .doc("stdRoom")
  //   .collection("availability")
  //   .doc()
  //   .set({
  //     date: new Date("May 27 2020"),
  //     avail: 4,
  //   })
  //   .then(resp => console.log("success " + resp))
  //   .catch(err => {
  //     console.log("error " + err)
  //   })

  // hotelRef
  //   .doc("supRoom")
  //   .collection("availability")
  //   .doc()
  //   .set({
  //     date: new Date("May 27 2020"),
  //     avail: 1,
  //   })
  //   .then(resp => console.log("success " + resp))
  //   .catch(err => {
  //     console.log("error " + err)
  //   })

  // hotelRef
  //   .doc("stdRoom")
  //   .set({
  //     name: "Standard Room",
  //   })
  //   .then(resp => console.log("success " + resp))

  // hotelRef
  //   .doc("supRoom")
  //   .set({
  //     name: "Superior Room",
  //   })
  //   .then(resp => console.log("success " + resp))

  const submitHandler = () => {
    // hotelRef
    //   .doc("stdRoom")
    //   .get()
    //   .then(resp => {
    //     if (resp.exists) {
    //       console.log(resp.id, " => ", resp.data())
    //     } else {
    //       console.log("no data")
    //     }
    //   })
    //   .catch(err => {
    //     console.log("error " + err)
    //   })

    // hotelRef.get().then(function (querySnapshot) {
    //   querySnapshot.forEach(function (doc) {
    //     console.log(doc.id, " => ", doc.data())
    //   })
    // })

    viewAll
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // setMyvar(prevValue => [
          //   ...prevValue,
          //   {
          //     id: doc.id,
          //     avail: doc.data().avail,
          //     date: doc.data().date.toDate(),
          //   },
          // ])
          console.log(doc.data())
        })
      })
      .catch(err => console.log("error", err))
  }

  return (
    <div>
      <h1>Firestore CRUD App </h1>
      <h2>Item List</h2>
      <h2>Add Item</h2>
      <h2>get my data</h2>
      <button onClick={submitHandler}>Now !</button>
      {myvar.map(item => (
        <div key={item.id}>
          <p>{item.date.toDateString()}</p>
          <p>{item.avail}</p>
        </div>
      ))}
    </div>
  )
}
