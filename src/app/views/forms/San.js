import React, { useState } from 'react';
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
  InputLabel,
  Radio,
  TextField,
  Typography,
  MenuItem,
  FormControl
} from "@material-ui/core";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { SimpleCard } from 'matx';
  
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const validationSchema = yup.object({
  MaritalStatus_SectionA_MaritalStatus: yup.string()
    .required('Required'),
  MaritalStatus_SectionA_PrevSpouse_DOBYear: yup.number()
    .min(1900, 'After 1900').max(2020, 'Before 2020'),
  MaritalStatus_SectionA_PrevMarriedIndicator: yup.string()
    .required('Required'),
});

export const San = ({ formData, setFormData, nextStep, prevStep }) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');

  return (
    <>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          direction === 'back' ? prevStep() : nextStep();
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
      <div className="upload-form m-sm-30">
      <SimpleCard>
      <Form>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Typography variant="h6" gutterBottom>
              Marital Status
        </Typography>
        <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
            <FormControl>
              <InputLabel>Current Status *</InputLabel>
              <Field
                component={Select} style={{ width: 300 }} name="MaritalStatus_SectionA_MaritalStatus"
                error={touched.MaritalStatus_SectionA_MaritalStatus && errors.MaritalStatus_SectionA_MaritalStatus}>
                <MenuItem value={'01'}>Married</MenuItem>
                <MenuItem value={'02'}>Single</MenuItem>
                <MenuItem value={'03'}>Common-Law</MenuItem>
                <MenuItem value={'04'}>Divorced</MenuItem>
                <MenuItem value={'05'}>Legally Separated</MenuItem>
                <MenuItem value={'06'}>Widowed</MenuItem>
                <MenuItem value={'09'}>Annulled Marriage</MenuItem>
                <MenuItem value={'00'}>Unknown</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="Date of Marriage" name="MaritalStatus_SectionA_DateofMarriage" />
          </Grid>
          <Grid item xs={12}><FormLabel component="legend">Name of your current Spouse/Common-law partner</FormLabel></Grid>
          <Grid item xs={12} md={6}>
            <Field
              name='MaritalStatus_SectionA_FamilyName' label='Spouse Last Name'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_FamilyName && errors.MaritalStatus_SectionA_FamilyName}
              helperText={touched.MaritalStatus_SectionA_FamilyName && errors.MaritalStatus_SectionA_FamilyName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              name='MaritalStatus_SectionA_GivenName' label='Spouse First Name'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_GivenName && errors.MaritalStatus_SectionA_GivenName}
              helperText={touched.MaritalStatus_SectionA_GivenName && errors.MaritalStatus_SectionA_GivenName}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Have you previously been married or in a common-law relationship? *</FormLabel>
            <Field component={RadioGroup} row name="MaritalStatus_SectionA_PrevMarriedIndicator">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="MaritalStatus_SectionA_PrevMarriedIndicator" />
            </div>
          </Grid>

          <Grid item xs={12}>
            <FormLabel component="legend">Name of your Previous Spouse/Common-Law partner</FormLabel>
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              name='MaritalStatus_SectionA_PMFamilyName' label='Previous Spouse Last Name'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_PMFamilyName && errors.MaritalStatus_SectionA_PMFamilyName}
              helperText={touched.MaritalStatus_SectionA_PMFamilyName && errors.MaritalStatus_SectionA_PMFamilyName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              name='MaritalStatus_SectionA_PMGivenName_GivenName' label='Previous Spouse First Name'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_PMGivenName_GivenName && errors.MaritalStatus_SectionA_PMGivenName_GivenName}
              helperText={touched.MaritalStatus_SectionA_PMGivenName_GivenName && errors.MaritalStatus_SectionA_PMGivenName_GivenName}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Field
              name='MaritalStatus_SectionA_PrevSpouse_DOBYear' label='YYYY'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_PrevSpouse_DOBYear && errors.MaritalStatus_SectionA_PrevSpouse_DOBYear}
              helperText={touched.MaritalStatus_SectionA_PrevSpouse_DOBYear && errors.MaritalStatus_SectionA_PrevSpouse_DOBYear}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Field
              name='MaritalStatus_SectionA_PrevSpouse_DOBMonth' label='MM'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_PrevSpouse_DOBMonth && errors.MaritalStatus_SectionA_PrevSpouse_DOBMonth}
              helperText={touched.MaritalStatus_SectionA_PrevSpouse_DOBMonth && errors.MaritalStatus_SectionA_PrevSpouse_DOBMonth}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Field
              name='MaritalStatus_SectionA_PrevSpouse_DOBDay' label='DD'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_PrevSpouse_DOBDay && errors.MaritalStatus_SectionA_PrevSpouse_DOBDay}
              helperText={touched.MaritalStatus_SectionA_PrevSpouse_DOBDay && errors.MaritalStatus_SectionA_PrevSpouse_DOBDay}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl>
              <InputLabel>Type of Relationship</InputLabel>
              <Field
                component={Select} style={{ width: 300 }} name="MaritalStatus_SectionA_TypeOfRelationship">
                <MenuItem value={'03'}>Common-Law</MenuItem>
                <MenuItem value={'01'}>Married</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="From" name="MaritalStatus_SectionA_FromDate" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="To" name="MaritalStatus_SectionA_ToDate_ToDate" />
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
    </>
  );
};

San.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};
