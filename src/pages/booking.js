import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SignUp from "../components/Users/SignUp"
import { auth } from "../components/Firebase"
import SignIn from "../components/Users/SignIn"
import ParaContainer from "../components/ParaContainer"
import Spinner from "../components/Spinner"
import { db } from "../components/Firebase"
import BookingProceed from "../components/BookingProceed"

const Booking = ({ location }) => {
  const [userState, setUserState] = useState({
    email: "",
    password: "",
    error: false,
    errorMessage: "",
    user: "",
    userName: "",
    loading: false,
  })
  console.log("[LOCATION] ", location.state)

  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        db.collection("users")
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
                }
              })
            })
          )
          .catch(err => console.log(err))

        console.log(user.email)
        console.log("[FIREBASE] ", user)

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
  }, [auth.currentUser])

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
      auth
        .createUserWithEmailAndPassword(userState.email, userState.password)
        .then(resp => {
          console.log("[handleSingUp] ", resp)
          db.collection("users").add({
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
    auth
      .signInWithEmailAndPassword(userState.email, userState.password)
      .then(user => {
        console.log(user)
        setUserState(prevState => {
          return {
            ...prevState,
            user: auth.currentUser,
            password: "",
            error: false,
            errorMessage: "",
            loading: false,
          }
        })
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
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
  console.log("[USERSTATE] ", userState)

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

  return (
    <Layout user={auth.currentUser}>
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

      {auth.currentUser && (
        <div style={{ textAlign: "center" }}>
          <ParaContainer>
            <h3>Welcome Back {userState.userName}</h3>
          </ParaContainer>
        </div>
      )}
      {location.state && auth.currentUser ? (
        <BookingProceed
          prevValue={location.state.state}
          email={userState.email}
        />
      ) : null}
    </Layout>
  )
}

export default Booking
