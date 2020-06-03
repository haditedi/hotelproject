import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SignUp from "../components/Users/SignUp"
import SignIn from "../components/Users/SignIn"
import ParaContainer from "../components/ParaContainer"
import Spinner from "../components/Spinner"
import useFirebase from "../components/Firebase"
import BookingProceed from "../components/BookingProceed"
import moment from "moment"

const Booking = ({ location }) => {
  const firebase = useFirebase()
  const [userState, setUserState] = useState({
    email: "",
    password: "",
    error: false,
    errorMessage: "",
    user: "",
    userId: "",
    userName: "",
    loading: false,
  })

  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [cardState, setCardState] = useState({
    expiry: "",
    name: "",
    number: "",
  })

  let state
  try {
    state = location.state.state
    console.log("STATE", state)
  } catch {}

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .where("email", "==", user.email)
          .get()
          .then(resp =>
            resp.forEach(doc => {
              setUserState(prevValue => {
                return {
                  ...prevValue,
                  user: user,
                  userName: doc.data().name,
                  email: doc.data().email,
                  userId: doc.id,
                }
              })
            })
          )
          .catch(err => console.log(err))

        console.log(user.email)
        console.log("[FIREBASE] ", user)
        console.log("[STATE YAAA]")
        setShowSignUp(false)
        setShowSignIn(false)
      } else {
        console.log("not signed in")
        setShowSignIn(true)
        setUserState(prevValue => {
          return {
            ...prevValue,
            email: "",
            password: "",
            error: false,
            errorMessage: "",
            user: "",
            userName: "",
          }
        })
      }
    })
  }, [firebase])

  const handleChange = event => {
    let name = event.target.name
    let value = event.target.value
    setUserState(prevState => {
      return {
        ...prevState,
        [name]: value,
        error: false,
      }
    })
  }

  const handleSignUp = event => {
    event.preventDefault()
    setUserState(prevState => {
      return {
        ...prevState,
        loading: true,
      }
    })
    if (userState.password.length < 8) {
      setUserState(prevState => {
        return {
          ...prevState,
          loading: false,
          error: true,
          errorMessage: "Min password length is 8 characters",
        }
      })
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userState.email, userState.password)
        .then(resp => {
          console.log("[handleSingUp] ", resp)
          firebase.firestore().collection("users").add({
            name: userState.userName,
            email: userState.email,
          })

          setUserState(prevState => {
            return {
              ...prevState,
              error: false,
              errorMessage: "",
              password: "",
              loading: false,
            }
          })

          console.log("success")
        })
        .catch(function (error) {
          // Handle Errors here.
          // var errorCode = error.code
          var errorMessage = error.message
          setUserState(prevState => {
            return {
              ...prevState,
              error: true,
              errorMessage: errorMessage,
              loading: false,
            }
          })

          console.log(errorMessage)
        })
      console.log(userState)
    }
  }

  const handleSignIn = event => {
    event.preventDefault()
    setUserState(prevState => {
      return {
        ...prevState,
        loading: true,
      }
    })
    firebase
      .auth()
      .signInWithEmailAndPassword(userState.email, userState.password)
      .then(user => {
        console.log(user)
        setUserState(prevState => {
          return {
            ...prevState,
            user: firebase.auth().currentUser,
            password: "",
            error: false,
            errorMessage: "",
            loading: false,
          }
        })
      })
      .catch(function (error) {
        var errorMessage = error.message
        setUserState(prevState => {
          return {
            ...prevState,
            error: true,
            errorMessage: "Sorry, something went wrong. Unable to sign in",
            loading: false,
          }
        })
        console.log(errorMessage)
        // ...
      })
  }

  const handleShow = () => {
    setShowSignUp(!showSignUp)
    setShowSignIn(!showSignIn)
    setUserState(prevState => {
      return {
        ...prevState,
        error: false,
      }
    })
  }

  const handleCardChange = e => {
    const { name, value } = e.target
    setCardState(prevValue => {
      return { ...prevValue, [name]: value }
    })
  }

  const handleCardSubmit = e => {
    e.preventDefault()

    let batch = firebase.firestore().batch()
    let std = firebase.firestore().collection("stdRoom")
    let stdView = firebase
      .firestore()
      .collection("stdRoom")
      .where("date", ">=", moment(state.arrivalDate).startOf("d")._d)
      .where("date", "<", moment(state.departureDate).startOf("d")._d)

    stdView
      .get()
      .then(resp => {
        resp.forEach(doc => {
          if (doc.data().avail >= state.room) {
            batch.update(std.doc(doc.id), {
              avail: doc.data().avail - state.room,
            })
          } else {
            console.log("not enough availability")
          }
        })
        batch
          .commit()
          .then(() => console.log("batch commit"))
          .catch(() => console.log("cannot write"))

        firebase
          .firestore()
          .collection("users")
          .doc(userState.userId)
          .collection("bookingList")
          .add({
            arrival: state.arrivalDate,
            departure: state.departureDate,
            ratePerNightPerRoom: state.rate,
            totalNight: state.totalNight,
            totalPrice: state.totalPrice,
            cardName: cardState.name,
            cardNumber: cardState.number,
            cardExpiry: cardState.expiry,
          })
          .then(resp => console.log("success", resp.id))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  return (
    <Layout>
      {userState.loading && <Spinner />}
      {showSignIn && (
        <div>
          {" "}
          <SignIn
            email={userState.email}
            password={userState.password}
            change={handleChange}
            submit={handleSignIn}
            error={userState.error}
            choice={handleShow}
            error={userState.error}
            errorMessage={userState.errorMessage}
          />
        </div>
      )}

      {showSignUp && (
        <div>
          <SignUp
            email={userState.email}
            password={userState.password}
            change={handleChange}
            submit={handleSignUp}
            error={userState.error}
            errorMessage={userState.errorMessage}
            choice={handleShow}
            userName={userState.userName}
          />
        </div>
      )}

      {userState.user && (
        <div style={{ textAlign: "center" }}>
          <ParaContainer>
            <h3>Welcome {userState.userName}</h3>
          </ParaContainer>
        </div>
      )}
      {location.state && userState.user ? (
        <BookingProceed
          state={location.state.state}
          userState={userState}
          cardState={cardState}
          handleCardChange={handleCardChange}
          handleCardSubmit={handleCardSubmit}
        />
      ) : null}
    </Layout>
  )
}

export default Booking
