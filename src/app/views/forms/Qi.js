import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Select, RadioGroup } from 'formik-material-ui' // Check Purpose of Visit values!
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
  DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit: yup.string()
    .required('Purpose of visit required'),
  DetailsOfVisit_PurposeRow1_HowLongStay_FromDate: yup.string()
    .required('From date required'),
  DetailsOfVisit_PurposeRow1_HowLongStay_ToDate: yup.string()
    .required('To date required'),
  DetailsOfVisit_PurposeRow1_Funds_Funds: yup.number()
    .min(10000)
    .required('Funds available for your trip required'),
  DetailsOfVisit_Contacts_Row1_Name_Name: yup.string()
    .required('Name required'),
  DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada: yup.string()
    .required('Address in Canada required'),
});

export const Qi = ({ formData, setFormData, nextStep, prevStep }) => {
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

      <Form>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Typography variant="h6" gutterBottom>
              Details of Visit
        </Typography>
        <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
            <FormControl>
              <InputLabel>Purpose of Visit *</InputLabel> 
              <Field
                component={Select} style={{ width: 300 }} name="DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit"
                error={touched.DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit && errors.DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit}>
                <MenuItem value={'pvalue'}>Business</MenuItem> 
                <MenuItem value={'pvalue'}>Tourism</MenuItem>
                <MenuItem value={'pvalue'}>Short-Term Studies</MenuItem>
                <MenuItem value={'pvalue'}>Returning Student</MenuItem>
                <MenuItem value={'pvalue'}>Returning Worker</MenuItem>
                <MenuItem value={'pvalue'}>Super Visa</MenuItem>
                <MenuItem value={'pvalue'}>Other</MenuItem>
                <MenuItem value={'pvalue'}>Visit</MenuItem>
                <MenuItem value={'pvalue'}>Family Visit</MenuItem>
              </Field>
            </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
            <Field
              name='DetailsOfVisit_PurposeRow1_Other' label='Other'
              margin='normal' as={TextField} fullWidth
              error={touched.DetailsOfVisit_PurposeRow1_Other && errors.DetailsOfVisit_PurposeRow1_Other}
              helperText={touched.DetailsOfVisit_PurposeRow1_Other && errors.DetailsOfVisit_PurposeRow1_Other}
            />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Trip Dates</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
            <Field as={TextField} type="date" helperText="From *" name="DetailsOfVisit_PurposeRow1_HowLongStay_FromDate"
            error={touched.DetailsOfVisit_PurposeRow1_HowLongStay_FromDate && errors.DetailsOfVisit_PurposeRow1_HowLongStay_FromDate} />
        </Grid>
        <Grid item xs={12} md={3}>
            <Field as={TextField} type="date" helperText="To *" name="DetailsOfVisit_PurposeRow1_HowLongStay_ToDate"
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

Qi.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
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
