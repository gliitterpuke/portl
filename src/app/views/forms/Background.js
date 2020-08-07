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
    Education_EducationIndicator,
    Education_Edu_Row1_FromYear,
    Education_Edu_Row1_FromMonth,
    Education_Edu_Row1_ToYear,
    Education_Edu_Row1_ToMonth,
    Education_Edu_Row1_FieldOfStudy,
    Education_Edu_Row1_School,
    Education_Edu_Row1_CityTown,
    BackgroundInfo_Choice,
    BackgroundInfo_Details_MedicalDetails,
    BackgroundInfo_backgroundInfoCalc,
    BackgroundInfo2_VisaChoice1,
    BackgroundInfo2_VisaChoice2,
    BackgroundInfo2_Details_refusedDetails,
    BackgroundInfo2_Details_VisaChoice3,
    BackgroundInfo3_Choice,
    BackgroundInfo3_details,
    Military_Choice,
    Military_militaryServiceDetails,
    Occupation_Choice,
    GovPosition_Choice
    } = this.state;
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
        <Typography variant="h6" gutterBottom>
              Background Information
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="subtitle1">Medical Details</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormLabel FormLabel component="legend" required="true">Have you or any family members had, or been in contact with anyone, with tuberculosis within the past 2 years?</FormLabel>
                <RadioGroup row aria-label="position" name="BackgroundInfo_Choice" value={BackgroundInfo_Choice}>
                <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <FormLabel FormLabel component="legend" required="true">Do you have any mental/physical disorders that would require social/health services, other than medication, during your stay in Canada?</FormLabel>
                <RadioGroup row aria-label="position" name="BackgroundInfo_Choice" value={BackgroundInfo_Choice}>
                <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <FormLabel component="legend">Please provide the name and details which this applies to.</FormLabel>
                <TextField name="BackgroundInfo_Details_MedicalDetails" value={BackgroundInfo_Details_MedicalDetails} 
                type="text" fullWidth/>
            </Grid>
        </Grid>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="subtitle1">Previous Applications</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormLabel FormLabel component="legend" required="true">
                    Have you ever remained beyond the validity of your status, attented school or worked without authorization in Canada?</FormLabel>
                <RadioGroup row aria-label="position" name="BackgroundInfo2_VisaChoice1" value={BackgroundInfo2_VisaChoice1}>
                <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <FormLabel FormLabel component="legend" required="true">
                Have you ever been refused a visa/permit, denied entry or been ordered to leave a country?</FormLabel>
                <RadioGroup row aria-label="position" name="BackgroundInfo2_VisaChoice2" value={BackgroundInfo2_VisaChoice2}>
                <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <FormLabel FormLabel component="legend" required="true">
                Have you previously applied to enter or remain in Canada?</FormLabel>
                <RadioGroup row aria-label="position" name="BackgroundInfo2_Details_VisaChoice3" value={BackgroundInfo2_Details_VisaChoice3}>
                <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <FormLabel component="legend">Please provide details.</FormLabel>
                <TextField name="BackgroundInfo2_Details_refusedDetails" value={BackgroundInfo2_Details_refusedDetails} 
                type="text" fullWidth/>
            </Grid>
        </Grid>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="subtitle1">Criminal Record</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormLabel FormLabel component="legend" required="true">
                Have you ever committed, been arrested/charged for or convicted of any criminal offence?</FormLabel>
                <RadioGroup row aria-label="position" name="BackgroundInfo3_Choice" value={BackgroundInfo3_Choice}>
                <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <FormLabel component="legend">Please provide details.</FormLabel>
                <TextField name="BackgroundInfo3_details" value={BackgroundInfo3_details} 
                type="text" fullWidth/>
            </Grid>
        </Grid>

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="subtitle1">Military</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormLabel FormLabel component="legend" required="true">
                    Did you serve in any military/militia/civil defence unit or serve in a security organization/police force?
                </FormLabel>
                <RadioGroup row aria-label="position" name="Military_Choice" value={Military_Choice}>
                <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <FormLabel component="legend">
                    Please provide the dates of service and countries/territories where you served.
                </FormLabel>
                <TextField name="Military_militaryServiceDetails" value={Military_militaryServiceDetails} 
                type="text" fullWidth/>
            </Grid>
        </Grid>

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="subtitle1">Other</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormLabel FormLabel component="legend" required="true">
                Are/have you been associated with any political party/group/organization that engaged in/advocated violence as a means to achieve a political/religious objective,
                or has been associated with criminal activity at any time?
                </FormLabel>
                <RadioGroup row aria-label="position" name="Occupation_Choice" value={Occupation_Choice}>
                <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <FormLabel FormLabel component="legend" required="true">
                Have you ever witnessed/participated in the ill treatment of prisoners/civilians, looting/desecration of religious buildings?
                </FormLabel>
                <RadioGroup row aria-label="position" name="GovPosition_Choice" value={GovPosition_Choice}>
                <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>
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