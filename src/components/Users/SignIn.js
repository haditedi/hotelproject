import React from "react"
import ParaContainer from "../ParaContainer"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import KeyIcon from "@material-ui/icons/VpnKey"
import animation from "../../pages/animation.module.css"
import Alert from "@material-ui/lab/Alert"
import signInGoogle from "../../images/signInGoogle.png"

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  google: {
    cursor: "pointer",
  },
}))

const SignIn = props => {
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
          <h3 style={{ display: "inline-block" }}> Sign In</h3>
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
            name="email"
            label="Email"
            value={props.email}
            onChange={props.change}
            type="email"
            variant="outlined"
          />
          <TextField
            required
            name="password"
            label="Password"
            value={props.password}
            onChange={props.change}
            type="password"
            variant="outlined"
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
            id="signIn"
            variant="contained"
            type="submit"
          >
            Sign In
          </Button>
          <section>
            <h4>or</h4>
            <img
              className={classes.google}
              src={signInGoogle}
              style={{ width: "222px", height: "56px" }}
              alt="google sign in"
              onClick={props.googleSignIn}
            />
          </section>
        </form>
        <p style={{ textAlign: "center", margin: "15px" }}>
          Don't have an account? Sign up is easy. Please click{" "}
          <Button
            onClick={props.choice}
            variant="outlined"
            color="primary"
            size="small"
          >
            here
          </Button>
        </p>
      </ParaContainer>
    </div>
  )
}

export default SignIn
