import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/functions"

var firebaseConfig = {
  apiKey: "AIzaSyBXz5G4pCgwK6ZVb04q6FJ9Br6vatxlJUU",
  authDomain: "firestore-b0c8c.firebaseapp.com",
  databaseURL: "https://firestore-b0c8c.firebaseio.com",
  projectId: "firestore-b0c8c",
  storageBucket: "firestore-b0c8c.appspot.com",
  messagingSenderId: "807714406546",
  appId: "1:807714406546:web:113f0477e066118c8be64b",
}

let instance = null

export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance
    instance = firebase.initializeApp(firebaseConfig)
    return instance
  }

  return null
}
