import React from "react"
import { useState } from "react";
import Router from "next/router";

import Layout from "../components/Layout";
import CheckoutForm from "../components/CheckoutForm";
import history from "../../../../history"

const MainPage = props => {

  return (
    <Layout title="Donut Shop">
      <CheckoutForm/>
    </Layout>
  );
};

export default MainPage;
