import React, { useState } from 'react';
import { Prompt } from 'react-router'
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CheckboxWithLabel, Select, RadioGroup } from 'formik-material-ui'
import {
  Button,
  FormControlLabel,
  FormGroup,
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
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { SimpleCard, Breadcrumb } from 'matx';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { isMobile } from "utils";

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
  ContactInformation_contact_AddressRow1_Streetname_Streetname: yup.string()
    .required('Street name is required'),
  ContactInformation_contact_AddressRow2_CityTow_CityTown: yup.string()
    .required('City/town is required'),
  cmct: yup.string()
    .required('Country/territory is required'),
  ContactInformation_contact_SameAsMailingIndicator: yup.string()
    .required('Required'),
  ContactInformation_contact_ResidentialAddressRow1_StreetName_Streetname: yup.string()
    .when("ContactInformation_contact_SameAsMailingIndicator", {
      is: "N", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  ContactInformation_contact_ResidentialAddressRow1_CityTown_CityTown: yup.string()
    .when("ContactInformation_contact_SameAsMailingIndicator", {
      is: "N", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  ract: yup.string()
    .when("ContactInformation_contact_SameAsMailingIndicator", {
      is: "N", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  PhoneLoc: yup.string()
    .required('Required'),
  ContactInformation_contact_PhoneNumbers_Phone_Type: yup.string()
    .required('Phone type required'),
  ContactInformation_contact_PhoneNumbers_Phone_NumberCountry: yup.number()
    .typeError('Numbers only')
    .required('Country code required'),
  ANumber: yup.number()
    .when("PhoneLoc", {
      is: "CU", then: yup.number().required( "Required" ),
      otherwise: yup.number() }),
  ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber: yup.number()
    .when("PhoneLoc", {
      is: "Other", then: yup.number().required( "Required" ),
      otherwise: yup.number() }),
  altphone: yup.string()
    .required('Required'),
  PhoneLoc2: yup.string()
    .when("altphone", {
      is: "Y", then: yup.string().required('Required'),
      otherwise: yup.string()}),
  AANumber: yup.number()
    .when("PhoneLoc2", {
      is: "CU", then: yup.number().required( "Required" ),
      otherwise: yup.number() }),
  ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber: yup.number()
    .when("PhoneLoc2", {
      is: "Other", then: yup.number().required( "Required" ),
      otherwise: yup.number() }),
  faxnum: yup.string()
    .required('Required'),
  FaxLoc: yup.string()
    .when("faxnum", {
      is: "Y", then: yup.string().required('Required'),
      otherwise: yup.string()}),
  FANumber: yup.number()
    .when("FaxLoc", {
      is: "CU", then: yup.number().required( "Required" ),
      otherwise: yup.number() }),
  ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_IntlNumber_IntlNumber: yup.number()
    .when("FaxLoc", {
      is: "Other", then: yup.number().required( "Required" ),
      otherwise: yup.number() }),
  ContactInformation_contact_PhoneNumbers_FaxEmail_Email: yup.string()
    .email('Invalid email')
    .required('Email is required'),
});

export const Liu = ({ formData, setFormData, nextStep, prevStep, saveData, country, provstate, step, getSteps, setStep,
open, setOpen }) => {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('back');
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
  const fieldRef = React.useRef(null);
  React.useEffect(() => {
    fieldRef.current.scrollIntoView();
  }, []);
  return (
    <>
      <Formik
        initialValues={formData}
        enableReinitialize={true}
        onSubmit={values => {

          // countries/provstate
          var ContactInformation_contact_AddressRow2_Country_Country = values.cmct.value
          var ContactInformation_contact_AddressRow2_ProvinceState_ProvinceState = values.cmps.value
          var ContactInformation_contact_ResidentialAddressRow2_Country_Country = values.ract.value
          var ContactInformation_contact_ResidentialAddressRow2_ProvinceState_ProvinceState = values.raps.value

          // first phone number
          if (values.PhoneLoc === "CU") {
              var ContactInformation_contact_PhoneNumbers_Phone_CanadaUS = 1;
              var ContactInformation_contact_PhoneNumbers_Phone_Other = 0;
              var ContactInformation_contact_PhoneNumbers_Phone_ActualNumber = 
                  values.ANumber + values.ContactInformation_contact_PhoneNumbers_Phone_NumberExt }
          else if (values.PhoneLoc === "Other") {
              var ContactInformation_contact_PhoneNumbers_Phone_Other = 1;
              var ContactInformation_contact_PhoneNumbers_Phone_CanadaUS = 0;
              var ContactInformation_contact_PhoneNumbers_Phone_ActualNumber =
                  '+'+values.ContactInformation_contact_PhoneNumbers_Phone_NumberCountry
                  +values.ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber
                  +'x'+values.ContactInformation_contact_PhoneNumbers_Phone_NumberExt }

          // alt phone number
          if (values.PhoneLoc2 === "CU") {
              var ContactInformation_contact_PhoneNumbers_AltPhone_CanadaUS = 1;
              var ContactInformation_contact_PhoneNumbers_AltPhone_Other = 0;
              var ContactInformation_contact_PhoneNumbers_AltPhone_ActualNumber =
                  values.AANumber + values.ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt } 
          else if (values.PhoneLoc2 === "Other") {
              var ContactInformation_contact_PhoneNumbers_AltPhone_Other = 1;
              var ContactInformation_contact_PhoneNumbers_AltPhone_CanadaUS = 0;
              var ContactInformation_contact_PhoneNumbers_AltPhone_ActualNumber =
                  '+'+values.ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry
                  +values.ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber
                  +'x'+values.ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt }

          // fax number
          if (values.FaxLoc === "CU") {
              var ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_CanadaUS = 1;
              var ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_Other = 0;
              var ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_ActualNumber =
                  values.FANumber + values.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt} 
          else if (values.FaxLoc === "Other") {
              var ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_Other = 1;
              var ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_CanadaUS = 0;
              var ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_ActualNumber =
                  '+'+values.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry
                  +values.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_IntlNumber_IntlNumber
                  +'x'+values.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt}

        
          setFormData({...values, ContactInformation_contact_AddressRow2_Country_Country, ContactInformation_contact_AddressRow2_ProvinceState_ProvinceState,
            ContactInformation_contact_ResidentialAddressRow2_Country_Country, ContactInformation_contact_ResidentialAddressRow2_ProvinceState_ProvinceState,
            ContactInformation_contact_PhoneNumbers_Phone_CanadaUS, ContactInformation_contact_PhoneNumbers_Phone_Other,
            ContactInformation_contact_PhoneNumbers_AltPhone_CanadaUS, ContactInformation_contact_PhoneNumbers_AltPhone_Other,
            ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_CanadaUS, ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_Other,
            ContactInformation_contact_PhoneNumbers_Phone_ActualNumber, ContactInformation_contact_PhoneNumbers_AltPhone_ActualNumber,
            ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_ActualNumber});

          saveData(values, ContactInformation_contact_AddressRow2_Country_Country, ContactInformation_contact_AddressRow2_ProvinceState_ProvinceState,
            ContactInformation_contact_ResidentialAddressRow2_Country_Country, ContactInformation_contact_ResidentialAddressRow2_ProvinceState_ProvinceState,
            ContactInformation_contact_PhoneNumbers_Phone_CanadaUS, ContactInformation_contact_PhoneNumbers_Phone_Other,
            ContactInformation_contact_PhoneNumbers_AltPhone_CanadaUS, ContactInformation_contact_PhoneNumbers_AltPhone_Other,
            ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_CanadaUS, ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_Other,
            ContactInformation_contact_PhoneNumbers_Phone_ActualNumber, ContactInformation_contact_PhoneNumbers_AltPhone_ActualNumber,
            ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_ActualNumber)
              .then(() => {
                if (direction === 'back') { prevStep(); setOpen(true) }
                else if (direction === 'forward') { nextStep(); setOpen(true) }
                else { setOpen(true) }
              })
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched, values }) => (

      <div className="upload-form m-sm-30"  ref={fieldRef}>
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
        <Grid item xs={9} md={11}>
          <Typography variant="h6" gutterBottom>
            Current Mailing Address
          </Typography>
        </Grid>
        <Grid item xs={3} md={1}>
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
        <Grid item xs={12} md={2}>
            <Field
              name='ContactInformation_contact_AddressRow1_POBox_POBox' label='P.O. Box'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_AddressRow1_POBox_POBox && errors.ContactInformation_contact_AddressRow1_POBox_POBox}
              helperText={touched.ContactInformation_contact_AddressRow1_POBox_POBox && errors.ContactInformation_contact_AddressRow1_POBox_POBox}
            />
        </Grid>
        <Grid item xs={12} md={2}>
            <Field
              name='ContactInformation_contact_AddressRow1_Apt_AptUnit' label='Apt/Unit'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_AddressRow1_Apt_AptUnit && errors.ContactInformation_contact_AddressRow1_Apt_AptUnit}
              helperText={touched.ContactInformation_contact_AddressRow1_Apt_AptUnit && errors.ContactInformation_contact_AddressRow1_Apt_AptUnit}
            />
        </Grid>
        <Grid item xs={12} md={2}>
            <Field
              name='ContactInformation_contact_AddressRow1_StreetNum_StreetNum' label='Street Number'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_AddressRow1_StreetNum_StreetNum && errors.ContactInformation_contact_AddressRow1_StreetNum_StreetNum}
              helperText={touched.ContactInformation_contact_AddressRow1_StreetNum_StreetNum && errors.ContactInformation_contact_AddressRow1_StreetNum_StreetNum}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <Field
              name='ContactInformation_contact_AddressRow1_Streetname_Streetname' label='Street Name *'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_AddressRow1_Streetname_Streetname && errors.ContactInformation_contact_AddressRow1_Streetname_Streetname}
              helperText={touched.ContactInformation_contact_AddressRow1_Streetname_Streetname && errors.ContactInformation_contact_AddressRow1_Streetname_Streetname}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <Field
              name='ContactInformation_contact_AddressRow2_CityTow_CityTown' label='City/Town *'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_AddressRow2_CityTow_CityTown && errors.ContactInformation_contact_AddressRow2_CityTow_CityTown}
              helperText={touched.ContactInformation_contact_AddressRow2_CityTow_CityTown && errors.ContactInformation_contact_AddressRow2_CityTow_CityTown}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <Field
              name="cmct"
              component={Autocomplete}
              options={country}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['cmct'] && !!errors['cmct']}
                  helperText={errors['cmct']}
                  label="Country/Territory *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        {values.cmct.label === "Canada" && (
        <Grid item xs={12} md={4}>
            <Field
              name="cmps"
              component={Autocomplete}
              options={provstate}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['cmps'] && !!errors['cmps']}
                  helperText={errors['cmps']}
                  label="Province/State *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
        {values.cmct.label === "United States of America" && (
        <Grid item xs={12} md={4}>
            <Field
              name="cmps"
              component={Autocomplete}
              options={provstate}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['cmps'] && !!errors['cmps']}
                  helperText={errors['cmps']}
                  label="Province/State *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
        <Grid item xs={12} md={4}>
            <Field
              name='ContactInformation_contact_AddressRow2_PostalCode_PostalCode' label='Postal Code'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_AddressRow2_PostalCode_PostalCode && errors.ContactInformation_contact_AddressRow2_PostalCode_PostalCode}
              helperText={touched.ContactInformation_contact_AddressRow2_PostalCode_PostalCode && errors.ContactInformation_contact_AddressRow2_PostalCode_PostalCode}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <Field
              name='ContactInformation_contact_AddressRow2_District' label='District'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_AddressRow2_District && errors.ContactInformation_contact_AddressRow2_District}
              helperText={touched.ContactInformation_contact_AddressRow2_District && errors.ContactInformation_contact_AddressRow2_District}
            />
        </Grid>
      </Grid>
      <br />
      <Grid container={6}>
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Residential Address
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Same as mailing address? *</FormLabel>
            <Field component={RadioGroup} row name="ContactInformation_contact_SameAsMailingIndicator">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="ContactInformation_contact_SameAsMailingIndicator" />
            </div>
        </Grid>
        {values.ContactInformation_contact_SameAsMailingIndicator === "N" && (
        <Grid item xs={12} md={2}>
            <Field
              name='ContactInformation_contact_ResidentialAddressRow1_AptUnit_AptUnit' label='Apt/Unit'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_ResidentialAddressRow1_AptUnit_AptUnit && errors.ContactInformation_contact_ResidentialAddressRow1_AptUnit_AptUnit}
              helperText={touched.ContactInformation_contact_ResidentialAddressRow1_AptUnit_AptUnit && errors.ContactInformation_contact_ResidentialAddressRow1_AptUnit_AptUnit}
            />
        </Grid>
        )}
        {values.ContactInformation_contact_SameAsMailingIndicator === "N" && (
        <Grid item xs={12} md={2}>
            <Field
              name='ContactInformation_contact_ResidentialAddressRow1_StreetNum_StreetNum' label='Street Number'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_ResidentialAddressRow1_StreetNum_StreetNum && errors.ContactInformation_contact_ResidentialAddressRow1_StreetNum_StreetNum}
              helperText={touched.ContactInformation_contact_ResidentialAddressRow1_StreetNum_StreetNum && errors.ContactInformation_contact_ResidentialAddressRow1_StreetNum_StreetNum}
            />
        </Grid>
        )}
        {values.ContactInformation_contact_SameAsMailingIndicator === "N" && (
        <Grid item xs={12} md={6}>
            <Field
              name='ContactInformation_contact_ResidentialAddressRow1_StreetName_Streetname' label='Street Name *'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_ResidentialAddressRow1_StreetName_Streetname && errors.ContactInformation_contact_ResidentialAddressRow1_StreetName_Streetname}
              helperText={touched.ContactInformation_contact_ResidentialAddressRow1_StreetName_Streetname && errors.ContactInformation_contact_ResidentialAddressRow1_StreetName_Streetname}
            />
        </Grid>
        )}
        {values.ContactInformation_contact_SameAsMailingIndicator === "N" && (
        <Grid item xs={12} md={6}>
            <Field
              name='ContactInformation_contact_ResidentialAddressRow1_CityTown_CityTown' label='City/Town *'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_ResidentialAddressRow1_CityTown_CityTown && errors.ContactInformation_contact_ResidentialAddressRow1_CityTown_CityTown}
              helperText={touched.ContactInformation_contact_ResidentialAddressRow1_CityTown_CityTown && errors.ContactInformation_contact_ResidentialAddressRow1_CityTown_CityTown}
            />
        </Grid>
        )}
        {values.ContactInformation_contact_SameAsMailingIndicator === "N" && (
        <Grid item xs={12} md={6}>
            <Field
              name="ract"
              component={Autocomplete}
              options={country}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['ract'] && !!errors['ract']}
                  helperText={errors['ract']}
                  label="Country/Territory *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
        {values.ract.label === "Canada" && (
        <Grid item xs={12} md={4}>
            <Field
              name="raps"
              component={Autocomplete}
              options={provstate}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['raps'] && !!errors['raps']}
                  helperText={errors['raps']}
                  label="Province/State *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
        {values.ract.label === "United States of America" && (
        <Grid item xs={12} md={4}>
            <Field
              name="raps"
              component={Autocomplete}
              options={provstate}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['raps'] && !!errors['raps']}
                  helperText={errors['raps']}
                  label="Province/State *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
        {values.ContactInformation_contact_SameAsMailingIndicator === "N" && (
        <Grid item xs={12} md={4}>
            <Field
              name='ContactInformation_contact_ResidentialAddressRow2_PostalCode_PostalCode' label='Postal Code'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_ResidentialAddressRow2_PostalCode_PostalCode && errors.ContactInformation_contact_ResidentialAddressRow2_PostalCode_PostalCode}
              helperText={touched.ContactInformation_contact_ResidentialAddressRow2_PostalCode_PostalCode && errors.ContactInformation_contact_ResidentialAddressRow2_PostalCode_PostalCode}
            />
        </Grid>
        )}
        {values.ContactInformation_contact_SameAsMailingIndicator === "N" && (
        <Grid item xs={12} md={6}>
            <Field
              name='ContactInformation_contact_ResidentialAddressRow2_District' label='District'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_ResidentialAddressRow2_District && errors.ContactInformation_contact_ResidentialAddressRow2_District}
              helperText={touched.ContactInformation_contact_ResidentialAddressRow2_District && errors.ContactInformation_contact_ResidentialAddressRow2_District}
            />
        </Grid>
        )}
      </Grid>
      <br />
      <Grid container={6}>
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Telephone Number
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Field component={RadioGroup} name="PhoneLoc" row >
              <FormControlLabel
                value="CU" control={<Radio />} label="Can/US" />
              <FormControlLabel
                value="Other" control={<Radio />} label="Other" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="PhoneLoc" />
            </div>
        </Grid>
        <Grid item xs={12} md={3}>
            <FormControl>
              <InputLabel>Type *</InputLabel>
              <Field
                component={Select} style={{ width: 200 }} name="ContactInformation_contact_PhoneNumbers_Phone_Type">
                <MenuItem value={'01'}>Home</MenuItem>
                <MenuItem value={'02'}>Cell</MenuItem>
                <MenuItem value={'03'}>Business</MenuItem>
              </Field>
            </FormControl>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="ContactInformation_contact_PhoneNumbers_Phone_Type" />
            </div>
        </Grid>

        {values.PhoneLoc === "CU" && (
        <Grid item xs={12} md={2}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_Phone_NumberCountry' label='Country Code *'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_Phone_NumberCountry && errors.ContactInformation_contact_PhoneNumbers_Phone_NumberCountry}
              helperText={touched.ContactInformation_contact_PhoneNumbers_Phone_NumberCountry && errors.ContactInformation_contact_PhoneNumbers_Phone_NumberCountry}
            />
        </Grid>
        )}
        {values.PhoneLoc === "Other" && (
        <Grid item xs={12} md={2}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_Phone_NumberCountry' label='Country Code *'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_Phone_NumberCountry && errors.ContactInformation_contact_PhoneNumbers_Phone_NumberCountry}
              helperText={touched.ContactInformation_contact_PhoneNumbers_Phone_NumberCountry && errors.ContactInformation_contact_PhoneNumbers_Phone_NumberCountry}
            />
        </Grid>
        )}
        {values.PhoneLoc === "CU" && (
        <Grid item xs={12} md={5}>
            <Field
              name='ANumber' label='Phone Number *'
              margin='normal' as={TextField} fullWidth
              error={touched.ANumber && errors.ANumber}
              helperText={touched.ANumber && errors.ANumber}
            />
        </Grid>
        )}
        {values.PhoneLoc === "Other" && (
        <Grid item xs={12} md={5}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber' label='Phone Number *'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber && errors.ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber}
              helperText={touched.ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber && errors.ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber}
            />
        </Grid>
        )}
        {values.PhoneLoc === "CU" && (
        <Grid item xs={12} md={2}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_Phone_NumberExt' label='Ext'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_Phone_NumberExt && errors.ContactInformation_contact_PhoneNumbers_Phone_NumberExt}
              helperText={touched.ContactInformation_contact_PhoneNumbers_Phone_NumberExt && errors.ContactInformation_contact_PhoneNumbers_Phone_NumberExt}
            />
        </Grid>
        )}
        {values.PhoneLoc === "Other" && (
        <Grid item xs={12} md={2}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_Phone_NumberExt' label='Ext'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_Phone_NumberExt && errors.ContactInformation_contact_PhoneNumbers_Phone_NumberExt}
              helperText={touched.ContactInformation_contact_PhoneNumbers_Phone_NumberExt && errors.ContactInformation_contact_PhoneNumbers_Phone_NumberExt}
            />
        </Grid>
        )}
      </Grid>
      <br/>
      <Grid item xs={12}>
        <FormLabel FormLabel component="legend">Do you have an alternative number? *</FormLabel>
        <Field component={RadioGroup} row name="altphone">
          <FormControlLabel
            value="Y" control={<Radio />} label="Yes" />
          <FormControlLabel
            value="N" control={<Radio />} label="No" />
        </Field>
        <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
            <ErrorMessage name="altphone" />
        </div>
      </Grid>
      <br />
      {values.altphone === "Y" && (
      <Grid container={6}>
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Alternative Telephone Number
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Field component={RadioGroup} name="PhoneLoc2" row >
              <FormControlLabel
                value="CU" control={<Radio />} label="Can/US" />
              <FormControlLabel
                value="Other" control={<Radio />} label="Other" />
            </Field>
        </Grid>
        <Grid item xs={12} md={3}>
            <FormControl>
              <InputLabel>Type *</InputLabel>
              <Field
                component={Select} style={{ width: 200 }} name="ContactInformation_contact_PhoneNumbers_AltPhone_Type">
                <MenuItem value={'01'}>Home</MenuItem>
                <MenuItem value={'02'}>Cell</MenuItem>
                <MenuItem value={'03'}>Business</MenuItem>
              </Field>
            </FormControl>
        </Grid>
        {values.PhoneLoc2 === "CU" && (
          <Grid item xs={12} md={2}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry' label='Alternative Country Code *'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry && errors.ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry}
              helperText={touched.ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry && errors.ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry}
            />
        </Grid>
        )}
        {values.PhoneLoc2 === "Other" && (
          <Grid item xs={12} md={2}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry' label='Alternative Country Code *'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry && errors.ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry}
              helperText={touched.ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry && errors.ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry}
            />
        </Grid>
        )}
        {values.PhoneLoc2 === "CU" && (
        <Grid item xs={12} md={5}>
            <Field
              name='AANumber' label='Alternative Phone Number *'
              margin='normal' as={TextField} fullWidth
              error={touched.AANumber && errors.AANumber}
              helperText={touched.AANumber && errors.AANumber}
            />
        </Grid>
        )}
        {values.PhoneLoc2 === "Other" && (
        <Grid item xs={12} md={5}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber' label='Alternative Phone Number *'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber && errors.ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber}
              helperText={touched.ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber && errors.ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber}
            />
        </Grid>
        )}
        {values.PhoneLoc2 === "CU" && (
        <Grid item xs={12} md={2}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt' label='Ext'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt && errors.ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt}
              helperText={touched.ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt && errors.ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt}
            />
        </Grid>
        )}
        {values.PhoneLoc2 === "Other" && (
        <Grid item xs={12} md={2}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt' label='Ext'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt && errors.ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt}
              helperText={touched.ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt && errors.ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt}
            />
        </Grid>
        )}
      </Grid>
      )}
      <br/>
      <Grid item xs={12}>
        <FormLabel FormLabel component="legend">Do you have a fax number? *</FormLabel>
        <Field component={RadioGroup} row name="faxnum">
          <FormControlLabel
            value="Y" control={<Radio />} label="Yes" />
          <FormControlLabel
            value="N" control={<Radio />} label="No" />
        </Field>
        <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
            <ErrorMessage name="faxnum" />
        </div>
      </Grid>
      <br />
      {values.faxnum === "Y" && (
      <Grid container={6}>
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Fax
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Field component={RadioGroup} name="FaxLoc" row >
              <FormControlLabel
                value="CU" control={<Radio />} label="Can/US" />
              <FormControlLabel
                value="Other" control={<Radio />} label="Other" />
            </Field>
        </Grid>
        {values.FaxLoc === "CU" && (
        <Grid item xs={12} md={6}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry' label='Country Code *'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry && errors.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry}
              helperText={touched.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry && errors.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry}
            />
        </Grid>
        )}
        {values.FaxLoc === "Other" && (
        <Grid item xs={12} md={6}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry' label='Country Code *'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry && errors.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry}
              helperText={touched.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry && errors.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry}
            />
        </Grid>
        )}
        {values.FaxLoc === "CU" && (
        <Grid item xs={12} md={6}>
            <Field
              name='FANumber' label='Phone Number *'
              margin='normal' as={TextField} fullWidth
              error={touched.FANumber && errors.FANumber}
              helperText={touched.FANumber && errors.FANumber}
            />
        </Grid>
        )}
        {values.FaxLoc === "Other" && (
        <Grid item xs={12} md={6}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_IntlNumber_IntlNumber' label='Phone Number *'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_IntlNumber_IntlNumber && errors.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_IntlNumber_IntlNumber}
              helperText={touched.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_IntlNumber_IntlNumber && errors.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_IntlNumber_IntlNumber}
            />
        </Grid>
        )}
        {values.FaxLoc === "CU" && (
        <Grid item xs={12} md={6}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt' label='Ext'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt && errors.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt}
              helperText={touched.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt && errors.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt}
            />
        </Grid>
        )}
        {values.FaxLoc === "Other" && (
        <Grid item xs={12} md={6}>
            <Field
              name='ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt' label='Ext'
              margin='normal' as={TextField} fullWidth
              error={touched.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt && errors.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt}
              helperText={touched.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt && errors.ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt}
            />
        </Grid>
        )}
      </Grid>
      )}
      <br />
      <Grid container={6}>
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Email
            </Typography>
        </Grid>
          <Grid item xs={12} md={6}>
              <Field
                name='ContactInformation_contact_PhoneNumbers_FaxEmail_Email' label='Email *'
                margin='normal' as={TextField} fullWidth
                error={touched.ContactInformation_contact_PhoneNumbers_FaxEmail_Email && errors.ContactInformation_contact_PhoneNumbers_FaxEmail_Email}
                helperText={touched.ContactInformation_contact_PhoneNumbers_FaxEmail_Email && errors.ContactInformation_contact_PhoneNumbers_FaxEmail_Email}
              />
          </Grid>
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
                variant="progress" steps={10} position="static" activeStep={step-1} className={classes.root}
                nextButton={
                  <Button type='submit' size="small" onClick={() => setDirection('forward')} disabled={step === 11}>
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

Liu.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};