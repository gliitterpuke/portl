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
import history from "../../../history"

import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";

let user = localStorageService.getItem('auth_user')
if (!localStorage.getItem("access_token")) {
}
else  {
  history.push('/profile')
}

let baseURL = "https://portl-dev.herokuapp.com/api/v1/"

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
    username: "katherinewwang@gmail.com",
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
  }
  clickMe = () => {
    const isolang = { 
      code: "eng",
      name: "English"
    }
    const isolang2 = { 
      code: "chi",
      name: "Chinese"
    }
    const isolang3 = { 
      code: "fre",
      name: "French"
    }
    const isoct = {
      code: "cn",
      name: "China"
    }
    const isoct2 = {
      code: "in",
      name: "India"
    }
    const isoct3 = {
      code: "tw",
      name: "Taiwan"
    }
    const isocurrency ={
      code: "cad",
      name: "Canadian Dollar"
    }
    const application = {
      name: "Application"
    }
    const addonsc = {
      name: "Consultation"
    }
    const form = {
      name: "imm5257",
      xml_template_key: "templates/imm5257.xml",
      pdf_template_key: "blanks/imm5257.pdf",
      bucket: "portldump",
      form_created_at: new Date()
    }
    const trv = {
      name: "Temporary Resident Visa",
      code: "TRV",
      total_price: 500,
      platform_fee: 100,
      processing_cost: 10,
      country_code: "cn",
      currency_code: "cad",
      product_type_id: 1,
      forms: [ 1 ]
    }
    const study = {
      name: "Study Permit",
      code: "study",
      total_price: 200,
      platform_fee: 100,
      processing_cost: 1,
      country_code: "cn",
      currency_code: "cad",
      product_type_id: 1
    }
    const ee = {
      name: "Express Entry",
      code: "ee",
      total_price: 200,
      platform_fee: 100,
      processing_cost: 1,
      country_code: "cn",
      currency_code: "cad",
      product_type_id: 1
    }
    const work = {
      name: "Work Permit",
      code: "work",
      total_price: 200,
      platform_fee: 100,
      processing_cost: 1,
      country_code: "cn",
      currency_code: "cad",
      product_type_id: 1
    }
    const occupation = {
      name: "Consultant"
    }
    const consultation = {
      name: "Consultation",
      code: "consult",
      total_price: 200,
      platform_fee: 100,
      processing_cost: 1,
      country_code: "cn",
      currency_code: "cad",
      product_type_id: 2,
      forms: [ 0 ]
    }
    
    // create test languages, countries, currencies, productypes, products and forms
    return axios.post(baseURL + "occupations/", occupation)
    .then(() => {
    axios.post(baseURL + "form/metadata/", form)})
    .then(() => { 
    axios.post(baseURL + "languages/", isolang)})
    .then(() => { 
    axios.post(baseURL + "languages/", isolang2)})
    .then(() => { 
    axios.post(baseURL + "languages/", isolang3)})
    .then(() => { 
    axios.post(baseURL + "countries/", isoct)})
    .then(() => { 
    axios.post(baseURL + "countries/", isoct2)})
    .then(() => { 
    axios.post(baseURL + "countries/", isoct3)})
    .then(() => { 
    axios.post(baseURL + "currencies/", isocurrency)})
    .then(() => { 
    axios.post(baseURL + "product-types/", application)})
    .then(() => { 
    // axios.post(baseURL + "product-types/", addonsc)})
    // .then(() => { 
    axios.post(baseURL + "products", trv)})
    // .then(() => { 
    // axios.post(baseURL + "products/", consultation)})

    // create test representative
    .then(() => {
        const signup = {
          is_client: false,
          email: "katherine.wang01@gmail.com",
          password: "test"
        }
        axios.post(baseURL + "users/", signup)
        .then(result => { 
        const professional = {
            family_name: "Smith",
            given_names: "John",
            affiliation: "Acme Corporation",
            sex: "Male",
            max_processing_budget: 1000,
            payout_account: "acct_1HPVPSCMMK6Kdzgg",
            country_code: "cn",
            occupation_id: 1,
            service_languages: [ "eng", "chi", "fre" ],
            serviced_products: [ 1 ],
            owner_id: result.data.id
          }
          axios.post(baseURL + "professionals", professional)
        })
      })
      .then(result => {
        axios.post(baseURL + `email/send-activation-email/katherine.wang01@gmail.com`)
        alert('Sign up successful - please check your email for your verification email!')
        this.props.history.push(`/session/signin`)
          return result;
        })
       .catch(error => {
            alert('Email is already registered')
      });
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
