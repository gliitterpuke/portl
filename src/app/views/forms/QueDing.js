import React from 'react';
import { Prompt } from 'react-router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { Grid, FormLabel, FormControlLabel } from '@material-ui/core/';
import axios from "axios";
import localStorageService from "../../services/localStorageService";
import { SimpleCard, Breadcrumb } from 'matx';
import history from "../../../history"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
} 
const useStyles = makeStyles(theme => ({
  buttonProgress: {
    marginBottom: -8,
    marginLeft: -60,
    position: 'relative'
  },
  button: {
    margin: theme.spacing(1)
  },
  snack: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    textColor: '#FFFFFF',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  }
}));

export const QueDing = ({ formData, prevStep, nextStep, currentApp }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const fieldRef = React.useRef(null);
  React.useEffect(() => {
    fieldRef.current.scrollIntoView();
  }, []);
  const { 
    PersonalDetails_ServiceIn_ServiceIn,
    PersonalDetails_VisaType_VisaType,
    PersonalDetails_Name_FamilyName,
    PersonalDetails_Name_GivenName,
    PersonalDetails_AliasName_AliasFamilyName,
    PersonalDetails_AliasName_AliasGivenName,
    PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator,
    PersonalDetails_Sex_Sex,
    PersonalDetails_DOBYear,
    PersonalDetails_DOBMonth,
    PersonalDetails_DOBDay,
    PersonalDetails_PlaceBirthCity,
    PBC,
    PersonalDetails_PlaceBirthCountry,
    PersonalDetails_Citizenship_Citizenship,
    citizenship,
    ctr,
    PersonalDetails_CurrentCOR_Row2_Country,
    PersonalDetails_CurrentCOR_Row2_Status,
    PersonalDetails_CurrentCOR_Row2_Other,
    PersonalDetails_CurrentCOR_Row2_FromDate,
    PersonalDetails_CurrentCOR_Row2_ToDate,
    PersonalDetails_PCRIndicator,
    pct,
    PersonalDetails_PreviousCOR_Row2_Country,
    PersonalDetails_PreviousCOR_Row2_Status,
    PersonalDetails_PreviousCOR_Row2_Other,
    PersonalDetails_PreviousCOR_Row2_FromDate,
    PersonalDetails_PreviousCOR_Row2_ToDate,
    PCR2,
    pct2,
    PersonalDetails_PreviousCOR_Row3_Country,
    PersonalDetails_PreviousCOR_Row3_Status,
    PersonalDetails_PreviousCOR_Row3_Other,
    PersonalDetails_PreviousCOR_Row3_FromDate,
    PersonalDetails_PreviousCOR_Row3_ToDate,
    PersonalDetails_SameAsCORIndicator,
    cwa,
    PersonalDetails_CountryWhereApplying_Row2_Country,
    PersonalDetails_CountryWhereApplying_Row2_Status,
    PersonalDetails_CountryWhereApplying_Row2_Other,
    PersonalDetails_CountryWhereApplying_Row2_FromDate,
    PersonalDetails_CountryWhereApplying_Row2_ToDate,
    MaritalStatus_SectionA_MaritalStatus,
    MaritalStatus_SectionA_DateofMarriage,
    MaritalStatus_SectionA_FamilyName,
    MaritalStatus_SectionA_GivenName,
    MaritalStatus_SectionA_PrevMarriedIndicator,
    MaritalStatus_SectionA_PMFamilyName,
    MaritalStatus_SectionA_PMGivenName_GivenName,
    MaritalStatus_SectionA_PrevSpouse_DOBYear,
    MaritalStatus_SectionA_PrevSpouse_DOBMonth,
    MaritalStatus_SectionA_PrevSpouse_DOBDay,
    MaritalStatus_SectionA_TypeOfRelationship,
    MaritalStatus_SectionA_FromDate,
    MaritalStatus_SectionA_ToDate_ToDate,
    natLang,
    MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang,
    MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate,
    MaritalStatus_SectionA_Languages_languages_lov,
    MaritalStatus_SectionA_Languages_LanguageTest,
    MaritalStatus_SectionA_PassportNum_PassportNum,
    pcoi,
    MaritalStatus_SectionA_Passport_CountryofIssue_CountryofIssue,
    MaritalStatus_SectionA_Passport_IssueDate_IssueDate,
    MaritalStatus_SectionA_Passport_ExpiryDate,
    MaritalStatus_SectionA_Passport_TaiwanPIN,
    MaritalStatus_SectionA_Passport_IsraelPassportIndicator,
    natID_q1_natIDIndicator,
    natID_natIDdocs_DocNum_DocNum,
    nidcoi,
    natID_natIDdocs_CountryofIssue_CountryofIssue,
    natID_natIDdocs_IssueDate_IssueDate,
    natID_natIDdocs_ExpiryDate,
    USCard_q1_usCardIndicator,
    USCard_usCarddocs_DocNum_DocNum,
    USCard_usCardDocs_ExpiryDate,
    ContactInformation_contact_AddressRow1_POBox_POBox,
    ContactInformation_contact_AddressRow1_Apt_AptUnit,
    ContactInformation_contact_AddressRow1_StreetNum_StreetNum,
    ContactInformation_contact_AddressRow1_Streetname_Streetname,
    ContactInformation_contact_AddressRow2_CityTow_CityTown,
    cmct,
    cmps,
    ContactInformation_contact_AddressRow2_Country_Country,
    ContactInformation_contact_AddressRow2_ProvinceState_ProvinceState,
    ContactInformation_contact_AddressRow2_PostalCode_PostalCode,
    ContactInformation_contact_AddressRow2_District,
    ContactInformation_contact_SameAsMailingIndicator,
    ContactInformation_contact_ResidentialAddressRow1_AptUnit_AptUnit,
    ContactInformation_contact_ResidentialAddressRow1_StreetNum_StreetNum,
    ContactInformation_contact_ResidentialAddressRow1_StreetName_Streetname,
    ContactInformation_contact_ResidentialAddressRow1_CityTown_CityTown,
    ract,
    raps,
    ContactInformation_contact_ResidentialAddressRow2_Country_Country,
    ContactInformation_contact_ResidentialAddressRow2_ProvinceState_ProvinceState,
    ContactInformation_contact_ResidentialAddressRow2_PostalCode_PostalCode,
    ContactInformation_contact_ResidentialAddressRow2_District,
    PhoneLoc,
    ContactInformation_contact_PhoneNumbers_Phone_Type,
    ContactInformation_contact_PhoneNumbers_Phone_CanadaUS,
    ContactInformation_contact_PhoneNumbers_Phone_Other,
    ContactInformation_contact_PhoneNumbers_Phone_NumberExt,
    ContactInformation_contact_PhoneNumbers_Phone_NumberCountry,
    ANumber,
    ContactInformation_contact_PhoneNumbers_Phone_ActualNumber,
    ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber,
    altphone,
    PhoneLoc2,
    ContactInformation_contact_PhoneNumbers_AltPhone_Type,
    ContactInformation_contact_PhoneNumbers_AltPhone_CanadaUS,
    ContactInformation_contact_PhoneNumbers_AltPhone_Other,
    ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt,
    ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry,
    AANumber,
    ContactInformation_contact_PhoneNumbers_AltPhone_ActualNumber,
    ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber,
    faxnum,
    FaxLoc,
    ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_CanadaUS,
    ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_Other,
    ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt,
    ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry,
    FANumber,
    ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_ActualNumber,
    ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_IntlNumber_IntlNumber,
    ContactInformation_contact_PhoneNumbers_FaxEmail_Email,
    DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit,
    DetailsOfVisit_PurposeRow1_Other,
    DetailsOfVisit_PurposeRow1_HowLongStay_FromDate,
    DetailsOfVisit_PurposeRow1_HowLongStay_ToDate,
    DetailsOfVisit_PurposeRow1_Funds_Funds,
    DetailsOfVisit_Contacts_Row1_Name_Name,
    DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe,
    DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada,
    Contacts_Row2_Name_Name,
    Contacts_Row2_Relationship_RelationshipToMe,
    Contacts_Row2_AddressInCanada_AddressInCanada,
    Occupation_OccupationRow1_FromYear,
    Occupation_OccupationRow1_FromMonth,
    Occupation_OccupationRow1_ToYear,
    Occupation_OccupationRow1_ToMonth,
    Occupation_OccupationRow1_Occupation_Occupation,
    Occupation_OccupationRow1_Employer,
    Occupation_OccupationRow1_CityTown_CityTown,
    occct,
    occps,
    Occupation_OccupationRow1_Country_Country,
    Occupation_OccupationRow1_ProvState,
    PrevOcc,
    Occupation_OccupationRow2_FromYear,
    Occupation_OccupationRow2_FromMonth,
    Occupation_OccupationRow2_ToYear,
    Occupation_OccupationRow2_ToMonth,
    Occupation_OccupationRow2_Occupation_Occupation,
    Occupation_OccupationRow2_Employer,
    Occupation_OccupationRow2_CityTown_CityTown,
    occ2ct,
    occ2ps,
    Occupation_OccupationRow2_Country_Country,
    Occupation_OccupationRow2_ProvState,
    PrevOcc2,
    Occupation_OccupationRow3_FromYear,
    Occupation_OccupationRow3_FromMonth,
    Occupation_OccupationRow3_ToYear,
    Occupation_OccupationRow3_ToMonth,
    Occupation_OccupationRow3_Occupation_Occupation,
    Occupation_OccupationRow3_Employer,
    Occupation_OccupationRow3_CityTown_CityTown,
    occ3ct,
    occ3ps,
    Occupation_OccupationRow3_Country_Country,
    Occupation_OccupationRow3_ProvState,
    Education_EducationIndicator,
    Education_Edu_Row1_FromYear,
    Education_Edu_Row1_FromMonth,
    Education_Edu_Row1_ToYear,
    Education_Edu_Row1_ToMonth,
    Education_Edu_Row1_FieldOfStudy,
    Education_Edu_Row1_School,
    Education_Edu_Row1_CityTown,
    educt,
    Education_Edu_Row1_Country_Country,
    edups,
    Education_Edu_Row1_ProvState,
    BackgroundInfo_Choice,
    BackgroundInfo_Details_MedicalDetails,
    BackgroundInfo2_VisaChoice1,
    BackgroundInfo2_VisaChoice2,
    BackgroundInfo2_Details_refusedDetails,
    BackgroundInfo2_Details_VisaChoice3,
    BackgroundInfo3_Choice,
    BackgroundInfo3_details,
    Military_Choice,
    Military_militaryServiceDetails,
    Occupation_Choice,
    GovPosition_Choice, 
 } = formData;
 
 const payload = {
  PersonalDetails_ServiceIn_ServiceIn,
  PersonalDetails_VisaType_VisaType,
  PersonalDetails_Name_FamilyName,
  PersonalDetails_Name_GivenName,
  PersonalDetails_AliasName_AliasFamilyName,
  PersonalDetails_AliasName_AliasGivenName,
  PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator,
  PersonalDetails_Sex_Sex,
  PersonalDetails_DOBYear,
  PersonalDetails_DOBMonth,
  PersonalDetails_DOBDay,
  PersonalDetails_PlaceBirthCity,
  PersonalDetails_PlaceBirthCountry,
  PersonalDetails_Citizenship_Citizenship,
  PersonalDetails_CurrentCOR_Row2_Country,
  PersonalDetails_CurrentCOR_Row2_Status,
  PersonalDetails_CurrentCOR_Row2_Other,
  PersonalDetails_CurrentCOR_Row2_FromDate,
  PersonalDetails_CurrentCOR_Row2_ToDate,
  PersonalDetails_PCRIndicator,
  PersonalDetails_PreviousCOR_Row2_Country,
  PersonalDetails_PreviousCOR_Row2_Status,
  PersonalDetails_PreviousCOR_Row2_Other,
  PersonalDetails_PreviousCOR_Row2_FromDate,
  PersonalDetails_PreviousCOR_Row2_ToDate,
  PersonalDetails_PreviousCOR_Row3_Country,
  PersonalDetails_PreviousCOR_Row3_Status,
  PersonalDetails_PreviousCOR_Row3_Other,
  PersonalDetails_PreviousCOR_Row3_FromDate,
  PersonalDetails_PreviousCOR_Row3_ToDate,
  PersonalDetails_SameAsCORIndicator,
  PersonalDetails_CountryWhereApplying_Row2_Country,
  PersonalDetails_CountryWhereApplying_Row2_Status,
  PersonalDetails_CountryWhereApplying_Row2_Other,
  PersonalDetails_CountryWhereApplying_Row2_FromDate,
  PersonalDetails_CountryWhereApplying_Row2_ToDate,
  MaritalStatus_SectionA_MaritalStatus,
  MaritalStatus_SectionA_DateofMarriage,
  MaritalStatus_SectionA_FamilyName,
  MaritalStatus_SectionA_GivenName,
  MaritalStatus_SectionA_PrevMarriedIndicator,
  MaritalStatus_SectionA_PMFamilyName,
  MaritalStatus_SectionA_PMGivenName_GivenName,
  MaritalStatus_SectionA_PrevSpouse_DOBYear,
  MaritalStatus_SectionA_PrevSpouse_DOBMonth,
  MaritalStatus_SectionA_PrevSpouse_DOBDay,
  MaritalStatus_SectionA_TypeOfRelationship,
  MaritalStatus_SectionA_FromDate,
  MaritalStatus_SectionA_ToDate_ToDate,
  MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang,
  MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate,
  MaritalStatus_SectionA_Languages_languages_lov,
  MaritalStatus_SectionA_Languages_LanguageTest,
  MaritalStatus_SectionA_PassportNum_PassportNum,
  MaritalStatus_SectionA_Passport_CountryofIssue_CountryofIssue,
  MaritalStatus_SectionA_Passport_IssueDate_IssueDate,
  MaritalStatus_SectionA_Passport_ExpiryDate,
  MaritalStatus_SectionA_Passport_TaiwanPIN,
  MaritalStatus_SectionA_Passport_IsraelPassportIndicator,
  natID_q1_natIDIndicator,
  natID_natIDdocs_DocNum_DocNum,
  natID_natIDdocs_CountryofIssue_CountryofIssue,
  natID_natIDdocs_IssueDate_IssueDate,
  natID_natIDdocs_ExpiryDate,
  USCard_q1_usCardIndicator,
  USCard_usCarddocs_DocNum_DocNum,
  USCard_usCardDocs_ExpiryDate,
  ContactInformation_contact_AddressRow1_POBox_POBox,
  ContactInformation_contact_AddressRow1_Apt_AptUnit,
  ContactInformation_contact_AddressRow1_StreetNum_StreetNum,
  ContactInformation_contact_AddressRow1_Streetname_Streetname,
  ContactInformation_contact_AddressRow2_CityTow_CityTown,
  ContactInformation_contact_AddressRow2_Country_Country,
  ContactInformation_contact_AddressRow2_ProvinceState_ProvinceState,
  ContactInformation_contact_AddressRow2_PostalCode_PostalCode,
  ContactInformation_contact_AddressRow2_District,
  ContactInformation_contact_SameAsMailingIndicator,
  ContactInformation_contact_ResidentialAddressRow1_AptUnit_AptUnit,
  ContactInformation_contact_ResidentialAddressRow1_StreetNum_StreetNum,
  ContactInformation_contact_ResidentialAddressRow1_StreetName_Streetname,
  ContactInformation_contact_ResidentialAddressRow1_CityTown_CityTown,
  ContactInformation_contact_ResidentialAddressRow2_Country_Country,
  ContactInformation_contact_ResidentialAddressRow2_ProvinceState_ProvinceState,
  ContactInformation_contact_ResidentialAddressRow2_PostalCode_PostalCode,
  ContactInformation_contact_ResidentialAddressRow2_District,
  ContactInformation_contact_PhoneNumbers_Phone_Type,
  ContactInformation_contact_PhoneNumbers_Phone_CanadaUS,
  ContactInformation_contact_PhoneNumbers_Phone_Other,
  ContactInformation_contact_PhoneNumbers_Phone_NumberExt,
  ContactInformation_contact_PhoneNumbers_Phone_NumberCountry,
  ContactInformation_contact_PhoneNumbers_Phone_ActualNumber,
  ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber,
  ContactInformation_contact_PhoneNumbers_AltPhone_Type,
  ContactInformation_contact_PhoneNumbers_AltPhone_CanadaUS,
  ContactInformation_contact_PhoneNumbers_AltPhone_Other,
  ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt,
  ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry,
  ContactInformation_contact_PhoneNumbers_AltPhone_ActualNumber,
  ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber,
  ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_CanadaUS,
  ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_Other,
  ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt,
  ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry,
  ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_ActualNumber,
  ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_IntlNumber_IntlNumber,
  ContactInformation_contact_PhoneNumbers_FaxEmail_Email,
  DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit,
  DetailsOfVisit_PurposeRow1_Other,
  DetailsOfVisit_PurposeRow1_HowLongStay_FromDate,
  DetailsOfVisit_PurposeRow1_HowLongStay_ToDate,
  DetailsOfVisit_PurposeRow1_Funds_Funds,
  DetailsOfVisit_Contacts_Row1_Name_Name,
  DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe,
  DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada,
  Contacts_Row2_Name_Name,
  Contacts_Row2_Relationship_RelationshipToMe,
  Contacts_Row2_AddressInCanada_AddressInCanada,
  Occupation_OccupationRow1_FromYear,
  Occupation_OccupationRow1_FromMonth,
  Occupation_OccupationRow1_ToYear,
  Occupation_OccupationRow1_ToMonth,
  Occupation_OccupationRow1_Occupation_Occupation,
  Occupation_OccupationRow1_Employer,
  Occupation_OccupationRow1_CityTown_CityTown,
  Occupation_OccupationRow1_Country_Country,
  Occupation_OccupationRow1_ProvState,
  Occupation_OccupationRow2_FromYear,
  Occupation_OccupationRow2_FromMonth,
  Occupation_OccupationRow2_ToYear,
  Occupation_OccupationRow2_ToMonth,
  Occupation_OccupationRow2_Occupation_Occupation,
  Occupation_OccupationRow2_Employer,
  Occupation_OccupationRow2_CityTown_CityTown,
  Occupation_OccupationRow2_Country_Country,
  Occupation_OccupationRow2_ProvState,
  Occupation_OccupationRow3_FromYear,
  Occupation_OccupationRow3_FromMonth,
  Occupation_OccupationRow3_ToYear,
  Occupation_OccupationRow3_ToMonth,
  Occupation_OccupationRow3_Occupation_Occupation,
  Occupation_OccupationRow3_Employer,
  Occupation_OccupationRow3_CityTown_CityTown,
  Occupation_OccupationRow3_Country_Country,
  Occupation_OccupationRow3_ProvState,
  Education_EducationIndicator,
  Education_Edu_Row1_FromYear,
  Education_Edu_Row1_FromMonth,
  Education_Edu_Row1_ToYear,
  Education_Edu_Row1_ToMonth,
  Education_Edu_Row1_FieldOfStudy,
  Education_Edu_Row1_School,
  Education_Edu_Row1_CityTown,
  Education_Edu_Row1_Country_Country,
  Education_Edu_Row1_ProvState,
  BackgroundInfo_Choice,
  BackgroundInfo_Details_MedicalDetails,
  BackgroundInfo2_VisaChoice1,
  BackgroundInfo2_VisaChoice2,
  BackgroundInfo2_Details_refusedDetails,
  BackgroundInfo2_Details_VisaChoice3,
  BackgroundInfo3_Choice,
  BackgroundInfo3_details,
  Military_Choice,
  Military_militaryServiceDetails,
  Occupation_Choice,
  GovPosition_Choice, 
 }
  const handleSubmit = (event) => {
    setLoading(true);
    setOpen(true)
    let user = localStorageService.getItem("auth_user")
    const auth = {
      headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
    }

    axios.post(`form/imm5257/${user.id}/` + currentApp.id, payload, auth)
      .then(result => { 
      return axios.post("blobs/", result.data, auth)
      .then((response) => {
        user.applications.push(response.data)
        localStorageService.setItem("auth_user", user)
        setLoading(false);
        alert('Success! Taking you back to your application')
        window.location.reload()
        return response;
      })
      
    })
    .catch(error => {
      alert('Request timed out; please try again later')
      setLoading(false);
    }) 
}
  return (
    <>
      <div className="upload-form m-sm-30"  ref={fieldRef}>
      <SimpleCard>
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Temporary Resident Visa" }]} />
        </div>
        <Typography variant="h6">Confirmation</Typography>  
        <br/>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <h4>Application</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Service Language</h5> {PersonalDetails_ServiceIn_ServiceIn
            .replace('01', 'English').replace('02', 'French')}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Type of Visa</h5> {PersonalDetails_VisaType_VisaType}
          </Grid>

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Personal Information</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>First Name</h5> {PersonalDetails_Name_GivenName}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Last Name</h5> {PersonalDetails_Name_FamilyName}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Sex</h5> {PersonalDetails_Sex_Sex}
          </Grid>
          {PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={6}>
            <h5>Other First Name</h5> {PersonalDetails_AliasName_AliasGivenName}
          </Grid>
          )}
          {PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={6}>
            <h5>Other Last Name</h5> {PersonalDetails_AliasName_AliasFamilyName}
          </Grid>
          )}
          <Grid item xs={12} md={6} lg={3}>
            <h5>Birthday</h5> {PersonalDetails_DOBYear + '/' + PersonalDetails_DOBMonth + '/' + PersonalDetails_DOBDay}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>City of Birth</h5> {PersonalDetails_PlaceBirthCity}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country of Birth</h5> {PBC.label}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Citizenship</h5> {citizenship.label}
          </Grid>

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Current Country of Residence</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country</h5> {ctr.label}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Status</h5> 
            {PersonalDetails_CurrentCOR_Row2_Status.replace('01', 'Citizen').replace('02', 'Permanent Resident')
            .replace('03', 'Worker').replace('04', 'Visitor').replace('05', 'Student').replace('06', 'Other')
            .replace('07', 'Protected Person').replace('08', 'Refugee Claimant').replace('09', 'Foreign National')}
          </Grid>
          {PersonalDetails_CurrentCOR_Row2_Status === "06" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Other</h5> {PersonalDetails_CurrentCOR_Row2_Other}
          </Grid>
          )}
          <Grid item xs={12} md={6} lg={3}>
            <h5>From</h5> {PersonalDetails_CurrentCOR_Row2_FromDate}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>To</h5> {PersonalDetails_CurrentCOR_Row2_ToDate}
          </Grid>

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Previous Country/Territory of Residence</h4>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Have you lived in any country outside that of your citizenship/current country/territory in the past 5 years?</h5> {PersonalDetails_PCRIndicator}
          </Grid>
          {PersonalDetails_PCRIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country</h5> {pct.label}
          </Grid>
          )}
          {PersonalDetails_PCRIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Status</h5> {PersonalDetails_PreviousCOR_Row2_Status.replace('01', 'Citizen').replace('02', 'Permanent Resident')
            .replace('03', 'Worker').replace('04', 'Visitor').replace('05', 'Student').replace('06', 'Other')
            .replace('07', 'Protected Person').replace('08', 'Refugee Claimant').replace('09', 'Foreign National')}
          </Grid> 
          )}
          {PersonalDetails_PreviousCOR_Row2_Status === "06" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Other</h5> {PersonalDetails_PreviousCOR_Row2_Other}
          </Grid>
          )}
          {PersonalDetails_PCRIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>From</h5> {PersonalDetails_PreviousCOR_Row2_FromDate}
          </Grid>
          )}
          {PersonalDetails_PCRIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>To</h5> {PersonalDetails_PreviousCOR_Row2_ToDate}
          </Grid>
          )}

          <br />
          {PersonalDetails_PCRIndicator === "Y" && (
          <Grid item xs={12} lg={12}>
            <h4>Additional Country/Territory of Residence</h4>
          </Grid>
          )}
          {PersonalDetails_PCRIndicator === "Y" && (
          <Grid item xs={12} md={12} lg={12}>
            <h5>Do you have another country/territory you wish to list?</h5> {PCR2}
          </Grid>
          )}
          {PCR2 === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country</h5> {pct2.label}
          </Grid>
          )}
          {PCR2 === "Y" && (
           <Grid item xs={12} md={6} lg={3}>
            <h5>Status</h5> {PersonalDetails_PreviousCOR_Row3_Status.replace('01', 'Citizen').replace('02', 'Permanent Resident')
            .replace('03', 'Worker').replace('04', 'Visitor').replace('05', 'Student').replace('06', 'Other')
            .replace('07', 'Protected Person').replace('08', 'Refugee Claimant').replace('09', 'Foreign National')}
          </Grid> 
          )}
          {PersonalDetails_PreviousCOR_Row3_Status === "06" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Other</h5> {PersonalDetails_PreviousCOR_Row3_Other}
          </Grid>
          )}
          {PCR2 === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>From</h5> {PersonalDetails_PreviousCOR_Row3_FromDate}
          </Grid>
          )}
          {PCR2 === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>To</h5> {PersonalDetails_PreviousCOR_Row3_ToDate}
          </Grid>
          )}

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Country Where Applying From</h4>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Same as your current country/territory of residence?</h5> 
            {PersonalDetails_SameAsCORIndicator}
          </Grid>
          {PersonalDetails_PCRIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country</h5> {cwa.label}
          </Grid>
          )}
          {PersonalDetails_PCRIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Status</h5> {PersonalDetails_CountryWhereApplying_Row2_Status.replace('01', 'Citizen').replace('02', 'Permanent Resident')
            .replace('03', 'Worker').replace('04', 'Visitor').replace('05', 'Student').replace('06', 'Other')
            .replace('07', 'Protected Person').replace('08', 'Refugee Claimant').replace('09', 'Foreign National')}
          </Grid>
          )}
          {PersonalDetails_CountryWhereApplying_Row2_Status === "06" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Other</h5> {PersonalDetails_CountryWhereApplying_Row2_Other}
          </Grid>
          )}
          {PersonalDetails_SameAsCORIndicator === "N" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>From</h5> {PersonalDetails_CountryWhereApplying_Row2_FromDate}
          </Grid>
          )}
          {PersonalDetails_SameAsCORIndicator === "N" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>To</h5> {PersonalDetails_CountryWhereApplying_Row2_ToDate}
          </Grid>
          )}

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Marital Status</h4>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Current Status</h5> 
            {MaritalStatus_SectionA_MaritalStatus
            .replace('01', 'Married').replace('02', 'Single').replace('03', 'Common-Law').replace('04', 'Divorced')
            .replace('05', 'Legally Separated').replace('06', 'Widowed').replace('09', 'Annulled Marriage').replace('00', 'Unknown')}
          </Grid>
          {MaritalStatus_SectionA_MaritalStatus === "01" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Date of Marriage</h5> {MaritalStatus_SectionA_DateofMarriage}
          </Grid>
          )}
          {MaritalStatus_SectionA_MaritalStatus ===  "03" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Date of Marriage</h5> {MaritalStatus_SectionA_DateofMarriage}
          </Grid>
          )}
          {MaritalStatus_SectionA_MaritalStatus === "01" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Spouse's First Name</h5> {MaritalStatus_SectionA_GivenName}
          </Grid>
          )}
          {MaritalStatus_SectionA_MaritalStatus ===  "03" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Spouse's First Name</h5> {MaritalStatus_SectionA_GivenName}
          </Grid>
          )}
          {MaritalStatus_SectionA_MaritalStatus === "01" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Spouse's Last Name</h5> {MaritalStatus_SectionA_FamilyName}
          </Grid>
          )}
          {MaritalStatus_SectionA_MaritalStatus ===  "03" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Spouse's Last Name</h5> {MaritalStatus_SectionA_FamilyName}
          </Grid>
          )}

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Previous Marriages</h4>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Were you previously married?</h5> 
            {MaritalStatus_SectionA_PrevMarriedIndicator}
          </Grid>
          {MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Previous Spouse's First Name</h5> {MaritalStatus_SectionA_PMGivenName_GivenName}
          </Grid>
          )}
          {MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Previous Spouse's Last Name</h5> {MaritalStatus_SectionA_PMFamilyName}
          </Grid>
          )}
          {MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Previous Spouse's Birthday</h5> 
            {MaritalStatus_SectionA_PrevSpouse_DOBYear + '/' + MaritalStatus_SectionA_PrevSpouse_DOBMonth + '/' + MaritalStatus_SectionA_PrevSpouse_DOBDay} 
          </Grid>
          )}
          {MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Type of Relationship</h5> 
            {MaritalStatus_SectionA_TypeOfRelationship.replace('01', 'Married').replace('03', 'Common-Law')}
          </Grid>
          )}
          {MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>From</h5> {MaritalStatus_SectionA_FromDate}
          </Grid>
          )}
          {MaritalStatus_SectionA_PrevMarriedIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>To</h5> {MaritalStatus_SectionA_ToDate_ToDate}
          </Grid>
          )}

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Languages</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Native Language</h5> {natLang.label}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>English/French?</h5> {MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate}
          </Grid>
          {MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate === "Both" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Language you're most comfortable in</h5> {MaritalStatus_SectionA_Languages_languages_lov}
          </Grid>
          )}
          <Grid item xs={12} md={6} lg={3}>
            <h5>Have you taken an English Profiency exam?</h5> {MaritalStatus_SectionA_Languages_LanguageTest}
          </Grid>

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Passport Information</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Passport Number</h5> {MaritalStatus_SectionA_PassportNum_PassportNum}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country of Issue</h5> {pcoi.label}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Issue Date</h5> {MaritalStatus_SectionA_Passport_IssueDate_IssueDate}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Expiry Date</h5> {MaritalStatus_SectionA_Passport_ExpiryDate}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Will you be using a Taiwanese passport with your PIN?</h5> {MaritalStatus_SectionA_Passport_TaiwanPIN}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Will you use a National Israeli Passport?</h5> {MaritalStatus_SectionA_Passport_IsraelPassportIndicator}
          </Grid>

          <br />
          <Grid item xs={12} lg={12}>
            <h4>National Identity Document Information</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Do you have a National Identity Document?</h5> {natID_q1_natIDIndicator}
          </Grid>
          {natID_q1_natIDIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Document Number</h5> {natID_natIDdocs_DocNum_DocNum}
          </Grid>
          )}
          {natID_q1_natIDIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country/Territory of Issue</h5> {nidcoi.label}
          </Grid>
          )}
          {natID_q1_natIDIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Issue Date</h5> {natID_natIDdocs_IssueDate_IssueDate}
          </Grid>
          )}
          {natID_q1_natIDIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Expiry Date</h5> {natID_natIDdocs_ExpiryDate}
          </Grid>
          )}

          <br />
          <Grid item xs={12} lg={12}>
            <h4>US PR Card</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Are you a lawful PR of the US with a valid ARC (green card)?</h5> {USCard_q1_usCardIndicator}
          </Grid>
          {USCard_q1_usCardIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Document Number</h5> {USCard_usCarddocs_DocNum_DocNum}
          </Grid>
          )}
          {USCard_q1_usCardIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Expiry Date</h5> {USCard_usCardDocs_ExpiryDate}
          </Grid>
          )}

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Current Mailing Address</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>P.O. Box</h5> {ContactInformation_contact_AddressRow1_POBox_POBox}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Apt/Unit</h5> {ContactInformation_contact_AddressRow1_Apt_AptUnit}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Street Number</h5> {ContactInformation_contact_AddressRow1_StreetNum_StreetNum}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Street Name</h5> {ContactInformation_contact_AddressRow1_Streetname_Streetname}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>City/Town</h5> {ContactInformation_contact_AddressRow2_CityTow_CityTown}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country</h5> {cmct.label}
          </Grid>
          {cmct.label === "Canada" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Province/State</h5> {cmps.label}
          </Grid>
          )}
          {cmct.label === "United States of America" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Province/State</h5> {cmps.label}
          </Grid>
          )}
          <Grid item xs={12} md={6} lg={3}>
            <h5>Postal Code</h5> {ContactInformation_contact_AddressRow2_PostalCode_PostalCode}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>District</h5> {ContactInformation_contact_AddressRow2_District}
          </Grid>

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Residential Address</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Same as Mailing Address?</h5> {ContactInformation_contact_SameAsMailingIndicator}
          </Grid>
          {ContactInformation_contact_SameAsMailingIndicator === "N" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Apt/Unit</h5> {ContactInformation_contact_ResidentialAddressRow1_AptUnit_AptUnit}
          </Grid>
          )}
          {ContactInformation_contact_SameAsMailingIndicator === "N" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Street Number</h5> {ContactInformation_contact_ResidentialAddressRow1_StreetNum_StreetNum}
          </Grid>
          )}
          {ContactInformation_contact_SameAsMailingIndicator === "N" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Street Name</h5> {ContactInformation_contact_ResidentialAddressRow1_StreetName_Streetname}
          </Grid>
          )}
          {ContactInformation_contact_SameAsMailingIndicator === "N" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>City/Town</h5> {ContactInformation_contact_ResidentialAddressRow1_CityTown_CityTown}
          </Grid>
          )}
          {ContactInformation_contact_SameAsMailingIndicator === "N" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country</h5> {ract.label}
          </Grid>
          )}
          {ract.label === "Canada" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Province/State</h5> {raps.label}
          </Grid>
          )}
          {ract.label === "United States of America" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Province/State</h5> {raps.label}
          </Grid>
          )}
          {ContactInformation_contact_SameAsMailingIndicator === "N" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Postal Code</h5> {ContactInformation_contact_ResidentialAddressRow2_PostalCode_PostalCode}
          </Grid>
          )}
          {ContactInformation_contact_SameAsMailingIndicator === "N" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>District</h5> {ContactInformation_contact_ResidentialAddressRow2_District}
          </Grid>
          )}

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Phone Number</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Phone Type</h5> {ContactInformation_contact_PhoneNumbers_Phone_Type
            .replace('01', 'Home').replace('02', 'Cell').replace('03', 'Business')}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Area</h5> {PhoneLoc.replace('CU', 'Can/US')}
          </Grid>
          {PhoneLoc === "CU" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country Code</h5> {ContactInformation_contact_PhoneNumbers_Phone_NumberCountry}
          </Grid>
          )}
          {PhoneLoc === "CU" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Number</h5> {ANumber}
          </Grid>
          )}
          {PhoneLoc === "CU" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Extension</h5> {ContactInformation_contact_PhoneNumbers_Phone_NumberExt}
          </Grid>
          )}
          {PhoneLoc === "Other" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Number</h5> {ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber}
          </Grid>
          )}

          <br />
          {altphone === "Y" && (
          <Grid item xs={12} lg={12}>
            <h4>Alternative Phone Number</h4>
          </Grid>
          )}
          {altphone === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Phone Type</h5> 
            {ContactInformation_contact_PhoneNumbers_AltPhone_Type
            .replace('01', 'Home').replace('02', 'Cell').replace('03', 'Business')}
          </Grid>
          )}
          <Grid item xs={12} md={6} lg={3}>
            <h5>Area</h5> {PhoneLoc2.replace('CU', 'Can/US')}
          </Grid>
          {PhoneLoc2 === "CU" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country Code</h5> {ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry}
          </Grid>
          )}
          {PhoneLoc2 === "CU" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Number</h5> {AANumber}
          </Grid>
          )}
          {PhoneLoc2 === "CU" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Extension</h5> {ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt}
          </Grid>
          )}
          {PhoneLoc2 === "Other" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Number</h5> {ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber}
          </Grid>
          )}  

          <br />
          {faxnum === "Y" && (
          <Grid item xs={12} lg={12}>
            <h4>Fax</h4>
          </Grid>
          )}
          {faxnum === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Area</h5> {FaxLoc.replace('CU', 'Can/US')}
          </Grid>
          )}
          {FaxLoc === "CU" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country Code</h5> {ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry}
          </Grid>
          )}
          {FaxLoc === "CU" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Number</h5> {FANumber}
          </Grid>
          )}
          {FaxLoc === "CU" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Extension</h5> {ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt}
          </Grid>
          )}
          {FaxLoc === "Other" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Number</h5> {ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_IntlNumber_IntlNumber}
          </Grid>
          )}  

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Email</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Email</h5> {ContactInformation_contact_PhoneNumbers_FaxEmail_Email}
          </Grid>

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Trip Information</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Purpose of Visit</h5> {DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit
            .replace('01', 'Business').replace('02', 'Tourism').replace('04', 'Short-Term Studies')
            .replace('05', 'Returning Student').replace('06', 'Returning Worker').replace('07', 'Super Visa')
            .replace('03', 'Other').replace('08', 'Visit ').replace('13', 'Family Visit')}
          </Grid>
          {DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit === "03" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Other</h5> {DetailsOfVisit_PurposeRow1_Other}
          </Grid>
          )}
          <Grid item xs={12} md={6} lg={3}>
            <h5>From</h5> {DetailsOfVisit_PurposeRow1_HowLongStay_FromDate}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>To</h5> {DetailsOfVisit_PurposeRow1_HowLongStay_ToDate}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Funds Available for the Trip</h5> {DetailsOfVisit_PurposeRow1_Funds_Funds}
          </Grid>
          <br />
          <Grid item xs={12} lg={12}>
            <h4>People/Places Visited</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Name</h5> {DetailsOfVisit_Contacts_Row1_Name_Name}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Relationship to Me</h5> {DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe}
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <h5>Address in Canada</h5> {DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Name</h5> {Contacts_Row2_Name_Name}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Relationship to Me</h5> {Contacts_Row2_Relationship_RelationshipToMe}
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <h5>Address in Canada</h5> {Contacts_Row2_AddressInCanada_AddressInCanada}
          </Grid>

          <br />
          <Grid item xs={12} lg={12}>
            <h4>Employment: Past 10 Years</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>From</h5> {Occupation_OccupationRow1_FromYear + '/' + Occupation_OccupationRow1_FromMonth}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>To</h5> {Occupation_OccupationRow1_ToYear + '/' + Occupation_OccupationRow1_ToMonth}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Occupation</h5> {Occupation_OccupationRow1_Occupation_Occupation}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Employer</h5> {Occupation_OccupationRow1_Employer}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>City/Town</h5> {Occupation_OccupationRow1_CityTown_CityTown}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country</h5> {occct.label}
          </Grid>
          {occct.label === "Canada" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Province/State</h5> {occps.label}
          </Grid>
          )}
          {occct.label === "United States of America" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Province/State</h5> {occps.label}
          </Grid>
          )}

          {PrevOcc === "Y" && (
          <Grid item xs={12} lg={12}>
            <h4>Previous Employment</h4>
          </Grid>
          )}
          {PrevOcc === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>From</h5> {Occupation_OccupationRow2_FromYear + '/' + Occupation_OccupationRow2_FromMonth}
          </Grid>
          )}
          {PrevOcc === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>To</h5> {Occupation_OccupationRow2_ToYear + '/' + Occupation_OccupationRow2_ToMonth}
          </Grid>
          )}
          {PrevOcc === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Occupation</h5> {Occupation_OccupationRow2_Occupation_Occupation}
          </Grid>
          )}
          {PrevOcc === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Employer</h5> {Occupation_OccupationRow2_Employer}
          </Grid>
          )}
          {PrevOcc === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>City/Town</h5> {Occupation_OccupationRow2_CityTown_CityTown}
          </Grid>
          )}
          {PrevOcc === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country</h5> {occ2ct.label}
          </Grid>
          )}
          {occ2ct.label === "Canada" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Province/State</h5> {occ2ps.label}
          </Grid>
          )}
          {occ2ct.label === "United States of America" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Province/State</h5> {occ2ps.label}
          </Grid>
          )}

          {PrevOcc2 === "Y" && (
          <Grid item xs={12} lg={12}>
            <h4>Previous Employment 2</h4>
          </Grid>
          )}
          {PrevOcc2 === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>From</h5> {Occupation_OccupationRow3_FromYear + '/' + Occupation_OccupationRow3_FromMonth}
          </Grid>
          )}
          {PrevOcc2 === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>To</h5> {Occupation_OccupationRow3_ToYear + '/' + Occupation_OccupationRow3_ToMonth}
          </Grid>
          )}
          {PrevOcc2 === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Occupation</h5> {Occupation_OccupationRow3_Occupation_Occupation}
          </Grid>
          )}
          {PrevOcc2 === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Employer</h5> {Occupation_OccupationRow3_Employer}
          </Grid>
          )}
          {PrevOcc2 === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>City/Town</h5> {Occupation_OccupationRow3_CityTown_CityTown}
          </Grid>
          )}
          {PrevOcc2 === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country</h5> {occ3ct.label}
          </Grid>
          )}
          {occ3ct.label === "Canada" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Province/State</h5> {occ3ps.label}
          </Grid>
          )}
          {occ3ct.label === "United States of America" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Province/State</h5> {occ3ps.label}
          </Grid>
          )}

          <br/>
          <Grid item xs={12} lg={12}>
            <h4>Education</h4>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <h5>Have you had any post secondary education?</h5> {Education_EducationIndicator}
          </Grid>
          {Education_EducationIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>From</h5> {Education_Edu_Row1_FromYear + '/' + Education_Edu_Row1_FromMonth}
          </Grid>
          )}
          {Education_EducationIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>To</h5> {Education_Edu_Row1_ToYear + '/' + Education_Edu_Row1_ToMonth}
          </Grid>
          )}
          {Education_EducationIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Field of Study</h5> {Education_Edu_Row1_FieldOfStudy}
          </Grid>
          )}
          {Education_EducationIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>School</h5> {Education_Edu_Row1_School}
          </Grid>
          )}
          {Education_EducationIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>City/Town</h5> {Education_Edu_Row1_CityTown}
          </Grid>
          )}
          {Education_EducationIndicator === "Y" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Country</h5> {educt.label}
          </Grid>
          )}
          {educt.label === "Canada" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Province/State</h5> {edups.label}
          </Grid>
          )}
          {educt.label === "United States of America" && (
          <Grid item xs={12} md={6} lg={3}>
            <h5>Province/State</h5> {edups.label}
          </Grid>
          )}

          <br/>
          <Grid item xs={12} lg={12}>
            <h4>Medical Questions</h4>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Have you or any family members had, or been in contact with anyone, with tuberculosis within the past 2 years?</h5> 
            {BackgroundInfo_Choice[0]}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Do you have any mental/physical disorders that would require social/health services, other than medication, during your stay in Canada?</h5> 
            {BackgroundInfo_Choice[1]}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Details</h5> 
            {BackgroundInfo_Details_MedicalDetails}
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <h4>Previous Applications</h4>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Have you ever remained beyond the validity of your status, attented school or worked without authorization in Canada?</h5> 
            {BackgroundInfo2_VisaChoice1}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Have you ever been refused a visa/permit, denied entry or been ordered to leave a country?</h5> 
            {BackgroundInfo2_VisaChoice2}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Have you previously applied to live or remain in Canada?</h5> 
            {BackgroundInfo2_Details_VisaChoice3}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Details</h5> 
            {BackgroundInfo2_Details_refusedDetails}
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <h4>Criminal Record</h4>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Have you ever committed, been arrested/charged for or convicted of any criminal offence?</h5> 
            {BackgroundInfo3_Choice}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Details</h5> 
            {BackgroundInfo3_details}
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <h4>Military</h4>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Did you serve in any military/militia/civil defence unit or serve in a security organization/police force?</h5> 
            {Military_Choice}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Other</h5> 
            {Military_militaryServiceDetails}
          </Grid>


          <Grid item xs={12} md={12} lg={12}>
            <h4>Other</h4>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Are/have you been associated with any political party/group/organization that engaged in/advocated violence as a means to achieve a political/religious objective,
                or has been associated with criminal activity at any time?</h5> 
            {Occupation_Choice}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <h5>Have you ever witnessed/participated in the ill treatment of prisoners/civilians, looting/desecration of religious buildings?</h5> 
            {GovPosition_Choice}
          </Grid>
        

        
        <Grid item xs={12}>
          <Button
            type='submit' variant='contained' color='secondary' 
            className={classes.button} onClick={() => prevStep()} >
              Back
          </Button>

          <Button
            color='primary'
            variant='contained'
            type='submit'
            className={classes.button}
            disabled={loading}
            onClick={() => handleSubmit()}
            // onClick={() => nextStep()}
          >
            Submit
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress}  />}
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
            <Alert onClose={handleClose} className={classes.snack}>
              Please wait for the file to finish uploading before leaving the page!
            </Alert>
          </Snackbar>
          </Grid>
          </Grid>
        </SimpleCard>
        <Prompt
        message='You have not yet submitted your form, are you sure you want to leave?'
        />
      </div>
    </>
  );
};

QueDing.propTypes = {
  formData: PropTypes.object.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};
