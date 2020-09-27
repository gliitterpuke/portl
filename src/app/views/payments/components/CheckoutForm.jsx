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

let user = localStorageService.getItem('auth_user')
let baseURL = "http://127.0.0.1:8000/api/v1/"
const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [type, setType] = useState('none')

  const stripe = useStripe();
  const elements = useElements();

  // TIP
  // use the cardElements onChange prop to add a handler
  // for setting any errors:

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleCardChange = ev => {
    setType('card')
  };

  const handleAlipayChange = async ev => {
      const { data: clientSecret } = await axios.post(baseURL + "create-payment-intent", {
        product_id: 1,
        professional_id: 1
      });

      const data = { 
        professional_id: 1,
        product_id: 3,
        language_code: "eng",
        client_id: user.id
      }

      await stripe.confirmAlipayPayment(clientSecret.client_secret, {
        return_url: window.location.href
      }).then((res) => { 
        axios.post(baseURL + "applications/", data).then(result => { 
          let user = localStorageService.getItem("auth_user")
          user.applications.push(result.data)
          localStorageService.setItem("auth_user", user)
          let secondstate = user.applications.find (application => application.id === result.data.id);
          history.push({pathname: `/application/${result.data.id}`, state: secondstate.id });
          alert('Payment successful - proceeding to your application')
        })
      }).catch(err => {
        console.log(err)
      })
  
  };

  const handleFormSubmit = async ev => {
    ev.preventDefault();

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

    setProcessingTo(true);

    const cardElement = elements.getElement("card");
    
    try {
      const { data: clientSecret } = await axios.post(baseURL + "create-payment-intent", {
        product_id: 1,
        professional_id: 1
      });

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
        product_id: 3,
        language_code: "eng",
        client_id: user.id
      }
  
      axios.post(baseURL + "applications/", data).then(result => { 
        let user = localStorageService.getItem("auth_user")
        user.applications.push(result.data)
        localStorageService.setItem("auth_user", user)
        let secondstate = user.applications.find (application => application.id === result.data.id);
        history.push({pathname: `/application/${result.data.id}`, state: secondstate.id });
        alert('Payment successful - proceeding to your application')
      })
      // onSuccessfulCheckout();
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
        {/* TIP always disable your submit button while processing payments */}
        <SubmitButton name="payment" value="card" onClick={handleCardChange} disabled={isProcessing || !stripe}>
          {isProcessing ? "Processing..." : `Pay $200`}
        </SubmitButton>
      </Row>

    </form>
      <Row>
        {/* TIP always disable your submit button while processing payments */}
        <SubmitButton name="payment" value="alipay" onClick={handleAlipayChange} disabled={isProcessing || !stripe}>
          {isProcessing ? "Processing..." : `Alipay`}
        </SubmitButton>
      </Row>
      </div>
  );
};

export default CheckoutForm;
