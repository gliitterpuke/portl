import React, { Component } from "react";
import { Card, Grid, Button } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { resetPassword } from "../../redux/actions/LoginActions";
import localStorageService from "../../services/localStorageService";
import history from "../../../history";

let user = localStorageService.getItem('auth_user')
if (!localStorage.getItem("access_token")) {
}
else  {
  history.push('/profile')
}
const baseURL = "https://portl-dev.herokuapp.com/api/v1/"
class ForgotPassword extends Component {
  state = {
    email: "katherinewwang@gmail.com"
  };
  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleFormSubmit = () => {
    let email = this.state.email
    axios.post(baseURL + `email/send-password-reset-email/` + email)
    alert("Success! Please check your email for further instructions")
  };
  render() {
    let { email } = this.state;

    return (
      <div className="signup flex justify-center w-full h-full-screen">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-8 flex justify-center items-center h-full">
                  <img src="/assets/images/illustrations/dreamer.svg" alt="" />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-9 h-full bg-light-gray position-relative">
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
                    <div className="flex items-center">
                      <Button variant="contained" color="primary" type="submit">
                        Send Password Reset
                      </Button>
                      <span className="ml-4 mr-2">or</span>
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/session/signin")
                        }
                      >
                        Sign in
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
  resetPassword: PropTypes.func.isRequired,
  login: state.login
});
export default withRouter(
  connect(mapStateToProps, { resetPassword })(ForgotPassword)
);
