import React from "react"
import { useState } from "react";
import Router from "next/router";

import Layout from "../components/Layout";
import Consultation from "../components/Consultation";
import history from "../../../../history"

const MainPage = props => {
  console.log(props)

  return (
    <Layout title="Donut Shop">
      <Consultation props={props}/>
    </Layout>
  );
};

export default MainPage;
