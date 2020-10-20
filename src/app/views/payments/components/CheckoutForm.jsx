import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CheckoutError from "./prebuilt/CheckoutError";
import {
  Card,
  Grid,
  Button,
  MenuItem,
} from "@material-ui/core";
import { countries } from "../Country";
import { useSelector, useDispatch } from "react-redux";
import history from "../../../../history";
import localStorageService from "../../../services/localStorageService";
import axios from "axios.js"
import {
  getCartList,
} from "app/redux/actions/EcommerceActions";

let user = localStorageService.getItem('auth_user')

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#000000',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#87bbfd',
      },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

const CheckoutForm = ({props, product}) => {
  const [state, setState] = useState({});
  const [isProcessing, setProcessingTo] = useState(false);
  const [isAlipaying, setAlipayingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [type, setType] = useState('none')

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  
  const { cartList = [] } = useSelector((state) => state.ecommerce);

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleCardChange = ev => {
    setType('card')
  };

  const handleAlipayChange = async ev => {
    setType('alipay')
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async ev => {
    ev.preventDefault();
    const { prod } = props.location.state

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.prov.value,
        // country: ev.target.country.value,
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
        const form = {    
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

  const alipayResponse = async ev => {
    const query = window.location.search;
    const payment = query.match(/payment_intent_client_secret=(.*)&product/)
    const prod = window.location.search.match(/&product=(.*)&redirect/)

    dispatch(getCartList(prod[1]));

    const data = { 
      professional_id: 1,
      product_id: prod[1],
      language_code: "eng",
      client_id: user.id
    }
    setAlipayingTo(true);
    const response = await stripe.retrievePaymentIntent(payment[1])
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
  }

  // window.onload = function () {
  //   alert('load damnit')
  //   if (!stripe || !elements) {
  //     // Stripe.js has not loaded yet. Make sure to disable
  //     // form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   // if (window.location.search.length > 0) {
  //   //   alipayResponse()
  //   // }
  // }

  useEffect(() => {
    if (!window.location.search > 0) {
      dispatch(getCartList(props.location.state.prod));
    }
    else if (stripe) {
      setTimeout(() => {
        if (window.location.search.length > 0) {
          console.log(stripe)
          alipayResponse()
        }
      }, 3000);
      return;
    }
  }, [dispatch]);  

  let {
    name,
    email,
    address,
    city,
    prov,
    country,
    zip
  } = state;

  return (
    <Card className="checkout m-sm-30 p-sm-24">
      <ValidatorForm onSubmit={handleFormSubmit} onError={(errors) => null}>
        <h5 className="font-medium mt-0 mb-6">Billing Details</h5>
        <Grid container spacing={3}>
          <Grid item lg={7} md={7} sm={12} xs={12}>
            <Grid container spacing={3} className="mb-2">
              <Grid item xs={6}>
                <TextValidator
                  variant="outlined"
                  label="Name"
                  onChange={handleChange}
                  type="text"
                  name="name"
                  value={name || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  className="mb-5"
                  variant="outlined"
                  label="Email"
                  onChange={handleChange}
                  type="email"
                  name="email"
                  value={email || ""}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                  fullWidth
                />
              </Grid>
            </Grid>

            <TextValidator
              variant="outlined"
              className="mb-5"
              label="Address"
              onChange={handleChange}
              type="text"
              name="address"
              value={address || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
              fullWidth
            />

            <Grid container spacing={3} className="mb-2">
              <Grid item xs={6}>
                <TextValidator
                  variant="outlined"
                  label="City"
                  onChange={handleChange}
                  type="text"
                  name="city"
                  value={city || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  variant="outlined"
                  label="State/Province"
                  onChange={handleChange}
                  type="text"
                  name="prov"
                  value={prov || ""}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  label="Country"
                  select
                  name="country"
                  variant="outlined"
                  value={country || ""}
                  onChange={handleChange}
                  fullWidth
                >
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextValidator>
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  variant="outlined"
                  label="Postal/Zip Code"
                  onChange={handleChange}
                  type="text"
                  name="zip"
                  value={zip || ""}
                  fullWidth
                />
              </Grid>
            </Grid>

            <CardElement
              options={CARD_OPTIONS} onChange={handleCardDetailsChange}
            />
            {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <div className="flex justify-between mb-4">
              <h6 className="m-0">Product</h6>
              <h6 className="m-0">Total Price</h6>
            </div>
            <div>
              <div className="flex justify-between py-4">
                <span className="text-muted pr-8">{cartList.name}</span>
                <span className="text-muted">
                  ${cartList.total_price}
                </span>
              </div>
              <div className="flex justify-between mb-8 mt-4">
                <h6 className="m-0">Total</h6>
                <h6 className="m-0">${cartList.total_price}</h6>
              </div>
              <Button
                name="payment"  value="card" onClick={handleCardChange} 
                disabled={isProcessing || !stripe}
                className="w-full" color="primary" variant="contained" type="submit"
              >
                {isProcessing ? "Processing..." : `Pay by Card`}
              </Button>
              <br/><br/>
              <Button
                name="payment"  value="card" onClick={handleAlipayChange} 
                disabled={isAlipaying || !stripe}
                className="w-full" color="secondary" variant="contained" type="submit"
              >
                {isAlipaying ? "Processing..." : `Alipay`}
              </Button>
            </div>
          </Grid>
        </Grid>
      </ValidatorForm>

    </Card>
  );
};

export default CheckoutForm;
