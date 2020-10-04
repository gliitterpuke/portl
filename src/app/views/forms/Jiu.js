import React, { useState } from 'react';
import { Prompt } from 'react-router';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { RadioGroup } from 'formik-material-ui'
import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  TextField,
  Typography,
  Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import {
    Autocomplete,
    AutocompleteRenderInputParams,
  } from 'formik-material-ui-lab';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { SimpleCard, Breadcrumb } from 'matx';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
} 

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const validationSchema = yup.object({
  Education_EducationIndicator: yup.string()
    .required('Required'),
  Education_Edu_Row1_FromYear: yup.number()
    .when("Education_EducationIndicator", {
      is: "Y", then: yup.number().required( "Required" ).min(1900).max(2020),
      otherwise: yup.number() }),
  Education_Edu_Row1_FromMonth: yup.number()
    .when("Education_EducationIndicator", {
        is: "Y", then: yup.number().required( "Required" ).min(1).max(12),
        otherwise: yup.number() }),
  Education_Edu_Row1_ToYear: yup.number()
    .moreThan(yup.ref('Education_Edu_Row1_FromYear'), "Must be after from year"),
  Education_Edu_Row1_ToMonth: yup.number()
    .min(1).max(12),
  Education_Edu_Row1_FieldOfStudy: yup.string()
    .when("Education_EducationIndicator", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  Education_Edu_Row1_School: yup.string()
    .when("Education_EducationIndicator", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  Education_Edu_Row1_CityTown: yup.string()
    .when("Education_EducationIndicator", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  educt: yup.string()
    .when("Education_EducationIndicator", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
});

export const Jiu = ({ formData, setFormData, nextStep, prevStep, saveData, country, provstate }) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');
  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={formData}
        enableReinitialize={true}
        onSubmit={values => {
          var Education_Edu_Row1_Country_Country = values.educt.value
          var Education_Edu_Row1_ProvState = values.edups.value
          setFormData({...values, Education_Edu_Row1_Country_Country, Education_Edu_Row1_ProvState});

          saveData(values, Education_Edu_Row1_Country_Country, Education_Edu_Row1_ProvState)
            .then(() => {
              if (direction === 'back') { prevStep() }
              else if (direction === 'forward') { nextStep() }
              else { setOpen(true) }
            })
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
              Education
        </Typography>
        <Grid container spacing={6}>
        <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Have you had any post secondary education (including university, college, or apprenticeship training)? *</FormLabel>
            <Field component={RadioGroup} row name="Education_EducationIndicator">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="Education_EducationIndicator" />
            </div>
        </Grid>
        {values.Education_EducationIndicator === "Y" && (
        <Grid item xs={12} md={1}>
            <Field
              name='Education_Edu_Row1_FromYear' label='YYYY' helperText='From *'
              margin='normal' as={TextField} fullWidth
              error={touched.Education_Edu_Row1_FromYear && errors.Education_Edu_Row1_FromYear}
            />
        </Grid>
        )}
        {values.Education_EducationIndicator === "Y" && (
        <Grid item xs={12} md={1}>
            <Field
              name='Education_Edu_Row1_FromMonth' label='MM' helperText='From *'
              margin='normal' as={TextField} fullWidth
              error={touched.Education_Edu_Row1_FromMonth && errors.Education_Edu_Row1_FromMonth}
            />
        </Grid>
        )}
        {values.Education_EducationIndicator === "Y" && (
        <Grid item xs={12} md={5}>
            <Field
              name='Education_Edu_Row1_FieldOfStudy' label='Field of Study *'
              margin='normal' as={TextField} fullWidth
              error={touched.Education_Edu_Row1_FieldOfStudy && errors.Education_Edu_Row1_FieldOfStudy}
              helperText={touched.Education_Edu_Row1_FieldOfStudy && errors.Education_Edu_Row1_FieldOfStudy}
            />
        </Grid>
        )}
        {values.Education_EducationIndicator === "Y" && (
        <Grid item xs={12} md={5}>
            <Field
              name='Education_Edu_Row1_School' label='Name of School/Facility *'
              margin='normal' as={TextField} fullWidth
              error={touched.Education_Edu_Row1_School && errors.Education_Edu_Row1_School}
              helperText={touched.Education_Edu_Row1_School && errors.Education_Edu_Row1_School}
            />
        </Grid>
        )}
        {values.Education_EducationIndicator === "Y" && (
        <Grid item xs={12} md={1}>
            <Field
              name='Education_Edu_Row1_ToYear' label='YYYY' helperText='To'
              margin='normal' as={TextField} fullWidth
              error={touched.Education_Edu_Row1_ToYear && errors.Education_Edu_Row1_ToYear}
            />
        </Grid>
        )}
        {values.Education_EducationIndicator === "Y" && (
        <Grid item xs={12} md={1}>
            <Field
              name='Education_Edu_Row1_ToMonth' label='MM' helperText='To'
              margin='normal' as={TextField} fullWidth
              error={touched.Education_Edu_Row1_ToMonth && errors.Education_Edu_Row1_ToMonth}
            />
        </Grid>
        )}
        {values.Education_EducationIndicator === "Y" && (
        <Grid item xs={12} md={6}>
            <Field
              name='Education_Edu_Row1_CityTown' label='City/Town *'
              margin='normal' as={TextField} fullWidth
              error={touched.Education_Edu_Row1_CityTown && errors.Education_Edu_Row1_CityTown}
              helperText={touched.Education_Edu_Row1_CityTown && errors.Education_Edu_Row1_CityTown}
            />
        </Grid>
        )}
        {values.Education_EducationIndicator === "Y" && (
        <Grid item xs={12} md={4}>
            <Field
              name="educt"
              component={Autocomplete}
              options={country}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['educt'] && !!errors['educt']}
                  helperText={errors['educt']}
                  label="Country/Territory *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
        {values.educt.label === "Canada" && (
        <Grid item xs={12} md={3}>
            <Field
              name="edups"
              component={Autocomplete}
              options={provstate}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 200 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['edups'] && !!errors['edups']}
                  helperText={errors['edups']}
                  label="Province/State *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
        {values.educt.label === "United States of America" && (
        <Grid item xs={12} md={3}>
            <Field
              name="edups"
              component={Autocomplete}
              options={provstate}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 200 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['edups'] && !!errors['edups']}
                  helperText={errors['edups']}
                  label="Province/State *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
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
              <Button
                type='submit' variant='contained' color='secondary'
                className={classes.button}
              >
                Save
              </Button>
              <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} onClick={() => setDirection('stay')} 
                style={{ height: "100%" }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}>
                <Alert onClose={handleClose} className={classes.snack}>
                  Saved!
                </Alert>
              </Snackbar>
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

Jiu.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};