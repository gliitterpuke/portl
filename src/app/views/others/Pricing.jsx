import React from "react";
import { Card, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Breadcrumb } from "matx";

const Pricing = () => {

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
        <Grid item lg={3} md={3} sm={3} xs={12}>
            <Card elevation={6} className="pricing__card text-center p-sm-24">
              <img
                className="mb-4"
                src="/assets/images/illustrations/baby.svg"
                alt="upgrade"
              />
              <div className="mb-4">
                <h5>Visitor Visa</h5>
                <h1>$200</h1>
                <small className="text-muted">Add-ons available</small>
              </div>

              <div className="mb-6">
                <p className="mt-0">Business</p>
                <p>Tourism</p>
                <p className="mb-0">Super Visas</p>
              </div>
              
              <Link to={{ pathname:`/payments`, state: { prod: 1 }}}>
              <Button variant="contained" color="primary" className="uppercase">
                Get started
              </Button>
              </Link>
            </Card>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <Card elevation={6} className="pricing__card text-center p-sm-24">
              <img
                className="mb-4"
                src="/assets/images/illustrations/upgrade.svg"
                alt="upgrade"
              />
              <div className="mb-4">
                <h5>Study Permit</h5>
                <h1>$200</h1>
                <small className="text-muted">One-time fee</small>
              </div>

              <div className="mb-6">
                <p className="mt-0">Post-secondary education</p>
                <p>Work while studying</p>
                <p className="mb-0">Extensions available</p>
              </div>

              <Link to={{ pathname:`/payments`, state: { prod: 1 }}}>
              <Button variant="contained" color="primary" className="uppercase">
                Get started
              </Button>
              </Link>
            </Card>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <Card elevation={6} className="pricing__card text-center p-sm-24">
              <img
                className="mb-4"
                src="/assets/images/illustrations/business_deal.svg"
                alt="upgrade"
              />
              <div className="mb-4">
                <h5>Express Entry</h5>
                <h1>$495</h1>
                <small className="text-muted">Add-ons available</small>
              </div>

              <div className="mb-6">
                <p className="mt-0">For skilled immigrants</p>
                <p>Settle permanently</p>
                <p className="mb-0">Filler</p>
              </div>

              <Link to={{ pathname:`/payments`, state: { prod: 1 }}}>
              <Button variant="contained" color="primary" className="uppercase">
                Get Started
              </Button>
              </Link>
            </Card>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <Card elevation={6} className="pricing__card text-center p-sm-24">
              <img
                className="mb-4"
                src="/assets/images/illustrations/baby.svg"
                alt="upgrade"
              />
              <div className="mb-4">
                <h5>Work Permit</h5>
                <h1>$200</h1>
                <small className="text-muted">Add-ons available</small>
              </div>

              <div className="mb-6">
                <p className="mt-0">Flexibility</p>
                <p>Work in Canada</p>
                <p className="mb-0">Filler</p>
              </div>

              <Link to={{ pathname:`/payments`, state: { prod: 1 }}}>
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

export default Pricing;
