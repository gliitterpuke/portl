import React, { useState } from 'react';
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

export const UserForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    PersonalDetails_ServiceIn_ServiceIn: '',
    PersonalDetails_VisaType_VisaType: '',
    PersonalDetails_Name_FamilyName: '', 
    PersonalDetails_Name_GivenName: '',
    PersonalDetails_AliasName_AliasNameIndicator: '',
    PersonalDetails_Sex_Sex: '',
    PersonalDetails_PlaceBirthCity: '',
    PersonalDetails_DOBYear: '',
    PersonalDetails_DOBMonth: '',
    PersonalDetails_DOBDay: '',
    PersonalDetails_PlaceBirthCountry: '',
    PersonalDetails_CurrentCOR_Row2_Status: '',
    PersonalDetails_CurrentCOR_Row2_Country: '',
    PersonalDetails_PCRIndicator: '',
    PersonalDetails_SameAsCORIndicator: '',
    MaritalStatus_SectionA_MaritalStatus: '',
    MaritalStatus_SectionA_Languages_languages_nativeLang_nativeLang: '',
    MaritalStatus_SectionA_Languages_languages_ableToCommunicate_ableToCommunicate: '',
    MaritalStatus_SectionA_Languages_LanguageTest: '',
    MaritalStatus_SectionA_PassportNum_PassportNum: '',
    MaritalStatus_SectionA_Passport_CountryofIssue_CountryofIssue: '',
    MaritalStatus_SectionA_Passport_IssueDate_IssueDate: '',
    MaritalStatus_SectionA_Passport_ExpiryDate: '',
    MaritalStatus_SectionA_Passport_TaiwanPIN: '',
    MaritalStatus_SectionA_Passport_IsraelPassportIndicator: '',
    natID_q1_natIDIndicator: '',
    usCard_q1_usCardIndicator: '',
    ContactInformation_contact_AddressRow1_Streetname_Streetname: '',
    ContactInformation_contact_AddressRow2_CityTow_CityTown: '',
    ContactInformation_contact_AddressRow2_Country_Country: '',
    ContactInformation_contact_SameAsMailingIndicator: '',
    ContactInformation_contact_PhoneNumbers_FaxEmail_Email: '',
    ContactInformation_contact_PhoneNumbers_Phone_CanadaUS: '0',
    ContactInformation_contact_PhoneNumbers_Phone_Other: '0',
    DetailsOfVisit_PurposeRow1_PurposeOfVisit_PurposeOfVisit: '',
    DetailsOfVisit_PurposeRow1_HowLongStay_FromDate: '',
    DetailsOfVisit_PurposeRow1_HowLongStay_ToDate: '',
    DetailsOfVisit_PurposeRow1_Funds_Funds: '',
    DetailsOfVisit_Contacts_Row1_Name_Name: '',
    DetailsOfVisit_Contacts_Row1_AddressinCanada_AddressinCanada: '',
    Education_EducationIndicator: "",
    Occupation_OccupationRow1_FromYear: '',
    Occupation_OccupationRow1_FromMonth: '',
    Occupation_OccupationRow1_Occupation_Occupation: '',
    Occupation_OccupationRow1_Employer: '',
    Occupation_OccupationRow1_CityTown_CityTown: '',
    Occupation_OccupationRow1_Country_Country: '',
    BackgroundInfo_Choice: [ "", "" ],
    BackgroundInfo2_VisaChoice1: "",
    BackgroundInfo2_VisaChoice2: "",
    BackgroundInfo2_Details_VisaChoice3: "",
    BackgroundInfo3_Choice: "",
    BackgroundInfo3_details: "",
    Military_Choice: "",
    Occupation_Choice: "",
    GovPosition_Choice: ""
    
  });
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  switch (step) {
    case 1:
      return (
        <Yi
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      );
    case 2:
        return (
          <Er
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
    case 3:
      return (
        <San
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 4:
      return (
        <Si
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 5:
      return (
        <Wu
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 6:
      return (
        <Liu
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 7:
      return (
        <Qi
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 8:
      return (
        <Ba
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 9:
      return (
        <Jiu
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 10:
      return (
        <Shi
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 11:
      return (
        <QueDing formData={formData} nextStep={nextStep} prevStep={prevStep} />
      );
    default:
      return <Success />;
  }
};

export default UserForm;