import React, { Component } from "react";
import {
  Button,
  Grid
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import localStorageService from "../../../services/localStorageService"

const auth = {
  headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
}
const user = localStorageService.getItem("auth_user")
const client = user.client_profile.id

class ClientViewer extends Component {
  state = {};

  componentDidMount() {
    return axios.get("https://portl-dev.herokuapp.com/api/v1/users/me/", auth).then(res => {
      this.setState({ ...res.data.client_profile });
    });
  }

  render() {
    let {
      first_name,
      middle_name,
      last_name,
      birth_date,
      citizenship,
      sex,
      relationship_to_owner,
      owner_id,
    } = this.state;

    return (
      <div className="invoice-viewer py-4">
        <div className="viewer_actions px-4 mb-5 flex items-center justify-end">
          <div>
            <Button
              className="mr-4 py-2"
              variant="contained"
              color="primary"
              onClick={() => this.props.toggleClientEditor()}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        <div id="print-area">
          <div className="viewer__order-info px-4 mb-4 flex justify-between">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>First Name</strong>
                </h5>
                <p> {first_name} </p>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>Middle Name</strong>
                </h5>
                <p> {middle_name} </p>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>Last Name</strong>
                </h5>
                <p> {last_name} </p>
              </Grid>
              <Grid item xs={12} md={6}>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>Birth Date</strong>
                </h5>
                <p> {birth_date} </p>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>Sex</strong>
                </h5>
                <p> {sex} </p>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>Citizenship</strong>
                </h5>
                <p> {citizenship} </p>
              </Grid>
            </Grid>
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ClientViewer);