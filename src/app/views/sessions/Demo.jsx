import React, { useState } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import { makeStyles } from "@material-ui/core/styles";
import history from "history.js";
import clsx from "clsx";
import useAuth from 'app/hooks/useAuth';
import axios from "axios.js";
import qs from "qs";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  cardHolder: {
    background: "#1A2038",
  },
  card: {
    maxWidth: 800,
    borderRadius: 12,
    margin: "1rem",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Demo = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const classes = useStyles();

  const createValues = async (e) => {
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
    // const study = {
    //   name: "Study Permit",
    //   code: "study",
    //   total_price: 200,
    //   platform_fee: 100,
    //   processing_cost: 1,
    //   country_code: "cn",
    //   currency_code: "cad",
    //   product_type_id: 1
    // }
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

  const createUsers = async (e) => {
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

  const activateUsers = async (e) => {
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

  return (
    <div
      className={clsx(
        "flex justify-center items-center  min-h-full-screen",
        classes.cardHolder
      )}
    >
      <Card className={classes.card}>
        <Grid container>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <div className="p-8 flex justify-center items-center h-full">
              <img
                className="w-200"
                src="/assets/images/illustrations/dreamer.svg"
                alt=""
              />
            </div>
          </Grid>
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <div className="p-8 h-full bg-light-gray relative">
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
                <div className="relative">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick ={createValues}
                  >
                    Values
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick ={createUsers}
                >
                  Users
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick ={activateUsers}
                >
                  Activate
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Demo;
