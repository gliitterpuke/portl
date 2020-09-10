import React, { useState } from 'react';
import { Prompt } from 'react-router'
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
  MaritalStatus_SectionA_PassportNum_PassportNum: yup.string()
    .required('Passport number required'),
  pcoi: yup.string()
    .required('Country/territory of issue required'),
  MaritalStatus_SectionA_Passport_IssueDate_IssueDate: yup.date()
    .required('Issue Date Required'),
  MaritalStatus_SectionA_Passport_ExpiryDate: yup.date()
    .when(
      'MaritalStatus_SectionA_Passport_IssueDate_IssueDate',
      (MaritalStatus_SectionA_Passport_IssueDate_IssueDate, yup) => MaritalStatus_SectionA_Passport_IssueDate_IssueDate && yup.min(MaritalStatus_SectionA_Passport_IssueDate_IssueDate, "End date cannot be before start date"))
    .required('Issue Date Required'),
  MaritalStatus_SectionA_Passport_TaiwanPIN: yup.string()
    .required('Required'),
  MaritalStatus_SectionA_Passport_IsraelPassportIndicator: yup.string()
    .required('Required'),
  natID_q1_natIDIndicator: yup.string()
    .required('Required'),
  natID_natIDdocs_DocNum_DocNum: yup.string()
    .when("natID_q1_natIDIndicator", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  nidcoi: yup.string()
    .when("natID_q1_natIDIndicator", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  natID_natIDdocs_IssueDate_IssueDate: yup.date()
    .when("natID_q1_natIDIndicator", {
      is: "Y", then: yup.date().required( "Required" ),
      otherwise: yup.date() }),
  natID_natIDdocs_ExpiryDate: yup.date()
    .when("natID_q1_natIDIndicator", {
      is: "Y", then: yup.date().required( "Required" ),
      otherwise: yup.date() }),
  USCard_q1_usCardIndicator: yup.string()
    .required('Required'),
  USCard_usCarddocs_DocNum_DocNum: yup.string()
    .when("USCard_q1_usCardIndicator", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  USCard_usCardDocs_ExpiryDate: yup.date()
    .when("USCard_q1_usCardIndicator", {
      is: "Y", then: yup.date().required( "Required" ),
      otherwise: yup.date() }),
});

export const Wu = ({ formData, setFormData, nextStep, prevStep }) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');

  return (
    <>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          var MaritalStatus_SectionA_Passport_CountryofIssue_CountryofIssue = values.pcoi.value
          var natID_natIDdocs_CountryofIssue_CountryofIssue = values.nidcoi.value
          setFormData({...values, MaritalStatus_SectionA_Passport_CountryofIssue_CountryofIssue, natID_natIDdocs_CountryofIssue_CountryofIssue});
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
              Passport
        </Typography>
        <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
            <Field
              name='MaritalStatus_SectionA_PassportNum_PassportNum' label='Passport Number *'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_PassportNum_PassportNum && errors.MaritalStatus_SectionA_PassportNum_PassportNum}
              helperText={touched.MaritalStatus_SectionA_PassportNum_PassportNum && errors.MaritalStatus_SectionA_PassportNum_PassportNum}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <Field
              name="pcoi"
              component={Autocomplete}
              options={ct}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['pcoi'] && !!errors['pcoi']}
                  helperText={errors['pcoi']}
                  label="Country/Territory of Issue *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} helperText="Issue Date *" name="MaritalStatus_SectionA_Passport_IssueDate_IssueDate"
            error={touched.MaritalStatus_SectionA_Passport_IssueDate_IssueDate && errors.MaritalStatus_SectionA_Passport_IssueDate_IssueDate} />
        </Grid>
        <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} helperText={"Expiry Date *"} name="MaritalStatus_SectionA_Passport_ExpiryDate"
            error={touched.MaritalStatus_SectionA_Passport_ExpiryDate && errors.MaritalStatus_SectionA_Passport_ExpiryDate} />
        </Grid>
        <Grid item xs={12}>
            <FormLabel FormLabel component="legend">For this trip, will you use a passport issued by the Ministry of Foreign Affairs in Taiwan that includes your personal identification number? *</FormLabel>
            <Field component={RadioGroup} row name="MaritalStatus_SectionA_Passport_TaiwanPIN">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="MaritalStatus_SectionA_Passport_TaiwanPIN" />
            </div>
        </Grid>
        <Grid item xs={12}>
            <FormLabel FormLabel component="legend">For this trip, will you use a National Israeli passport? *</FormLabel>
            <Field component={RadioGroup} row name="MaritalStatus_SectionA_Passport_IsraelPassportIndicator">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="MaritalStatus_SectionA_Passport_IsraelPassportIndicator" />
            </div>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              National Identity Document
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Do you have a National Identity Document? *</FormLabel>
            <Field component={RadioGroup} row name="natID_q1_natIDIndicator">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="natID_q1_natIDIndicator" />
            </div>
        </Grid>
        
        {values.natID_q1_natIDIndicator === "Y" && (
        <Grid item xs={12} md={6}>
            <Field
              name='natID_natIDdocs_DocNum_DocNum' label='Document Number *'
              margin='normal' as={TextField} fullWidth
              error={touched.natID_natIDdocs_DocNum_DocNum && errors.natID_natIDdocs_DocNum_DocNum}
              helperText={touched.natID_natIDdocs_DocNum_DocNum && errors.natID_natIDdocs_DocNum_DocNum}
            />
        </Grid>
        )}
        {values.natID_q1_natIDIndicator === "Y" && (
        <Grid item xs={12} md={6}>
            <Field
              name="nidcoi"
              component={Autocomplete}
              options={ct}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['nidcoi'] && !!errors['nidcoi']}
                  helperText={errors['nidcoi']}
                  label="Country/Territory of Issue *"
                  variant="outlined"
                />
              )}
            />
        </Grid>
        )}
        {values.natID_q1_natIDIndicator === "Y" && (
        <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="Issue Date *" name="natID_natIDdocs_IssueDate_IssueDate"
              error={touched.natID_natIDdocs_IssueDate_IssueDate && errors.natID_natIDdocs_IssueDate_IssueDate}
              helperText={touched.natID_natIDdocs_IssueDate_IssueDate && errors.natID_natIDdocs_IssueDate_IssueDate} />
        </Grid>
        )}
        {values.natID_q1_natIDIndicator === "Y" && (
        <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="Expiry Date *" name="natID_natIDdocs_IssueDate_ExpiryDate"
              error={touched.natID_natIDdocs_IssueDate_ExpiryDate && errors.natID_natIDdocs_IssueDate_ExpiryDate}
              helperText={touched.natID_natIDdocs_IssueDate_ExpiryDate && errors.natID_natIDdocs_IssueDate_ExpiryDate} />
        </Grid>
        )}

        
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              US Identification
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Are you a lawful Permanent Resident of the United States with a valid alien registration card (green card)? *</FormLabel>
            <Field component={RadioGroup} row name="USCard_q1_usCardIndicator">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="USCard_q1_usCardIndicator" />
            </div>
        </Grid>
        {values.USCard_q1_usCardIndicator === "Y" && (
        <Grid item xs={12} md={6}>
            <Field
              name='USCard_usCarddocs_DocNum_DocNum' label='PR Card Number *'
              margin='normal' as={TextField} fullWidth
              error={touched.USCard_usCarddocs_DocNum_DocNum && errors.USCard_usCarddocs_DocNum_DocNum}
              helperText={touched.USCard_usCarddocs_DocNum_DocNum && errors.USCard_usCarddocs_DocNum_DocNum}
            />
        </Grid>
        )}
        {values.USCard_q1_usCardIndicator === "Y" && (
        <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="Expiry Date *" name="USCard_usCardDocs_ExpiryDate" 
              error={touched.USCard_usCardDocs_ExpiryDate && errors.USCard_usCardDocs_ExpiryDate}
              helperText={touched.USCard_usCardDocs_ExpiryDate && errors.USCard_usCardDocs_ExpiryDate} />
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

Wu.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};

const ct = [
  { label: 'AFG (Afghanistan)', value: '252' },
  { label: 'AGO (Angola)', value: '151' },
  { label: 'AND (Andorra)', value: '082' },
  { label: 'ANG (Anguilla)', value: '620' },
  { label: 'ARG (Argentina)', value: '703' },
  { label: 'ARM (Armenia)', value: '049' },
  { label: 'ATG (Antigua And Barbuda)', value: '621' },
  { label: 'AUS (Australia)', value: '305' },
  { label: 'AUT (Austria)', value: '011' },
  { label: 'AZE (Azerbaijan)', value: '120' },
  { label: 'BDI (Burundi)', value: '154' },
  { label: 'BEL (Belgium)', value: '131' },
  { label: 'BEN (Benin)', value: '160' },
  { label: 'BFA (Burkina Faso)', value: '188' },
  { label: 'BGD (Bangladesh)', value: '212' },
  { label: 'BGR (Bulgaria)', value: '083' },
  { label: 'BHR (Bahrain)', value: '253' },
  { label: 'BHS (Bahamas)', value: '622' },
  { label: 'BIH (Bosnia and Herzegovina)', value: '048' },
  { label: 'ARE (United Arab Emirates)', value: '280' },
  { label: 'BLR (Belarus)', value: '051' },
  { label: 'BLZ (Belize)', value: '541' },
  { label: 'BMU (Bermuda)', value: '601' },
  { label: 'BOL (Bolivia)', value: '751' },
  { label: 'BRA (Brazil)', value: '709' },
  { label: 'BRB (Barbados)', value: '610' },
  { label: 'BRN (Brunei Darussalam)', value: '255' },
  { label: 'BTN (Bhutan)', value: '254' },
  { label: 'BWA (Botswana)', value: '153' },
  { label: 'CAF (Central African Republic)', value: '157' },
  { label: 'CAN (Canada)', value: '511' },
  { label: 'CHE (Switzerland)', value: '041' },
  { label: 'CHL (Chile)', value: '721' },
  { label: 'CHN (China (Hong Kong SAR))', value: '200' },
  { label: 'CHN (Macao)', value: '198' },
  { label: 'CHN (China)', value: '202' },
  { label: 'CIV (Ivory Coast)', value: '169' },
  { label: 'CMR (Cameroon)', value: '155' },
  { label: 'COD (Democratic Rep. of Congo)', value: '158' },
  { label: 'COG (Republic of Congo)', value: '159' },
  { label: 'COL (Colombia)', value: '722' },
  { label: 'COM (Comoros)', value: '905' },
  { label: 'DJI (Djibouti)', value: '183' },
  { label: 'ERI (Eritrea)', value: '162' },
  { label: 'GAB (Gabon)', value: '163' },
  { label: 'GBD (UK - Brit. overseas terr.)', value: '005' },
  { label: 'GBN (UK - Brit. Ntl. Overseas)', value: '010' },
  { label: 'GBO (UK - Brit. overseas citizen)', value: '004' },
  { label: 'GBP (UK - Brit. protected person)', value: '917' },
  { label: 'GBR (UK - British citizen)', value: '003' },
  { label: 'GBS (UK - British subject)', value: '001' },
  { label: 'GHA (Ghana)', value: '165' },
  { label: 'HND (Honduras)', value: '545' },
  { label: 'IND (India)', value: '205' },
  { label: 'JPN (Japan)', value: '207' },
  { label: 'KOR (Korea, South)', value: '258' },
  { label: 'TWN (Taiwan)', value: '203' },
];