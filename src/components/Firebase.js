import firebase from "firebase/app"
import "firebase/firestore"

var firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "firestore-b0c8c.firebaseapp.com",
  databaseURL: "https://firestore-b0c8c.firebaseio.com",
  projectId: "firestore-b0c8c",
  storageBucket: "firestore-b0c8c.appspot.com",
  messagingSenderId: "807714406546",
  appId: "1:807714406546:web:113f0477e066118c8be64b",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
