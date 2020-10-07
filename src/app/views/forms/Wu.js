import React, { useState } from 'react';
import { Prompt } from 'react-router'
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { RadioGroup } from 'formik-material-ui'
import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  TextField,
  Typography,
  Snackbar,
  MobileStepper
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
});

export const Wu = ({ formData, setFormData, nextStep, prevStep, saveData, traveldoc, step }) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');
  
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);
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
          var MaritalStatus_SectionA_Passport_CountryofIssue_CountryofIssue = values.pcoi.value
          var natID_natIDdocs_CountryofIssue_CountryofIssue = values.nidcoi.value
          setFormData({...values, MaritalStatus_SectionA_Passport_CountryofIssue_CountryofIssue, natID_natIDdocs_CountryofIssue_CountryofIssue});

          saveData(values, MaritalStatus_SectionA_Passport_CountryofIssue_CountryofIssue, natID_natIDdocs_CountryofIssue_CountryofIssue)
            .then(() => {
              if (direction === 'back') { prevStep() }
              else if (direction === 'forward') { nextStep() }
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
      <Form>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2}>
        <Grid item xs={9} md={6}>
          <Typography variant="h6" gutterBottom>
            Passport
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
        <Grid item xs={12}>
          {isMobile() === true && (
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
            }
          />
          )}
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
