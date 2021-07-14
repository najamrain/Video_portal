import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import { signOutAction } from "../../redux/auth/actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
}));

const NavBar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ marginBottom: 30 }}>
        <Toolbar>
          <Link className={classes.title} style={{ textDecoration: "none", color: "white" }} to="/">
            <Typography variant="h6" >
              Video Recording Portal
            </Typography>
          </Link>

          <div style={{textAlign: "right"}}>
            {props.auth.isLoggedIn && (
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/dashboard"
              >
                <Button color="inherit">Dashboard</Button>
              </Link>
            )}

            {!props.auth.isLoggedIn ? (
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signin"
              >
                <Button color="inherit">Login</Button>
              </Link>
            ) : (
              <Button color="inherit" onClick={props.signOutAction}>
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const actionCreators = { signOutAction };

export default connect(mapStateToProps, actionCreators)(NavBar);
