import React, { useState } from 'react';
import { Prompt } from 'react-router';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { RadioGroup } from 'formik-material-ui'
import { makeStyles } from '@material-ui/core/styles';
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
  Occupation_OccupationRow1_FromYear: yup.number()
    .min(1900).max(2020)  
    .required('From Year required'),
  Occupation_OccupationRow1_FromMonth: yup.number()
    .min(1).max(12)  
    .required('From Month required'),
  Occupation_OccupationRow1_ToYear: yup.number()
    .min(1900).max(2020),
  Occupation_OccupationRow1_ToMonth: yup.number()
    .min(1).max(12), 
  Occupation_OccupationRow1_Occupation_Occupation: yup.string()
    .required('Current occupation required'),
  Occupation_OccupationRow1_Employer: yup.string()
    .required('Current employer/institution/facility required'),
  Occupation_OccupationRow1_CityTown_CityTown: yup.string()
    .required('City/town required'),
  occct: yup.string()
    .required('Country/territory required'),
  PrevOcc: yup.string()
    .required('Required'),
  Occupation_OccupationRow2_FromYear: yup.number()
    .when("PrevOcc", {
      is: "Y", then: yup.number().required( "Required" ).min(1900).max(2020),
      otherwise: yup.number() }),
  Occupation_OccupationRow2_FromMonth: yup.number()
    .when("PrevOcc", {
      is: "Y", then: yup.number().required( "Required" ).min(1).max(12),
      otherwise: yup.number() }),
  Occupation_OccupationRow2_ToYear: yup.number()
    .when("PrevOcc", {
      is: "Y", then: yup.number().required( "Required" ).min(1900).max(2020),
      otherwise: yup.number() }),
  Occupation_OccupationRow2_ToMonth: yup.number()
    .when("PrevOcc", {
      is: "Y", then: yup.number().required( "Required" ).min(1).max(12),
      otherwise: yup.number() }),
  Occupation_OccupationRow2_Occupation_Occupation: yup.string()
    .when("PrevOcc", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  Occupation_OccupationRow2_Employer: yup.string()
    .when("PrevOcc", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  Occupation_OccupationRow2_CityTown_CityTown: yup.string()
    .when("PrevOcc", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  occ2ct: yup.string()
    .when("PrevOcc", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  PrevOcc2: yup.string()
    .when("PrevOcc", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  Occupation_OccupationRow3_FromYear: yup.number()
    .when("PrevOcc2", {
      is: "Y", then: yup.number().required( "Required" ).min(1900).max(2020),
      otherwise: yup.number() }),
  Occupation_OccupationRow3_FromMonth: yup.number()
    .when("PrevOcc2", {
      is: "Y", then: yup.number().required( "Required" ).min(1).max(12),
      otherwise: yup.number() }),
  Occupation_OccupationRow3_ToYear: yup.number()
    .when("PrevOcc2", {
      is: "Y", then: yup.number().required( "Required" ).min(1900).max(2020),
      otherwise: yup.number() }),
  Occupation_OccupationRow3_ToMonth: yup.number()
    .when("PrevOcc2", {
      is: "Y", then: yup.number().required( "Required" ).min(1).max(12),
      otherwise: yup.number() }),
  Occupation_OccupationRow3_Occupation_Occupation: yup.string()
    .when("PrevOcc2", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  Occupation_OccupationRow3_Employer: yup.string()
    .when("PrevOcc2", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  Occupation_OccupationRow3_CityTown_CityTown: yup.string()
    .when("PrevOcc2", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  occ3ct: yup.string()
    .when("PrevOcc2", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
});

export const Ba = ({ formData, setFormData, nextStep, prevStep, saveData, country, provstate }) => {
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
          var Occupation_OccupationRow1_Country_Country = values.occct.value
          var Occupation_OccupationRow1_ProvState = values.occps.value
          var Occupation_OccupationRow2_Country_Country = values.occ2ct.value
          var Occupation_OccupationRow2_ProvState = values.occ2ps.value
          var Occupation_OccupationRow3_Country_Country = values.occ3ct.value
          var Occupation_OccupationRow3_ProvState = values.occ3ps.value
          setFormData({...values, Occupation_OccupationRow1_Country_Country, Occupation_OccupationRow1_ProvState,
            Occupation_OccupationRow2_Country_Country, Occupation_OccupationRow2_ProvState,
            Occupation_OccupationRow3_Country_Country, Occupation_OccupationRow3_ProvState});

          saveData(values, Occupation_OccupationRow1_Country_Country, Occupation_OccupationRow1_ProvState,
            Occupation_OccupationRow2_Country_Country, Occupation_OccupationRow2_ProvState,
            Occupation_OccupationRow3_Country_Country, Occupation_OccupationRow3_ProvState)
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
              Employment
        </Typography>
        <Grid container spacing={6}>
        <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
            Please provide your employment details for the past 10 years.
            Do not leave any gaps. If not working/studying, please indicate as such. 
            If retired, please indicate and provide employment details for 10 years before retirement.
            </Typography>
        </Grid>
        <Grid item xs={12} md={1}>
            <Field
              name='Occupation_OccupationRow1_FromYear' label='YYYY *' helperText='From'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow1_FromYear && errors.Occupation_OccupationRow1_FromYear}
            />
        </Grid>
        <Grid item xs={12} md={1}>
            <Field
              name='Occupation_OccupationRow1_FromMonth' label='MM *' helperText='From'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow1_FromMonth && errors.Occupation_OccupationRow1_FromMonth}
            />
        </Grid>
        <Grid item xs={12} md={5}>
            <Field
              name='Occupation_OccupationRow1_Occupation_Occupation' label='Current Occupation *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow1_Occupation_Occupation && errors.Occupation_OccupationRow1_Occupation_Occupation}
              helperText={touched.Occupation_OccupationRow1_Occupation_Occupation && errors.Occupation_OccupationRow1_Occupation_Occupation}
            />
        </Grid>
        <Grid item xs={12} md={5}>
            <Field
              name='Occupation_OccupationRow1_Employer' label='Current Employer/Facility/Insitution *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow1_Employer && errors.Occupation_OccupationRow1_Employer}
              helperText={touched.Occupation_OccupationRow1_Employer && errors.Occupation_OccupationRow1_Employer}
            />
        </Grid>
        <Grid item xs={12} md={1}>
            <Field
              name='Occupation_OccupationRow1_ToYear' label='YYYY' helperText='To'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow1_ToYear && errors.Occupation_OccupationRow1_ToYear}
            />
        </Grid>
        <Grid item xs={12} md={1}>
            <Field
              name='Occupation_OccupationRow1_ToMonth' label='MM' helperText='To'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow1_ToMonth && errors.Occupation_OccupationRow1_ToMonth}
            />
        </Grid>
        <Grid item xs={12} md={4}>
            <Field
              name='Occupation_OccupationRow1_CityTown_CityTown' label='City/Town *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow1_CityTown_CityTown && errors.Occupation_OccupationRow1_CityTown_CityTown}
              helperText={touched.Occupation_OccupationRow1_CityTown_CityTown && errors.Occupation_OccupationRow1_CityTown_CityTown}
            />
        </Grid>
        <Grid item xs={12} md={3}>
            <Field
              name="occct"
              component={Autocomplete}
              options={country}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 200 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['occct'] && !!errors['occct']}
                  helperText={errors['occct']}
                  label="Country/Territory *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        {values.occct.label === "Canada" && (
        <Grid item xs={12} md={3}>
            <Field
              name="occps"
              component={Autocomplete}
              options={provstate}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 200 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['occps'] && !!errors['occps']}
                  helperText={errors['occps']}
                  label="Province/State *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
        {values.occct.label === "United States of America" && (
        <Grid item xs={12} md={3}>
            <Field
              name="occps"
              component={Autocomplete}
              options={provstate}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 200 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['occps'] && !!errors['occps']}
                  helperText={errors['occps']}
                  label="Province/State *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}

        <Grid item xs={12}>
          <FormLabel component="legend">Do you have any older occupations to list? *</FormLabel>
          <Field component={RadioGroup} row name="PrevOcc">
            <FormControlLabel
              value="Y" control={<Radio />} label="Yes" />
            <FormControlLabel
              value="N" control={<Radio />} label="No" />
          </Field>
          <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
             <ErrorMessage name="PrevOcc" />
          </div>
        </Grid>
        {values.PrevOcc === "Y" && (
        <Grid item xs={12} md={1}>
            <Field
              name='Occupation_OccupationRow2_FromYear' label='YYYY' helperText='From *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow2_FromYear && errors.Occupation_OccupationRow2_FromYear}
            />
        </Grid>
        )}
        {values.PrevOcc === "Y" && (
        <Grid item xs={12} md={1}>
            <Field
              name='Occupation_OccupationRow2_FromMonth' label='MM' helperText='From *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow2_FromMonth && errors.Occupation_OccupationRow2_FromMonth}
            />
        </Grid>
        )}
        {values.PrevOcc === "Y" && (
        <Grid item xs={12} md={5}>
            <Field
              name='Occupation_OccupationRow2_Occupation_Occupation' label='Previous Occupation *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow2_Occupation_Occupation && errors.Occupation_OccupationRow2_Occupation_Occupation}
              helperText={touched.Occupation_OccupationRow2_Occupation_Occupation && errors.Occupation_OccupationRow2_Occupation_Occupation}
            />
        </Grid>
        )}
        {values.PrevOcc === "Y" && (
        <Grid item xs={12} md={5}>
            <Field
              name='Occupation_OccupationRow2_Employer' label='Previous Employer/Institution *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow2_Employer && errors.Occupation_OccupationRow2_Employer}
              helperText={touched.Occupation_OccupationRow2_Employer && errors.Occupation_OccupationRow2_Employer}
            />
        </Grid>
        )}
        {values.PrevOcc === "Y" && (
        <Grid item xs={12} md={1}>
            <Field
              name='Occupation_OccupationRow2_ToYear' label='YYYY' helperText='To *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow2_ToYear && errors.Occupation_OccupationRow2_ToYear}
            />
        </Grid>
        )}
        {values.PrevOcc === "Y" && (
        <Grid item xs={12} md={1}>
            <Field
              name='Occupation_OccupationRow2_ToMonth' label='MM' helperText='To *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow2_ToMonth && errors.Occupation_OccupationRow2_ToMonth}
            />
        </Grid>
        )}
        {values.PrevOcc === "Y" && (
        <Grid item xs={12} md={4}>
            <Field
              name='Occupation_OccupationRow2_CityTown_CityTown' label='City/Town *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow2_CityTown_CityTown && errors.Occupation_OccupationRow2_CityTown_CityTown}
              helperText={touched.Occupation_OccupationRow2_CityTown_CityTown && errors.Occupation_OccupationRow2_CityTown_CityTown}
            />
        </Grid>
        )}
        {values.PrevOcc === "Y" && (
        <Grid item xs={12} md={3}>
            <Field
              name="occ2ct"
              component={Autocomplete}
              options={country}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 200 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['occ2ct'] && !!errors['occ2ct']}
                  helperText={errors['occ2ct']}
                  label="Country/Territory *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
        {values.occ2ct.label === "Canada" && (
        <Grid item xs={12} md={3}>
            <Field
              name="occ2ps"
              component={Autocomplete}
              options={provstate}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 200 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['occ2ps'] && !!errors['occ2ps']}
                  helperText={errors['occ2ps']}
                  label="Province/State *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
        {values.occ2ct.label === "United States of America" && (
        <Grid item xs={12} md={3}>
            <Field
              name="occ2ps"
              component={Autocomplete}
              options={provstate}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 200 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['occ2ps'] && !!errors['occ2ps']}
                  helperText={errors['occ2ps']}
                  label="Province/State *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}

        {values.PrevOcc === "Y" && ( 
        <Grid item xs={12}>
          <FormLabel component="legend">And even more? *</FormLabel>
          <Field component={RadioGroup} row name="PrevOcc2">
            <FormControlLabel
              value="Y" control={<Radio />} label="Yes" />
            <FormControlLabel
              value="N" control={<Radio />} label="No" />
          </Field>
          <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
             <ErrorMessage name="PrevOcc2" />
          </div>
        </Grid>
        )}
        {values.PrevOcc2 === "Y" && (  
        <Grid item xs={12} md={1}>
            <Field
              name='Occupation_OccupationRow3_FromYear' label='YYYY' helperText='From *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow3_FromYear && errors.Occupation_OccupationRow3_FromYear}
            />
        </Grid>
        )}
        {values.PrevOcc2 === "Y" && ( 
        <Grid item xs={12} md={1}>
            <Field
              name='Occupation_OccupationRow3_FromMonth' label='MM' helperText='From *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow3_FromMonth && errors.Occupation_OccupationRow3_FromMonth}
            />
        </Grid>
        )}
        {values.PrevOcc2 === "Y" && ( 
        <Grid item xs={12} md={5}>
            <Field
              name='Occupation_OccupationRow3_Occupation_Occupation' label='Previous Occupation *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow3_Occupation_Occupation && errors.Occupation_OccupationRow3_Occupation_Occupation}
              helperText={touched.Occupation_OccupationRow3_Occupation_Occupation && errors.Occupation_OccupationRow3_Occupation_Occupation}
            />
        </Grid>
        )}
        {values.PrevOcc2 === "Y" && ( 
        <Grid item xs={12} md={5}>
            <Field
              name='Occupation_OccupationRow3_Employer' label='Previous Employer/Facility/Institution *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow3_Employer && errors.Occupation_OccupationRow3_Employer}
              helperText={touched.Occupation_OccupationRow3_Employer && errors.Occupation_OccupationRow3_Employer}
            />
        </Grid>
        )}
        {values.PrevOcc2 === "Y" && ( 
        <Grid item xs={12} md={1}>
            <Field
              name='Occupation_OccupationRow3_ToYear' label='YYYY' helperText='To *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow3_ToYear && errors.Occupation_OccupationRow3_ToYear}
            />
        </Grid>
        )}
        {values.PrevOcc2 === "Y" && ( 
        <Grid item xs={12} md={1}>
            <Field
              name='Occupation_OccupationRow3_ToMonth' label='MM' helperText='To *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow3_ToMonth && errors.Occupation_OccupationRow3_ToMonth}
            />
        </Grid>
        )}
        {values.PrevOcc2 === "Y" && ( 
        <Grid item xs={12} md={4}>
            <Field
              name='Occupation_OccupationRow3_CityTown_CityTown' label='City/Town *'
              margin='normal' as={TextField} fullWidth
              error={touched.Occupation_OccupationRow3_CityTown_CityTown && errors.Occupation_OccupationRow3_CityTown_CityTown}
              helperText={touched.Occupation_OccupationRow3_CityTown_CityTown && errors.Occupation_OccupationRow3_CityTown_CityTown}
            />
        </Grid>
        )}
        {values.PrevOcc2 === "Y" && ( 
        <Grid item xs={12} md={3}>
            <Field
              name="occ3ct"
              component={Autocomplete}
              options={country}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 200 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['occ3ct'] && !!errors['occ3ct']}
                  helperText={errors['occ3ct']}
                  label="Country/Territory *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
        {values.occ3ct.label === "Canada" && ( 
        <Grid item xs={12} md={3}>
            <Field
              name="occ3ps"
              component={Autocomplete}
              options={provstate}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 200 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['occ3ps'] && !!errors['occ3ps']}
                  helperText={errors['occ3ps']}
                  label="Province/State *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
        {values.occ3ct.label === "United States of America" && ( 
        <Grid item xs={12} md={3}>
            <Field
              name="occ3ps"
              component={Autocomplete}
              options={provstate}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 200 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['occ3ps'] && !!errors['occ3ps']}
                  helperText={errors['occ3ps']}
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

Ba.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
