import React from "react";
import { Card, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { Breadcrumb } from "matx";

const AddOns = (props) => {
    console.log(props)

  return (
    <div className="pricing m-sm-30 position-relative">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Pricing" }]} />
        </div>
      <div className="w-full text-center mb-11">
        <h3 className="m-0 font-medium">
          Choose the right plan for you
        </h3>
        <p className="m-0 pt-4 text-muted">
          All our services come with a licensed representative
        </p>
      </div>

      <div>
        <Grid container spacing={6}>
        <Grid item lg={4} md={4} sm={4} xs={12}>
            <Card elevation={6} className="pricing__card text-center p-sm-24">
              <div className="mb-4">
                <h5>Consultation</h5>
                <h1>$100</h1>
                <small className="text-muted">Hourly</small>
              </div>

              <div className="mb-6">
                <p className="mt-0">One-on-One time with your Consultant</p>
                <p>Ask whatever you need</p>
              </div>
              
              <Link to={`${props.location.pathname}consultation`}>
              <Button variant="contained" color="primary" className="uppercase">
                Get started
              </Button>
              </Link>
            </Card>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <Card elevation={6} className="pricing__card text-center p-sm-24">
              <div className="mb-4">
                <h5>Notarization</h5>
                <h1>$100</h1>
                <small className="text-muted">Per document</small>
              </div>

              <div className="mb-6">
                <p className="mt-0">Certified notaries</p>
                <p>Bump legality</p>
              </div>

              <Link to={`/404`}>
              <Button variant="contained" color="primary" className="uppercase">
                Get started
              </Button>
              </Link>
            </Card>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <Card elevation={6} className="pricing__card text-center p-sm-24">
              <div className="mb-4">
                <h5>Translation</h5>
                <h1>$100</h1>
                <small className="text-muted">Per document</small>
              </div>

              <div className="mb-6">
                <p className="mt-0">English, Chinese, French, etc.</p>
                <p>Certified translators</p>
              </div>

              <Link to ={`/404`}>
              <Button variant="contained" color="primary" className="uppercase">
                Get Started
              </Button>
              </Link>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddOns;
