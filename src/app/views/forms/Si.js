import React, { useState } from 'react';
import { Prompt } from 'react-router'
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
  Radio,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import {
    Autocomplete,
    AutocompleteRenderInputParams,
  } from 'formik-material-ui-lab';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { SimpleCard, Breadcrumb } from 'matx';
 
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
} 

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
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

export const Si = ({ formData, setFormData, nextStep, prevStep, saveData }) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');
  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setOpen(false);
  };

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
      <div className="upload-form m-sm-30">
      <SimpleCard>
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Temporary Resident Visa" }]} />
        </div>
      <Form>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Typography variant="h6" gutterBottom>
              Languages
        </Typography>
        <Grid container spacing={6}>
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
              <Button
                type='submit' variant='contained' color='secondary'
                className={classes.button}
              >
                Save
              </Button>
              <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} onClick={() => setDirection('stay')} 
                style={{ height: "100%" }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}>
                <Alert onClose={handleClose} className={classes.snack}>
                  Saved!
                </Alert>
              </Snackbar>
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

const languages = [
  { value: "089", label: "Ada" },
  { value: "501", label: "Adama" },
  { value: "228", label: "Afar" },
  { value: "004", label: "Afghan" },
  { value: "203", label: "Afrikaans" },
  { value: "502", label: "Agbor" },
  { value: "053", label: "Aka" },
  { value: "165", label: "Akan" },
  { value: "503", label: "Akim" },
  { value: "003", label: "Aklanon" },
  { value: "095", label: "Akra" },
  { value: "504", label: "Akwapim" },
  { value: "119", label: "Albanian" },
  { value: "505", label: "Albanian, Greece" },
  { value: "506", label: "Albanian, Italy" },
  { value: "217", label: "American Sign Lang." },
  { value: "254", label: "Amharic" },
  { value: "250", label: "Arabic" },
  { value: "507", label: "Arabic Standard" },
  { value: "508", label: "Arabic, Algeria" },
  { value: "509", label: "Arabic, Chad" },
  { value: "510", label: "Arabic, Egypt" },
  { value: "511", label: "Arabic, Irak" },
  { value: "512", label: "Arabic, Lebanon, Levantine" },
  { value: "513", label: "Arabic, Libya" },
  { value: "514", label: "Arabic, Morocco" },
  { value: "515", label: "Arabic, Sudan" },
  { value: "516", label: "Arabic, Syria" },
  { value: "517", label: "Arabic, Tunisia" },
  { value: "518", label: "Arabic, Yemen, Judeo-Yemeni" },
  { value: "005", label: "Aranese" },
  { value: "102", label: "Armenian" },
  { value: "519", label: "Armenian, West" },
  { value: "520", label: "Armenian, Western" },
  { value: "171", label: "Ashanti" },
  { value: "255", label: "Assyrian" },
  { value: "521", label: "Atwot" },
  { value: "522", label: "Azerbaijani, North" },
  { value: "523", label: "Azerbaijani, South" },
  { value: "085", label: "Azeri" },
  { value: "524", label: "Bajuni" },
  { value: "525", label: "Balochi East Pak" },
  { value: "526", label: "Balochi South Pak" },
  { value: "527", label: "Balochi West Pak" },
  { value: "528", label: "Baluchi" },
  { value: "008", label: "Bambara" },
  { value: "529", label: "Bamileke" },
  { value: "202", label: "Bantu" },
  { value: "260", label: "Baoule" },
  { value: "530", label: "Barawa" },
  { value: "531", label: "Barbawa" },
  { value: "532", label: "Bassa" },
  { value: "739", label: "Belarusian" },
  { value: "006", label: "Belen" },
  { value: "160", label: "Bemba" },
  { value: "322", label: "Bengali" },
  { value: "533", label: "Bengali Sylhetti" },
  { value: "169", label: "Beni" },
  { value: "231", label: "Benin" },
  { value: "010", label: "Berber" },
  { value: "009", label: "Bikol" },
  { value: "212", label: "Bini" },
  { value: "180", label: "Bissa" },
  { value: "534", label: "Boguni" },
  { value: "011", label: "Bontok" },
  { value: "535", label: "Bosnian" },
  { value: "536", label: "Brava" },
  { value: "152", label: "Breton" },
  { value: "537", label: "British Sign Language" },
  { value: "538", label: "Brong" },
  { value: "539", label: "Buganda" },
  { value: "107", label: "Bulgarian" },
  { value: "308", label: "Burmese" },
  { value: "132", label: "Busan" },
  { value: "540", label: "Cambodian" },
  { value: "300", label: "Cantonese" },
  { value: "541", label: "Capizeno" },
  { value: "121", label: "Catalan" },
  { value: "183", label: "Cebuano" },
  { value: "542", label: "Chadian Sign Language" },
  { value: "216", label: "Chakma" },
  { value: "256", label: "Chaldean" },
  { value: "543", label: "Changle" },
  { value: "211", label: "Chaocho" },
  { value: "015", label: "Chavacano" },
  { value: "544", label: "Chechen" },
  { value: "222", label: "Chichewa" },
  { value: "299", label: "Chinese" },
  { value: "545", label: "Chinese, Min Nan" },
  { value: "546", label: "Chinese, Yue" },
  { value: "547", label: "Chinese, Yuh" },
  { value: "126", label: "Chowchau" },
  { value: "548", label: "Chung Shan" },
  { value: "549", label: "Comorian" },
  { value: "012", label: "Concani" },
  { value: "400", label: "Creole" },
  { value: "550", label: "Creole, Haiti" },
  { value: "098", label: "Croatian" },
  { value: "113", label: "Czech" },
  { value: "551", label: "Dangbe" },
  { value: "142", label: "Danish" },
  { value: "195", label: "Dari" },
  { value: "552", label: "Dari, Peve" },
  { value: "553", label: "Dari/Farsi, Eastern" },
  { value: "090", label: "Deaf-mute" },
  { value: "554", label: "Dendi" },
  { value: "555", label: "Dhopadhola" },
  { value: "556", label: "Diakanke" },
  { value: "557", label: "Dinka, Northeastern" },
  { value: "558", label: "Dinka, Northwestern" },
  { value: "559", label: "Dinka, South Central" },
  { value: "560", label: "Dinka, Southern" },
  { value: "561", label: "Dinka, Southwestern, Twi, Tuic" },
  { value: "135", label: "Dioula" },
  { value: "562", label: "Divehi" },
  { value: "563", label: "Divehi, Maldivian" },
  { value: "564", label: "Dogri" },
  { value: "117", label: "Dutch" },
  { value: "565", label: "Eastern Armenian" },
  { value: "210", label: "Edo" },
  { value: "566", label: "Edo, Kailo, Ledo" },
  { value: "177", label: "Efik" },
  { value: "001", label: "English" },
  { value: "567", label: "Enping" },
  { value: "568", label: "Eritrean" },
  { value: "178", label: "Esan" },
  { value: "103", label: "Estonian" },
  { value: "166", label: "Ewe" },
  { value: "192", label: "Facilitator/Articulator" },
  { value: "232", label: "Fang" },
  { value: "167", label: "Fanti" },
  { value: "223", label: "Farsi" },
  { value: "569", label: "Farsi, Western" },
  { value: "570", label: "Fiji" },
  { value: "571", label: "Findhi" },
  { value: "141", label: "Finnish" },
  { value: "118", label: "Flemish" },
  { value: "572", label: "Fon" },
  { value: "017", label: "Foochow" },
  { value: "023", label: "Foullah" },
  { value: "573", label: "Frafra" },
  { value: "574", label: "Frafra, Gurenne" },
  { value: "002", label: "French" },
  { value: "575", label: "Fujian" },
  { value: "181", label: "Fukien" },
  { value: "170", label: "Fulani" },
  { value: "091", label: "Fuqing" },
  { value: "576", label: "Futa" },
  { value: "168", label: "Ga" },
  { value: "577", label: "Ga, Adangme-Krobo" },
  { value: "151", label: "Gaelic" },
  { value: "578", label: "Georgian" },
  { value: "116", label: "German" },
  { value: "579", label: "Gio" },
  { value: "580", label: "Gio, Gio-Dan" },
  { value: "130", label: "Greek" },
  { value: "138", label: "Guerze" },
  { value: "330", label: "Gujarati" },
  { value: "581", label: "Gurage" },
  { value: "582", label: "Gurage, East" },
  { value: "583", label: "Gurage, North" },
  { value: "584", label: "Gurage, West" },
  { value: "585", label: "Guyanese" },
  { value: "586", label: "Guyroti" },
  { value: "587", label: "Gypsy" },
  { value: "741", label: "Hadiyya" },
  { value: "020", label: "Hainanese" },
  { value: "298", label: "Hakka" },
  { value: "018", label: "Harara" },
  { value: "019", label: "Harary" },
  { value: "215", label: "Hargar" },
  { value: "029", label: "Hasanya" },
  { value: "200", label: "Hausa" },
  { value: "253", label: "Hebrew" },
  { value: "588", label: "Hebrew, Yemen" },
  { value: "589", label: "Henan/Jinyu" },
  { value: "021", label: "Hiligaynon" },
  { value: "321", label: "Hindi" },
  { value: "590", label: "Hindi Dogri" },
  { value: "591", label: "Hindi, Fijian" },
  { value: "592", label: "Hindi, Hin, Nyaheun" },
  { value: "073", label: "Hindko" },
  { value: "593", label: "Hindko, Northern" },
  { value: "594", label: "Hindko, Southern" },
  { value: "595", label: "Hindu, Hindi, Caribbean" },
  { value: "182", label: "Hokkien" },
  { value: "596", label: "Hubei" },
  { value: "597", label: "Huizhou/Yanzhou" },
  { value: "598", label: "Hunan/Xiang" },
  { value: "112", label: "Hungarian" },
  { value: "022", label: "Ibibio" },
  { value: "335", label: "Icelandic" },
  { value: "205", label: "Igbo" },
  { value: "024", label: "Igorot" },
  { value: "184", label: "Iiongo" },
  { value: "599", label: "Ika" },
  { value: "025", label: "Ilican" },
  { value: "600", label: "Ilocano" },
  { value: "304", label: "Indonesian" },
  { value: "601", label: "Interp. Not Required" },
  { value: "602", label: "Ishen" },
  { value: "603", label: "Isoko" },
  { value: "123", label: "Italian" },
  { value: "604", label: "Itshekiri" },
  { value: "225", label: "Izi" },
  { value: "605", label: "Jadgali, Pakistan" },
  { value: "606", label: "Jamaican" },
  { value: "303", label: "Japanese" },
  { value: "030", label: "Javanese" },
  { value: "607", label: "Jianxi" },
  { value: "040", label: "Jolay" },
  { value: "608", label: "Kabyle" },
  { value: "900", label: "Kacchi" },
  { value: "609", label: "Kaiping" },
  { value: "026", label: "Kakwa" },
  { value: "185", label: "Kandahari" },
  { value: "610", label: "Kangri, India" },
  { value: "611", label: "Kangri, Kanjari" },
  { value: "174", label: "Kankani" },
  { value: "612", label: "Kannada" },
  { value: "613", label: "Kaonde, Dari" },
  { value: "027", label: "Kashmiri" },
  { value: "740", label: "Kazakh" },
  { value: "614", label: "Kepelle" },
  { value: "311", label: "Khmer" },
  { value: "615", label: "Kiboma" },
  { value: "186", label: "Kihavu" },
  { value: "129", label: "Kikongo" },
  { value: "616", label: "Kikuyu" },
  { value: "617", label: "Kikuyu, Gikuyu" },
  { value: "618", label: "Kinaraya" },
  { value: "191", label: "Kinyarwanda" },
  { value: "619", label: "Kinyarwanda, Rwanda" },
  { value: "031", label: "Kirundi" },
  { value: "620", label: "Kirundi, Rundi" },
  { value: "213", label: "Kiswahili" },
  { value: "028", label: "Konkani" },
  { value: "305", label: "Korean" },
  { value: "042", label: "Krio" },
  { value: "621", label: "Krobo" },
  { value: "622", label: "Kru, Klao" },
  { value: "623", label: "Kru, Krumen, Tepo" },
  { value: "252", label: "Kurdish" },
  { value: "624", label: "Kurdish Bandinani, Behdini" },
  { value: "625", label: "Kurdish-Central, Kurdi, Sorani" },
  { value: "626", label: "Kurdish-Northern, Kurmanji," },
  { value: "627", label: "Kwale, Nigeria" },
  { value: "628", label: "Kwale, Papua" },
  { value: "312", label: "Laotian" },
  { value: "629", label: "Lateh" },
  { value: "104", label: "Latvian" },
  { value: "124", label: "Lebanese" },
  { value: "032", label: "Lengie" },
  { value: "630", label: "Limba" },
  { value: "044", label: "Lingala" },
  { value: "631", label: "Linyawanda" },
  { value: "105", label: "Lithuanian" },
  { value: "139", label: "Lowma" },
  { value: "632", label: "Luba-Kasai" },
  { value: "033", label: "Luganda" },
  { value: "034", label: "Lugisu" },
  { value: "633", label: "Luo" },
  { value: "035", label: "Lutoro" },
  { value: "111", label: "Macedonian" },
  { value: "036", label: "Macena" },
  { value: "634", label: "Maghreb" },
  { value: "137", label: "Mahou" },
  { value: "037", label: "Makonde" },
  { value: "226", label: "Makua" },
  { value: "046", label: "Malagasy" },
  { value: "310", label: "Malay" },
  { value: "323", label: "Malayalam" },
  { value: "635", label: "Malgache, Malagasy" },
  { value: "136", label: "Maligo" },
  { value: "636", label: "Malinke, Jula" },
  { value: "188", label: "Maltese" },
  { value: "301", label: "Mandarin" },
  { value: "637", label: "Mandiga, Mandinga" },
  { value: "172", label: "Mandingo" },
  { value: "638", label: "Mandingo, Maninka" },
  { value: "639", label: "Mandingo, Manya" },
  { value: "224", label: "Maninka" },
  { value: "640", label: "Mano" },
  { value: "641", label: "Marakha" },
  { value: "332", label: "Marathi" },
  { value: "500", label: "Masaba" },
  { value: "642", label: "Mashi" },
  { value: "643", label: "Maymay, Somalia" },
  { value: "050", label: "Mende" },
  { value: "644", label: "Meru" },
  { value: "133", label: "Mina" },
  { value: "645", label: "Mina, Gen-Gbe" },
  { value: "646", label: "Mirpuri" },
  { value: "038", label: "Mizo" },
  { value: "647", label: "Moldovan" },
  { value: "648", label: "Moldovan, Romanian" },
  { value: "403", label: "Mongolian" },
  { value: "649", label: "Mongolian, Halh" },
  { value: "650", label: "Moor, Bimoba" },
  { value: "134", label: "Moore" },
  { value: "651", label: "Moore, Burkina" },
  { value: "652", label: "Moore, Waropen" },
  { value: "653", label: "Morisyen" },
  { value: "655", label: "Nahuatl, Classical" },
  { value: "656", label: "Navajo" },
  { value: "654", label: "Ndebele" },
  { value: "657", label: "Ndebele, South Africa" },
  { value: "658", label: "Ndebele, Zimbabwe" },
  { value: "659", label: "Ndjamena" },
  { value: "320", label: "Nepali" },
  { value: "660", label: "Nigerian, Pidgin" },
  { value: "661", label: "Nigerien" },
  { value: "662", label: "Nobiin" },
  { value: "143", label: "Norwegian" },
  { value: "663", label: "Nuer" },
  { value: "664", label: "Nyanja" },
  { value: "051", label: "Nzema" },
  { value: "233", label: "Okpe" },
  { value: "665", label: "Ora" },
  { value: "333", label: "Oriya" },
  { value: "218", label: "Oromo" },
  { value: "666", label: "Oromo, Borana-Arsi-Gujii" },
  { value: "667", label: "Oromo, Qotu" },
  { value: "668", label: "Oromo, Qotu, West Central" },
  { value: "039", label: "Osal" },
  { value: "499", label: "Other" },
  { value: "669", label: "Ouighour" },
  { value: "041", label: "Pahari" },
  { value: "043", label: "Pampango" },
  { value: "670", label: "Pangasinan" },
  { value: "326", label: "Pashto" },
  { value: "671", label: "Pashto, Central" },
  { value: "672", label: "Pashto, Southern" },
  { value: "251", label: "Persian" },
  { value: "219", label: "Peul" },
  { value: "673", label: "Peul, Benin-Togo" },
  { value: "674", label: "Peul, Bororro" },
  { value: "675", label: "Peul, Fulfulde, Adamawa" },
  { value: "676", label: "Peul, Fulfulde, Jelgoore" },
  { value: "045", label: "Phuockien" },
  { value: "083", label: "Pidgin" },
  { value: "677", label: "Pidgin English" },
  { value: "678", label: "Piugon" },
  { value: "115", label: "Polish" },
  { value: "122", label: "Portuguese" },
  { value: "679", label: "Portuguese, Angola" },
  { value: "680", label: "Portuguese, Brazil" },
  { value: "681", label: "Portuguese, Guinea-Bissau" },
  { value: "087", label: "Poular" },
  { value: "324", label: "Punjabi" },
  { value: "682", label: "Pushta" },
  { value: "683", label: "Pushta, Pushto" },
  { value: "684", label: "Pu-Xian" },
  { value: "685", label: "Quechua" },
  { value: "686", label: "Rindre" },
  { value: "901", label: "Rohingya" },
  { value: "687", label: "Romani, Campathian" },
  { value: "688", label: "Romani, Carpathian" },
  { value: "689", label: "Romani, Cigaly" },
  { value: "690", label: "Romani, Cigany" },
  { value: "691", label: "Romani, Vlach" },
  { value: "692", label: "Romani, Vlach, Gypsy" },
  { value: "108", label: "Romanian" },
  { value: "693", label: "Ronga" },
  { value: "047", label: "Rukiga" },
  { value: "048", label: "Runyankole" },
  { value: "101", label: "Russian" },
  { value: "402", label: "Samoan" },
  { value: "694", label: "Samoli" },
  { value: "695", label: "Sango" },
  { value: "696", label: "Santi" },
  { value: "697", label: "Sarahuley" },
  { value: "698", label: "Saraiki" },
  { value: "061", label: "Scoula" },
  { value: "196", label: "Sechuan" },
  { value: "699", label: "Sefwi" },
  { value: "099", label: "Serbian" },
  { value: "109", label: "Serbo-Croatian" },
  { value: "052", label: "Sesotho" },
  { value: "179", label: "Seswi" },
  { value: "738", label: "Setswana" },
  { value: "088", label: "Seychelles" },
  { value: "700", label: "Seychelles,Creole Fre.,Seselwa" },
  { value: "701", label: "Shai" },
  { value: "057", label: "Shan" },
  { value: "702", label: "Shan Dong" },
  { value: "703", label: "Shan Tao" },
  { value: "214", label: "Shanghainese" },
  { value: "013", label: "Shansai" },
  { value: "704", label: "Shanxi" },
  { value: "705", label: "Shona" },
  { value: "706", label: "Sichuan/Szechuan" },
  { value: "707", label: "Sign Language French" },
  { value: "128", label: "Sindhi" },
  { value: "328", label: "Sinhala" },
  { value: "708", label: "Siyap" },
  { value: "114", label: "Slovak" },
  { value: "110", label: "Slovenian" },
  { value: "209", label: "Somali" },
  { value: "709", label: "Somba" },
  { value: "175", label: "Soninke" },
  { value: "710", label: "Soninke, Marakha" },
  { value: "055", label: "Sotho" },
  { value: "711", label: "Sotho, Northern" },
  { value: "712", label: "Sotho, Southern" },
  { value: "120", label: "Spanish" },
  { value: "190", label: "Suesue" },
  { value: "056", label: "Sukuma" },
  { value: "065", label: "Susu" },
  { value: "201", label: "Swahili" },
  { value: "713", label: "Swahili/Congo" },
  { value: "714", label: "Swahili/Kenya" },
  { value: "715", label: "Swati" },
  { value: "716", label: "Swatow" },
  { value: "140", label: "Swedish" },
  { value: "309", label: "Tagalog" },
  { value: "059", label: "Taichew" },
  { value: "062", label: "Taishanese" },
  { value: "717", label: "Taiwanese" },
  { value: "718", label: "Tajiki" },
  { value: "327", label: "Tamil" },
  { value: "194", label: "Tari" },
  { value: "719", label: "Tatar" },
  { value: "189", label: "Tatshanese" },
  { value: "334", label: "Telugu" },
  { value: "720", label: "Temne" },
  { value: "060", label: "Teochew" },
  { value: "307", label: "Thai" },
  { value: "297", label: "Tibetan" },
  { value: "054", label: "Tichiew" },
  { value: "721", label: "Tigre" },
  { value: "722", label: "Tigrea, Tigre" },
  { value: "162", label: "Tigrinya" },
  { value: "176", label: "Timini" },
  { value: "082", label: "Tiv" },
  { value: "049", label: "Tooro" },
  { value: "220", label: "Tshiluba" },
  { value: "131", label: "Turkish" },
  { value: "723", label: "Turkmen" },
  { value: "724", label: "Turkoman" },
  { value: "125", label: "Twi" },
  { value: "234", label: "Uhrobo" },
  { value: "161", label: "Uigrigma" },
  { value: "106", label: "Ukrainian" },
  { value: "725", label: "Ukwuani, Ukwuani-Aboh" },
  { value: "063", label: "Umbundu" },
  { value: "064", label: "Unama" },
  { value: "325", label: "Urdu" },
  { value: "257", label: "Uzbek" },
  { value: "306", label: "Vietnamese" },
  { value: "066", label: "Visayan" },
  { value: "067", label: "Waray-Waray" },
  { value: "150", label: "Welsh" },
  { value: "726", label: "Wenzhou" },
  { value: "173", label: "Wolof" },
  { value: "727", label: "Xangawe" },
  { value: "206", label: "Xhosa" },
  { value: "728", label: "Xin Hui" },
  { value: "729", label: "Xitswa" },
  { value: "730", label: "Xitswa, Twsa" },
  { value: "731", label: "Yacooba" },
  { value: "221", label: "Yao" },
  { value: "732", label: "Yemenite" },
  { value: "197", label: "Yiboe" },
  { value: "100", label: "Yiddish" },
  { value: "733", label: "Yinping" },
  { value: "207", label: "Yoruba" },
  { value: "734", label: "Yue Yang" },
  { value: "735", label: "Yugoslavian" },
  { value: "736", label: "Zaza" },
  { value: "737", label: "Zaza, Kirmanjki" },
  { value: "068", label: "Zshiluba" },
  { value: "069", label: "Zuganda" },
  { value: "208", label: "Zulu" }
]