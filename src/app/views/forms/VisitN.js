import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
import "date-fns";

export class VisitN extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
      };

    render() {

        const handleSubmit = (e) => {
          alert(JSON.stringify(this.props, null, 2));
          }
        const { values, handleChange } = this.props
        return (

      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}>
        <Typography variant="h6" gutterBottom>
            Details of Visit
        </Typography>
        <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
            <InputLabel>Purpose of Visit</InputLabel>
                <Select
                native required="true" fullWidth
                onChange={handleChange('DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit')}
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
            <TextValidator
                label="Other" type="text" fullWidth
                onChange={handleChange('DetailsOfVisit_PurposeRow1_Other')}                
                validators={[ "required", ]} errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item xs={12}><Typography variant="subtitle1">Trip Dates</Typography></Grid>
            <Grid item xs={12} md={3}>
                <FormControl component="fieldset">
                    <TextField onChange={handleChange('DetailsOfVisit_PurposeRow1_HowLongStay_FromDate')} 
                    label="From" type="date" InputLabelProps={{ shrink: true }} fullWidth/>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
                <FormControl component="fieldset">
                    <TextField onChange={handleChange('DetailsOfVisit_PurposeRow1_HowLongStay_ToDate')} 
                    label="To" type="date" InputLabelProps={{ shrink: true }} fullWidth/>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField onChange={handleChange('DetailsOfVisit_PurposeRow1_Funds_Funds')} 
                    label="Funds Available For Your Trip" helperText="$CAD" type="text" fullWidth />
            </Grid>
        </Grid>
        <br></br>
        <Typography variant="h6" gutterBottom>
              People / Institutions Visited
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            <TextValidator
                label="Name" type="text" fullWidth
                onChange={handleChange('DetailsOfVisit_Contacts_Row1_Name_Name')}                
                validators={[ "required", ]} errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextValidator
                label="Relationship to Me" type="text" fullWidth
                onChange={handleChange('DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe')}                
                validators={[ "required", ]} errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item xs={12} md={12}>
            <TextValidator
                label="Address in Canada" type="text" fullWidth
                onChange={handleChange('DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada')}                
                validators={[ "required", ]} errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextValidator
                label="Name" type="text" fullWidth
                onChange={handleChange('Contacts_Row2_Name_Name')}                
                validators={[ "required", ]} errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextValidator
                label="Relationship to Me" type="text" fullWidth
                onChange={handleChange('Contacts_Row2_Relationship_RelationshipToMe')}                
                validators={[ "required", ]} errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item xs={12} md={12}>
            <TextValidator
                label="Address in Canada" type="text" fullWidth
                onChange={handleChange('Contacts_Row2_AddressInCanada_AddressInCanada')}                
                validators={[ "required", ]} errorMessages={["this field is required"]}
              />
            </Grid>
        </Grid>
        <br />
        <Button color="primary" variant="contained" onClick={this.continue}>
            Continue
        </Button>
        <button onClick={handleSubmit}>Submit</button>
        </ValidatorForm>
      </div>
    );
  }
}

export default VisitN;

