import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Select, RadioGroup } from 'formik-material-ui'
import { KeyboardDatePicker } from 'formik-material-ui-pickers';
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
import {
    Autocomplete,
    AutocompleteRenderInputParams,
  } from 'formik-material-ui-lab';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
  
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const validationSchema = yup.object({
  PersonalDetails_Name_GivenName: yup
    .string()
    .required('First Name is required')
    .max(20),
  PersonalDetails_Name_FamilyName: yup
    .string()
    .required('Last Name is required')
    .max(20),
    PersonalDetails_AliasName_AliasGivenName: yup
    .string()
    .required('Previous First Name is required')
    .max(20),
  PersonalDetails_AliasName_AliasFamilyName: yup
    .string()
    .required('Previous Last Name is required')
    .max(20),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
});

export const Si = ({ formData, setFormData, nextStep }) => {
  const classes = useStyles();

  return (
    <>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          nextStep();
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (

      <Form>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Typography variant="h6" gutterBottom>
              Languages
        </Typography>
        <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
            <FormLabel component="legend">Native language/Mother tongue</FormLabel>
            <Field
              name="MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang"
              component={Autocomplete}
              options={languages}
              getOptionLabel={(option: label) => option.label}
              style={{ width: 300 }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  error={touched['MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang'] && !!errors['MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang']}
                  helperText={errors['MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang']}
                  label="Language"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl>
            <FormLabel FormLabel component="legend">Are you able to communciate in English or French?</FormLabel>
              <Field
                component={Select} style={{ width: 300 }} name="MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate">
                <MenuItem value={'English'}>English</MenuItem>
                <MenuItem value={'French'}>French</MenuItem>
                <MenuItem value={'Both'}>Both</MenuItem>
                <MenuItem value={'Neither'}>Neither</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <Field
              name='MaritalStatus_SectionA_Languages_languages_lov' label="Language you're most comfortable in"
              margin='normal' as={TextField} fullWidth
              error={touched.MaritalStatus_SectionA_Languages_languages_lov && errors.MaritalStatus_SectionA_Languages_languages_lov}
              helperText={touched.MaritalStatus_SectionA_Languages_languages_lov && errors.MaritalStatus_SectionA_Languages_languages_lov}
            />
          </Grid>
          <Grid item xs={12}>
          <FormLabel FormLabel component="legend">Have you taken a test from a designated testing agency to determine your English/French proficiency?</FormLabel>
            <Field component={RadioGroup} row name="MaritalStatus_SectionA_Languages_LanguageTest">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
          </Grid>

            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Continue
            </Button>
          </Grid>
        </MuiPickersUtilsProvider>
        </Form>
        )}
      </Formik>
    </>
  );
};

const languages = [
  { label: 'English' },
  { label: 'French' },
  { label: 'Chinese' },
  { label: 'Japanese' },
  { label: 'Korean' },
];
