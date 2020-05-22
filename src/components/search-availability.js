import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
// import "date-fns"
// import DateFnsUtils from "@date-io/date-fns"
import "moment"
import MomentUtils from "@date-io/moment"
import Button from "@material-ui/core/Button"

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  nomargin: {
    margin: 0,
  },
}))

const SearchAvailability = props => {
  const classes = useStyles()

  return (
    <form
      style={{ textAlign: "center", marginTop: "100px" }}
      onSubmit={props.submit}
    >
      <h4 style={{ marginBottom: "0", marginTop: "20px" }}>
        Search Availability
      </h4>
      <FormControl className={classes.root}>
        <InputLabel id="adult">Adults</InputLabel>
        <Select
          labelId="adult"
          id="number-adult"
          name="numAdult"
          value={props.numAdult}
          onChange={props.change}
        >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={4}>Four</MenuItem>
          <MenuItem value={5}>Five</MenuItem>
          <MenuItem value={6}>Six</MenuItem>
          <MenuItem value={7}>Seven</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.root}>
        <InputLabel id="children">Children</InputLabel>
        <Select
          labelId="children"
          id="number-children"
          name="numChild"
          value={props.numChild}
          onChange={props.change}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={4}>Four</MenuItem>
          <MenuItem value={5}>Five</MenuItem>
          <MenuItem value={6}>Six</MenuItem>
          <MenuItem value={7}>Seven</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.root}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            disableToolbar
            disablePast
            variant="inline"
            format="DD MMM YYYY"
            id="arrival-date"
            label="Arrival Date"
            value={props.arrivalDate}
            onChange={date => props.changeDate(date, "arrivalDate")}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
      <FormControl className={classes.root}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            disableToolbar
            disablePast
            variant="inline"
            format="DD MMM YYYY"
            id="departure-date"
            label="Departure Date"
            value={props.departureDate}
            onChange={date => props.changeDate(date, "departureDate")}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
      <Button className={classes.root} variant="contained" type="submit">
        Search
      </Button>
    </form>
  )
}

export default SearchAvailability
