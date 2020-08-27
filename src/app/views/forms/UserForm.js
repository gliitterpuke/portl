import React, { useState, useEffect } from 'react';
import { Yi } from './Yi'; // Personal Info
import { Er } from './Er'; // Countries
import { San } from './San' // Marital
import { Si } from './Si' // Languages
import { Wu } from './Wu' // IDs
import { Liu } from './Liu' // Contact Info
import { Qi } from './Qi' // Visit Details
import { Ba } from './Ba' // Employment
import { Jiu } from './Jiu' // Education
import { Shi } from './Shi' // Background
import { QueDing } from './QueDing';
import { Success } from './Success';
import { withRouter } from "react-router-dom";

export const UserForm = (props) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
PersonalDetails_ServiceIn_ServiceIn: "English",
PersonalDetails_VisaType_VisaType: "Transit",
PersonalDetails_Name_FamilyName: "Last",
PersonalDetails_Name_GivenName: "First",
PersonalDetails_AliasName_AliasFamilyName: "string",
PersonalDetails_AliasName_AliasGivenName: "string",
PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator: "Yes",
PersonalDetails_Sex_Sex: "Female",
PersonalDetails_DOBYear: "1995",
PersonalDetails_DOBMonth: "11",
PersonalDetails_DOBDay: "19",
PersonalDetails_PlaceBirthCity: "Toronto",
PersonalDetails_PlaceBirthCountry: "Canada",
PersonalDetails_Citizenship_Citizenship: "Taiwan",
PersonalDetails_CurrentCOR_Row2_Country: "Taiwan",
PersonalDetails_CurrentCOR_Row2_Status: "Citizen",
PersonalDetails_CurrentCOR_Row2_Other: "string",
PersonalDetails_CurrentCOR_Row2_FromDate: "2019-01-01",
PersonalDetails_CurrentCOR_Row2_ToDate: "2019-01-01",
PersonalDetails_PCRIndicator: "No",
PersonalDetails_PreviousCOR_Row2_Country: "string",
PersonalDetails_PreviousCOR_Row2_Status: "string",
PersonalDetails_PreviousCOR_Row2_Other: "string",
PersonalDetails_PreviousCOR_Row2_FromDate: "string",
PersonalDetails_PreviousCOR_Row2_ToDate: "string",
PersonalDetails_PreviousCOR_Row3_Country: "string",
PersonalDetails_PreviousCOR_Row3_Status: "string",
PersonalDetails_PreviousCOR_Row3_Other: "string",
PersonalDetails_PreviousCOR_Row3_FromDate: "string",
PersonalDetails_PreviousCOR_Row3_ToDate: "string",
PersonalDetails_SameAsCORIndicator: "No",
PersonalDetails_CountryWhereApplying_Row2_Country: "string",
PersonalDetails_CountryWhereApplying_Row2_Status: "string",
PersonalDetails_CountryWhereApplying_Row2_Other: "string",
PersonalDetails_CountryWhereApplying_Row2_FromDate: "string",
PersonalDetails_CountryWhereApplying_Row2_ToDate: "string",
MaritalStatus_SectionA_MaritalStatus: "Single",
MaritalStatus_SectionA_DateofMarriage: "string",
MaritalStatus_SectionA_FamilyName: "string",
MaritalStatus_SectionA_GivenName: "string",
MaritalStatus_SectionA_PrevMarriedIndicator: "No",
MaritalStatus_SectionA_PMFamilyName: "string",
MaritalStatus_SectionA_PMGivenName_GivenName: "string",
MaritalStatus_SectionA_PrevSpouse_DOBYear: "string",
MaritalStatus_SectionA_PrevSpouse_DOBMonth: "string",
MaritalStatus_SectionA_PrevSpouse_DOBDay: "string",
MaritalStatus_SectionA_TypeOfRelationship: "string",
MaritalStatus_SectionA_FromDate: "string",
MaritalStatus_SectionA_ToDate_ToDate: "string",
MaritalStatus_SectionA_PassportNum_PassportNum: "12345",
MaritalStatus_SectionA_Passport_CountryofIssue_CountryofIssue: "Canada",
MaritalStatus_SectionA_Passport_IssueDate_IssueDate: "2019-01-01",
MaritalStatus_SectionA_Passport_ExpiryDate: "2021-01-01",
MaritalStatus_SectionA_Passport_TaiwanPIN: "Yes",
MaritalStatus_SectionA_Passport_IsraelPassportIndicator: "No",
MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang: "English",
MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate: "English",
MaritalStatus_SectionA_Languages_languages_lov: "string",
MaritalStatus_SectionA_Languages_LanguageTest: "Yes",
natID_q1_natIDIndicator: "No",
natID_natIDdocs_DocNum_DocNum: "string",
natID_natIDdocs_CountryofIssue_CountryofIssue: "string",
natID_natIDdocs_IssueDate_IssueDate: "string",
natID_natIDdocs_ExpiryDate: "string",
USCard_q1_usCardIndicator: "No",
USCard_usCarddocs_DocNum_DocNum: "string",
USCard_usCardDocs_ExpiryDate: "string",
ContactInformation_contact_AddressRow1_POBox_POBox: "string",
ContactInformation_contact_AddressRow1_Apt_AptUnit: "string",
ContactInformation_contact_AddressRow1_StreetNum_StreetNum: "string",
ContactInformation_contact_AddressRow1_Streetname_Streetname: "string",
ContactInformation_contact_AddressRow2_CityTow_CityTown: "string",
ContactInformation_contact_AddressRow2_Country_Country: "string",
ContactInformation_contact_AddressRow2_ProvinceState_ProvinceState: "string",
ContactInformation_contact_AddressRow2_PostalCode_PostalCode: "string",
ContactInformation_contact_AddressRow2_District: "string",
ContactInformation_contact_SameAsMailingIndicator: "Yes",
ContactInformation_contact_ResidentialAddressRow1_AptUnit_AptUnit: "string",
ContactInformation_contact_ResidentialAddressRow1_StreetNum_StreetNum: "string",
ContactInformation_contact_ResidentialAddressRow1_StreetName_Streetname: "string",
ContactInformation_contact_ResidentialAddressRow1_CityTown_CityTown: "string",
ContactInformation_contact_ResidentialAddressRow2_Country_Country: "string",
ContactInformation_contact_ResidentialAddressRow2_ProvinceState_ProvinceState: "string",
ContactInformation_contact_ResidentialAddressRow2_PostalCode_PostalCode: "string",
ContactInformation_contact_ResidentialAddressRow2_District: "string",
ContactInformation_contact_PhoneNumbers_Phone_Type: "Residence",
ContactInformation_contact_PhoneNumbers_Phone_CanadaUS: "1",
ContactInformation_contact_PhoneNumbers_Phone_Other: "0",
ContactInformation_contact_PhoneNumbers_Phone_NumberExt: "string",
ContactInformation_contact_PhoneNumbers_Phone_NumberCountry: "1",
ContactInformation_contact_PhoneNumbers_Phone_ActualNumber: "6475004718",
ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber: "string",
ContactInformation_contact_PhoneNumbers_AltPhone_Type: "Cellular",
ContactInformation_contact_PhoneNumbers_AltPhone_CanadaUS: "0",
ContactInformation_contact_PhoneNumbers_AltPhone_Other: "0",
ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt: "string",
ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry: "string",
ContactInformation_contact_PhoneNumbers_AltPhone_ActualNumber: "string",
ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber: "string",
ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_CanadaUS: "0",
ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_Other: "0",
ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt: "string",
ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry: "string",
ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_ActualNumber: "string",
ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_IntlNumber_IntlNumber: "string",
ContactInformation_contact_PhoneNumbers_FaxEmail_Email: "string",
DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit: "Tourism",
DetailsOfVisit_PurposeRow1_Other: "string",
DetailsOfVisit_PurposeRow1_HowLongStay_FromDate: "2020-09-01",
DetailsOfVisit_PurposeRow1_HowLongStay_ToDate: "2020-12-01",
DetailsOfVisit_PurposeRow1_Funds_Funds: "10000",
DetailsOfVisit_Contacts_Row1_Name_Name: "Bill",
DetailsOfVisit_Contacts_Row1_RelationshipToMe_RelationshipToMe: "string",
DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada: "Science",
Contacts_Row2_Name_Name: "string",
Contacts_Row2_Relationship_RelationshipToMe: "string",
Contacts_Row2_AddressInCanada_AddressInCanada: "string",
Education_EducationIndicator: "No",
Education_Edu_Row1_FromYear: "string",
Education_Edu_Row1_FromMonth: "string",
Education_Edu_Row1_ToYear: "string",
Education_Edu_Row1_ToMonth: "string",
Education_Edu_Row1_FieldOfStudy: "string",
Education_Edu_Row1_School: "string",
Education_Edu_Row1_CityTown: "string",
Education_Edu_Row1_Country_Country: "string",
Education_Edu_Row1_ProvState: "string",
Occupation_OccupationRow1_FromYear: "2019",
Occupation_OccupationRow1_FromMonth: "02",
Occupation_OccupationRow1_ToYear: "string",
Occupation_OccupationRow1_ToMonth: "string",
Occupation_OccupationRow1_Occupation_Occupation: "CEO pls",
Occupation_OccupationRow1_Employer: "Me pls",
Occupation_OccupationRow1_CityTown_CityTown: "Toronto",
Occupation_OccupationRow1_Country_Country: "Canada",
Occupation_OccupationRow1_ProvState: "ON",
Occupation_OccupationRow2_FromYear: "string",
Occupation_OccupationRow2_FromMonth: "string",
Occupation_OccupationRow2_ToYear: "string",
Occupation_OccupationRow2_ToMonth: "string",
Occupation_OccupationRow2_Occupation_Occupation: "string",
Occupation_OccupationRow2_Employer: "string",
Occupation_OccupationRow2_CityTown_CityTown: "string",
Occupation_OccupationRow2_Country_Country: "string",
Occupation_OccupationRow2_ProvState: "string",
Occupation_OccupationRow3_FromYear: "string",
Occupation_OccupationRow3_FromMonth: "string",
Occupation_OccupationRow3_ToYear: "string",
Occupation_OccupationRow3_ToMonth: "string",
Occupation_OccupationRow3_Occupation_Occupation: "string",
Occupation_OccupationRow3_Employer: "string",
Occupation_OccupationRow3_CityTown_CityTown: "string",
Occupation_OccupationRow3_Country_Country: "string",
Occupation_OccupationRow3_ProvState: "string",
BackgroundInfo_Choice: [
  "Yes", "No"
    ],
BackgroundInfo_Details_MedicalDetails: "None",
BackgroundInfo2_VisaChoice1: "Yes",
BackgroundInfo2_VisaChoice2: "No",
BackgroundInfo2_Details_refusedDetails: "Other",
BackgroundInfo2_Details_VisaChoice3: "Yes",
BackgroundInfo3_Choice: "Yes",
BackgroundInfo3_details: "No",
Military_Choice: "Yes",
Military_militaryServiceDetails: "Yes",
Occupation_Choice: "No",
GovPosition_Choice: "No"
  
    
  });
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  switch (step) {
    case 1:
      return (
        <Yi
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      );
    case 2:
        return (
          <Er
            currentApp = {props.location.state}
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
    case 3:
      return (
        <San
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
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 5:
      return (
        <Wu
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 6:
      return (
        <Liu
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 7:
      return (
        <Qi
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
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 10:
      return (
        <Shi
          currentApp = {props.location.state}
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 11:
      return (
        <QueDing currentApp = {props.location.state} formData={formData} nextStep={nextStep} prevStep={prevStep} />
      );
    default:
      return <Success />;
  }
};

export default withRouter(UserForm);