import React, { useState, useEffect } from 'react';
import { Yi } from './Yi'; // Personal Info
import { Er } from './Er'; // Countries
import { San } from './San'; // Marital
import { Si } from './Si'; // Languages
import { Wu } from './Wu'; // IDs
import { Liu } from './Liu'; // Contact Info
import { Qi } from './Qi'; // Visit Details
import { Ba } from './Ba'; // Employment
import { Jiu } from './Jiu'; // Education
import { Shi } from './Shi'; // Background
import { QueDing } from './QueDing';
import { Success } from './Success';
import { withRouter } from "react-router-dom";
import { 
  citizenship, 
  traveldoc, 
  languages,
  countryofbirth,
  country,
  countryofissue,
  provstate 
} from "./lists/formvalues"
import localStorageService from "../../services/localStorageService";
import axios from "axios";

var user = localStorageService.getItem('auth_user')

export const UserForm = (props) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    PersonalDetails_ServiceIn_ServiceIn: "01",
    PersonalDetails_VisaType_VisaType: "VisitorVisa",
    PersonalDetails_Name_FamilyName: user.client_profile.family_name,
    PersonalDetails_Name_GivenName: user.client_profile.given_names,
    PersonalDetails_AliasName_AliasFamilyName: "",
    PersonalDetails_AliasName_AliasGivenName: "",
    PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator: "N",
    PersonalDetails_Sex_Sex: user.client_profile.sex,
    PersonalDetails_DOBYear: user.client_profile.birth_date.split('-')[0],
    PersonalDetails_DOBMonth: user.client_profile.birth_date.split('-')[1],
    PersonalDetails_DOBDay: user.client_profile.birth_date.split('-')[2],
    PersonalDetails_PlaceBirthCity: "Vancouver",
    PBC: "{\"label\":\"Taiwan\",\"value\":\"203\"}",
    PersonalDetails_PlaceBirthCountry: "",
    citizenship: "{\"label\":\"Taiwan\",\"value\":\"203\"}",
    PersonalDetails_Citizenship_Citizenship: "",
    ctr: "{\"label\":\"Taiwan\",\"value\":\"203\"}",
    PersonalDetails_CurrentCOR_Row2_Country: "",
    PersonalDetails_CurrentCOR_Row2_Status: "01",
    PersonalDetails_CurrentCOR_Row2_Other: "",
    PersonalDetails_CurrentCOR_Row2_FromDate: "2000-01-01",
    PersonalDetails_CurrentCOR_Row2_ToDate: "",
    PersonalDetails_PCRIndicator: "N",
    pct: "\"{}\"",
    PersonalDetails_PreviousCOR_Row2_Country: "",
    PersonalDetails_PreviousCOR_Row2_Status: "",
    PersonalDetails_PreviousCOR_Row2_Other: "",
    PersonalDetails_PreviousCOR_Row2_FromDate: "",
    PersonalDetails_PreviousCOR_Row2_ToDate: "",
    PCR2: "\"{}\"",
    pct2: "\"{}\"",
    PersonalDetails_PreviousCOR_Row3_Country: "",
    PersonalDetails_PreviousCOR_Row3_Status: "",
    PersonalDetails_PreviousCOR_Row3_Other: "",
    PersonalDetails_PreviousCOR_Row3_FromDate: "",
    PersonalDetails_PreviousCOR_Row3_ToDate: "",
    PersonalDetails_SameAsCORIndicator: "Y",
    cwa: "\"{}\"",
    PersonalDetails_CountryWhereApplying_Row2_Country: "",
    PersonalDetails_CountryWhereApplying_Row2_Status: "",
    PersonalDetails_CountryWhereApplying_Row2_Other: "",
    PersonalDetails_CountryWhereApplying_Row2_FromDate: "",
    PersonalDetails_CountryWhereApplying_Row2_ToDate: "",
    MaritalStatus_SectionA_MaritalStatus: "02",
    MaritalStatus_SectionA_DateofMarriage: "",
    MaritalStatus_SectionA_FamilyName: "",
    MaritalStatus_SectionA_GivenName: "",
    MaritalStatus_SectionA_PrevMarriedIndicator: "N",
    MaritalStatus_SectionA_PMFamilyName: "",
    MaritalStatus_SectionA_PMGivenName_GivenName: "",
    MaritalStatus_SectionA_PrevSpouse_DOBYear: "",
    MaritalStatus_SectionA_PrevSpouse_DOBMonth: "",
    MaritalStatus_SectionA_PrevSpouse_DOBDay: "",
    MaritalStatus_SectionA_TypeOfRelationship: "",
    MaritalStatus_SectionA_FromDate: "",
    MaritalStatus_SectionA_ToDate_ToDate: "",
    MaritalStatus_SectionA_PassportNum_PassportNum: "123456789",
    pcoi: "{\"label\":\"TWN (Taiwan)\",\"value\":\"203\"}",
    MaritalStatus_SectionA_Passport_CountryofIssue_CountryofIssue: "",
    MaritalStatus_SectionA_Passport_IssueDate_IssueDate: "2020-01-01",
    MaritalStatus_SectionA_Passport_ExpiryDate: "2025-01-01",
    MaritalStatus_SectionA_Passport_TaiwanPIN: "Y",
    MaritalStatus_SectionA_Passport_IsraelPassportIndicator: "N",
    natlang: "{\"label\":\"English\",\"value\":\"001\"}",
    MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang: "",
    MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate: "English",
    MaritalStatus_SectionA_Languages_languages_lov: "",
    MaritalStatus_SectionA_Languages_LanguageTest: "Y",
    natID_q1_natIDIndicator: "N",
    natID_natIDdocs_DocNum_DocNum: "",
    nidcoi: "\"{}\"",
    natID_natIDdocs_CountryofIssue_CountryofIssue: "",
    natID_natIDdocs_IssueDate_IssueDate: "",
    natID_natIDdocs_ExpiryDate: "",
    USCard_q1_usCardIndicator: "N",
    USCard_usCarddocs_DocNum_DocNum: "",
    USCard_usCardDocs_ExpiryDate: "",
    ContactInformation_contact_AddressRow1_POBox_POBox: "",
    ContactInformation_contact_AddressRow1_Apt_AptUnit: "",
    ContactInformation_contact_AddressRow1_StreetNum_StreetNum: "221B",
    ContactInformation_contact_AddressRow1_Streetname_Streetname: "Baker Street",
    ContactInformation_contact_AddressRow2_CityTow_CityTown: "London",
    cmct: "{\"label\":\"England\",\"value\":\"002\"}",
    cmps: "\"{}\"",
    ContactInformation_contact_AddressRow2_Country_Country: "",
    ContactInformation_contact_AddressRow2_ProvinceState_ProvinceState: "",
    ContactInformation_contact_AddressRow2_PostalCode_PostalCode: "",
    ContactInformation_contact_AddressRow2_District: "",
    ContactInformation_contact_SameAsMailingIndicator: "Y",
    ContactInformation_contact_ResidentialAddressRow1_AptUnit_AptUnit: "",
    ContactInformation_contact_ResidentialAddressRow1_StreetNum_StreetNum: "",
    ContactInformation_contact_ResidentialAddressRow1_StreetName_Streetname: "",
    ContactInformation_contact_ResidentialAddressRow1_CityTown_CityTown: "",
    ract: "\"{}\"",
    raps: "\"{}\"",
    ContactInformation_contact_ResidentialAddressRow2_Country_Country: "",
    ContactInformation_contact_ResidentialAddressRow2_ProvinceState_ProvinceState: "",
    ContactInformation_contact_ResidentialAddressRow2_PostalCode_PostalCode: "",
    ContactInformation_contact_ResidentialAddressRow2_District: "",
    PhoneLoc: "CU",
    ContactInformation_contact_PhoneNumbers_Phone_Type: "02",
    ContactInformation_contact_PhoneNumbers_Phone_CanadaUS: "1",
    ContactInformation_contact_PhoneNumbers_Phone_Other: "0",
    ContactInformation_contact_PhoneNumbers_Phone_NumberExt: "",
    ContactInformation_contact_PhoneNumbers_Phone_NumberCountry: "1",
    ANumber: "5555555",
    ContactInformation_contact_PhoneNumbers_Phone_ActualNumber: "",
    ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber: "",
    altphone: "N",
    PhoneLoc2: "",
    ContactInformation_contact_PhoneNumbers_AltPhone_Type: "",
    ContactInformation_contact_PhoneNumbers_AltPhone_CanadaUS: "0",
    ContactInformation_contact_PhoneNumbers_AltPhone_Other: "0",
    ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt: "",
    ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry: "",
    AANumber: "",
    ContactInformation_contact_PhoneNumbers_AltPhone_ActualNumber: "",
    ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber: "",
    faxnum: "N",
    FaxLoc: "",
    ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_CanadaUS: "0",
    ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_Other: "0",
    ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt: "",
    ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry: "",
    FANumber: "",
    ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_ActualNumber: "",
    ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_IntlNumber_IntlNumber: "",
    ContactInformation_contact_PhoneNumbers_FaxEmail_Email: user.email,
    DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit: "02",
    DetailsOfVisit_PurposeRow1_Other: "",
    DetailsOfVisit_PurposeRow1_HowLongStay_FromDate: "2021-01-01",
    DetailsOfVisit_PurposeRow1_HowLongStay_ToDate: "2021-03-01",
    DetailsOfVisit_PurposeRow1_Funds_Funds: "20000",
    DetailsOfVisit_Contacts_Row1_Name_Name: "Nemo",
    DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe: "",
    DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada: "P Sherman 42 Wallaby Way, Sydney",
    Contacts_Row2_Name_Name: "",
    Contacts_Row2_Relationship_RelationshipToMe: "",
    Contacts_Row2_AddressInCanada_AddressInCanada: "",
    Education_EducationIndicator: "N",
    Education_Edu_Row1_FromYear: "",
    Education_Edu_Row1_FromMonth: "",
    Education_Edu_Row1_ToYear: "",
    Education_Edu_Row1_ToMonth: "",
    Education_Edu_Row1_FieldOfStudy: "",
    Education_Edu_Row1_School: "",
    Education_Edu_Row1_CityTown: "",
    educt: "\"{}\"",
    Education_Edu_Row1_Country_Country: "",
    edups: "\"{}\"",
    Education_Edu_Row1_ProvState: "",
    Occupation_OccupationRow1_FromYear: "2020",
    Occupation_OccupationRow1_FromMonth: "01",
    Occupation_OccupationRow1_ToYear: "",
    Occupation_OccupationRow1_ToMonth: "",
    Occupation_OccupationRow1_Occupation_Occupation: "Self-Employed",
    Occupation_OccupationRow1_Employer: "Self",
    Occupation_OccupationRow1_CityTown_CityTown: "Taipei",
    occct: "{\"label\":\"Taiwan\",\"value\":\"203\"}",
    occps: "\"{}\"",
    Occupation_OccupationRow1_Country_Country: "",
    Occupation_OccupationRow1_ProvState: "",
    PrevOcc: "N",
    Occupation_OccupationRow2_FromYear: "",
    Occupation_OccupationRow2_FromMonth: "",
    Occupation_OccupationRow2_ToYear: "",
    Occupation_OccupationRow2_ToMonth: "",
    Occupation_OccupationRow2_Occupation_Occupation: "",
    Occupation_OccupationRow2_Employer: "",
    Occupation_OccupationRow2_CityTown_CityTown: "",
    occ2ct: "\"{}\"",
    occ2ps: "\"{}\"",
    Occupation_OccupationRow2_Country_Country: "",
    Occupation_OccupationRow2_ProvState: "",
    PrevOcc2: "",
    Occupation_OccupationRow3_FromYear: "",
    Occupation_OccupationRow3_FromMonth: "",
    Occupation_OccupationRow3_ToYear: "",
    Occupation_OccupationRow3_ToMonth: "",
    Occupation_OccupationRow3_Occupation_Occupation: "",
    Occupation_OccupationRow3_Employer: "",
    Occupation_OccupationRow3_CityTown_CityTown: "",
    occ3ct: "\"{}\"",
    occ3ps: "\"{}\"",
    Occupation_OccupationRow3_Country_Country: "",
    Occupation_OccupationRow3_ProvState: "",
    bgc: "N",
    abc: "N",
    BackgroundInfo_Choice: "[ ]",
    BackgroundInfo_Details_MedicalDetails: "",
    BackgroundInfo2_VisaChoice1: "N",
    BackgroundInfo2_VisaChoice2: "N",
    BackgroundInfo2_Details_refusedDetails: "",
    BackgroundInfo2_Details_VisaChoice3: "N",
    BackgroundInfo3_Choice: "N",
    BackgroundInfo3_details: "",
    Military_Choice: "N",
    Military_militaryServiceDetails: "",
    Occupation_Choice: "N",
    GovPosition_Choice: "N"
  });

  useEffect(() => {
    axios.get("users/me/form/load", { params: { return_dict: true }})
      .then((res) => {
        // unstringify / parse all autocomplete values
        let values = res.data
        values.PBC = JSON.parse(values.PBC)
        values.citizenship = JSON.parse(values.citizenship)
        values.ctr = JSON.parse(values.ctr)
        values.pct = JSON.parse(values.pct)
        values.pct2 = JSON.parse(values.pct2)
        values.cwa = JSON.parse(values.cwa)
        values.natLang = JSON.parse(values.natLang)
        values.pcoi = JSON.parse(values.pcoi)
        values.nidcoi = JSON.parse(values.nidcoi)
        values.cmct = JSON.parse(values.cmct)
        values.cmps = JSON.parse(values.cmps)
        values.ract = JSON.parse(values.ract)
        values.raps = JSON.parse(values.raps)
        values.occct = JSON.parse(values.occct)
        values.occps = JSON.parse(values.occps)
        values.occ2ct = JSON.parse(values.occ2ct)
        values.occ2ps = JSON.parse(values.occ2ps)
        values.occ3ct = JSON.parse(values.occ3ct)
        values.occ3ps = JSON.parse(values.occ3ps)
        values.educt = JSON.parse(values.educt)
        values.edups = JSON.parse(values.edups)
        values.bgc = JSON.parse(values.bgc)
        values.abc = JSON.parse(values.abc)
        values.BackgroundInfo_Choice = JSON.parse(values.BackgroundInfo_Choice)

        setFormData({...values})
      })
  },[])

  const saveData = (values) => {
    values.PBC = JSON.stringify(values.PBC)
    values.citizenship = JSON.stringify(values.citizenship)
    values.ctr = JSON.stringify(values.ctr)
    values.pct = JSON.stringify(values.pct)
    values.pct2 = JSON.stringify(values.pct2)
    values.cwa = JSON.stringify(values.cwa)
    values.natLang = JSON.stringify(values.natLang)
    values.pcoi = JSON.stringify(values.pcoi)
    values.nidcoi = JSON.stringify(values.nidcoi)
    values.cmct = JSON.stringify(values.cmct)
    values.cmps = JSON.stringify(values.cmps)
    values.ract = JSON.stringify(values.ract)
    values.raps = JSON.stringify(values.raps)
    values.occct = JSON.stringify(values.occct)
    values.occps = JSON.stringify(values.occps)
    values.occ2ct = JSON.stringify(values.occ2ct)
    values.occ2ps = JSON.stringify(values.occ2ps)
    values.occ3ct = JSON.stringify(values.occ3ct)
    values.occ3ps = JSON.stringify(values.occ3ps)
    values.educt = JSON.stringify(values.educt)
    values.edups = JSON.stringify(values.edups)
    values.bgc = JSON.stringify(values.bgc)
    values.abc = JSON.stringify(values.abc)
    values.BackgroundInfo_Choice = JSON.stringify(values.BackgroundInfo_Choice)
    axios.put("users/me/form/save", values)
  }
  
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  switch (step) {
    case 1:
      return (
        <Yi
          saveData = {saveData}
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          citizenship={citizenship}
          countryofbirth={countryofbirth}
        />
      );
    case 2:
        return (
          <Er
            saveData = {saveData}
            currentApp = {props.location.state}
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            country={country}
          />
        );
    case 3:
      return (
        <San
          saveData = {saveData}
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 4:
      return (
        <Si
          saveData = {saveData}
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          languages={languages}
        />
      );
    case 5:
      return (
        <Wu
          saveData = {saveData}
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          traveldoc={traveldoc}
        />
      );
    case 6:
      return (
        <Liu
          saveData = {saveData}
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          country={country}
          provstate={provstate}
        />
      );
    case 7:
      return (
        <Qi
          saveData = {saveData}
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 8:
      return (
        <Ba
          saveData = {saveData}
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 9:
      return (
        <Jiu
          saveData = {saveData}
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          country={country}
          provstate={provstate}
        />
      );
    case 10:
      return (
        <Shi
          saveData = {saveData}
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 11:
      return (
        <QueDing 
          saveData = {saveData} 
          currentApp = {props.location.state} 
          formData={formData} 
          nextStep={nextStep} 
          prevStep={prevStep} />
      );
    default:
      return <Success />;
  }
};

export default withRouter(UserForm);