import React, { Component } from "react";
import {
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  Grid,
  Typography,
  Icon
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import axios from "axios";
import localStorageService from "../../../services/localStorageService"

let user = localStorageService.getItem("auth_user")
const client = user.client_profile.id
const auth = {
  headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
};

class ClientEditor extends Component {
  state = {
    first_name: "",
    middle_name: "",
    last_name: "",
    birth_date: "",
    citizenship: "",
    sex: "",
    owner_id: user.id,
    loading: false
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    this.setState({ loading: true });
    let tempState = this.state;
    delete tempState.loading;
    return axios.put("https://portl-dev.herokuapp.com/api/v1/client_profiles/" + client, this.state, auth).then(() => {
    // localStorageService.setItem("auth_user", response.data)
    this.setState({ loading: false });
    this.props.toggleClientEditor();
    });
  };

  render() {
    let {
      loading,
      first_name,
      middle_name,
      last_name,
      birth_date,
      citizenship,
      sex,
      owner_id,
    } = this.state;

    return (
      <div className="invoice-viewer py-4">
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => this.handleSubmit}
        >
          <div className="viewer_actions px-4 flex justify-end">
            <div className="mb-6">
              <Button
                type="button"
                className="mr-4 py-2"
                variant="text"
                onClick={() => this.props.toggleClientEditor()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="py-2"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                Save
              </Button>
            </div>
          </div>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={10} md={10}>
              <Typography variant="h6">Profile</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="First Name"
                onChange={this.handleChange}
                type="text"
                name="first_name"
                value={first_name}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Middle Name"
                onChange={this.handleChange}
                type="text"
                name="middle_name"
                value={middle_name}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Last Name"
                onChange={this.handleChange}
                type="text"
                name="last_name"
                value={last_name}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Birthday"
                onChange={this.handleChange}
                type="date"
                name="birth_date"
                value={birth_date}
                InputLabelProps={{ shrink: true }}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <RadioGroup
                className="mb-4"
                value={sex}
                name="sex"
                onChange={this.handleChange}
                row
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio color="secondary" />}
                  label="Female"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio color="secondary" />}
                  label="Male"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Unknown"
                  control={<Radio color="secondary" />}
                  label="Another"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Unspecified"
                  control={<Radio color="secondary" />}
                  label="Unspecified"
                  labelPlacement="end"
                />
              </RadioGroup>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Citizenship"
                onChange={this.handleChange}
                type="text"
                name="citizenship"
                value={citizenship}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item xs={6}>
              <Button color="primary" variant="contained" type="submit">
                <Icon>send</Icon>
                <span className="pl-2 capitalize">Submit</span>
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    );
  }
}

export default withRouter(ClientEditor);
