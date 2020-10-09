import React from "react"
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "@emotion/styled";
import axios from "axios";
import { button } from '@material-ui/core'

import Row from "./prebuilt/Row";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
import SubmitButton from "./prebuilt/SubmitButton";
import CheckoutError from "./prebuilt/CheckoutError";

import history from "../../../../history";
import localStorageService from "../../../services/localStorageService";
import { Breadcrumb } from "matx"
import QRCode from 'react-google-qrcode'

let user = localStorageService.getItem('auth_user')

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = ({ price, onSuccessfulCheckout, props }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [isAlipaying, setAlipayingTo] = useState(false);
  const [isWeChatting, setWeChattingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [type, setType] = useState('none')
  const [wechat, setWechat] = useState('')

  const stripe = useStripe();
  const elements = useElements();

  const alipayResponse = async ev => {
    var query = window.location.search;
    var payment = query.match(/(?<=payment_intent_client_secret=)(.*)(?=\&product)/)
    const prod = window.location.search.match(/(?<=product=)(.*)(?=\&)/)

    const data = { 
      professional_id: 1,
      product_id: prod[0],
      language_code: "eng",
      client_id: user.id
    }
    setAlipayingTo(true);
    stripe.retrievePaymentIntent(payment[0]).then(function(response) {
      if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {

        axios.post("applications/", data).then(result => { 
          console.log(result)
          let user = localStorageService.getItem("auth_user")
          user.applications.push(result.data)
          localStorageService.setItem("auth_user", user)
          let secondstate = user.applications.find (application => application.id === result.data.id);
          const notification = {
            title: "New Application",
            description: `You have been assigned a new ${result.data.products[0].name}`,
            category: "alert",
            notify_at: new Date(),
            go_to_path: `/profile`,
            recipient_id: result.data.professional_id
          }
          axios.post("notifications", notification)
          history.push({pathname: `/application/${result.data.id}`, state: secondstate.id });
            setProcessingTo(false)
            alert('Payment successful - now taking you to your application')
        })
        } else if (response.paymentIntent && response.paymentIntent.status === 'requires_payment_method') {
          setAlipayingTo(false)
          alert('Payment failed; please re-select your product and try again')
          history.push('/products')
        }
        else {
          console.log(response)
        }
    });
  }
  window.onload = function () {
    if (window.location.search.length > 0) {
      alipayResponse()
    }
  }
  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleCardChange = ev => {
    setType('card')
  };

  const handleAlipayChange = async ev => {
    setType('alipay')
  };

  // FUTURE USE WECHAT
  // const handleWeChatChange = async ev => {
  //   setWeChattingTo(true);
  //   const { prod } = props.location.state

  //     const data = { 
  //       professional_id: 1,
  //       product_id: prod,
  //       language_code: "eng",
  //       client_id: user.id
  //     }

  //     const { source } = await stripe.createSource({
  //       type: 'wechat',
  //       amount: 50000,
  //       currency: 'cad',
  //     })
  //       setType('wechat')
  //       console.log(source.wechat.qr_code_url)
  //       setWechat(source.wechat.qr_code_url)
      

  // };

  const handleFormSubmit = async ev => {
    ev.preventDefault();
    const { prod } = props.location.state

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
      }
    };

    const cardElement = elements.getElement("card");

    const { data: clientSecret } = await axios.post("payment/create-payment-intent", {
      product_id: prod,
      professional_id: 1
    });
    
    try {
      if (type === 'card') {
      setProcessingTo(true);
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret.client_secret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }
      const data = { 
        professional_id: 1,
        product_id: prod,
        language_code: "eng",
        client_id: user.id
      }
  
      axios.post("applications/", data).then(result => { 
        let user = localStorageService.getItem("auth_user")
        user.applications.push(result.data)
        localStorageService.setItem("auth_user", user)
        let secondstate = user.applications.find (application => application.id === result.data.id);
        const notification = {
          title: "New Application",
          description: `You have been assigned a new ${result.data.products[0].name}`,
          category: "alert",
          notify_at: new Date(),
          go_to_path: `/profile`,
          recipient_id: 1
        }
        axios.post("notifications", notification)
        const form = {    PersonalDetails_ServiceIn_ServiceIn: "01",
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
    natLang: "{\"label\":\"English\",\"value\":\"001\"}",
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
    bgc: "[\"N\"]",
    abc: "[\"N\"]",
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
    GovPosition_Choice: "N" }
        axios.put("users/me/form/save", form)
        history.push({pathname: `/application/${result.data.id}`, state: secondstate.id });
          alert('Payment successful - proceeding to your application')
    })
  }

  else if (type === 'alipay') {
    
    setAlipayingTo(true);
      const { data: clientSecret } = await axios.post("payment/create-payment-intent", {
        product_id: prod,
        professional_id: 1
      });

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "alipay",
        billing_details: billingDetails
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

    stripe.confirmAlipayPayment(clientSecret.client_secret,
      {
        return_url: `${window.location.href}?product=${prod}&`,
        receipt_email: user.email,
        payment_method: paymentMethodReq.paymentMethod.id
      });
  }
    } catch (err) {
      setCheckoutError(err.message);
    }
  
  }

  const iframeStyles = {
    base: {
      color: "#fff",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
  };

  return (
    <div>
    <form onSubmit={handleFormSubmit}>
      <div className="upload-form m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Payment" }]} />
        </div>
      </div>
      <Row>
        <BillingDetailsFields />
      </Row>
      <Row>
        <CardElementContainer>
          <CardElement
            options={cardElementOpts}
            onChange={handleCardDetailsChange}
          />
        </CardElementContainer>
      </Row>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <Row>
        <SubmitButton name="payment" value="card" onClick={handleCardChange} disabled={isProcessing || !stripe}>
          {isProcessing ? "Processing..." : `Pay $200`}
        </SubmitButton>
      </Row>
      <Row>
        <SubmitButton name="payment" value="alipay" onClick={handleAlipayChange} disabled={isAlipaying || !stripe}>
          {isAlipaying ? "Processing..." : `Alipay`}
        </SubmitButton>
      </Row>
    </form>

      {/* <Row>
        <SubmitButton name="payment" value="wechat" onClick={handleWeChatChange} disabled={isWeChatting || !stripe}>
          {isWeChatting ? "Processing..." : `WeChat Pay`}
        </SubmitButton>
      </Row> */}
      {type === 'wechat' && (
      <QRCode
          data={wechat}
          size={115}
        />
      )}
      </div>
  );
};

export default CheckoutForm;
