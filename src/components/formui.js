import React from "react"
import TextField from "@material-ui/core/TextField"
import classes from "./formui.module.css"
import Button from "@material-ui/core/Button"
import SendIcon from "@material-ui/icons/Send"

const formui = ({ change, submit, state }) => {
  return (
    <form className={classes.formui} name="contact" method="POST">
      <TextField
        required
        id="outlined-required"
        label="Name"
        name="name"
        variant="outlined"
        onChange={change}
        value={state.name}
      />
      <TextField
        id="outlined-number"
        label="Phone Number"
        name="number"
        variant="outlined"
        onChange={change}
        value={state.number}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        name="email"
        variant="outlined"
        onChange={change}
        value={state.email}
      />
      <TextField
        id="message"
        label="Message"
        name="message"
        multiline
        rows={4}
        variant="outlined"
        onChange={change}
        value={state.message}
      />
      <Button
        style={{ margin: "10px" }}
        variant="contained"
        color="primary"
        type="submit"
        endIcon={<SendIcon />}
        onClick={submit}
      >
        SEND
      </Button>
    </form>
  )
}

export default formui
