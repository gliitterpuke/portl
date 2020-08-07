import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

class SimpleForm extends Component {
  state = {
    PersonalDetails_Name_FamilyName: "",
    PersonalDetails_Name_GivenName: "",
    PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator: "",
    PersonalDetails_Sex_Sex: "",
    PersonalDetails_PlaceBirthCity: "",
    PersonalDetails_PlaceBirthCountry: "",
    PersonalDetails_CurrentCOR_Row2_Other: "",
  };

  handleSubmit = (event) => {
    alert('A form was submitted: ' + this.state);

    fetch('https://portl-dev.herokuapp.com/api//v1/forms/trv/', {
        method: 'POST',
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });

    event.preventDefault();
}

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date(),
            endDate: new Date()
        }
    }
    handleDateChange = date => this.setState({ startDate: date })

  render() {
    let {
      PersonalDetails_CountryWhereApplying_Row2_Country,
      PersonalDetails_CountryWhereApplying_Row2_Status,
      PersonalDetails_CountryWhereApplying_Row2_Other,
    PersonalDetails_CountryWhereApplying_Row2_FromDate,
    PersonalDetails_CountryWhereApplying_Row2_ToDate,
    MaritalStatus_SectionA_MaritalStatus,
    MaritalStatus_SectionA_DateofMarriage,
    MaritalStatus_SectionA_FamilyName,
    MaritalStatus_SectionA_GivenName,
    MaritalStatus_SectionA_PrevMarriedIndicator,
    MaritalStatus_SectionA_DateLastValidated_DateCalc,
    MaritalStatus_SectionA_DateLastValidated_Year,
    MaritalStatus_SectionA_DateLastValidated_Month,
    MaritalStatus_SectionA_DateLastValidated_Day,
    MaritalStatus_SectionA_PMFamilyName,
    MaritalStatus_SectionA_PMGivenName_GivenName,
    MaritalStatus_SectionA_PrevSpouse_DOBYear,
    MaritalStatus_SectionA_PrevSpouse_DOBMonth,
    MaritalStatus_SectionA_PrevSpouse_DOBDay,
    MaritalStatus_SectionA_TypeOfRelationship,
    MaritalStatus_SectionA_FromDate,
    MaritalStatus_SectionA_ToDate_ToDate,
    } = this.state;
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
        <Typography variant="h6" gutterBottom>
              Marital Status
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            <InputLabel>Current Status</InputLabel>
                <Select
                native required="true"
                name="MaritalStatus_SectionA_MaritalStatus" autoWidth="true"
                onChange={this.handleChange}
                >
                <option aria-label="None" value="" />
                <option>Annulled Marriage</option>
                <option>Common-Law</option>
                <option>Divorced</option>
                <option>Legally Separated</option>
                <option>Married</option>
                <option>Single</option>
                <option>Unknown</option>
                <option>Widowed</option>
                </Select>
            </Grid>
            <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
                <TextField name="MaritalStatus_SectionA_DateofMarriage" value={MaritalStatus_SectionA_DateofMarriage} 
                helperText="Date of Marriage/Common-Law" type="date" style={{ width: 300 }} fullWidth/>
            </FormControl>
            </Grid>
            <Grid item xs={12}><FormLabel FormLabel component="legend">Name of your current Spouse/Common-law partner</FormLabel></Grid>
            <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
                <TextField name="MaritalStatus_SectionA_FamilyName" label="Family Name" value={MaritalStatus_SectionA_FamilyName} fullWidth/>
            </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
                <TextField name="MaritalStatus_SectionA_GivenName" label="Given Name" value={MaritalStatus_SectionA_GivenName} fullWidth/>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormLabel FormLabel component="legend" required="true">Have you previously been married or in a common-law relationship?</FormLabel>
                <RadioGroup row aria-label="position" name="MaritalStatus_SectionA_PrevMarriedIndicator" value={MaritalStatus_SectionA_PrevMarriedIndicator} defaultValue="top">
                <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Name of your previous Spouse/Common-law partner</FormLabel>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField name="MaritalStatus_SectionA_PMFamilyName" label="Family Name" value={MaritalStatus_SectionA_PMFamilyName} fullWidth/>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField name="MaritalStatus_SectionA_PMGivenName_GivenName" label="Given Name" value={MaritalStatus_SectionA_PMGivenName_GivenName} fullWidth/>
            </Grid>
            <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
                <TextField name="MaritalStatus_SectionA_PrevSpouse_DOBYear" value={MaritalStatus_SectionA_PrevSpouse_DOBYear} 
                helperText="Previous Spouse Date of Birth" type="date" style={{ width: 300 }} fullWidth/>
            </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
            <InputLabel>Type of Relationship</InputLabel>
                <Select
                native required="true"
                name="MaritalStatus_SectionA_TypeOfRelationship" autoWidth="true" style={{ width: 300 }}
                onChange={this.handleChange}
                >
                <option aria-label="None" value="" />
                <option>Common-Law</option>
                <option>Married</option>
                </Select>
            </Grid>
            <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
                <TextField name="MaritalStatus_SectionA_FromDate" value={MaritalStatus_SectionA_FromDate} 
                helperText="From" type="date" style={{ width: 300 }} fullWidth/>
            </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
                <TextField name="MaritalStatus_SectionA_ToDate_ToDate" value={MaritalStatus_SectionA_ToDate_ToDate} 
                helperText="To" type="date" style={{ width: 300 }} fullWidth/>
            </FormControl>
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <span className="pl-2 capitalize">Submit</span>
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default SimpleForm;

