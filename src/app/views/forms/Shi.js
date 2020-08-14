import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Select, RadioGroup, CheckboxWithLabel } from 'formik-material-ui'
import { KeyboardDatePicker } from 'formik-material-ui-pickers';
import {
  Button,
  FormControlLabel,
  FormGroup,
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
  BackgroundInfo_Choice: yup.string()
    .required('Required'),
  BackgroundInfo2_VisaChoice1: yup.string()
  .required('Required'),
  BackgroundInfo2_VisaChoice2: yup.string()
  .required('Required'),
  BackgroundInfo2_Details_VisaChoice3: yup.string()
  .required('Required'),
  BackgroundInfo3_Choice: yup.string()
  .required('Required'),
  BackgroundInfo3_details: yup.string()
  .required('Required'),
  Military_Choice: yup.string()
  .required('Required'),
  Occupation_Choice: yup.string()
  .required('Required'),
  GovPosition_Choice: yup.string()
  .required('Required'),
});

export const Shi = ({ formData, setFormData, nextStep, prevStep }) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');

  return (
    <>
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          alert(JSON.stringify(values));
          fetch('http://localhost:8000/api/v1/forms/trv/4', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
        }).then(response => response.json())
        .then(response => {
        
            console.log(response)
        });
          nextStep();
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (

      <Form>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Typography variant="h6" gutterBottom>
              Background Information
        </Typography>
        <Grid container spacing={6}>
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
                name="BackgroundInfo_Choice"
                value={opt.value}
                key={opt.value}
                Label={{ label: opt.label }}
              />
            ))}
            <FormLabel FormLabel component="legend">Do you have any mental/physical disorders that would require social/health services, other than medication, during your stay in Canada? *</FormLabel>
            {canus.map(opt => (
              <Field
                component={CheckboxWithLabel}
                type="checkbox" //REQUIRED to work with non-boolean options
                name="BackgroundInfo_Choice"
                value={opt.value}
                key={opt.value}
                Label={{ label: opt.label }}
              />
            ))}
          </FormGroup>
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
            <Field component={RadioGroup} row name="BackgroundInfo3_VisaChoice3">
              <FormControlLabel
                value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel
                value="N" control={<Radio />} label="No" />
            </Field>
            <div style={{ color: '#f54639', fontSize: '11px', letterSpacing: '0.0563em'}}>
                <ErrorMessage name="BackgroundInfo3_VisaChoice3" />
            </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormLabel component="legend">Please provide details.</FormLabel>
            <Field
              name='fieldtype' label='Previous First Name *'
              margin='normal' as={TextField} fullWidth
              error={touched.fieldtype && errors.fieldtype}
              helperText={touched.fieldtype && errors.fieldtype}
            />
          </Grid>

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
        <Grid item xs={12}>
          <FormLabel component="legend">Please provide details.</FormLabel>
            <Field
              name='BackgroundInfo3_details'
              margin='normal' as={TextField} fullWidth
              error={touched.BackgroundInfo_Details_MedicalDetails && errors.BackgroundInfo_Details_MedicalDetails}
              helperText={touched.BackgroundInfo_Details_MedicalDetails && errors.BackgroundInfo_Details_MedicalDetails}
            />
        </Grid>

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
        <Grid item xs={12}>
          <FormLabel component="legend">Please provide the dates of service and countries/territories where you served.</FormLabel>
            <Field
              name='Military_militaryServiceDetails'
              margin='normal' as={TextField} fullWidth
              error={touched.BackgroundInfo_Details_MedicalDetails && errors.BackgroundInfo_Details_MedicalDetails}
              helperText={touched.BackgroundInfo_Details_MedicalDetails && errors.BackgroundInfo_Details_MedicalDetails}
            />
        </Grid>

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
        )}
      </Formik>
    </>
  );
};

const countries = [
  { label: 'Afghanistan', value: '252' }, 
  { label: 'Aaland Island', value: '401' }, 
  { label: 'Albania', value: '081' }, 
  { label: 'Algeria', value: '131' }, 
  { label: 'Andorra', value: '082' }, 
  { label: 'Angola', value: '151' }, 
  { label: 'Anguilla', value: '620' }, 
  { label: 'Antigua And Barbuda', value: '621' }, 
  { label: 'Argentina', value: '703' }, 
  { label: 'Armenia', value: '049' }, 
  { label: 'Aruba', value: '658' }, 
  { label: 'Australia', value: '305' }, 
  { label: 'Austria', value: '011' }, 
  { label: 'Azerbaijan', value: '050' }, 
  { label: 'Azores', value: '035' }, 
  { label: 'Bahamas', value: '622' }, 
  { label: 'Bahrain', value: '253' }, 
  { label: 'Bangladesh', value: '212' }, 
  { label: 'Barbados', value: '610' }, 
  { label: 'Belarus', value: '051' }, 
  { label: 'Belgium', value: '012' }, 
  { label: 'Belize', value: '541' }, 
  { label: 'Benin', value: '160' }, 
  { label: 'Bermuda', value: '601' }, 
  { label: 'Bhutan', value: '254' }, 
  { label: 'Bolivia', value: '751' }, 
  { label: 'Bosnia and Herzegovina', value: '048' }, 
  { label: 'Botswana', value: '153' }, 
  { label: 'Brazil', value: '709' }, 
  { label: 'British Indian Ocean Territory', value: '404' }, 
  { label: 'British Virgin Islands', value: '633' }, 
  { label: 'Brunei Darussalam', value: '255' }, 
  { label: 'Bulgaria', value: '083' }, 
  { label: 'Burkina Faso', value: '188' }, 
  { label: 'Burma (Myanmar)', value: '241' }, 
  { label: 'Burundi', value: '154' }, 
  { label: 'Cabo Verde', value: '911' }, 
  { label: 'Cambodia', value: '256' }, 
  { label: 'Cameroon', value: '155' }, 
  { label: 'Canada', value: '511' }, 
  { label: 'Canary Islands', value: '039' }, 
  { label: 'Cayman Islands', value: '624' }, 
  { label: 'Central African Republic', value: '157' }, 
  { label: 'Chad', value: '156' }, 
  { label: 'Channel Islands', value: '009' }, 
  { label: 'Chile', value: '721' }, 
  { label: 'China', value: '202' }, 
  { label: 'China (Hong Kong SAR)', value: '200' }, 
  { label: 'China (Macao SAR)', value: '198' }, 
  { label: 'Colombia', value: '722' }, 
  { label: 'Comoros', value: '905' }, 
  { label: 'Cook Islands', value: '840' }, 
  { label: 'Costa Rica', value: '542' }, 
  { label: 'Croatia', value: '043' }, 
  { label: 'Cuba', value: '650' }, 
  { label: 'Curaçao', value: '406' }, 
  { label: 'Cyrpus', value: '221' }, 
  { label: 'Czech Republic', value: '015' }, 
  { label: 'Czechoslovakia', value: '014' }, 
  { label: 'Democratic Rep. of Congo', value: '158' }, 
  { label: 'Denmark', value: '017' }, 
  { label: 'Djibouti', value: '183' }, 
  { label: 'Dominica', value: '625' }, 
  { label: 'Dominican Republic', value: '651' }, 
  { label: 'East Timor', value: '916' }, 
  { label: 'Ecuador', value: '753' }, 
  { label: 'Egypt', value: '101' }, 
  { label: 'El Salvador', value: '543' }, 
  { label: 'England', value: '002' }, 
  { label: 'Equatorial Guinea', value: '178' }, 
  { label: 'Eritrea', value: '162' }, 
  { label: 'Estonia', value: '018' }, 
  { label: 'Ethiopia', value: '161' }, 
  { label: 'Falkland Islands', value: '912' }, 
  { label: 'Federated States of Micronesia', value: '835' }, 
  { label: 'Fiji', value: '801' }, 
  { label: 'Finland', value: '021' }, 
  { label: 'Fr. South. and Antarctic Lands', value: '821' }, 
  { label: 'France', value: '022' }, 
  { label: 'French Guiana', value: '754' }, 
  { label: 'French Polynesia', value: '845' }, 
  { label: 'Gabon', value: '163' }, 
  { label: 'Gambia', value: '164' }, 
  { label: 'Georgia', value: '052' }, 
  { label: 'Germany, Federal Republic Of', value: '024' }, 
  { label: 'Ghana', value: '165' }, 
  { label: 'Gibraltar', value: '084' }, 
  { label: 'Greece', value: '025' }, 
  { label: 'Greenland', value: '521' }, 
  { label: 'Grenada', value: '626' }, 
  { label: 'Guadelope', value: '653' }, 
  { label: 'Guam', value: '832' }, 
  { label: 'Guatemala', value: '544' }, 
  { label: 'Guinea', value: '166' }, 
  { label: 'Guinea-Bissau', value: '167' }, 
  { label: 'Guyana', value: '711' }, 
  { label: 'Haiti', value: '654' }, 
  { label: 'Heard and MacDonald Islands', value: '410' }, 
  { label: 'Honduras', value: '545' }, 
  { label: 'Hong Kong', value: '204' }, 
  { label: 'Hungary', value: '026' }, 
  { label: 'Iceland', value: '085' }, 
  { label: 'India', value: '205' }, 
  { label: 'Indonesia', value: '222' }, 
  { label: 'Iran', value: '223' }, 
  { label: 'Iraq', value: '224' }, 
  { label: 'Ireland', value: '027' }, 
  { label: 'Israel', value: '206' }, 
  { label: 'Italy', value: '028' }, 
  { label: 'Ivory Coast', value: '169' }, 
  { label: 'Jamaica', value: '602' }, 
  { label: 'Japan', value: '207' }, 
  { label: 'Jordan', value: '225' }, 
  { label: 'Kazakhstan', value: '053' }, 
  { label: 'Kenya', value: '132' }, 
  { label: 'Kiribati', value: '831' }, 
  { label: 'Korea, North (DPRK)', value: '257' }, 
  { label: 'Korea, South', value: '258' }, 
  { label: 'Kosovo', value: '064' }, 
  { label: 'Kuwait', value: '226' }, 
  { label: 'Kyrgyzstan', value: '054' }, 
  { label: 'Laos', value: '260' }, 
  { label: 'Latvia', value: '019' }, 
  { label: 'Lebanon', value: '208' }, 
  { label: 'Lesotho', value: '152' }, 
  { label: 'Libera', value: '170' }, 
  { label: 'Libya', value: '171' }, 
  { label: 'Liechtenstein', value: '086' }, 
  { label: 'Lithuania', value: '020' }, 
  { label: 'Luxembourg', value: '013' }, 
  { label: 'Macao', value: '261' }, 
  { label: 'Macedonia', value: '070' }, 
  { label: 'Madagascar', value: '172' }, 
  { label: 'Madeira', value: '036' }, 
  { label: 'Malawi', value: '111' }, 
  { label: 'Malaysia', value: '242' }, 
  { label: 'Maldives', value: '901' }, 
  { label: 'Mali', value: '173' }, 
  { label: 'Malta', value: '030' }, 
  { label: 'Marshall Islands', value: '834' }, 
  { label: 'Martinique', value: '655' }, 
  { label: 'Mauritania', value: '174' }, 
  { label: 'Mauritius', value: '902' }, 
  { label: 'Mayotte', value: '906' }, 
  { label: 'Mexico', value: '501' }, 
  { label: 'Moldova', value: '055' }, 
  { label: 'Monaco', value: '087' }, 
  { label: 'Mongolia', value: '262' }, 
  { label: 'Montenegro', value: '063' }, 
  { label: 'Montserrat', value: '627' }, 
  { label: 'Morocco', value: '133' }, 
  { label: 'Mozambique', value: '175' }, 
  { label: 'Namibia', value: '122' }, 
  { label: 'Nauru', value: '341' }, 
  { label: 'Nepal', value: '264' }, 
  { label: 'Netherlands Antilles, The', value: '652' }, 
  { label: 'Netherlands, The', value: '031' }, 
  { label: 'Nevis', value: '628' }, 
  { label: 'New Caledonia', value: '822' }, 
  { label: 'New Zealand', value: '339' }, 
  { label: 'Nicaragua', value: '546' }, 
  { label: 'Niger', value: '176' }, 
  { label: 'Nigeria', value: '177' }, 
  { label: 'Niue', value: '414' }, 
  { label: 'Northern Ireland', value: '006' }, 
  { label: 'Northern Mariana Islands', value: '830' }, 
  { label: 'Norway', value: '032' }, 
  { label: 'Oman', value: '263' }, 
  { label: 'Pakistan', value: '209' }, 
  { label: 'Palestinian Authority', value: '213' }, 
  { label: 'Panama', value: '547' }, 
  { label: 'Papua New Guinea', value: '342' }, 
  { label: 'Paraguay', value: '755' }, 
  { label: 'Peru', value: '723' }, 
  { label: 'Philippines', value: '227' }, 
  { label: 'Pitcairn Islands', value: '842' }, 
  { label: 'Poland', value: '033' }, 
  { label: 'Portugal', value: '034' }, 
  { label: 'Qatar', value: '265' }, 
  { label: 'Republic of Congo', value: '159' }, 
  { label: 'Republic of Palau', value: '836' }, 
  { label: 'Réunion', value: '903' }, 
  { label: 'Romania', value: '088' }, 
  { label: 'Russia', value: '056' }, 
  { label: 'Rwanda', value: '179' }, 
  { label: 'Saint Helena', value: '915' }, 
  { label: 'Saint Kitts and Nevis', value: '629' }, 
  { label: 'Saint Lucia', value: '630' }, 
  { label: 'Saint Pierre and Miquelon', value: '531' }, 
  { label: 'San Marino', value: '089' }, 
  { label: 'Samoa', value: '844' }, 
  { label: 'Samoa, American', value: '843' }, 
  { label: 'Saint-Martin', value: '415' }, 
  { label: 'Sao Tome and Principe', value: '914' }, 
  { label: 'Saudi Arabia', value: '231' }, 
  { label: 'Scotland', value: '007' }, 
  { label: 'Senegal', value: '180' }, 
  { label: 'Serbia And Montenegro', value: '061' }, 
  { label: 'Serbia, Republic Of', value: '062' }, 
  { label: 'Seychelles', value: '904' }, 
  { label: 'Sierra Leone', value: '181' }, 
  { label: 'Singapore', value: '246' }, 
  { label: 'Slovakia', value: '016' }, 
  { label: 'Slovenia', value: '824' }, 
  { label: 'Solomon Islands', value: '182' }, 
  { label: 'Somalia', value: '231' }, 
  { label: 'South Africa, Republic Of', value: '121' }, 
  { label: 'South Sudan', value: '189' }, 
  { label: 'Spain', value: '037' }, 
  { label: 'Sri Lanka', value: '201' }, 
  { label: 'St. Vincent and the Grenadines', value: '631' }, 
  { label: 'Sudan', value: '185' }, 
  { label: 'Suriname', value: '752' }, 
  { label: 'Swaziland', value: '186' }, 
  { label: 'Sweden', value: '040' }, 
  { label: 'Switzerland', value: '041' }, 
  { label: 'Syria', value: '210' }, 
  { label: 'Taiwan', value: '203' }, 
  { label: 'Tajikistan', value: '057' }, 
  { label: 'Tanzania', value: '130' }, 
  { label: 'Thailand', value: '267' }, 
  { label: 'Tibet (Autonomous Region)', value: '268' }, 
  { label: 'Togo', value: '187' }, 
  { label: 'Tokelau', value: '417' }, 
  { label: 'Tongo', value: '846' }, 
  { label: 'Trinidad and Tobago', value: '605' }, 
  { label: 'Tunisia', value: '135' }, 
  { label: 'Turkey', value: '045' }, 
  { label: 'Turkmenistan', value: '058' }, 
  { label: 'Turks and Caicos Islands', value: '632' }, 
  { label: 'Tuvalu', value: '826' }, 
  { label: 'U.S. Minor outlying Islands', value: '418' }, 
  { label: 'Uganda', value: '136' }, 
  { label: 'Ukraine', value: '059' }, 
  { label: 'Union Of Soviet Socialist Rep', value: '042' }, 
  { label: 'United Arab Emirates', value: '280' }, 
  { label: 'United States of America', value: '461' }, 
  { label: 'Unknown', value: '000' }, 
  { label: 'Uruguay', value: '724' }, 
  { label: 'Uzbekistan', value: '060' }, 
  { label: 'Vanuatu', value: '823' }, 
  { label: 'Vatican City State', value: '090' }, 
  { label: 'Venezuela', value: '725' }, 
  { label: 'Vietnam', value: '270' }, 
  { label: 'Virgin Islands, U.S.', value: '657' }, 
  { label: 'Wales', value: '008' }, 
  { label: 'Wallis and Futuna Is., Terr.', value: '841' }, 
  { label: 'Western Sahara', value: '184' }, 
  { label: 'Yemen', value: '273' }, 
  { label: 'Zambia', value: '112' }, 
  { label: 'Zimbabwe', value: '113' },
];

const canus =[
  { label: "Yes", value: "Y" },
  { label: "No", value: "N"}
]