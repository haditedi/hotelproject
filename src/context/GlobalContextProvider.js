import React from "react"
import moment from "moment"

const initialState = {
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

export const GlobalStateContext = React.createContext(initialState)
export const GlobalSetSearchContext = React.createContext()

const GlobalContextProvider = ({ children }) => {
  const [state, setSearch] = React.useState(initialState)

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalSetSearchContext.Provider value={setSearch}>
        {children}
      </GlobalSetSearchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider
