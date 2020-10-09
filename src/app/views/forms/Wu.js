import React, { useState } from 'react';
import { Prompt } from 'react-router'
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { RadioGroup } from 'formik-material-ui'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
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
      DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit: yup.string()
      .required('Purpose of visit required'),
    DetailsOfVisit_PurposeRow1_Other: yup.string()
      .when("DetailsOfVisit_PurposeRow1_PurposeOfVisit", {
        is: "03", then: yup.string().required( "Required" ),
        otherwise: yup.string() }),
    DetailsOfVisit_PurposeRow1_HowLongStay_FromDate: yup.date()
      .required('From date required'),
    DetailsOfVisit_PurposeRow1_HowLongStay_ToDate: yup.date()
    .when(
      'DetailsOfVisit_PurposeRow1_HowLongStay_FromDate',
      (DetailsOfVisit_PurposeRow1_HowLongStay_FromDate, yup) => DetailsOfVisit_PurposeRow1_HowLongStay_FromDate && yup.min(DetailsOfVisit_PurposeRow1_HowLongStay_FromDate, "End date cannot be before start date"))
      .required('To date required'),
    DetailsOfVisit_PurposeRow1_Funds_Funds: yup.number()
      .typeError('Minimum of $10,000CAD')
      .min(10000)
      .required('Funds available for your trip required'),
    DetailsOfVisit_Contacts_Row1_Name_Name: yup.string()
      .required('Name required'),
    DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada: yup.string()
      .required('Address in Canada required'),
});

export const Wu = ({ formData, setFormData, nextStep, prevStep, saveData, traveldoc, step, getSteps, setStep,
  open, setOpen }) => {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('back');
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

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
    var elmnt = document.getElementsByClassName("scrollable-content");
    elmnt[0].scrollTo(0,0);
  }, []);
  return (
    <>
      <Formik
        initialValues={formData}
        enableReinitialize={true}
        onSubmit={values => {
          var MaritalStatus_SectionA_Passport_CountryofIssue_CountryofIssue = values.pcoi.value
          var natID_natIDdocs_CountryofIssue_CountryofIssue = values.nidcoi.value
          setFormData({...values, MaritalStatus_SectionA_Passport_CountryofIssue_CountryofIssue, natID_natIDdocs_CountryofIssue_CountryofIssue});

          saveData(values, MaritalStatus_SectionA_Passport_CountryofIssue_CountryofIssue, natID_natIDdocs_CountryofIssue_CountryofIssue)
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
        <Grid item xs={9} md={11}>
          <Typography variant="h6" gutterBottom>
            Passport
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
              options={traveldoc}
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
              options={traveldoc}
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

        {/* PURPOSE OF VISIT  */}
        <Grid item xs={9} md={12}>
          <Typography variant="h6" gutterBottom>
            <br/>
            Details of Visit
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
            <FormControl>
              <InputLabel>Purpose of Visit *</InputLabel> 
              <Field
                component={Select} style={{ width: 300 }} name="DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit"
                error={touched.DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit && errors.DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit}>
                <MenuItem value={'01'}>Business</MenuItem> 
                <MenuItem value={'02'}>Tourism</MenuItem>
                <MenuItem value={'04'}>Short-Term Studies</MenuItem>
                <MenuItem value={'05'}>Returning Student</MenuItem>
                <MenuItem value={'06'}>Returning Worker</MenuItem>
                <MenuItem value={'07'}>Super Visa</MenuItem>
                <MenuItem value={'03'}>Other</MenuItem>
                <MenuItem value={'08'}>Visit</MenuItem>
                <MenuItem value={'13'}>Family Visit</MenuItem>
              </Field>
            </FormControl>
        </Grid>
        {values.DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit === "03" && (
        <Grid item xs={12} md={6}>
            <Field
              name='DetailsOfVisit_PurposeRow1_Other' label='Other *'
              margin='normal' as={TextField} fullWidth
              error={touched.DetailsOfVisit_PurposeRow1_Other && errors.DetailsOfVisit_PurposeRow1_Other}
              helperText={touched.DetailsOfVisit_PurposeRow1_Other && errors.DetailsOfVisit_PurposeRow1_Other}
            />
        </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="h6">Trip Dates</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="From *" name="DetailsOfVisit_PurposeRow1_HowLongStay_FromDate"
            error={touched.DetailsOfVisit_PurposeRow1_HowLongStay_FromDate && errors.DetailsOfVisit_PurposeRow1_HowLongStay_FromDate} />
        </Grid>
        <Grid item xs={12} md={3}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="To *" name="DetailsOfVisit_PurposeRow1_HowLongStay_ToDate"
            error={touched.DetailsOfVisit_PurposeRow1_HowLongStay_ToDate && errors.DetailsOfVisit_PurposeRow1_HowLongStay_ToDate} />
        </Grid>
        <Grid item xs={12} md={6}>
            <Field
              name='DetailsOfVisit_PurposeRow1_Funds_Funds' label='Funds available for your trip *'
              margin='normal' as={TextField} fullWidth 
              error={touched.DetailsOfVisit_PurposeRow1_Funds_Funds && errors.DetailsOfVisit_PurposeRow1_Funds_Funds}
              helperText={touched.DetailsOfVisit_PurposeRow1_Funds_Funds && errors.DetailsOfVisit_PurposeRow1_Funds_Funds}
            />
        </Grid>
        </Grid>
      <br />
      <Grid container={6}>
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              People / Institutions Visited
            </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
            <Field
              name='DetailsOfVisit_Contacts_Row1_Name_Name' label='Name *'
              margin='normal' as={TextField} fullWidth
              error={touched.DetailsOfVisit_Contacts_Row1_Name_Name && errors.DetailsOfVisit_Contacts_Row1_Name_Name}
              helperText={touched.DetailsOfVisit_Contacts_Row1_Name_Name && errors.DetailsOfVisit_Contacts_Row1_Name_Name}
            />
        </Grid>
        <Grid item xs={12} md={3}>
            <Field
              name='DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe' label='Relationship to Me'
              margin='normal' as={TextField} fullWidth
              error={touched.DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe && errors.DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe}
              helperText={touched.DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe && errors.DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <Field
              name='DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada' label='Address in Canada *'
              margin='normal' as={TextField} fullWidth
              error={touched.DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada && errors.DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada}
              helperText={touched.DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada && errors.DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada}
            />
        </Grid>
        <Grid item xs={12} md={3}>
            <Field
              name='Contacts_Row2_Name_Name' label='Name'
              margin='normal' as={TextField} fullWidth
              error={touched.Contacts_Row2_Name_Name && errors.Contacts_Row2_Name_Name}
              helperText={touched.Contacts_Row2_Name_Name && errors.Contacts_Row2_Name_Name}
            />
        </Grid>
        <Grid item xs={12} md={3}>
            <Field
              name='Contacts_Row2_Relationship_RelationshipToMe' label='Relationship to Me'
              margin='normal' as={TextField} fullWidth
              error={touched.Contacts_Row2_Relationship_RelationshipToMe && errors.Contacts_Row2_Relationship_RelationshipToMe}
              helperText={touched.Contacts_Row2_Relationship_RelationshipToMe && errors.Contacts_Row2_Relationship_RelationshipToMe}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <Field
              name='Contacts_Row2_AddressInCanada_AddressInCanada' label='Address in Canada'
              margin='normal' as={TextField} fullWidth
              error={touched.Contacts_Row2_AddressInCanada_AddressInCanada && errors.Contacts_Row2_AddressInCanada_AddressInCanada}
              helperText={touched.Contacts_Row2_AddressInCanada_AddressInCanada && errors.Contacts_Row2_AddressInCanada_AddressInCanada}
            />
        </Grid>
            {isMobile() === false ? (
            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='primary' 
                className={classes.button} onClick={() => setDirection('forward')}>
                Continue
              </Button>
            </Grid>
            ) : (
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

Wu.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
