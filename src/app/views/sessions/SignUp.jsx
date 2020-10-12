import React, { useState } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Link } from "react-router-dom";
import useAuth from 'app/hooks/useAuth';
import history from "history.js";

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

const JwtRegister = () => {
  
  const [state, setState] = useState({is_client: true});
  const [open, setOpen] = useState(false)
  const classes = useStyles();
  const { register } = useAuth();

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleClickOpen = event => {
    setOpen(true)
  };

  const handleClose = event => {
    setOpen(false)
  };

  const handleFormSubmit = async (event) => {
    try {
      await register(state.email, state.password, state.is_client);
      
      alert('Signup successful! Please check your email for your verification email.')
      history.push("/session/signin");
    } catch(e) {
      alert('Email already registered')
      console.log(e);
    }
  };

  let { email, password, agreement } = state;

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
            <div className="p-8 flex justify-center bg-light-gray items-center h-full">
              <img
                className="w-full"
                src="/assets/images/illustrations/posting_photo.svg"
                alt=""
              />
            </div>
          </Grid>
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <div className="p-8 h-full">
              <ValidatorForm onSubmit={handleFormSubmit}>
                <TextValidator
                  className="mb-6 w-full"
                  variant="outlined"
                  size="small"
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
                />
                <TextValidator
                  className="mb-4 w-full"
                  label="Password"
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  value={password || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <a onClick={handleClickOpen}>
                <FormControlLabel
                  className="mb-4"
                  name="agreement"
                  onChange={(e) =>
                    handleChange({
                      target: { name: "agreement", value: e.target.checked },
                    })
                  }
                  control={
                    <Checkbox size="small" checked={agreement || false} />
                  }
                  label="I have read and agreed to the terms of service."
                />
                </a>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                    >
                  <DialogTitle id="alert-dialog-title">{"Terms of Service"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Terms of Service goes here
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
                    <br/>
                <div className="flex items-center">
                  <Button
                    className="capitalize"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Sign up
                  </Button>
                  <span className="mx-2 ml-5">or</span>
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

export default JwtRegister;
