import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
  FormControl,
} from "@material-ui/core";
import * as yup from 'yup';
import {
    Autocomplete,
    AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import { SimpleCard, Breadcrumb } from "matx";
import { Prompt } from 'react-router'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const validationSchema = yup.object({
  PersonalDetails_ServiceIn_ServiceIn: yup.string()	
    .required('Required'),	
  PersonalDetails_VisaType_VisaType: yup.string()	
    .required('Required'),	
  PersonalDetails_Name_GivenName: yup.string()	
    .required('First Name is required')	
    .max(20),	
  PersonalDetails_Name_FamilyName: yup.string()	
    .required('Last Name is required')	
    .max(20),	
  PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator: yup.string()	
    .required('Required'),
  PersonalDetails_AliasName_AliasFamilyName: yup.string()
    .when("PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator", {
      is: "Y",
      then: yup.string().required(
        "Required"
      ),
      otherwise: yup.string()
    }),
  PersonalDetails_AliasName_AliasGivenName: yup.string()
    .when("PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator", {
      is: "Y",
      then: yup.string().required(
        "Required"
      ),
      otherwise: yup.string()
    }),
  PersonalDetails_Sex_Sex: yup.string()	
    .required('Gender required'),	
  PersonalDetails_DOBYear: yup.number()	
    .typeError('Must be between 1900-2020')	
    .min(1900).max(2020)	
    .required('Year required'),	
  PersonalDetails_DOBMonth: yup.number()	
    .typeError('Must be a numeric month')	
    .min(1).max(12)	
    .required('Month required'),	
  PersonalDetails_DOBDay: yup.number()	
    .typeError('Must be a day of the month')	
    .min(1).max(31)	
    .required('Day required'),	
  PersonalDetails_PlaceBirthCity: yup.string()	
    .required('City/Town is required'),	
  PBC: yup.string()	
    .required('Country of birth required'),	
  citizenship: yup.string()	
    .required('Required'),	
});

export const Yi = ({ formData, setFormData, nextStep, currentApp, saveData, countryofbirth, citizenship }) => {
  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={formData}
        enableReinitialize={true}
        onSubmit={values => {
          // set fields
          var PersonalDetails_PlaceBirthCountry = values.PBC.value
          var PersonalDetails_Citizenship_Citizenship = values.citizenship.value

          setFormData({...values, PersonalDetails_PlaceBirthCountry, PersonalDetails_Citizenship_Citizenship});

          // stringify objects and save
          saveData(values, PersonalDetails_PlaceBirthCountry, PersonalDetails_Citizenship_Citizenship)

          nextStep();
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
        <Typography variant="h6" gutterBottom>
              Personal Information
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <FormControl>
              <InputLabel>Service In</InputLabel>
              <Field
                component={Select} style={{ width: 300 }} name="PersonalDetails_ServiceIn_ServiceIn" >
                <MenuItem value={'01'}>English</MenuItem>
                <MenuItem value={'02'}>French</MenuItem>
              </Field>
              <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="PersonalDetails_ServiceIn_ServiceIn" />
              </div>    
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl>
              <InputLabel>Visa Type</InputLabel>
              <Field
                component={Select} style={{ width: 300 }} name="PersonalDetails_VisaType_VisaType" >
                <MenuItem value={'VisitorVisa'}>Visit</MenuItem>
                <MenuItem value={'Transit'}>Transit</MenuItem>
              </Field>
              <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="PersonalDetails_VisaType_VisaType" />
              </div>    
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              name='PersonalDetails_Name_FamilyName' label='Last Name *'
              margin='normal' as={TextField} fullWidth
              error={touched.PersonalDetails_Name_FamilyName && errors.PersonalDetails_Name_FamilyName}
              helperText={touched.PersonalDetails_Name_FamilyName && errors.PersonalDetails_Name_FamilyName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              name='PersonalDetails_Name_GivenName' label='First Name *'
              margin='normal' as={TextField} fullWidth
              error={touched.PersonalDetails_Name_GivenName && errors.PersonalDetails_Name_GivenName}
              helperText={touched.PersonalDetails_Name_GivenName && errors.PersonalDetails_Name_GivenName}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Have you ever used another name? *</FormLabel>
            <Field component={RadioGroup} name="PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator" row >
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes"
              />
              <FormControlLabel
                value="N" control={<Radio />} label="No"
              />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator" />
            </div>    
          </Grid>
          {values.PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator === "Y" && (
          <Grid item xs={12} md={6}>
            <Field
              name='PersonalDetails_AliasName_AliasFamilyName' label='Previous Last Name *'
              margin='normal' as={TextField} fullWidth
              error={touched.PersonalDetails_AliasName_AliasFamilyName && errors.PersonalDetails_AliasName_AliasFamilyName}
              helperText={touched.PersonalDetails_AliasName_AliasFamilyName && errors.PersonalDetails_AliasName_AliasFamilyName}
            />
          </Grid>
          )}
          {values.PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator === "Y" && (
          <Grid item xs={12} md={6}>
            <Field
              name='PersonalDetails_AliasName_AliasGivenName' label='Previous First Name *'
              margin='normal' as={TextField} fullWidth
              error={touched.PersonalDetails_AliasName_AliasGivenName && errors.PersonalDetails_AliasName_AliasGivenName}
              helperText={touched.PersonalDetails_AliasName_AliasGivenName && errors.PersonalDetails_AliasName_AliasGivenName}
            />
          </Grid>
          )}
          <Grid item xs={12}>
            <FormLabel FormLabel component="legend">Sex *</FormLabel>
            <Field component={RadioGroup} row name="PersonalDetails_Sex_Sex">
              <FormControlLabel
                value="Female" control={<Radio />} label="Female" />
              <FormControlLabel
                value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Unknown" control={<Radio />} label="Unknown" />
              <FormControlLabel
                value="Unspecified" control={<Radio />} label="Another Gender" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="PersonalDetails_Sex_Sex" />
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <Field
              name='PersonalDetails_DOBYear' label='YYYY *'
              margin='normal' as={TextField} fullWidth
              error={touched.PersonalDetails_DOBYear && errors.PersonalDetails_DOBYear}
              helperText={touched.PersonalDetails_DOBYear && errors.PersonalDetails_DOBYear}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Field
              name='PersonalDetails_DOBMonth' label='MM *'
              margin='normal' as={TextField} fullWidth
              error={touched.PersonalDetails_DOBMonth && errors.PersonalDetails_DOBMonth}
              helperText={touched.PersonalDetails_DOBMonth && errors.PersonalDetails_DOBMonth}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Field
              name='PersonalDetails_DOBDay' label='DD *'
              margin='normal' as={TextField} fullWidth
              error={touched.PersonalDetails_DOBDay && errors.PersonalDetails_DOBDay}
              helperText={touched.PersonalDetails_DOBDay && errors.PersonalDetails_DOBDay}
            />
          </Grid>
          <Grid item xs={12}><Typography variant="subtitle1">Place of Birth</Typography></Grid>
          <Grid item xs={12} md={6}>
            <Field
              name='PersonalDetails_PlaceBirthCity' label='City/Town *'
              margin='normal' as={TextField} fullWidth
              error={touched.PersonalDetails_PlaceBirthCity && errors.PersonalDetails_PlaceBirthCity}
              helperText={touched.PersonalDetails_PlaceBirthCity && errors.PersonalDetails_PlaceBirthCity}
            />
          </Grid>
            <Grid item xs={12} md={6}>
            <Field
              name="PBC"
              component={Autocomplete}
              options={countryofbirth}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['PBC'] && !!errors['PBC']}
                  helperText={errors['PBC']}
                  label="Country of Birth *"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
                name="citizenship"
                component={Autocomplete}
                options={citizenship}
                getOptionLabel={(option: label) => option.label}
                style={{ width: 300 }}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <TextField
                    {...params}
                    error={touched['citizenship'] && !!errors['citizenship']}
                    helperText={errors['citizenship']}
                    label="Citizenship *"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
            <Button
              type='submit' variant='contained' color='primary'
              className={classes.button}
            >
              Continue
            </Button>
            </Grid>
          </Grid>
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