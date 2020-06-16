import React from "react"
import GlobalContextProvider from "./src/context/GlobalContextProvider"
import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}
