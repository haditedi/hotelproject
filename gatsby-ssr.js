const React = require("react")
require("firebase/auth")
require("firebase/firestore")
require("firebase/functions")

const GlobalContextProvider = require("./src/context/GlobalContextProvider")
  .default

exports.wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}
