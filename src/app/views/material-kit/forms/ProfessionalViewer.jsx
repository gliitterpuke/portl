import React, { Component } from "react";
import {
  Button,
  Grid,
  Typography,
  FormLabel,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import localStorageService from "../../../services/localStorageService"
import history from "../../../../history"

let user = localStorageService.getItem("auth_user")
  
class ProfessionalViewer extends Component {
  state = {
  };


  componentDidMount() {
    this.setState({ ...user.professional_profile })
      console.log(user)
  }

  render() {
    let user = localStorageService.getItem("auth_user")
    let state = user.professional_profile.service_languages
    let coo = user.professional_profile.country_of_operation
    let products = user.professional_profile.serviced_products

    return (
      <div className="invoice-viewer py-4">
        <div className="viewer_actions px-4 mb-5 flex items-center justify-end">
          <div>
            <Button
              className="mr-4 py-2"
              variant="contained"
              color="primary"
              onClick={() => this.props.toggleProfessionalEditor()}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        <div id="print-area">
          <div className="viewer__order-info px-4 mb-4 flex justify-between">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <FormLabel>Personal Information</FormLabel>
              </Grid>
              <Grid item xs={12} md={4}>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>First Name</strong>
                </h5>
                <p> {user.professional_profile.first_name} </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>Last Name</strong>
                </h5>
                <p> {user.professional_profile.last_name} </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>Sex</strong>
                </h5>
                <p> {user.professional_profile.sex} </p>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <FormLabel>Professional Information</FormLabel>
              </Grid>
              <Grid item xs={12} md={4}>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>Company</strong>
                </h5>
                <p> {user.professional_profile.company} </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>Occupation</strong>
                </h5>
                <p> {user.professional_profile.occupation} </p>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <FormLabel>Financial Information</FormLabel>
              </Grid>
              <Grid item xs={12} md={4}>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>Payout Account</strong>
                </h5>
                <p> {user.professional_profile.payout_account} </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>Max Processing Budget</strong>
                </h5>
                <p> {user.professional_profile.max_processing_budget} </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>Current Processing Budget</strong>
                </h5>
                <p> {user.professional_profile.curr_processing_budget} </p>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <FormLabel>Other</FormLabel>
              </Grid>
              <Grid item xs={12} md={4}>
                <h5 className="font-normal mb-4 capitalize">
                  <strong>Country of Operation</strong>
                </h5>
                <p> {user.professional_profile.country_of_operation.name} </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-normal mb-4 capitalize">
                        <strong><h5>Service Languages</h5></strong>
                        </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.map((lang) => (
                      <TableRow key={lang.id}>
                        <TableCell className="pl-sm-24 capitalize" align="left">
                          {lang.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12} md={4}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-normal mb-4 capitalize">
                        <strong><h5>Serviced Products</h5></strong>
                        </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((products) => (
                      <TableRow key={products.id}>
                        <TableCell className="pl-sm-24 capitalize" align="left">
                          {products.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfessionalViewer);
