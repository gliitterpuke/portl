import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  CircularProgress
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";
import localStorageService from "../../services/localStorageService";

import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";
let user = localStorageService.getItem("auth_user")

const styles = theme => ({
  wrapper: {
    position: "relative"
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class SignIn extends Component {
  state = {
    username: "kat@portl.to",
    password: "test",
  };
  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleFormSubmit = event => {
    this.props.loginWithEmailAndPassword({ ...this.state })
    console.log(localStorage);
  }
  clickMe = () => {
    const isolang = { 
      code: "eng",
      name: "English"
    }
    const isocountries = {
      code: 158,
      name: "Taiwan"
    }
    const isocurrency ={
      code: 124,
      name: "Canadian Dollar"
    }
    const producttype = {
      name: "Visa"
    }
    const product = {
      name: "Temporary Resident Visa",
      code: "TRV",
      total_price: 200,
      platform_fee: 100,
      processing_cost: 1,
      country_code: 158,
      currency_code: 124,
      product_type_id: 1
    }
    const form = {
      name: "imm5257",
      xml_template_key: "templates/imm5257.xml",
      pdf_template_key: "blanks/imm5257.pdf",
      bucket: "portldump",
      product_id: 1
    }
    return axios.post("https://portl-dev.herokuapp.com/api/v1/iso/languages/", isolang)
    .then(result => { 
    console.log(result)
    axios.post("https://portl-dev.herokuapp.com/api/v1/iso/countries/", isocountries)})
    .then(result => { 
    console.log(result)
    axios.post("https://portl-dev.herokuapp.com/api/v1/iso/currencies/", isocurrency)})
    .then(result => { 
    console.log(result)
    axios.post("https://portl-dev.herokuapp.com/api/v1/product-types/", producttype)})
    .then(result => { 
    console.log(result)
    axios.post("https://portl-dev.herokuapp.com/api/v1/products/", product)})
    .then(result => { 
    console.log(result)
    axios.post("https://portl-dev.herokuapp.com/api/v1/form-metadata/", form)})
    }

  render() {
    let { username, password } = this.state;
    let { classes } = this.props;
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
                      name="username"
                      value={username}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid"
                      ]}
                    />
                    <TextValidator
                      className="mb-3 w-full"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <div className="flex flex-wrap items-center mb-4">
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={this.props.login.loading}
                          type="submit"
                        >
                          Sign in
                        </Button>
                        {this.props.login.loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                      <span className="mr-2 ml-5">or</span>
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/session/signup")
                        }
                      >
                        Sign up
                      </Button>
                    </div>
                    <Button
                      className="text-primary"
                      onClick={() =>
                        this.props.history.push("/session/forgot-password")
                      }
                    >
                      Forgot password?
                    </Button>
                    <Button
                      className="text-primary"
                      onClick ={this.clickMe}
                    >
                      Base
                    </Button>
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
  loginWithEmailAndPassword: PropTypes.func.isRequired,
  login: state.login
});
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, { loginWithEmailAndPassword })(SignIn))
);
