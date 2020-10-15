import React from "react"

import Layout from "../components/Layout";
import Consultation from "../components/Consultation";

const MainPage = props => {

  return (
    <Layout title="Donut Shop">
      <Consultation props={props}/>
    </Layout>
  );
};

export default MainPage;
