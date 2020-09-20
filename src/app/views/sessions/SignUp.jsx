import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  MenuItem
} from "@material-ui/core";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import axios from "axios";
import localStorageService from "../../services/localStorageService";
import history from "history.js";

let user = localStorageService.getItem('auth_user')
if (!localStorage.getItem("access_token")) {
}
else if(user.role === "client") {
  history.push('/profile')
}
else if (user.role === "professional") {
  history.push('/professional')
}

let baseURL = "https://portl-dev.herokuapp.com/api/v1/"
class SignUp extends Component {
  state = {
    role: "",
    email: "",
    password: "",
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  handleFormSubmit = event => {
    const signup = {
      role: "client",
      email: this.state.email,
      password: this.state.password
    }
    axios.post(baseURL + "users/", signup)
    .then(result => { 
    const client = {
        first_name: "Jane",
        middle_name: "Marie",
        last_name: "Smith",
        birth_date: "1950-01-01",
        sex: "Female",
        owner_id: result.data.id,
        country_code: 158
      }
    axios.post(baseURL + "clients/", client)
    })
    .then(result => {
    axios.post(baseURL + `send-activation-email/${this.state.email}`)
    alert('Sign up successful - please check your email for your verification email!')
    this.props.history.push(`/session/signin`)
      return result;
    })
   .catch(error => {
     const {status} = error.response;
      if(status === 400) {
        alert('Email is already registered')
    };
  });
  };

  render() {
    let { role, email, password } = this.state;
    return (
      <div className="signup flex justify-center w-full h-full-screen">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-8 flex justify-center bg-light-gray items-center h-full">
                  <img
                    src="/assets/images/illustrations/posting_photo.svg"
                    alt=""
                  />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-9 h-full">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>    
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid"
                      ]}
                    />
                    <TextValidator
                      className="mb-4 w-full"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <FormControlLabel
                      className="mb-4"
                      name="agreement"
                      onChange={this.handleChange}
                      control={<Checkbox />}
                      label="I have read and agreed to the terms of service."
                    />
                    <div className="flex items-center">
                      <Button
                        className="capitalize"
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Sign up
                      </Button>
                      <span className="mx-2 ml-5">or</span>
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/session/signin")
                        }
                      >
                        Sign in
                      </Button>
                      <span className="mx-2 ml-5">or</span>
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/session/repsignup")
                        }
                      >
                        Rep Sign Up
                      </Button>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // setUser: PropTypes.func.isRequired
});

export default connect(mapStateToProps, {})(SignUp);
