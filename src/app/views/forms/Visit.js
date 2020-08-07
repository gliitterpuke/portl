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
    DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit,
    DetailsOfVisit_PurposeRow1_Other,
    DetailsOfVisit_PurposeRow1_HowLongStay_FromDate,
    DetailsOfVisit_PurposeRow1_HowLongStay_ToDate,
    DetailsOfVisit_PurposeRow1_Funds_Funds,
    DetailsOfVisit_Contacts_Row1_Name_Name,
    DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe,
    DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada,
    Contacts_Row2_Name_Name,
    Contacts_Row2_Relationship_RelationshipToMe,
    Contacts_Row2_AddressInCanada_AddressInCanada
    } = this.state;
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
        <Typography variant="h6" gutterBottom>
              Details of Visit
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            <InputLabel>Purpose of Visit</InputLabel>
                <Select
                native required="true"
                name="DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit" autoWidth="true"
                onChange={this.handleChange}
                >
                <option aria-label="None" value="" />
                <option>Business</option>
                <option>Tourism</option>
                <option>Short-Term Studies</option>
                <option>Returning Student</option>
                <option>Returning Worker</option>
                <option>Super Visa</option>
                <option>Other</option>
                <option>Visit</option>
                <option>Family Visit</option>
                </Select>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField name="DetailsOfVisit_PurposeRow1_Other" label="Other" value={DetailsOfVisit_PurposeRow1_Other} fullWidth/>
            </Grid>
            <Grid item xs={12}><Typography variant="subtitle1">Trip Dates</Typography></Grid>
            <Grid item xs={12} md={3}>
                <FormControl component="fieldset">
                <TextField name="DetailsOfVisit_PurposeRow1_HowLongStay_FromDate" value={DetailsOfVisit_PurposeRow1_HowLongStay_FromDate} 
                label="From" type="date" InputLabelProps={{ shrink: true }} fullWidth/>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
                <FormControl component="fieldset">
                <TextField name="DetailsOfVisit_PurposeRow1_HowLongStay_ToDate" value={DetailsOfVisit_PurposeRow1_HowLongStay_ToDate} 
                label="To" type="date" InputLabelProps={{ shrink: true }} fullWidth />    
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField name="DetailsOfVisit_PurposeRow1_Funds_Funds" label="Funds Available for Your Trip" 
                helperText="$CAD" value={DetailsOfVisit_PurposeRow1_Funds_Funds} fullWidth/>
            </Grid>
        </Grid>
        <br></br>
        <Typography variant="h6" gutterBottom>
              People / Institutions Visited
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <TextField name="DetailsOfVisit_Contacts_Row1_Name_Name" label="Name" 
                value={DetailsOfVisit_Contacts_Row1_Name_Name} fullWidth/>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField name="DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe" label="Relationship to Me" 
                value={DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe} fullWidth/>
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField name="DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada" label="Address in Canada" 
                value={DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada} fullWidth/>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField name="Contacts_Row2_Name_Name" label="Name" 
                value={Contacts_Row2_Name_Name} fullWidth/>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField name="Contacts_Row2_Relationship_RelationshipToMe" label="Relationship to Me" 
                value={Contacts_Row2_Relationship_RelationshipToMe} fullWidth/>
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField name="Contacts_Row2_AddressInCanada_AddressInCanada" label="Address in Canada" 
                value={Contacts_Row2_AddressInCanada_AddressInCanada} fullWidth/>
            </Grid>
          </Grid>
          <br></br>
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

