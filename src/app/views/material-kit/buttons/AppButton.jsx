import React, { Component } from "react";
import axios from "axios";
import localStorageService from "../../../services/localStorageService"
import { Card, Grid, Icon, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import history from "../../../../history"

let user = localStorageService.getItem("auth_user")

//if (!localStorage.getItem("access_token")) {
//  history.push('/session/signin');
//  console.log(localStorage)
//  }
class AppForm extends Component {
  clickMe = () => {
    const data = { 
      product_id: 1,
      language_id: 1,
      client_id: user.client_profile.id
    }

    axios.post("http://localhost:8000/api/v1/applications", data).then(result => { 
      user.client_profile.applications.push(result.data)
      localStorageService.setItem("auth_user", user)
      let state = user.client_profile.applications.find (application => application.id === result.data.id);
      this.props.history.push({pathname: `/application/${result.data.id}`, state: state });
      console.log(user)
    })
    }
  render() {
    return(
    <div className="m-sm-30">
      <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
        <IconButton onClick={() => this.props.history.goBack()}>
          <Icon>arrow_back</Icon>
        </IconButton>
      </div>
      <Grid item lg={12} xs={12}>
          <Card
            onClick ={this.clickMe}
            className="p-6 flex items-center justify-center cursor-pointer h-150px"
            elevation={3}
            >
              <div className="text-primary text-center font-medium text-20">
              <div>Visitor Visa</div>
              </div>
          </Card>
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