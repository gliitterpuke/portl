import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  MenuItem
} from "@material-ui/core";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";

class SignUp extends Component {
  state = {
    role: "",
    email: "",
    password: "",
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    alert(JSON.stringify(this.state));
          fetch('http://localhost:8000/api/v1/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
        }).then(response => response.json())
        .then(response => {
        
            console.log(response)
        });
  };
  render() {
    let { role, email, password } = this.state;
    return (
      <div className="signup flex justify-center w-full h-full-screen">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-8 flex justify-center bg-light-gray items-center h-full">
                  <img
                    src="/assets/images/illustrations/posting_photo.svg"
                    alt=""
                  />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-9 h-full">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <SelectValidator
                      label="Role"
                      className="mb-6 w-full"
                      name="role"
                      value={role}
                      style={{ width: 300 }}
                      variant="outlined"
                      onChange={this.handleChange}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    >
                      <MenuItem value={"client"}>Client</MenuItem>
                      <MenuItem value={"professional"}>Professional</MenuItem>
                    </SelectValidator>       
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid"
                      ]}
                    />
                    <TextValidator
                      className="mb-4 w-full"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <FormControlLabel
                      className="mb-4"
                      name="agreement"
                      onChange={this.handleChange}
                      control={<Checkbox />}
                      label="I have read and agree to the terms of service."
                    />
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
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/session/signin")
                        }
                      >
                        Sign in
                      </Button>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // setUser: PropTypes.func.isRequired
});

export default connect(mapStateToProps, {})(SignUp);
