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
import axios from "axios.js";
import localStorageService from "../../services/localStorageService";
import history from "../../../history"

let user = localStorageService.getItem("auth_user")

class ProfessionalEditor extends Component {
  componentDidMount() {
    this.setState({ ...this.state })
      console.log(user)
  }
  
  state = {
    given_names: user.professional_profile.given_names,
    family_name: user.professional_profile.family_name,
    affiliation: user.professional_profile.affiliation,
    occupation_id: user.professional_profile.occupation_id,
    country_code: user.professional_profile.country_of_operation.code,
    service_languages: [ 'eng', 'chi', 'fre' ],
    serviced_products: [ 1 ],
    max_processing_budget: user.professional_profile.max_processing_budget,
    curr_processing_budget: user.professional_profile.curr_processing_budget,
    payout_account: user.professional_profile.payout_account,
    sex: user.professional_profile.sex,
    owner_id: user.id,
    professional: user.professional_profile.id,
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
    return axios.put("professionals/" + user.professional_profile.id, this.state).then((response) => {
      console.log(response)
    user.professional_profile = response.data
    localStorageService.setItem("auth_user", user)
    this.setState({ loading: false });
    this.props.toggleProfessionalEditor()
    console.log(user)
    });
  }
  
  render() {
    let {
      loading,
      given_names,
      family_name,
      affiliation,
      occupation_id,
      country_code,
      service_languages,
      max_processing_budget,
      payout_account,
      sex,
      serviced_products,
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
                onClick={() => this.props.toggleProfessionalEditor()}
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
                label="Affiliation"
                onChange={this.handleChange}
                type="text"
                name="affiliation"
                value={affiliation}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Occupation"
                onChange={this.handleChange}
                type="text"
                name="occupation_id"
                value={occupation_id}
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
                label="Max Processing Budget"
                onChange={this.handleChange}
                type="text"
                name="max_processing_budget"
                value={max_processing_budget}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Payout Account"
                onChange={this.handleChange}
                type="text"
                name="payout_account"
                value={payout_account}
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

export default withRouter(ProfessionalEditor);
