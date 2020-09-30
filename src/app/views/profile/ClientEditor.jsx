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
import localStorageService from "../../services/localStorageService";

let user = localStorageService.getItem("auth_user")
class ClientEditor extends Component {
  componentDidMount() {
    this.setState({ ...this.state })
      console.log(user)
  }
  
  state = {
    given_names: user.client_profile.given_names,
    family_name: user.client_profile.family_name,
    birth_date: user.client_profile.birth_date,
    citizenship: user.client_profile.citizen_of.name,
    country_code: user.client_profile.citizen_of.code,
    sex: user.client_profile.sex,
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
    return axios.put("clients/" + user.client_profile.id, this.state).then((response) => {
      console.log(response)
    user.client_profile = response.data
    localStorageService.setItem("auth_user", user)
    this.setState({ loading: false });
    this.props.toggleClientEditor()
    console.log(user)
    });
  }
  
  render() {
    let {
      loading,
      given_names,
      family_name,
      birth_date,
      country_code,
      sex,
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
                name="given_names"
                value={given_names}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Last Name"
                onChange={this.handleChange}
                type="text"
                name="family_name"
                value={family_name}
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
                name="country_code"
                value={country_code}
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
