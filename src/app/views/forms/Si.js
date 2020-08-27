import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Select, RadioGroup } from 'formik-material-ui'
import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  TextField,
  Typography,
  MenuItem,
  FormControl
} from "@material-ui/core";
import {
    Autocomplete,
    AutocompleteRenderInputParams,
  } from 'formik-material-ui-lab';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { SimpleCard } from 'matx';
  
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const validationSchema = yup.object({
  MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang: yup.string()
    .required('Required'),
  MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate: yup.string()
    .required('Required'),
  MaritalStatus_SectionA_Languages_LanguageTest: yup.string()
    .required('Required')
});

export const Si = ({ formData, setFormData, nextStep, prevStep }) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');

  return (
    <>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          direction === 'back' ? prevStep() : nextStep();
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
      <div className="upload-form m-sm-30">
      <SimpleCard>
      <Form>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Typography variant="h6" gutterBottom>
              Languages
        </Typography>
        <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
            <FormLabel component="legend">Native language/Mother tongue *</FormLabel>
            <Field
              name="MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang"
              component={Autocomplete}
              options={languages}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang'] && !!errors['MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang']}
                  helperText={errors['MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang']}
                  label="Language"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl>
            <FormLabel FormLabel component="legend">Are you able to communciate in English or French? *</FormLabel>
              <Field
                component={Select} style={{ width: 300 }} name="MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate"
                error={touched.MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate && errors.MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate}>
                <MenuItem value={'English'}>English</MenuItem>
                <MenuItem value={'French'}>French</MenuItem>
                <MenuItem value={'Both'}>Both</MenuItem>
                <MenuItem value={'Neither'}>Neither</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <Field
              name='MaritalStatus_SectionA_Languages_languages_lov' label="Language you're most comfortable in"
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_Languages_languages_lov && errors.MaritalStatus_SectionA_Languages_languages_lov}
              helperText={touched.MaritalStatus_SectionA_Languages_languages_lov && errors.MaritalStatus_SectionA_Languages_languages_lov}
            />
          </Grid>
          <Grid item xs={12}>
          <FormLabel FormLabel component="legend">Have you taken a test from a designated testing agency to determine your English/French proficiency? *</FormLabel>
            <Field component={RadioGroup} row name="MaritalStatus_SectionA_Languages_LanguageTest">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="MaritalStatus_SectionA_Languages_LanguageTest" />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button
                type='submit' variant='contained' color='secondary' 
                className={classes.button} onClick={() => setDirection('back')} >
                Back
              </Button>
              <Button
                type='submit' variant='contained' color='primary' 
                className={classes.button} onClick={() => setDirection('forward')}>
                Continue
              </Button>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
        </Form>
        </SimpleCard>
        </div>
        )}
      </Formik>
    </>
  );
};

Si.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};

const languages = [
  { label: 'Chinese', value: '299' }, 
  { label: 'English', value: '001' }, 
  { label: 'French', value: '002' }, 
  { label: 'Japanese', value: '303' }, 
  { label: 'Korean', value: '305' }, 
  { label: 'Mandarin', value: '301' }, 
  { label: 'Canto', value: '300' }, 
  { label: 'Chinese, Min Nan', value: '545' }, 
  { label: 'Chinese, Yue', value: '546' }, 
  { label: 'Chinese, Yuh', value: '547' }, 
  { label: 'Hindi', value: '321' }, 
  { label: 'Hebrew', value: '253' }, 
  { label: 'Dutch', value: '117' }, 
  { label: 'German', value: '116' }, 
  { label: 'Punjabi', value: '324' }, 
  { label: 'Portugese', value: '115' }, 
  { label: 'Russian', value: '101' }, 
  { label: 'Shanghainese', value: '214' }, 
  { label: 'Spanish', value: '050' }, 
  { label: 'Turkish', value: '012' }, 
  { label: 'Vietnamese', value: '306' }, 
  { label: 'Welsh', value: '150' }, 
  { label: 'Arabic', value: '250' }, 
  { label: 'Italian', value: '123' }, 
  { label: 'Interp. Not Required', value: '601' }, 
  { label: 'Greek', value: '130' }, 
  { label: 'Hebrew, Yemen', value: '588' }, 
  { label: 'Kashmiri', value: '027' },
];
