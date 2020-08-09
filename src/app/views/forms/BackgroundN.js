import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    Button,
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

export class BackgroundN extends Component {
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
            Background
        </Typography>
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography variant="subtitle1">Medical Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormLabel FormLabel component="legend" required="true">
                Have you or any family members had, or been in contact with anyone, with tuberculosis within the past 2 years?
              </FormLabel>
              <RadioGroup
                className="mb-4" onChange={handleChange('BackgroundInfo_Choice')} row >
                <FormControlLabel
                  value="Yes" control={<Radio color="secondary" />} label="Yes" />
                <FormControlLabel
                  value="No" control={<Radio color="secondary" />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FormLabel FormLabel component="legend" required="true">
                Do you have any mental/physical disorders that would require social/health services, other than medication, during your stay in Canada?
              </FormLabel>
              <RadioGroup
                className="mb-4" onChange={handleChange('BackgroundInfo_Choice')} row >
                <FormControlLabel
                  value="Yes" control={<Radio color="secondary" />} label="Yes" />
                <FormControlLabel
                  value="No" control={<Radio color="secondary" />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <FormLabel component="legend">Please provide the name and details which this applies to.</FormLabel>
                <TextValidator
                type="text" fullWidth
                onChange={handleChange('BackgroundInfo_Details_MedicalDetails')}              
              />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="subtitle1">Previous Applications</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormLabel FormLabel component="legend" required="true">
                Have you ever remained beyond the validity of your status, attented school or worked without authorization in Canada?
              </FormLabel>
              <RadioGroup
                className="mb-4" onChange={handleChange('BackgroundInfo2_VisaChoice1')} row >
                <FormControlLabel
                  value="Yes" control={<Radio color="secondary" />} label="Yes" />
                <FormControlLabel
                  value="No" control={<Radio color="secondary" />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FormLabel FormLabel component="legend" required="true">
                Have you ever been refused a visa/permit, denied entry or been ordered to leave a country?
              </FormLabel>
              <RadioGroup
                className="mb-4" onChange={handleChange('BackgroundInfo2_VisaChoice2')} row >
                <FormControlLabel
                  value="Yes" control={<Radio color="secondary" />} label="Yes" />
                <FormControlLabel
                  value="No" control={<Radio color="secondary" />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FormLabel FormLabel component="legend" required="true">
                Have you previously applied to enter or remain in Canada?
              </FormLabel>
              <RadioGroup
                className="mb-4" onChange={handleChange('BackgroundInfo3_VisaChoice3')} row >
                <FormControlLabel
                  value="Yes" control={<Radio color="secondary" />} label="Yes" />
                <FormControlLabel
                  value="No" control={<Radio color="secondary" />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <FormLabel component="legend">Please provide details.</FormLabel>
                <TextValidator
                type="text" fullWidth
                onChange={handleChange('BackgroundInfo2_Details_refusedDetails')}              
              />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="subtitle1">Criminal Record</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormLabel FormLabel component="legend" required="true">
                Have you ever committed, been arrested/charged for or convicted of any criminal offence?
              </FormLabel>
              <RadioGroup
                className="mb-4" onChange={handleChange('BackgroundInfo3_Choice')} row >
                <FormControlLabel
                  value="Yes" control={<Radio color="secondary" />} label="Yes" />
                <FormControlLabel
                  value="No" control={<Radio color="secondary" />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <FormLabel component="legend">Please provide details.</FormLabel>
                <TextValidator
                type="text" fullWidth
                onChange={handleChange('BackgroundInfo3_details')}              
              />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="subtitle1">Military</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormLabel FormLabel component="legend" required="true">
                Did you serve in any military/militia/civil defence unit or serve in a security organization/police force?
              </FormLabel>
              <RadioGroup
                className="mb-4" onChange={handleChange('Military_Choice')} row >
                <FormControlLabel
                  value="Yes" control={<Radio color="secondary" />} label="Yes" />
                <FormControlLabel
                  value="No" control={<Radio color="secondary" />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <FormLabel component="legend">Please provide the dates of service and countries/territories where you served.</FormLabel>
                <TextValidator
                type="text" fullWidth
                onChange={handleChange('Military_militaryServiceDetails')}              
              />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="subtitle1">Other</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormLabel FormLabel component="legend" required="true">
                Are/have you been associated with any political party/group/organization that engaged in/advocated violence as a means to achieve a political/religious objective,
                or has been associated with criminal activity at any time?
              </FormLabel>
              <RadioGroup
                className="mb-4" onChange={handleChange('Occupation_Choice')} row >
                <FormControlLabel
                  value="Yes" control={<Radio color="secondary" />} label="Yes" />
                <FormControlLabel
                  value="No" control={<Radio color="secondary" />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FormLabel FormLabel component="legend" required="true">
                Have you ever witnessed/participated in the ill treatment of prisoners/civilians, looting/desecration of religious buildings?
              </FormLabel>
              <RadioGroup
                className="mb-4" onChange={handleChange('GovPosition_Choice')} row >
                <FormControlLabel
                  value="Yes" control={<Radio color="secondary" />} label="Yes" />
                <FormControlLabel
                  value="No" control={<Radio color="secondary" />} label="No" />
              </RadioGroup>
            </Grid>
        </Grid>
        <br />
        <Button color="secondary" variant="contained" onClick={this.back}>Back</Button>
        <Button color="primary" variant="contained" onClick={this.continue}>Continue</Button>
        <Button color="default" variant="contained" onClick={handleSubmit}>Submit</Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default BackgroundN;
