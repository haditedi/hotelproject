import { Link } from "gatsby"
import React, { useContext } from "react"
import MenuIcon from "@material-ui/icons/Menu"
import Box from "@material-ui/core/Box"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { makeStyles } from "@material-ui/core/styles"
import css from "./header.module.css"

const useStyles = makeStyles({
  root: {
    margin: "auto 20px",
  },
  back: {
    backgroundColor: "#035aa6",
  },
})

const Header = props => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <header className={classes.back}>
      <nav
        style={{
          display: "flex",
        }}
      >
        <Link to="/">
          <h1 className={classes.root}>Logo</h1>
        </Link>
        <div className={css.notShow}>
          <Link
            to="/"
            className={css.navItem}
            activeClassName={css.activeNavItem}
          >
            Home
          </Link>
          <Link
            to="/rooms"
            className={css.navItem}
            activeClassName={css.activeNavItem}
          >
            Rooms
          </Link>
          <Link
            to="/about"
            className={css.navItem}
            activeClassName={css.activeNavItem}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={css.navItem}
            activeClassName={css.activeNavItem}
          >
            Contact
          </Link>

          {props.userState && (
            <Link
              to="/booking"
              className={css.navItem}
              activeClassName={css.activeNavItem}
            >
              Booking
            </Link>
          )}

          {props.userState ? (
            <Link
              onClick={props.handleLogOut}
              to="/booking"
              className={css.navItem}
            >
              Log Out
            </Link>
          ) : (
            <Link
              to="/booking"
              className={css.navItem}
              activeClassName={css.activeNavItem}
            >
              Sign In/Up
            </Link>
          )}
        </div>

        <Box
          component="div"
          ml="auto"
          mt="auto"
          mb="auto"
          mr="30px"
          display={{
            xs: "block",
            sm: "block",
            md: "none",
            lg: "none",
            xl: "none",
          }}
        >
          <MenuIcon
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Open Menu
          </MenuIcon>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/rooms">Rooms</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              {" "}
              <Link to="/about">About</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              {" "}
              <Link to="/contact">Contact</Link>
            </MenuItem>

            {props.userState && (
              <MenuItem onClick={handleClose}>
                {" "}
                <Link to="/booking">Booking</Link>
              </MenuItem>
            )}

            {props.userState ? (
              <MenuItem onClick={props.handleLogOut}>
                {" "}
                <Link to="/booking" state={{ logout: true }}>
                  Log Out
                </Link>
              </MenuItem>
            ) : (
              <MenuItem onClick={handleClose}>
                {" "}
                <Link to="/booking">Sign In/Up</Link>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </nav>
    </header>
  )
}

export default Header
