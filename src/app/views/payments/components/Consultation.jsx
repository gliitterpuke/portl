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

const Consultation = ({ price, onSuccessfulCheckout, props }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [isAlipaying, setAlipayingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [type, setType] = useState('none')

  const stripe = useStripe();
  const elements = useElements();

  const alipayResponse = async ev => {
    var query = window.location.search;
    var payment = query.match(/(?<=payment_intent_client_secret=)(.*)(?=\&product)/)
    const prod = window.location.search.match(/(?<=product=)(.*)(?=%3F)/)
    const app = window.location.search.match(/(?<=app%3D)(.*)(?=\&)/)
    const appindex = app[0]
    let user = localStorageService.getItem('auth_user')
    const appid = user.applications[appindex].id

    const currentProd = [];
    user.applications[appindex].products.forEach(function(obj){
      currentProd.push(obj.id);
      currentProd.push(prod[0])
    })
    const data = { 
      status: "CLIENT_ACTION_REQUIRED",
      products: currentProd
    }
    setAlipayingTo(true);
    const response = await stripe.retrievePaymentIntent(payment[0])
    if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {

        const result = await axios.put(`applications/${appid}`, data)
        console.log(result)
        let user = localStorageService.getItem("auth_user")
        user.applications.push(result.data)
        localStorageService.setItem("auth_user", user)
        const notification = {
        title: `New add-on for Client ${result.data.client_id}`,
        description: `Client ${result.data.client_id}'s application has a new add-on!`,
        category: "alert",
        notify_at: new Date(),
        go_to_path: `/calendar`,
        recipient_id: result.data.professional_id
        }
        axios.post("notifications", notification)
        alert('Payment successful - proceeding to your application')
        history.push({pathname: `/event`, state: appid });
    }
    else if (response.paymentIntent && response.paymentIntent.status === 'requires_payment_method') {
        setAlipayingTo(false)
        alert('Payment failed; please re-select your product and try again')
        this.props.history.goBack()
    }
    else {
        console.log(response)
    }
    
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

  const handleFormSubmit = async ev => {
    ev.preventDefault();
    let user = localStorageService.getItem('auth_user')
    const { app, rep, prod, appindex } = props.location.state

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

      const currentProd = [];
      user.applications[appindex].products.forEach(function(obj){
        currentProd.push(obj.id);
        currentProd.push(prod)
      })
      const data = { 
        status: "CLIENT_ACTION_REQUIRED",
        products: currentProd
      }

      const result = await axios.put(`applications/${app}`, data)
      let user = localStorageService.getItem("auth_user")
      user.applications[appindex] = result.data
      localStorageService.setItem("auth_user", user)
      const notification = {
        title: `New add-on for Client ${result.data.client_id}`,
        description: `Client ${result.data.client_id}'s application has a new add-on!`,
        category: "alert",
        notify_at: new Date(),
        go_to_path: `/calendar`,
        recipient_id: rep
      }
      axios.post("notifications", notification)
      history.push({pathname: `/event`, state: app });
          alert('Payment successful - proceeding to your application')
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
        return_url: `${window.location.href}?product=${prod}?app=${appindex}&`,
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

      </div>
  );
};

export default Consultation;
