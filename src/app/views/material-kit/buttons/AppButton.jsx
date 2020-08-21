import React, { Component } from "react";
import axios from "axios";
import localStorageService from "../../../services/localStorageService"
import { Card, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

class AppForm extends Component {
  clickMe = () => {
    const user = localStorageService.getItem("auth_user")
    const data = { 
      program: "trv",
      status: "CLIENT_ACTION_REQUIRED",
      is_open: true,
      client_id: user.id,
      professional_id: 0
    }
    const auth = {
      headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
    }
    axios.post("https://portl-dev.herokuapp.com/api/v1/applications", data, auth).then(result => { 
      console.log(user)
      return result
    })
    }
  render() {
    return(
    <div className="m-sm-30">
      <Grid item lg={12} xs={12}>
        <Link to={`/forms/wizard`}>
          <Card
            onClick ={this.clickMe}
            className="p-6 flex items-center justify-center cursor-pointer h-150px"
            elevation={3}
            >
              <div className="text-primary text-center font-medium text-20">
              <div>Visitor Visa</div>
              </div>
          </Card>
        </Link>
      </Grid>
      <br />
      <Grid item lg={12} xs={12}>
        <Link to={`/forms/404`}>
          <Card
            className="p-6 flex items-center justify-center cursor-pointer h-150px"
            elevation={3}
            >
              <div className="text-primary text-center font-medium text-20">
              <div>Study Permit</div>
              </div>
          </Card>
        </Link>
      </Grid>
      <br />
      <Grid item lg={12} xs={12}>
        <Link to={`/forms/404`}>
          <Card
            className="p-6 flex items-center justify-center cursor-pointer h-150px"
            elevation={3}
            >
              <div className="text-primary text-center font-medium text-20">
              <div>Work Permit</div>
              </div>
          </Card>
        </Link>
      </Grid>
    </div>
  );
}
}
export default AppForm;