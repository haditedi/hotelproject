import React, { useReducer } from "react"
import moment from "moment"

export const GlobalStateContext = React.createContext()
export const GlobalSetSearchContext = React.createContext()

// const initialState = {
//   room: 1,
//   arrivalDate: moment.utc().startOf("d").format(),
//   departureDate: moment.utc().startOf("d").add(1, "days").format(),
//   searchResult: false,
//   available: false,
//   loading: false,
//   rate: 0,
//   totalNight: 0,
//   totalPrice: 0,
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "SEARCH": {
//       return {
//         ...state,
//         departureDate: action.departureDate,
//       }
//     }

//     default:
//       return state
//   }
// }

const GlobalContextProvider = ({ children }) => {
  const [state, setSearch] = React.useState({
    room: 1,
    arrivalDate: moment.utc().startOf("d").format(),
    departureDate: moment.utc().startOf("d").add(1, "days").format(),
    searchResult: false,
    available: false,
    loading: false,
    rate: 0,
    totalNight: 0,
    totalPrice: 0,
  })

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalSetSearchContext.Provider value={setSearch}>
        {children}
      </GlobalSetSearchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider
