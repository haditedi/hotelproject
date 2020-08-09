import React from "react"
import ParaContainer from "../ParaContainer"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import KeyIcon from "@material-ui/icons/VpnKey"
import animation from "../../pages/animation.module.css"
import Alert from "@material-ui/lab/Alert"

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}))

const SignUp = props => {
  const classes = useStyles()

  return (
    <div className={animation.scaleInCenter}>
      <ParaContainer>
        <div>
          <KeyIcon
            style={{
              display: "inline-block",
              padding: "5px 0 0",
              marginRight: "5px",
            }}
          />
          <h3 style={{ display: "inline-block" }}> Sign Up</h3>
        </div>

        <hr style={{ width: "30%", marginBottom: "20px" }} />
        <form
          onSubmit={props.submit}
          className={classes.root}
          validate="true"
          autoComplete="off"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            required
            name="userName"
            label="Name"
            type="text"
            variant="outlined"
            value={props.userName}
            onChange={props.change}
          />
          <TextField
            required
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            value={props.email}
            onChange={props.change}
          />
          <TextField
            required
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={props.password}
            onChange={props.change}
          />
          {props.error && (
            <section
              style={{
                textAlign: "center",
                margin: "10px auto",
                width: "500px",
              }}
            >
              <Alert severity="error" onClose={props.dismiss}>
                {props.errorMessage}
              </Alert>
            </section>
          )}
          <Button
            style={{
              width: "150px",
              marginBottom: "25px",
              background: "#3f51b5",
              color: "white",
            }}
            id="signUp"
            variant="contained"
            type="submit"
          >
            Sign Up
          </Button>
        </form>
        <p style={{ textAlign: "center", margin: "15px" }}>
          Have an account? click{" "}
          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={props.choice}
          >
            here
          </Button>{" "}
          to sign in
        </p>
      </ParaContainer>
    </div>
  )
}

export default SignUp
