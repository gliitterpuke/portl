import React, { useState } from 'react';
import { Prompt } from 'react-router';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Select, RadioGroup } from 'formik-material-ui'
import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  Snackbar,
  MobileStepper,
  Stepper,
  Step,
  StepButton
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import {
    Autocomplete,
    AutocompleteRenderInputParams,
  } from 'formik-material-ui-lab';
import { SimpleCard, Breadcrumb } from 'matx';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import history from "../../../history";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { isMobile, isMdScreen } from "utils";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
} 

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
}));

const validationSchema = yup.object({
  ctr: yup.string()
    .required('Required'),
  PersonalDetails_CurrentCOR_Row2_Status: yup.string()
    .required('Required'),
  PersonalDetails_CurrentCOR_Row2_Other: yup.string()
    .when("PersonalDetails_CurrentCOR_Row2_Status", {
      is: "06", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
      // double check the field below
  PersonalDetails_CurrentCOR_Row2_FromDate: yup.date()
    .required( "Required" ),
  PersonalDetails_PCRIndicator: yup.string()
    .required('Required'),
  pct: yup.string()
    .when("PersonalDetails_PCRIndicator", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  PersonalDetails_PreviousCOR_Row2_Status: yup.string()
    .when("PersonalDetails_PCRIndicator", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  PersonalDetails_PreviousCOR_Row2_Other: yup.string()
    .when("PersonalDetails_PreviousCOR_Row2_Status", {
      is: "06", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  PersonalDetails_PreviousCOR_Row2_FromDate: yup.date()
    .when("PersonalDetails_PCRIndicator", {
      is: "Y", then: yup.date().required( "Required" ),
      otherwise: yup.date() }),
  PersonalDetails_PreviousCOR_Row2_ToDate: yup.date()
    .when("PersonalDetails_PCRIndicator", {
      is: "Y", then: yup.date().required( "Required" ),
      otherwise: yup.date() }),
  PCR2: yup.string()
    .when("PersonalDetails_PCRIndicator", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  pct2: yup.string()
    .when("PCR2", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  PersonalDetails_PreviousCOR_Row3_Status: yup.string()
    .when("PCR2", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  PersonalDetails_PreviousCOR_Row3_Other: yup.string()
    .when("PersonalDetails_PreviousCOR_Row3_Status", {
      is: "06", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  PersonalDetails_PreviousCOR_Row3_FromDate: yup.date()
    .when("PCR2", {
      is: "Y", then: yup.date().required( "Required" ),
      otherwise: yup.date() }),
  PersonalDetails_PreviousCOR_Row3_ToDate: yup.date()
    .when("PCR2", {
      is: "Y", then: yup.date().required( "Required" ),
      otherwise: yup.date() }),
  PersonalDetails_SameAsCORIndicator: yup.string()
    .required('Required'),
  cwa: yup.string()
    .when("PersonalDetails_SameAsCORIndicator", {
      is: "N", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  PersonalDetails_CountryWhereApplying_Row2_Status: yup.string()
    .when("PersonalDetails_SameAsCORIndicator", {
      is: "N", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  PersonalDetails_CountryWhereApplying_Row2_Other: yup.string()
    .when("PersonalDetails_CountryWhereApplying_Row2_Status", {
      is: "06", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  PersonalDetails_CountryWhereApplying_Row2_FromDate: yup.date()
    .when("PersonalDetails_SameAsCORIndicator", {
      is: "N", then: yup.date().required( "Required" ),
      otherwise: yup.date() }),
  PersonalDetails_CountryWhereApplying_Row2_ToDate: yup.date()
    .when("PersonalDetails_SameAsCORIndicator", {
      is: "N", then: yup.date().required( "Required" ),
      otherwise: yup.date() }),
});

export const Er = ({ formData, setFormData, nextStep, prevStep, currentApp, saveData, country, step, getSteps, setStep,
  open, setOpen }) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();
  
  const totalSteps = () => {
    return steps.length;
  };

  const handleStep = (num) => () => {
    setStep(num);
  };

  const theme = useTheme();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setOpen(false);
  };

  React.useEffect(() => {
    if (isMobile() === true) {
      var elmnt = document.getElementsByClassName("scrollbar-container");
      elmnt[0].scrollTo(0,0);
    }
    else if (isMdScreen() === true) {
      var elmnt = document.getElementsByClassName("scrollbar-container");
      elmnt[0].scrollTo(0,0);
    }

    else {
      var elmnt = document.getElementsByClassName("scrollbar-container");
      elmnt[1].scrollTo(0,0);
    }
  }, []);
  
  return (
    <>
      <Formik
        initialValues={formData}
        enableReinitialize={true}
        onSubmit={values => {
          var PersonalDetails_CurrentCOR_Row2_Country = values.ctr.value
          var PersonalDetails_PreviousCOR_Row2_Country = values.pct.value
          var PersonalDetails_PreviousCOR_Row3_Country = values.pct2.value
          var PersonalDetails_CountryWhereApplying_Row2_Country = values.cwa.value
          setFormData({...values, PersonalDetails_CurrentCOR_Row2_Country, PersonalDetails_PreviousCOR_Row2_Country, 
            PersonalDetails_PreviousCOR_Row3_Country, PersonalDetails_CountryWhereApplying_Row2_Country});

          saveData(values, PersonalDetails_CurrentCOR_Row2_Country, PersonalDetails_PreviousCOR_Row2_Country, 
            PersonalDetails_PreviousCOR_Row3_Country, PersonalDetails_CountryWhereApplying_Row2_Country)
            .then(() => {
              if (direction === 'back') { prevStep(); setOpen(true) }
              else if (direction === 'forward') { nextStep(); setOpen(true) }
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
        {isMobile() === false && (
        <div>
        <Stepper nonLinear activeStep={step-1}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index+1)} completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      </div>
      )}
      <Form>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={2}>
          <Grid item xs={9} md={6}>
            <Typography variant="h6" gutterBottom>
              Current Country of Residence
            </Typography>
          </Grid>
          <Grid item xs={3} md={6}>
            <Button type='submit' variant='contained' color='primary' className={classes.button} onClick={() => setDirection('stay')} >
              Save
            </Button>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} 
              style={{ height: "100%" }}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
              <Alert onClose={handleClose} className={classes.snack}>
                Saved!
              </Alert>
            </Snackbar> 
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              name="ctr"
              component={Autocomplete}
              options={country}
              getOptionLabel={(option: any) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['ctr'] && !!errors['ctr']}
                  helperText={errors['ctr']}
                  label="Country/Territory of Residence *"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl>
              <InputLabel>Status *</InputLabel>
              <Field
                component={Select} style={{ width: 300 }} name="PersonalDetails_CurrentCOR_Row2_Status"
                error={touched.PersonalDetails_CurrentCOR_Row2_Status && errors.PersonalDetails_CurrentCOR_Row2_Status}>
                <MenuItem value={'01'}>Citizen</MenuItem>
                <MenuItem value={'02'}>Permanent Resident</MenuItem>
                <MenuItem value={'03'}>Worker</MenuItem>
                <MenuItem value={'04'}>Visitor</MenuItem>
                <MenuItem value={'05'}>Student</MenuItem>
                <MenuItem value={'06'}>Other</MenuItem>
                <MenuItem value={'07'}>Protected Person</MenuItem>
                <MenuItem value={'08'}>Refugee Claimant</MenuItem>
                <MenuItem value={'09'}>Foreign National</MenuItem>
              </Field>
              <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="PersonalDetails_CurrentCOR_Row2_Status" />
              </div>
            </FormControl>
          </Grid>
          {values.PersonalDetails_CurrentCOR_Row2_Status === "06" && (
          <Grid item xs={12} md={8}>
            <Field
              name='PersonalDetails_CurrentCOR_Row2_Other' label='Other *'
              margin='normal' as={TextField} fullWidth
            />
          </Grid>
          )}
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="From *" name="PersonalDetails_CurrentCOR_Row2_FromDate"
              error={touched.PersonalDetails_CurrentCOR_Row2_FromDate && errors.PersonalDetails_CurrentCOR_Row2_FromDate}
              helperText={touched.PersonalDetails_CurrentCOR_Row2_FromDate && errors.PersonalDetails_CurrentCOR_Row2_FromDate} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="To" name="PersonalDetails_CurrentCOR_Row2_ToDate"
              error={touched.PersonalDetails_CurrentCOR_Row2_ToDate && errors.PersonalDetails_CurrentCOR_Row2_ToDate}
              helperText={touched.PersonalDetails_CurrentCOR_Row2_ToDate && errors.PersonalDetails_CurrentCOR_Row2_ToDate} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Previous Countries or Territories of Residence
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Have you lived in any country outside of your country of citizenship or your current country/territory for more than six months in the past 5 years? *</FormLabel>
            <Field component={RadioGroup} row name="PersonalDetails_PCRIndicator">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="PersonalDetails_PCRIndicator" />
            </div>
          </Grid>
          {values.PersonalDetails_PCRIndicator === "Y" && (
          <Grid item xs={12} md={6}>
            <Field
              name="pct"
              component={Autocomplete}
              options={country}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['pct'] && !!errors['pct']}
                  helperText={errors['pct']}
                  label="Previous Country *"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          )}
          {values.PersonalDetails_PCRIndicator === "Y" && (
          <Grid item xs={12} md={6}>
            <FormControl>
              <InputLabel>Status *</InputLabel>
              <Field
                component={Select} style={{ width: 300 }} name="PersonalDetails_PreviousCOR_Row2_Status">
                <MenuItem value={'01'}>Citizen</MenuItem>
                <MenuItem value={'02'}>Permanent Resident</MenuItem>
                <MenuItem value={'03'}>Worker</MenuItem>
                <MenuItem value={'04'}>Visitor</MenuItem>
                <MenuItem value={'05'}>Student</MenuItem>
                <MenuItem value={'06'}>Other</MenuItem>
                <MenuItem value={'07'}>Protected Person</MenuItem>
                <MenuItem value={'08'}>Refugee Claimant</MenuItem>
                <MenuItem value={'09'}>Foreign National</MenuItem>
              </Field>
            </FormControl>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="PersonalDetails_PreviousCOR_Row2_Status" />
            </div>
          </Grid>
          )}
          {values.PersonalDetails_PreviousCOR_Row2_Status === "06" && (
          <Grid item xs={12} md={8}>
            <Field
              name='PersonalDetails_PreviousCOR_Row2_Other' label='Other *'
              margin='normal' as={TextField} fullWidth
              error={touched.PersonalDetails_PreviousCOR_Row2_Other && errors.PersonalDetails_PreviousCOR_Row2_Other}
              helperText={touched.PersonalDetails_PreviousCOR_Row2_Other && errors.PersonalDetails_PreviousCOR_Row2_Other}
            />
          </Grid>
          )}
          {values.PersonalDetails_PCRIndicator === "Y" && (
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="From *" name="PersonalDetails_PreviousCOR_Row2_FromDate"
              error={touched.PersonalDetails_PreviousCOR_Row2_FromDate && errors.PersonalDetails_PreviousCOR_Row2_FromDate}
              helperText={touched.PersonalDetails_PreviousCOR_Row2_FromDate && errors.PersonalDetails_PreviousCOR_Row2_FromDate} />
          </Grid>
          )}
          {values.PersonalDetails_PCRIndicator === "Y" && (
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="To *" name="PersonalDetails_PreviousCOR_Row2_ToDate"
              error={touched.PersonalDetails_PreviousCOR_Row2_ToDate && errors.PersonalDetails_PreviousCOR_Row2_ToDate}
              helperText={touched.PersonalDetails_PreviousCOR_Row2_ToDate && errors.PersonalDetails_PreviousCOR_Row2_ToDate} />
          </Grid>
          )}

          {values.PersonalDetails_PCRIndicator === "Y" && (
          <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Do you have another country you'd wish to list?</FormLabel>
            <Field component={RadioGroup} row name="PCR2">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="PCR2" />
            </div>
          </Grid>
          )}
          {values.PCR2 === "Y" && (
          <Grid item xs={12} md={6}>
            <Field
              name="pct2"
              component={Autocomplete}
              options={country}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['pct2'] && !!errors['pct2']}
                  helperText={errors['pct2']}
                  label="Previous Country *"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          )}
          {values.PCR2 === "Y" && (
          <Grid item xs={12} md={6}>
            <FormControl>
              <InputLabel>Status *</InputLabel>
              <Field
                component={Select} style={{ width: 300 }} name="PersonalDetails_PreviousCOR_Row3_Status">
                <MenuItem value={'01'}>Citizen</MenuItem>
                <MenuItem value={'02'}>Permanent Resident</MenuItem>
                <MenuItem value={'03'}>Worker</MenuItem>
                <MenuItem value={'04'}>Visitor</MenuItem>
                <MenuItem value={'05'}>Student</MenuItem>
                <MenuItem value={'06'}>Other</MenuItem>
                <MenuItem value={'07'}>Protected Person</MenuItem>
                <MenuItem value={'08'}>Refugee Claimant</MenuItem>
                <MenuItem value={'09'}>Foreign National</MenuItem>
              </Field>
            </FormControl>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="PersonalDetails_PreviousCOR_Row3_Status" />
            </div>
          </Grid>
          )}
          {values.PersonalDetails_PreviousCOR_Row3_Status === "06" && (
          <Grid item xs={12} md={8}>
            <Field
              name='PersonalDetails_PreviousCOR_Row3_Other' label='Other *'
              margin='normal' as={TextField} fullWidth
              error={touched.PersonalDetails_PreviousCOR_Row3_Other && errors.PersonalDetails_PreviousCOR_Row3_Other}
              helperText={touched.PersonalDetails_PreviousCOR_Row3_Other && errors.PersonalDetails_PreviousCOR_Row3_Other}
            />
          </Grid>
          )}
          {values.PCR2 === "Y" && (
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="From *" name="PersonalDetails_PreviousCOR_Row3_FromDate"              
              error={touched.PersonalDetails_PreviousCOR_Row3_FromDate && errors.PersonalDetails_PreviousCOR_Row3_FromDate}
              helperText={touched.PersonalDetails_PreviousCOR_Row3_FromDate && errors.PersonalDetails_PreviousCOR_Row3_FromDate} />
          </Grid>
          )}
          {values.PCR2 === "Y" && (
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="To *" name="PersonalDetails_PreviousCOR_Row3_ToDate"
              error={touched.PersonalDetails_PreviousCOR_Row3_ToDate && errors.PersonalDetails_PreviousCOR_Row3_ToDate}
              helperText={touched.PersonalDetails_PreviousCOR_Row3_ToDate && errors.PersonalDetails_PreviousCOR_Row3_ToDate} />
          </Grid>
          )}

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Country Where Applying From
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Same as your current country/territory of residence? *</FormLabel>
            <Field component={RadioGroup} row name="PersonalDetails_SameAsCORIndicator">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="PersonalDetails_SameAsCORIndicator" />
            </div>
          </Grid>
          {values.PersonalDetails_SameAsCORIndicator === "N" && (
          <Grid item xs={12} md={6}>
            <Field
              name="cwa"
              component={Autocomplete}
              options={country}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['cwa'] && !!errors['cwa']}
                  helperText={errors['cwa']}
                  label="Previous Country *"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          )}
          {values.PersonalDetails_SameAsCORIndicator === "N" && (
          <Grid item xs={12} md={6}>
            <FormControl>
              <InputLabel>Status *</InputLabel>
              <Field
                component={Select} style={{ width: 300 }} name="PersonalDetails_CountryWhereApplying_Row2_Status">
                <MenuItem value={'01'}>Citizen</MenuItem>
                <MenuItem value={'02'}>Permanent Resident</MenuItem>
                <MenuItem value={'03'}>Worker</MenuItem>
                <MenuItem value={'04'}>Visitor</MenuItem>
                <MenuItem value={'05'}>Student</MenuItem>
                <MenuItem value={'06'}>Other</MenuItem>
                <MenuItem value={'07'}>Protected Person</MenuItem>
                <MenuItem value={'08'}>Refugee Claimant</MenuItem>
                <MenuItem value={'09'}>Foreign National</MenuItem>
              </Field>
            </FormControl>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="PersonalDetails_CountryWhereApplying_Row2_Status" />
            </div>
          </Grid>
          )}
          {values.PersonalDetails_CountryWhereApplying_Row2_Status === "06" && (
          <Grid item xs={12} md={8}>
            <Field
              name='PersonalDetails_CountryWhereApplying_Row2_Other' label='Other *'
              margin='normal' as={TextField} fullWidth
              error={touched.PersonalDetails_CountryWhereApplying_Row2_Other && errors.ersonalDetails_CountryWhereApplying_Row2_Other}
              helperText={touched.PersonalDetails_CountryWhereApplying_Row2_Other && errors.ersonalDetails_CountryWhereApplying_Row2_Other}
            />
          </Grid>
          )}
          {values.PersonalDetails_SameAsCORIndicator === "N" && (
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="From *" name="PersonalDetails_CountryWhereApplying_Row2_FromDate"
              error={touched.PersonalDetails_CountryWhereApplying_Row2_FromDate && errors.PersonalDetails_CountryWhereApplying_Row2_FromDate}
              helperText={touched.PersonalDetails_CountryWhereApplying_Row2_FromDate && errors.PersonalDetails_CountryWhereApplying_Row2_FromDate} />
          </Grid>)}
          {values.PersonalDetails_SameAsCORIndicator === "N" && (
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="To" name="PersonalDetails_CountryWhereApplying_Row2_ToDate"
              error={touched.PersonalDetails_CountryWhereApplying_Row2_ToDate && errors.PersonalDetails_CountryWhereApplying_Row2_ToDate}
              helperText={touched.PersonalDetails_CountryWhereApplying_Row2_ToDate && errors.PersonalDetails_CountryWhereApplying_Row2_ToDate} />
          </Grid>
          )}
            {isMobile() === false && (
            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='secondary' 
                className={classes.button} onClick={() => setDirection('back')} >
                Back
              </Button>
              <Button type='submit' variant='contained' color='primary' 
                className={classes.button} onClick={() => setDirection('forward')}>
                Continue
              </Button>
            </Grid>
            )}
            {isMobile() === true && (
            <Grid item xs={12}>
              <MobileStepper
                variant="progress" steps={6} position="static" activeStep={step-1} className={classes.root}
                nextButton={
                  <Button type='submit' size="small" onClick={() => setDirection('forward')} disabled={step === 7}>
                    Next {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </Button>
                }
                backButton={
                  <Button size="small" onClick={prevStep} disabled={step === 0}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} Back
                  </Button>
                } />
            </Grid>
            )}
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

Er.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};