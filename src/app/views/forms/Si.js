import React, { useState } from 'react';
import { Prompt } from 'react-router'
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
import { SimpleCard, Breadcrumb } from 'matx';
  
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const validationSchema = yup.object({
  natlang: yup.string()
    .required('Required'),
  MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate: yup.string()
    .required('Required'),
  MaritalStatus_SectionA_Languages_languages_lov: yup.string()
    .when("MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate", {
      is: "Both", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  MaritalStatus_SectionA_Languages_LanguageTest: yup.string()
    .required('Required')
});

export const Si = ({ formData, setFormData, nextStep, prevStep, saveData, languages }) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');

  return (
    <>
      <Formik
        initialValues={formData}
        enableReinitialize={true}
        onSubmit={values => {
          var MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang = values.natlang.value
          setFormData({...values, MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang});

          saveData(values, MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang)
          
          direction === 'back' ? prevStep() : nextStep();
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched, values }) => (
      <div className="upload-form m-sm-30">
      <SimpleCard>
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Temporary Resident Visa" }]} />
        </div>
      <Form>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Typography variant="h6" gutterBottom>
              Languages
        </Typography>
        <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
            <FormLabel component="legend">Native language/Mother tongue *</FormLabel>
            <Field
              name="natlang"
              component={Autocomplete}
              options={languages}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['natlang'] && !!errors['natlang']}
                  helperText={errors['natlang']}
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
          {values.MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate === "Both" && (
          <Grid item xs={12} md={8}>
            <Field
              name='MaritalStatus_SectionA_Languages_languages_lov' label="Language you're most comfortable in *"
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_Languages_languages_lov && errors.MaritalStatus_SectionA_Languages_languages_lov}
              helperText={touched.MaritalStatus_SectionA_Languages_languages_lov && errors.MaritalStatus_SectionA_Languages_languages_lov}
            />
          </Grid>
          )}
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
      <Prompt
      message='You have unsaved changes, are you sure you want to leave?'
      />

    </>
  );
};

Si.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
