import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import axios from "axios"
import localStorageService from "../../../services/localStorageService";
import {
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

class SimpleForm extends Component {
  state = {
    first_name: "",
    middle_name: "",
    last_name: "",
    birth_date: "",
    citizenship: "",
    sex: "",
    relationship_to_owner: "",
    owner_id: "1"
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleSubmit = event => {
  const user = localStorageService.getItem("auth_user")
  const auth = {
    headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
  }
  const data = {
    first_name: this.state.first_name,
    middle_name: this.state.middle_name,
    last_name: this.state.last_name,
    birth_date: this.state.birth_date,
    citizenship: this.state.citizenship,
    sex: this.state.sex,
    relationship_to_owner: "1",
    owner_id: user.id
  };
  axios.post("https://portl-dev.herokuapp.com/api/v1/client_profiles/", data, auth).then(result => { 
    console.log(user)
    return result
   })
  }

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = birth_date => {
    // console.log(date);

    this.setState({ birth_date });
  };

  render() {
    let {
      first_name,
      middle_name,
      last_name,
      birth_date,
      citizenship,
      sex,
    } = this.state;
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
          <Grid container spacing={6}>
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

export default SimpleForm;
