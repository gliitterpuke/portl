import React, { Component } from "react";
import {
  Button,
  Grid,
  Typography,
  Icon
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import localStorageService from "../../services/localStorageService"
import history from "../../../history"

let user = localStorageService.getItem("auth_user")

class ClientViewer extends Component {
  state = {
  };

  componentDidMount() {
    let user = localStorageService.getItem("auth_user")
    this.setState({ ...user.client_profile })
  }

  render() {
    let user = localStorageService.getItem("auth_user")

    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={8} lg={10} md={10} sm={10}>
          <br/><br/>
            <Typography variant="h6">Profile</Typography>
          </Grid>
          <Grid item xs={4} lg={2} md={2}>
          <br/><br/>
            <Button className="mr-4 py-2 edit-profile" variant="contained" color="primary" onClick={() => this.props.toggleClientEditor()} >
              <span className="pl-2 capitalize">Edit Profile</span>
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sm={4}>
            <h5 className="font-normal mb-4 capitalize">
              <strong>First Name</strong>
            </h5>
            <h6> {user.client_profile.given_names} </h6>
          </Grid>
          <Grid item xs={12} md={4} sm={4}>
            <h5 className="font-normal mb-4 capitalize">
              <strong>Last Name</strong>
            </h5>
            <p> {user.client_profile.family_name} </p>
          </Grid>
          <Grid item xs={12} md={4} sm={4}>
            <h5 className="font-normal mb-4 capitalize">
              <strong>Birth Date</strong>
            </h5>
            <p> {user.client_profile.birth_date} </p>
          </Grid>
          <Grid item xs={12} md={4} sm={4}>
            <h5 className="font-normal mb-4 capitalize">
              <strong>Sex</strong>
            </h5>
            <p> {user.client_profile.sex} </p>
          </Grid>
          <Grid item xs={12} md={4} sm={4}>
            <h5 className="font-normal mb-4 capitalize">
              <strong>Citizenship</strong>
            </h5>
            <p> {user.client_profile.citizen_of.name} </p>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withRouter(ClientViewer);
