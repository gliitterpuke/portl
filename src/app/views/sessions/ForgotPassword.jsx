import React, { useState } from "react";
import { Card, Grid, Button } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { resetPassword } from "../../redux/actions/LoginActions";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  cardHolder: {
    background: "#1A2038",
  },
  card: {
    maxWidth: 800,
    borderRadius: 12,
    margin: "1rem",
  },
}));

const ForgotPassword = () => {
  const [state, setState] = useState({});

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    try { 
      console.log(state);
      await dispatch(resetPassword(state))
      alert("Success! Please check your email for further instructions")
    } catch(e) {
      alert('Please try again')
      console.log(e);
    }
  };

  let { email } = state;

  return (
    <div
      className={clsx(
        "flex justify-center items-center  min-h-full-screen",
        classes.cardHolder
      )}
    >
      <Card className={classes.card}>
        <Grid container>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <div className="p-8 flex justify-center items-center h-full">
              <img
                className="w-full"
                src="/assets/images/illustrations/dreamer.svg"
                alt=""
              />
            </div>
          </Grid>
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <div className="p-8 h-full bg-light-gray relative">
              <ValidatorForm onSubmit={handleFormSubmit}>
                <TextValidator
                  className="mb-6 w-full"
                  variant="outlined"
                  label="Email"
                  onChange={handleChange}
                  type="email"
                  name="email"
                  size="small"
                  value={email || ""}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                />
                <div className="flex items-center">
                  <Button variant="contained" color="primary" type="submit">
                    Reset Password
                  </Button>
                  <span className="ml-4 mr-2">or</span>
                  <Link to="/session/signin">
                    <Button className="capitalize">Sign in</Button>
                  </Link>
                </div>
              </ValidatorForm>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default ForgotPassword;
