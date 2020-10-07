import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { RadioGroup, CheckboxWithLabel } from 'formik-material-ui'
import {
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  TextField,
  Typography,
  Snackbar,
  MobileStepper
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { SimpleCard, Breadcrumb } from 'matx';
import { Prompt } from 'react-router';
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
  bgc: yup.array()
    .required('Required'),
  abc: yup.array()
    .required('Required'),
  BackgroundInfo_Details_MedicalDetails: yup.string()
    .when("BackgroundInfo_Choice", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  BackgroundInfo2_VisaChoice1: yup.string()
    .required('Required'),
  BackgroundInfo2_VisaChoice2: yup.string()
    .required('Required'),
  BackgroundInfo2_Details_VisaChoice3: yup.string()
    .required('Required'),
    //make either visas1-3
  BackgroundInfo2_Details_refusedDetails: yup.string()
    .when("BackgroundInfo2_VisaChoice1", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  BackgroundInfo3_Choice: yup.string()
    .required('Required'),
  BackgroundInfo3_details: yup.string()
    .when("BackgroundInfo3_Choice", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  Military_Choice: yup.string()
    .required('Required'),
  Military_militaryServiceDetails: yup.string()
    .when("Military_Choice", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  Occupation_Choice: yup.string()
    .required('Required'),
  GovPosition_Choice: yup.string()
    .required('Required'),
});

export const Shi = ({ formData, setFormData, nextStep, prevStep, currentApp, saveData, step }) => {
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
          setFormData({...values, BackgroundInfo_Choice: values.bgc.concat(values.abc)});

          let BackgroundInfo_Choice = {BackgroundInfo_Choice: values.bgc.concat(values.abc)}
          saveData(values, BackgroundInfo_Choice)
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
            Background Information
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
        <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Medical Details
            </Typography>
        </Grid>
        <Grid item xs={12}>
        <FormGroup>
        <FormLabel FormLabel component="legend">Have you or any family members had, or been in contact with anyone, with tuberculosis within the past 2 years? *</FormLabel>
            {canus.map(opt => (
              <Field
                component={CheckboxWithLabel}
                type="checkbox" //REQUIRED to work with non-boolean options
                name="bgc"
                value={opt.value}
                key={opt.value}
                Label={{ label: opt.label }}
              />
            ))}
              <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="bgc" />
              </div>
            <FormLabel FormLabel component="legend">Do you have any mental/physical disorders that would require social/health services, other than medication, during your stay in Canada? *</FormLabel>
            {canus.map(opt => (
              <Field
                component={CheckboxWithLabel}
                type="checkbox" //REQUIRED to work with non-boolean options
                name="abc"
                value={opt.value}
                key={opt.value}
                Label={{ label: opt.label }}
              />
            ))}
              <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="abc" />
              </div>
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Please provide details.</FormLabel>
            <Field
              name='BackgroundInfo_Details_MedicalDetails'
              margin='normal' as={TextField} fullWidth
              error={touched.BackgroundInfo_Details_MedicalDetails && errors.BackgroundInfo_Details_MedicalDetails}
              helperText={touched.BackgroundInfo_Details_MedicalDetails && errors.BackgroundInfo_Details_MedicalDetails}
            />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">Previous Applications</Typography>
        </Grid>
        <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Have you ever remained beyond the validity of your status, attented school or worked without authorization in Canada? *</FormLabel>
            <Field component={RadioGroup} row name="BackgroundInfo2_VisaChoice1">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="BackgroundInfo2_VisaChoice1" />
            </div>
        </Grid>
        <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Have you ever been refused a visa/permit, denied entry or been ordered to leave a country? *</FormLabel>
            <Field component={RadioGroup} row name="BackgroundInfo2_VisaChoice2">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="BackgroundInfo2_VisaChoice2" />
            </div>
        </Grid>
        <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Have you previously applied to live or remain in Canada? *</FormLabel>
            <Field component={RadioGroup} row name="BackgroundInfo2_Details_VisaChoice3">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="BackgroundInfo2_Details_VisaChoice3" />
            </div>
        </Grid>
        {values.BackgroundInfo2_VisaChoice1 === "Y"  && (
        <Grid item xs={12} md={6}>
          <FormLabel component="legend">Please provide details.</FormLabel>
            <Field
              name='BackgroundInfo2_Details_refusedDetails'
              margin='normal' as={TextField} fullWidth
              error={touched.BackgroundInfo2_Details_refusedDetails && errors.BackgroundInfo2_Details_refusedDetails}
              helperText={touched.BackgroundInfo2_Details_refusedDetails && errors.BackgroundInfo2_Details_refusedDetails}
            />
          </Grid>
        )}
        {values.BackgroundInfo2_VisaChoice2 === "Y"  && (
        <Grid item xs={12} md={6}>
          <FormLabel component="legend">Please provide details.</FormLabel>
            <Field
              name='BackgroundInfo2_Details_refusedDetails'
              margin='normal' as={TextField} fullWidth
              error={touched.BackgroundInfo2_Details_refusedDetails && errors.BackgroundInfo2_Details_refusedDetails}
              helperText={touched.BackgroundInfo2_Details_refusedDetails && errors.BackgroundInfo2_Details_refusedDetails}
            />
          </Grid>
        )}
        {values.BackgroundInfo3_VisaChoice3 === "Y"  && (
        <Grid item xs={12} md={6}>
          <FormLabel component="legend">Please provide details.</FormLabel>
            <Field
              name='BackgroundInfo2_Details_refusedDetails'
              margin='normal' as={TextField} fullWidth
              error={touched.BackgroundInfo2_Details_refusedDetails && errors.BackgroundInfo2_Details_refusedDetails}
              helperText={touched.BackgroundInfo2_Details_refusedDetails && errors.BackgroundInfo2_Details_refusedDetails}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="subtitle1">Criminal Record</Typography>
        </Grid>
        <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Have you ever committed, been arrested/charged for or convicted of any criminal offence? *</FormLabel>
            <Field component={RadioGroup} row name="BackgroundInfo3_Choice">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="BackgroundInfo3_Choice" />
            </div>
        </Grid>
        {values.BackgroundInfo3_Choice === "Y" && (
        <Grid item xs={12}>
          <FormLabel component="legend">Please provide details.</FormLabel>
            <Field
              name='BackgroundInfo3_details'
              margin='normal' as={TextField} fullWidth
              error={touched.BackgroundInfo3_details && errors.BackgroundInfo3_details}
              helperText={touched.BackgroundInfo3_details && errors.BackgroundInfo3_details}
            />
        </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="subtitle1">Military</Typography>
        </Grid>
        <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Did you serve in any military/militia/civil defence unit or serve in a security organization/police force? *</FormLabel>
            <Field component={RadioGroup} row name="Military_Choice">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="Military_Choice" />
            </div>
        </Grid>
        {values.Military_Choice === "Y" && (
        <Grid item xs={12}>
          <FormLabel component="legend">Please provide the dates of service and countries/territories where you served.</FormLabel>
            <Field
              name='Military_militaryServiceDetails'
              margin='normal' as={TextField} fullWidth
              error={touched.BackgroundInfo_Details_MedicalDetails && errors.BackgroundInfo_Details_MedicalDetails}
              helperText={touched.BackgroundInfo_Details_MedicalDetails && errors.BackgroundInfo_Details_MedicalDetails}
            />
        </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="subtitle1">Other</Typography>
        </Grid>
        <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Are/have you been associated with any political party/group/organization that engaged in/advocated violence as a means to achieve a political/religious objective,
                or has been associated with criminal activity at any time? *</FormLabel>
            <Field component={RadioGroup} row name="Occupation_Choice">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="Occupation_Choice" />
            </div>
        </Grid>
        <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Have you ever witnessed/participated in the ill treatment of prisoners/civilians, looting/desecration of religious buildings? *</FormLabel>
            <Field component={RadioGroup} row name="GovPosition_Choice">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="GovPosition_Choice" />
            </div>
        </Grid>
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

const canus =[
  { label: "Yes", value: "Y" },
  { label: "No", value: "N"}
]