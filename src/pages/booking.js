import React, { useState, useEffect, useContext } from "react"
import Layout from "../components/layout"
import SignUp from "../components/Users/SignUp"
import SignIn from "../components/Users/SignIn"
import ParaContainer from "../components/ParaContainer"
import Spinner from "../components/Spinner"
import useFirebase from "../components/Firebase"
import BookingProceed from "../components/BookingProceed"
import moment from "moment"
import {
  GlobalStateContext,
  GlobalSetSearchContext,
} from "../context/GlobalContextProvider"
import BookingList from "../components/BookingList"
import { navigate } from "gatsby"
import Alert from "@material-ui/lab/Alert"

const Booking = () => {
  const state = useContext(GlobalStateContext)
  const setSearch = useContext(GlobalSetSearchContext)

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
    showBookingProceed: false,
  })
  console.log("[USERSTATE]", userState)

  const [cardState, setCardState] = useState({
    expiry: "",
    name: "",
    number: "",
  })

  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [open, setOpen] = useState(false)
  const [bookingList, setBookingList] = useState([])
  const [info, setInfo] = useState("")

  console.log("[SEARCHSTATE]", state)

  useEffect(() => {
    setUserState(prevValue => {
      return {
        ...prevValue,
        loading: true,
      }
    })
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (state.totalNight > 0) {
          setUserState(prevValue => {
            return {
              ...prevValue,
              showBookingProceed: false,
            }
          })
        }

        setTimeout(() => {
          console.log(user.uid)
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then(doc => {
              setUserState(prevValue => {
                return {
                  ...prevValue,
                  user: user,
                  userName: doc.data().name,
                  email: doc.data().email,
                  userId: user.uid,
                  showBookingProceed: true,
                  loading: false,
                }
              })
            })
            .catch(err => {
              console.log("ERRROR", err)
              setUserState(prevValue => {
                return {
                  ...prevValue,
                  loading: false,
                }
              })
            })
        }, 1000)

        console.log("[FIREBASE] ", user)

        setShowSignUp(false)
        setShowSignIn(false)
      } else {
        console.log("not signed in")
        setShowSignIn(true)
        setBookingList([])
        setUserState(prevValue => {
          return {
            ...prevValue,
            email: "",
            password: "",
            error: false,
            errorMessage: "",
            user: "",
            userName: "",
            userId: "",
            showBookingProceed: false,
            loading: false,
          }
        })
      }
    })
  }, [firebase])

  useEffect(() => {
    let unsubscribe
    if (userState.userId) {
      unsubscribe = firebase
        .firestore()
        .collection("users")
        .doc(userState.userId)
        .collection("bookingList")
        .onSnapshot(resp => {
          let result = []
          resp.forEach(doc => {
            let obj = doc.data()
            obj.confirmation = doc.id
            result.push(obj)
          })
          setBookingList(result)
        })
      return () => unsubscribe()
    }
  }, [userState.user, userState.showBookingProceed])

  console.log("BOOKINGLIST", bookingList)
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
    setBookingList([])
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
          firebase.firestore().collection("users").doc(resp.user.uid).set({
            name: userState.userName,
            email: userState.email,
            userId: resp.user.uid,
          })

          setUserState(prevState => {
            return {
              ...prevState,
              error: false,
              errorMessage: "",
              password: "",
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
    setBookingList([])
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
        console.log("[SIGN IN]", user)
        setUserState(prevState => {
          return {
            ...prevState,
            password: "",
            error: false,
            errorMessage: "",
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

  const handleSearchAgain = () => {
    setSearch(prevState => {
      return {
        ...prevState,
        room: 1,
        arrivalDate: moment.utc().startOf("d").format(),
        departureDate: moment.utc().startOf("d").add(1, "days").format(),
        searchResult: false,
        available: false,
        loading: false,
        rate: 0,
        totalNight: 0,
        totalPrice: 0,
      }
    })
    navigate("/#search")
  }

  const handleCardSubmit = e => {
    e.preventDefault()
    setUserState(prevState => {
      return {
        ...prevState,
        loading: true,
      }
    })

    const batch = firebase.firestore().batch()
    const std = firebase.firestore().collection("stdRoom")
    const stdView = firebase
      .firestore()
      .collection("stdRoom")
      .where("date", ">=", moment(state.arrivalDate).startOf("d")._d)
      .where("date", "<", moment(state.departureDate).startOf("d")._d)

    stdView
      .get()
      .then(resp => {
        let err = false

        resp.forEach(doc => {
          if (doc.data().avail >= state.room) {
            batch.update(std.doc(doc.id), {
              avail: doc.data().avail - state.room,
            })
          } else {
            err = true
            setUserState(prevState => {
              return {
                ...prevState,
                error: true,
                errorMessage:
                  "Sorry there was an error. Availability may have changed.",
                loading: false,
              }
            })
            console.log("not enough availability")
          }
        })

        if (!err) {
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
              errorMessage: userState.errorMessage,
            })
            .then(resp => console.log("success", resp.id))
            .catch(err => console.log(err))
          setUserState(prevState => {
            return {
              ...prevState,
              loading: false,
              error: false,
              errorMessage: "",
              showBookingProceed: false,
            }
          })
          setBookingList([])
          setOpen(true)
          setSearch(prevState => {
            return {
              ...prevState,
              room: 1,
              arrivalDate: moment.utc().startOf("d").format(),
              departureDate: moment.utc().startOf("d").add(1, "days").format(),
              searchResult: false,
              available: false,
              loading: false,
              rate: 0,
              totalNight: 0,
              totalPrice: 0,
            }
          })
        }
      })

      .catch(err => console.log(err))
  }

  const handleDismiss = () => {
    setUserState(prevState => {
      return {
        ...prevState,
        error: false,
        errorMessage: "",
        loading: false,
      }
    })
  }

  const handleCancelBooking = e => {
    firebase
      .firestore()
      .collection("users")
      .doc(userState.userId)
      .collection("bookingList")
      .doc(e)
      .delete()
      .then(() => {
        setInfo("Reservation is cancelled")
        setTimeout(() => setInfo(""), 3000)
      })
      .catch(() => console.log("error deleting"))
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = e => {
    setOpen(true)
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
            dismiss={handleDismiss}
            errorMessage={userState.errorMessage}
            choice={handleShow}
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
            choice={handleShow}
            error={userState.error}
            dismiss={handleDismiss}
            errorMessage={userState.errorMessage}
            userName={userState.userName}
          />
        </div>
      )}

      {userState.user && (
        <div style={{ textAlign: "center" }}>
          <ParaContainer>
            <h3 style={{ marginTop: "1.45rem" }}>
              Welcome {userState.userName}
            </h3>
          </ParaContainer>
        </div>
      )}

      {info && (
        <section
          style={{
            textAlign: "center",
            margin: "10px auto",
            width: "500px",
          }}
        >
          <Alert severity="success">{info}</Alert>
        </section>
      )}

      {userState.showBookingProceed && state.totalNight >= 1 ? (
        <BookingProceed
          state={state}
          userState={userState}
          cardState={cardState}
          handleCardChange={handleCardChange}
          handleCardSubmit={handleCardSubmit}
          error={userState.error}
          dismiss={handleDismiss}
          errorMessage={userState.errorMessage}
          searchAgain={handleSearchAgain}
          open={open}
          handleClose={handleClose}
        />
      ) : null}

      {bookingList && userState.user
        ? bookingList.map(item => {
            return (
              <BookingList
                key={item.confirmation}
                confirmation={item.confirmation}
                arrivalDate={moment(item.arrival).format("Do MMM YYYY")}
                departureDate={moment(item.departure).format("Do MMM YYYY")}
                totalNight={item.totalNight}
                ratePerNight={item.ratePerNightPerRoom}
                totalPrice={item.totalPrice}
                cancel={() => handleCancelBooking(item.confirmation)}
                open={open}
                handleClose={handleClose}
                handleOpen={handleOpen}
              />
            )
          })
        : null}
    </Layout>
  )
}

export default Booking
