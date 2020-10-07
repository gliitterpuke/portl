import React, { useState } from 'react';
import { Prompt } from 'react-router'
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
  Radio,
  TextField,
  Typography,
  MenuItem,
  FormControl,
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

export const Si = ({ formData, setFormData, nextStep, prevStep, saveData, languages, step }) => {
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
          var MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang = values.natLang.value
          setFormData({...values, MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang});

          saveData(values, MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang)
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
            Languages
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

Si.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};