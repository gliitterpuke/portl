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

export class CountriesN extends Component {
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
          onError={errors => null}
        >
        <Typography variant="h6" gutterBottom>
              Languages
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            <FormLabel FormLabel component="legend" required="true" style={{ height: 20 }}>Native language/Mother tongue</FormLabel>
              <Autocomplete
              onChange={handleChange('MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang')}
                style={{ width: 300 }} options={languages} autoHighlight getOptionLabel={(option) => option.label}
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
                onChange={handleChange('MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate')}
                style={{ width: 300 }} >
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
                <TextField type="text" onChange={handleChange('MaritalStatus_SectionA_Languages_languages_lov')} // InputLabelProps={{ shrink: true }} fullWidth/>
                type="text" fullWidth/>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormLabel FormLabel component="legend" required="true">Have you taken a test from a designated testing agency to determine your English/French proficiency?</FormLabel>
                <RadioGroup 
                 className="mb-4" onChange={handleChange('MaritalStatus_SectionA_Languages_LanguageTest')} row >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
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

export default CountriesN;

const languages = [
    { label: 'English' },
    { label: 'French' },
    { label: 'Chinese' },
    { label: 'Japanese' },
    { label: 'Korean' },
  ];
  