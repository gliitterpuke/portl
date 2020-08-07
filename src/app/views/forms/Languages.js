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
    MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang,
    MaritalStatus_SectionA_Languages_languages_lov,
    MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate,
    MaritalStatus_SectionA_Languages_LanguageTest
    } = this.state;
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
        <Typography variant="h6" gutterBottom>
              Languages
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            <FormLabel FormLabel component="legend" required="true" style={{ height: 20 }}>Native language/Mother tongue</FormLabel>
              <Autocomplete
                style={{ width: 300 }} options={languages} autoHighlight getOptionLabel={(option) => option.label}
                name="MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang" value={MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang}
                renderOption={(option) => (
                  <React.Fragment>
                    {option.label}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                <TextField {...params} label="Choose a language" variant="outlined" inputProps={{ ...params.inputProps,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <InputLabel>Are you able to communicate in English/French?</InputLabel>
                <Select
                native required="true"
                name="MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate" autoWidth="true"
                onChange={this.handleChange} style={{ width: 300 }} >
                <option aria-label="None" value="" />
                <option>English</option>
                <option>French</option>
                <option>Both</option>
                <option>Neither</option>
                </Select>
            </Grid>
            <Grid item xs={12} md={8}>
            <FormControl component="fieldset">
              <FormLabel>What language are you most comfortable with?</FormLabel>
                <TextField name="MaritalStatus_SectionA_Languages_languages_lov" value={MaritalStatus_SectionA_Languages_languages_lov} 
                type="text" fullWidth/>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormLabel FormLabel component="legend" required="true">Have you taken a test from a designated testing agency to determine your English/French proficiency?</FormLabel>
                <RadioGroup row aria-label="position" name="MaritalStatus_SectionA_Languages_LanguageTest" value={MaritalStatus_SectionA_Languages_LanguageTest} defaultValue="top">
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

const languages = [
  { label: 'English' },
  { label: 'French' },
  { label: 'Chinese' },
  { label: 'Japanese' },
  { label: 'Korean' },
];
