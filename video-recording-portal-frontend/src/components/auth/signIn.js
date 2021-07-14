import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Redirect } from "react-router";
import { withStyles } from "@material-ui/styles";

import { signInAction } from "../../redux/auth/actions";
import styles from "./styles";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1,
    }}
  />
);

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoading: false,
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  signIn = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });

    // sign in with firebase
    const { username, password } = this.state;
    await this.props.signInAction(username, password);
    this.setState({ isLoading: false });
  };

  render() {
    const { classes } = this.props;

    if (this.props.auth.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Grid
        container
        spacing={0}
        justifyContent="center"
        alignItems="center"
        className={classes.body}
      >
        <Grid item xs={12} sm={6} className={classes.gridWidth}>
          <Backdrop className={classes.backdrop} open={this.state.isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>

          <div className={classes.cardDiv}>
            <Paper variant="elevation" elevation={2} className={classes.card}>
              <Grid item className={classes.gridItem}>
                <Typography component="h1" variant="h4">
                  Sign In
                </Typography>
              </Grid>

              <Grid container spacing={1} className={classes.gridItem}>
                <Grid item xs={5}>
                  <ColoredLine color="#DBDBDB" />
                </Grid>
                <Grid item xs={2}>
                  <p
                    style={{
                      color: "#DBDBDB",
                      marginLeft: "12px",
                      marginTop: "0px",
                    }}
                  >
                    OR
                  </p>
                </Grid>
                <Grid item xs={5}>
                  <ColoredLine color="#DBDBDB" />
                </Grid>
              </Grid>

              <Grid item>
                <form onSubmit={this.signIn}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item className={classes.gridItem}>
                      <TextField
                        type="text"
                        placeholder="Username"
                        fullWidth
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item className={classes.gridItem}>
                      <TextField
                        type="password"
                        placeholder="Password"
                        name="password"
                        fullWidth
                        value={this.state.password}
                        onChange={this.onChange}
                        required
                      />
                    </Grid>
                    <Grid item className={classes.gridItem}>
                      <Button variant="contained" type="submit" color="primary">
                        Sign In
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </div>
        </Grid>
      </Grid>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const actionCreators = { signInAction };

export default connect(
  mapStateToProps,
  actionCreators
)(withStyles(styles)(SignIn));
