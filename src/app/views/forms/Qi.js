import React, { useState } from 'react';
import { Prompt } from 'react-router'
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Select } from 'formik-material-ui' // Check Purpose of Visit values!
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  Snackbar,
  MobileStepper
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
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

export const Qi = ({ formData, setFormData, nextStep, prevStep, saveData, step }) => {
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
          setFormData({...values});
          saveData(values)
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
            Details of Visit
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

Qi.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
