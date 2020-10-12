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
import axios from "axios.js";
import localStorageService from "../../services/localStorageService";
import history from "../../../history"
import qs from "qs";

import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";

let user = localStorageService.getItem('auth_user')
if (!localStorage.getItem("access_token")) {
}
else  {
  history.push('/profile')
}

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

class Demo extends Component {
  state = {
    username: "katherinewwang@gmail.com",
    password: "test",
  };

  createValues = async (e) => {
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
    await axios.post("occupations/", occupation)
    await axios.post("form-metadata/", form)
    await axios.post("languages/", isolang)
    await axios.post("languages/", isolang2)
    await axios.post("languages/", isolang3)
    await axios.post("countries/", isoct)
    await axios.post("countries/", isoct2)
    await axios.post("countries/", isoct3)
    await axios.post("currencies/", isocurrency)
    await axios.post("product-types/", application)
    await axios.post("product-types/", addonsc)
    await axios.post("products", trv)
    await axios.post("products/", consultation)
    alert('Values success')
}

createUsers = async (e) => {
    const repuser = {
        is_client: false,
        email: "kat@portl.to",
        password: "test"
    }
    const response = await axios.post("users/", repuser)
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
        owner_id: response.data.id
    }
    await axios.post("professionals", professional)
    const clientuser = {
        is_client: true,
        email: "katherinewwang@gmail.com",
        password: "test"
    }
    const result = await axios.post("users/", clientuser)
    const client = {
        given_names: "Jane",
        middle_name: "Marie",
        family_name: "Smith",
        birth_date: "1950-01-01",
        sex: "Female",
        owner_id: result.data.id,
        country_code: "cn"
      }
    await axios.post("clients/", client)
    alert('Users Success')
    }

    activateUsers = async (e) => {
        const rep = {
            username: "kat@portl.to",
            password: "test"
        }
        const response = await axios.post('http://127.0.0.1:8000/auth/token', qs.stringify(rep))
        const token = response.data.access_token
        axios.get(`users/activate/${token}`)
        const client = {
            username: "katherinewwang@gmail.com",
            password: "test"
        }
        const result = await axios.post('http://127.0.0.1:8000/auth/token', qs.stringify(client))
        const clienttoken = result.data.access_token
        axios.get(`users/activate/${clienttoken}`)
        alert('Activation successful')
        history.push('/session/signin')
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
                    To test, please click Values, wait for the success alert, then repeat for Users and Activate. 
                    <p/> You will be redirected to the signin page after activation!
                    <p/>
                    <u>Credentials</u>
                    <p/>
                    <b>Client: </b> katherinewwang@gmail.com / test
                    <p/>
                    <b>Professional: </b>kat@portl.to / test
                    <p/>
                    <div className="flex flex-wrap items-center mb-4">
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick ={this.createValues}
                        >
                          Values
                        </Button>
                      </div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick ={this.createUsers}
                        >
                          Users
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick ={this.activateUsers}
                        >
                          Activate
                        </Button>
                    </div>
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
  withRouter(connect(mapStateToProps, { loginWithEmailAndPassword })(Demo))
);
