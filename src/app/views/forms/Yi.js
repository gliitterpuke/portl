import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Select, RadioGroup } from 'formik-material-ui';
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
import * as yup from 'yup';
import {
    Autocomplete,
    AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import { SimpleCard, Breadcrumb } from "matx";
import { Prompt } from 'react-router'
import MuiAlert from '@material-ui/lab/Alert';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { isMobile } from "utils";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
} 

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  snack: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    textColor: '#FFFFFF',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
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
    MaritalStatus_SectionA_MaritalStatus: yup.string()
    .required('Required'),
  MaritalStatus_SectionA_DateofMarriage: yup.date()
    .when("MaritalStatus_SectionA_MaritalStatus", {
      is: ("01" | "03"), then: yup.date().required( "Required" ),
      otherwise: yup.date() }),
  MaritalStatus_SectionA_FamilyName: yup.string()
    .when("MaritalStatus_SectionA_MaritalStatus", {
      is: ("01" | "03"), then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  MaritalStatus_SectionA_GivenName: yup.string()
    .when("MaritalStatus_SectionA_MaritalStatus", {
      is: ("01" | "03"), then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  MaritalStatus_SectionA_PrevMarriedIndicator: yup.string()
    .required('Required'),
    MaritalStatus_SectionA_PMFamilyName: yup.string()
    .when("MaritalStatus_SectionA_PrevMarriedIndicator", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  MaritalStatus_SectionA_PMGivenName_GivenName: yup.string()
    .when("MaritalStatus_SectionA_PrevMarriedIndicator", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  MaritalStatus_SectionA_PrevSpouse_DOBYear: yup.number()
    .when("MaritalStatus_SectionA_PrevMarriedIndicator", {
      is: "Y", then: yup.number().required( "Required" ).min(1900, 'After 1900').max(2020, 'Before 2020'),
      otherwise: yup.number() }),
  MaritalStatus_SectionA_PrevSpouse_DOBMonth: yup.number()
    .when("MaritalStatus_SectionA_PrevMarriedIndicator", {
      is: "Y", then: yup.number().required( "Required" ).min(1, 'Between Jan-Dec').max(12, 'Between Jan-Dec'),
      otherwise: yup.number() }),
  MaritalStatus_SectionA_PrevSpouse_DOBDay: yup.number()
    .when("MaritalStatus_SectionA_PrevMarriedIndicator", {
      is: "Y", then: yup.number().required( "Required" ).min(1, 'Must be a day of month').max(31, 'Must be a day of month'),
      otherwise: yup.number() }),
  MaritalStatus_SectionA_TypeOfRelationship: yup.string()
    .when("MaritalStatus_SectionA_PrevMarriedIndicator", {
      is: "Y", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  MaritalStatus_SectionA_FromDate: yup.date()
    .when("MaritalStatus_SectionA_PrevMarriedIndicator", {
      is: "Y", then: yup.date().required( "Required" ),
      otherwise: yup.date() }),
  MaritalStatus_SectionA_ToDate_ToDate: yup.date()
    .when("PersonalDetails_AliasName_AliasNameIndicator", {
      is: "Y", then: yup.date().required( "Required" ),
      otherwise: yup.date() }),
  natLang: yup.string()
    .required('Required'),
  MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate: yup.string()
    .required('Required'),
  MaritalStatus_SectionA_Languages_languages_lov: yup.string()
    .when("MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate", {
      is: "Both", then: yup.string().required( "Required" ),
      otherwise: yup.string() }),
  MaritalStatus_SectionA_Languages_LanguageTest: yup.string()
    .required('Required')

});

export const Yi = ({ formData, setFormData, nextStep, currentApp, saveData, countryofbirth, citizenship, languages, 
  prevStep, step, getSteps, setStep, open, setOpen }) => {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('back');
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
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
    var elmnt = document.getElementsByClassName("scrollbar-container");
    elmnt[0].scrollTo(0,0);
  }, []);
  
  return (
    <>
      <Formik
        initialValues={formData}
        enableReinitialize={true}
        onSubmit={ (values) => {
          // set fields
          var PersonalDetails_PlaceBirthCountry = values.PBC.value
          var PersonalDetails_Citizenship_Citizenship = values.citizenship.value
          var MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang = values.natLang.value

          setFormData({...values, PersonalDetails_PlaceBirthCountry, PersonalDetails_Citizenship_Citizenship,
            MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang});

          // stringify objects, save, next page
          saveData(values, PersonalDetails_PlaceBirthCountry, PersonalDetails_Citizenship_Citizenship,
            MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang)
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
            <StepButton onClick={handleStep(index+1)} completed={completed[index+1]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      </div>
      )}
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={9} md={11}>
            <Typography variant="h6" gutterBottom>
              Personal Information
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

            {/* MARITAL */}
            <Grid item xs={12} md={12}>
              <br/>
            <Typography variant="h6" gutterBottom>
              Marital Status
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl>
              <InputLabel>Current Status *</InputLabel>
              <Field
                component={Select} style={{ width: 300 }} name="MaritalStatus_SectionA_MaritalStatus">
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
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="MaritalStatus_SectionA_MaritalStatus" />
            </div>
          </Grid>
          {values.MaritalStatus_SectionA_MaritalStatus === "01" && (
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="Date of Marriage/Relationship *" name="MaritalStatus_SectionA_DateofMarriage"
              error={touched.MaritalStatus_SectionA_DateofMarriage && errors.MaritalStatus_SectionA_DateofMarriage}
              helperText={touched.MaritalStatus_SectionA_DateofMarriage && errors.MaritalStatus_SectionA_DateofMarriage} />
          </Grid>
          )}
          {values.MaritalStatus_SectionA_MaritalStatus ===  "03" && (
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="Date of Marriage/Relationship *" name="MaritalStatus_SectionA_DateofMarriage"
              error={touched.MaritalStatus_SectionA_DateofMarriage && errors.MaritalStatus_SectionA_DateofMarriage}
              helperText={touched.MaritalStatus_SectionA_DateofMarriage && errors.MaritalStatus_SectionA_DateofMarriage} />
          </Grid>
          )}
          {values.MaritalStatus_SectionA_MaritalStatus === "01" && (
          <Grid item xs={12}><FormLabel component="legend">Name of your current Spouse/Common-law partner</FormLabel></Grid>
          )}
          {values.MaritalStatus_SectionA_MaritalStatus ===  "03" && (
          <Grid item xs={12}><FormLabel component="legend">Name of your current Spouse/Common-law partner</FormLabel></Grid>
          )}
          {values.MaritalStatus_SectionA_MaritalStatus === "01" && (
          <Grid item xs={12} md={6}>
            <Field
              name='MaritalStatus_SectionA_FamilyName' label='Spouse Last Name *'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_FamilyName && errors.MaritalStatus_SectionA_FamilyName}
              helperText={touched.MaritalStatus_SectionA_FamilyName && errors.MaritalStatus_SectionA_FamilyName}
            />
          </Grid>
          )}
          {values.MaritalStatus_SectionA_MaritalStatus ===  "03" && (
          <Grid item xs={12} md={6}>
            <Field
              name='MaritalStatus_SectionA_FamilyName' label='Spouse Last Name *'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_FamilyName && errors.MaritalStatus_SectionA_FamilyName}
              helperText={touched.MaritalStatus_SectionA_FamilyName && errors.MaritalStatus_SectionA_FamilyName}
            />
          </Grid>
          )}
          {values.MaritalStatus_SectionA_MaritalStatus === "01" && (
          <Grid item xs={12} md={6}>
            <Field
              name='MaritalStatus_SectionA_GivenName' label='Spouse First Name'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_GivenName && errors.MaritalStatus_SectionA_GivenName}
              helperText={touched.MaritalStatus_SectionA_GivenName && errors.MaritalStatus_SectionA_GivenName}
            />
          </Grid>
          )}
          {values.MaritalStatus_SectionA_MaritalStatus ===  "03" && (
          <Grid item xs={12} md={6}>
            <Field
              name='MaritalStatus_SectionA_GivenName' label='Spouse First Name'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_GivenName && errors.MaritalStatus_SectionA_GivenName}
              helperText={touched.MaritalStatus_SectionA_GivenName && errors.MaritalStatus_SectionA_GivenName}
            />
          </Grid>
          )}
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

          {values.MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12}>
            <FormLabel component="legend">Name of your Previous Spouse/Common-Law partner</FormLabel>
          </Grid>
          )}
          {values.MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={6}>
            <Field
              name='MaritalStatus_SectionA_PMFamilyName' label='Previous Spouse Last Name *'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_PMFamilyName && errors.MaritalStatus_SectionA_PMFamilyName}
              helperText={touched.MaritalStatus_SectionA_PMFamilyName && errors.MaritalStatus_SectionA_PMFamilyName}
            />
          </Grid>
          )}
          {values.MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={6}>
            <Field
              name='MaritalStatus_SectionA_PMGivenName_GivenName' label='Previous Spouse First Name'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_PMGivenName_GivenName && errors.MaritalStatus_SectionA_PMGivenName_GivenName}
              helperText={touched.MaritalStatus_SectionA_PMGivenName_GivenName && errors.MaritalStatus_SectionA_PMGivenName_GivenName}
            />
          </Grid>
          )}
          {values.MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={2}>
            <Field
              name='MaritalStatus_SectionA_PrevSpouse_DOBYear' label='YYYY *'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_PrevSpouse_DOBYear && errors.MaritalStatus_SectionA_PrevSpouse_DOBYear}
              helperText={touched.MaritalStatus_SectionA_PrevSpouse_DOBYear && errors.MaritalStatus_SectionA_PrevSpouse_DOBYear}
            />
          </Grid>
          )}
          {values.MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={2}>
            <Field
              name='MaritalStatus_SectionA_PrevSpouse_DOBMonth' label='MM *'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_PrevSpouse_DOBMonth && errors.MaritalStatus_SectionA_PrevSpouse_DOBMonth}
              helperText={touched.MaritalStatus_SectionA_PrevSpouse_DOBMonth && errors.MaritalStatus_SectionA_PrevSpouse_DOBMonth}
            />
          </Grid>
          )}
          {values.MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={2}>
            <Field
              name='MaritalStatus_SectionA_PrevSpouse_DOBDay' label='DD *'
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_PrevSpouse_DOBDay && errors.MaritalStatus_SectionA_PrevSpouse_DOBDay}
              helperText={touched.MaritalStatus_SectionA_PrevSpouse_DOBDay && errors.MaritalStatus_SectionA_PrevSpouse_DOBDay}
            />
          </Grid>
          )}
          {values.MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={6}>
            <FormControl>
              <InputLabel>Type of Relationship *</InputLabel>
              <Field
                component={Select} style={{ width: 300 }} name="MaritalStatus_SectionA_TypeOfRelationship">
                <MenuItem value={'03'}>Common-Law</MenuItem>
                <MenuItem value={'01'}>Married</MenuItem>
              </Field>
            </FormControl>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
              <ErrorMessage name="MaritalStatus_SectionA_TypeOfRelationship" />
            </div>
          </Grid>
          )}
          {values.MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="From *" name="MaritalStatus_SectionA_FromDate"
              error={touched.MaritalStatus_SectionA_FromDate && errors.MaritalStatus_SectionA_FromDate}
              helperText={touched.MaritalStatus_SectionA_FromDate && errors.MaritalStatus_SectionA_FromDate} />
          </Grid>
          )}
          {values.MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={6}>
            <Field as={TextField} type="date" InputLabelProps={{ shrink: true }} label="To *" name="MaritalStatus_SectionA_ToDate_ToDate"
              error={touched.MaritalStatus_SectionA_ToDate_ToDate && errors.MaritalStatus_SectionA_ToDate_ToDate}
              helperText={touched.MaritalStatus_SectionA_ToDate_ToDate && errors.MaritalStatus_SectionA_ToDate_ToDate} />
          </Grid>
          )}

          {/* Languages */}
          <Grid item xs={12} md={12}>
            <br/>
          <Typography variant="h6" gutterBottom>
            Languages
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
            <FormLabel component="legend">Native language/Mother tongue *</FormLabel>
            <Field
              name="natLang"
              component={Autocomplete}
              options={languages}
              getOptionLabel={(option: any) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['natLang'] && !!errors['natLang']}
                  helperText={errors['natLang']}
                  label="Language *"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl>
            <FormLabel FormLabel component="legend">Are you able to communciate in English or French? *</FormLabel>
              <Field
                component={Select} style={{ width: 300 }} name="MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate"
                error={touched.MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate && errors.MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate}>
                <MenuItem value={'English'}>English</MenuItem>
                <MenuItem value={'French'}>French</MenuItem>
                <MenuItem value={'Both'}>Both</MenuItem>
                <MenuItem value={'Neither'}>Neither</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          {values.MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate === "Both" && (
          <Grid item xs={12} md={8}>
            <Field
              name='MaritalStatus_SectionA_Languages_languages_lov' label="Language you're most comfortable in *"
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_Languages_languages_lov && errors.MaritalStatus_SectionA_Languages_languages_lov}
              helperText={touched.MaritalStatus_SectionA_Languages_languages_lov && errors.MaritalStatus_SectionA_Languages_languages_lov}
            />
          </Grid>
          )}
          <Grid item xs={12}>
          <FormLabel FormLabel component="legend">Have you taken a test from a designated testing agency to determine your English/French proficiency? *</FormLabel>
            <Field component={RadioGroup} row name="MaritalStatus_SectionA_Languages_LanguageTest">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="MaritalStatus_SectionA_Languages_LanguageTest" />
            </div>
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