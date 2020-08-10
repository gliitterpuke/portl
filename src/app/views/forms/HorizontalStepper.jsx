import React, { Component } from 'react';
import CountriesN from './CountriesN';
import LanguagesN from './LanguagesN';
import VisitN from './VisitN';
import MaritalN from './MaritalN';
import IDN from './IDN';
import PersonalN from './PersonalN';
import ContactN from './ContactN';
import Tester3 from './Tester3';
import EducationN from './EducationN';
import EmploymentN from './EmploymentN';
import BackgroundN from './BackgroundN';


export class HorizontalStepper extends Component {
    state = {
      step: 1,
        PersonalDetails_ServiceIn_ServiceIn: "English",
        PersonalDetails_VisaType_VisaType: "Transit",
        PersonalDetails_Name_FamilyName: "Last",
        PersonalDetails_Name_GivenName: "First",
        PersonalDetails_AliasName_AliasFamilyName: "string",
        PersonalDetails_AliasName_AliasGivenName: "string",
        PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator: "Y",
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
        natID_q1_natIDIndicator: "no",
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
    };
  
    // Proceed to next step
    nextStep = () => {
      const { step } = this.state;
      this.setState({
        step: step + 1
      });
    };
  
    // Go back to prev step
    prevStep = () => {
      const { step } = this.state;
      this.setState({
        step: step - 1
      });
    };
  
    // Handle fields change
    handleChange = input => e => {
      this.setState({ [input]: e.target.value });
    };

    handleSubmit = (event) => {
      alert('A form was submitted: ' + this.state);
  
      fetch('https://portl-dev.herokuapp.com/api//v1/forms/trv/{application_id}', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers:{ 'Content-Type': 'application/x-www-form-urlencoded' } 
        }).then(function(response) {
          console.log(response)
          return response.json();
        });
  
      event.preventDefault();
  }
  
  
  render() {
    const { step } = this.state;
    const {       
        PersonalDetails_Name_FamilyName,
        PersonalDetails_Name_GivenName,
        PersonalDetails_AliasName_AliasFamilyName,
        PersonalDetails_AliasName_AliasGivenName,
        PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator,
        PersonalDetails_Sex_Sex,
        PersonalDetails_DOBYear,
        PersonalDetails_PlaceBirthCity,
        PersonalDetails_PlaceBirthCountry,
        PersonalDetails_Citizenship_Citizenship,
        PersonalDetails_ServiceIn_ServiceIn,
        PersonalDetails_VisaType_VisaType,
        MaritalStatus_SectionA_MaritalStatus,
        MaritalStatus_SectionA_DateofMarriage,
        MaritalStatus_SectionA_FamilyName,
        MaritalStatus_SectionA_GivenName,
        MaritalStatus_SectionA_PrevMarriedIndicator,
        MaritalStatus_SectionA_DateLastValidated_DateCalc,
        MaritalStatus_SectionA_DateLastValidated_Year,
        MaritalStatus_SectionA_DateLastValidated_Month,
        MaritalStatus_SectionA_DateLastValidated_Day,
        MaritalStatus_SectionA_PMFamilyName,
        MaritalStatus_SectionA_PMGivenName_GivenName,
        MaritalStatus_SectionA_PrevSpouse_DOBYear,
        MaritalStatus_SectionA_PrevSpouse_DOBMonth,
        MaritalStatus_SectionA_PrevSpouse_DOBDay,
        MaritalStatus_SectionA_TypeOfRelationship,
        MaritalStatus_SectionA_FromDate,
        MaritalStatus_SectionA_ToDate_ToDate,
        PersonalDetails_CurrentCOR_Row2_Status,
        PersonalDetails_CurrentCOR_Row2_Country,
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
        MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang,
        MaritalStatus_SectionA_Languages_languages_lov,
        MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate,
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
        ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber,
        ContactInformation_contact_PhoneNumbers_AltPhone_Type,
        ContactInformation_contact_PhoneNumbers_AltPhone_CanadaUS,
        ContactInformation_contact_PhoneNumbers_AltPhone_Other,
        ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt,
        ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry,
        ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber,
        ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_CanadaUS,
        ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_Other,
        ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt,
        ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry,
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
        BackgroundInfo_backgroundInfoCalc,
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
     } = this.state;
    const values = { 
        PersonalDetails_Name_FamilyName,
        PersonalDetails_Name_GivenName,
        PersonalDetails_AliasName_AliasFamilyName,
        PersonalDetails_AliasName_AliasGivenName,
        PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator,
        PersonalDetails_Sex_Sex,
        PersonalDetails_DOBYear,
        PersonalDetails_PlaceBirthCity,
        PersonalDetails_PlaceBirthCountry,
        PersonalDetails_Citizenship_Citizenship,
        PersonalDetails_ServiceIn_ServiceIn,
        PersonalDetails_VisaType_VisaType,
        MaritalStatus_SectionA_MaritalStatus,
        MaritalStatus_SectionA_DateofMarriage,
        MaritalStatus_SectionA_FamilyName,
        MaritalStatus_SectionA_GivenName,
        MaritalStatus_SectionA_PrevMarriedIndicator,
        MaritalStatus_SectionA_DateLastValidated_DateCalc,
        MaritalStatus_SectionA_DateLastValidated_Year,
        MaritalStatus_SectionA_DateLastValidated_Month,
        MaritalStatus_SectionA_DateLastValidated_Day,
        MaritalStatus_SectionA_PMFamilyName,
        MaritalStatus_SectionA_PMGivenName_GivenName,
        MaritalStatus_SectionA_PrevSpouse_DOBYear,
        MaritalStatus_SectionA_PrevSpouse_DOBMonth,
        MaritalStatus_SectionA_PrevSpouse_DOBDay,
        MaritalStatus_SectionA_TypeOfRelationship,
        MaritalStatus_SectionA_FromDate,
        MaritalStatus_SectionA_ToDate_ToDate,
        PersonalDetails_CurrentCOR_Row2_Status,
        PersonalDetails_CurrentCOR_Row2_Country,
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
        MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang,
        MaritalStatus_SectionA_Languages_languages_lov,
        MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate,
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
        ContactInformation_contact_PhoneNumbers_Phone_IntlNumber_IntlNumber,
        ContactInformation_contact_PhoneNumbers_AltPhone_Type,
        ContactInformation_contact_PhoneNumbers_AltPhone_CanadaUS,
        ContactInformation_contact_PhoneNumbers_AltPhone_Other,
        ContactInformation_contact_PhoneNumbers_AltPhone_NumberExt,
        ContactInformation_contact_PhoneNumbers_AltPhone_NumberCountry,
        ContactInformation_contact_PhoneNumbers_AltPhone_IntlNumber_IntlNumber,
        ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_CanadaUS,
        ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_Other,
        ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberExt,
        ContactInformation_contact_PhoneNumbers_FaxEmail_Phone_NumberCountry,
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
        BackgroundInfo_backgroundInfoCalc,
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
     };

    switch (step) {
      case 1:
        return (
          <PersonalN
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        case 2:
        return (
          <CountriesN
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        case 3:
        return (
          <MaritalN
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        case 4:
        return (
          <LanguagesN
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        case 5:
            return (
              <IDN
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
              />
            );
        case 6:
            return (
              <ContactN
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
              />
            );
        case 7:
            return (
              <VisitN
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
              />
            );
        case 8:
            return (
              <EmploymentN
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
              />
            );
        case 9:
            return (
              <EducationN
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
              />
            );
        case 10:
            return (
              <BackgroundN
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
              />
            );
        case 11:
            return (
            <Tester3
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                values={values}
            />
            );
      default:
        (console.log('This is a multi-step form built with React.'))
    }
  }
}

export default HorizontalStepper;