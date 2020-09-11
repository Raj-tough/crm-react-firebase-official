import React, { Component } from 'react'
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import {styles} from "../styles/SignUpStyles"
import {Link} from "react-router-dom";
import { handleSignUp } from "../actions";
import {Redirect } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";


class SignUp extends Component {

state = { email: "", password: "" };

handleEmailChange = ({ target }) => {
  this.setState({ email: target.value });
  console.log(this.state.email);
};

handlePasswordChange = ({ target }) => {
  this.setState({ password: target.value });
};

OnHandleSignUp = () => {
    const {dispatch} = this.props;
    const { email, password } = this.state;
    dispatch(handleSignUp(email, password));
}

render () {
    const { classes, loginError, isAuthenticated } = this.props;
    return (
    <div>
      { isAuthenticated ? 
        <Redirect to='/login' /> :
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            SRK CRM SIGN UP
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={this.handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handlePasswordChange}
            />
            {loginError && (
              <Typography component="p" className={classes.errorText}>
                Incorrect email or password.
              </Typography>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.OnHandleSignUp}
            >
              Sign UP
            </Button>
            
          <Link to ='/login' className="btn btn-primary" >Already have account, Log in here</Link>
          </Paper>
        </Container>
        }
    </div>);          
  }
}

function mapStateToProps(state) {
    return {
      isLoggingIn: state.auth.isLoggingIn,
      loginError: state.auth.loginError,
      isAuthenticated: state.auth.isAuthenticated
    };
  }

export default withStyles(styles)(connect(mapStateToProps)(SignUp));