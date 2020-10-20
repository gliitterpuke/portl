import React from "react";
import { Card, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getProductList,
  getCategoryList,
  getRatingList,
  getBrandList,
} from "app/redux/actions/EcommerceActions";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  pricingCard: {
    borderRadius: 20,
    "& h5": {
      letterSpacing: 3,
    },
    "& h1": {
      lineHeight: 1,
    },
  },
}));

const Pricing = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { productList = [] } = useSelector((state) => state.ecommerce);

  React.useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  return (
    <div className="m-sm-30 relative">

      <div className="w-full text-center mb-11">
        <h3 className="m-0 font-medium">
          Choose the plan that's right for you
        </h3>
        <p className="m-0 pt-4 text-muted">
          All our services come with a licensed representative
        </p>
      </div>

      <div>
        <Grid container spacing={6}>
          {/* set to productList and change names when updating */}
          {planList.map((item, ind) => (
            <Grid key={item.title} item lg={4} md={4} sm={4} xs={12}>
              <Card
                elevation={6}
                className={clsx(
                  "card text-center p-sm-24",
                  classes.pricingCard
                )}
              >
                <img
                  className="mb-4 h-152 w-152"
                  src={item.logo}
                  alt={item.title}
                />
                <div className="mb-4">
                  <h5 className="m-0 text-primary uppercase font-light">
                    {item.title}
                  </h5>
                  <h1 className="m-0 text-primary uppercase font-medium pt-2 pb-1 text-48">
                    ${item.price}
                  </h1>
                  <small className="text-muted">{item.subtitle}</small>
                </div>

                <div className="mb-6 text-muted text-16">
                  <p className="mt-0">{item.first}</p>
                  <p>{item.second}</p>
                  <p className="mb-0">{item.third}</p>
                </div>

                <Link to={{ pathname:`/payments`, state: { prod: `${item.prod}` }}}>
                <Button
                  variant="contained"
                  color="primary"
                  className="uppercase"
                >
                  Sign up
                </Button>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

const planList = [
  {
    title: "Visitor Visa",
    price: 75,
    subtitle: "Add-ons available",
    first: "Business",
    second: "Tourism",
    third: "Super Visas",
    logo: "/assets/images/illustrations/baby.svg",
    prod: 1,
  },
  {
    title: "Study Permit",
    price: 195,
    subtitle: "Add-ons available",
    first: "Business",
    second: "Tourism",
    third: "Super Visas",
    logo: "/assets/images/illustrations/upgrade.svg",
    prod: 2,
  },
  {
    title: "Work Permit",
    price: 495,
    subtitle: "Add-ons available",
    first: "Business",
    second: "Tourism",
    third: "Super Visas",
    logo: "/assets/images/illustrations/business_deal.svg",
    prod: 3,
  },
];
export default Pricing;
