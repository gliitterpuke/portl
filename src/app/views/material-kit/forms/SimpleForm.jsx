import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import { deleteFile } from "./existing";
import ClientViewer from "./ClientViewer";
import ClientEditor from "./ClientEditor";
import {
  Button,
  Icon,
  Grid,
  Card,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Divider
} from "@material-ui/core";
import { ConfirmationDialog } from "matx";
import { parseJSON } from "date-fns";
import localStorageService from "../../../services/localStorageService"
import history from "../../../../history"

let user = localStorageService.getItem("auth_user")

//if (!localStorage.getItem("access_token")) {
//  history.push('/session/signin');
//  console.log(localStorage)
//  }

class SimpleForm extends Component {
  state = {
    appList: [],
  };

  componentDidMount() {
    this.setState({ appList: user.client_profile.applications });
    this.setState({ showClientEditor: false });
    console.log(localStorage)
  }

  handeViewClick = applicationId => {
    let user = localStorageService.getItem("auth_user")
    let secondstate = user.client_profile.applications.find (application => application.id == applicationId);
    console.log(applicationId)
    console.log(secondstate)
    this.props.history.push({pathname: `/application/${applicationId}`, state: secondstate.id });
  }

  handeDeleteClick = application => {
    this.setState({ shouldShowConfirmationDialog: true, application });
  };

  handleConfirmationResponse = () => {
    let { application } = this.state;
    let status = "PROFESSIONAL_ACTION_REQUIRED"
 //   let state = user.client_profile.applications.findIndex (application => application.id === this.props.location.state.id); 
    this.setState({
      shouldShowConfirmationDialog: false
    });
    console.log(application.id)
    axios.put(`https://portl-dev.herokuapp.com/api/v1/applications/${application.id}/close`, null, { params: {
      status
    }}).then(res => {
      user.client_profile.applications[application.id] = res.data
      localStorageService.setItem("auth_user", user)
      console.log(user.client_profile.applications[application.id])
      this.forceUpdate()

    });
  };

  handleDialogClose = () => {
    this.setState({ shouldShowConfirmationDialog: false });
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = birth_date => {
    // console.log(date);

    this.setState({ birth_date });
  };
  toggleClientEditor = () => {
    this.setState({
      showClientEditor: !this.state.showClientEditor,
    });
//    this.forceUpdate()
  };

  render() {
    let user = localStorageService.getItem("auth_user")
    let state = user.client_profile.applications
    console.log(localStorageService.getItem("auth_user").client_profile.applications)

    return (
      <React.Fragment>
      <div className="m-sm-30">
        <Card className="px-6 pt-2 pb-4">
      {this.state.showClientEditor ? (
        <ClientEditor
          toggleClientEditor={this.toggleClientEditor}
        />
      ) : (
        <ClientViewer toggleClientEditor={this.toggleClientEditor} />
      )}
    </Card>
    </div>
      <div className="m-sm-30">
        <Card className="px-6 pt-2 pb-4">
        <br /><br />
        <Grid container spacing={2}>
          <Grid item xs={12} lg={10} md={10}>
            <Typography variant="h6">Applications</Typography>
          </Grid>
          <Grid item xs={12} lg={2} md={2}>
            <Link to={`/application/new`}>
              <Button color="primary" variant="contained">
                <span className="pl-2 capitalize">Create New App</span>
              </Button>
            </Link>
          </Grid>
        </Grid>
        <br/><br/>
          <Table className="min-w-3000">
            <TableHead>
              <TableRow>
                <TableCell className="pl-sm-24">Program</TableCell>
                <TableCell className="px-0">ID</TableCell>
                <TableCell className="px-0">Created</TableCell>
                <TableCell className="px-0">Updated</TableCell>
                <TableCell className="px-0">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="pl-sm-24 capitalize" align="left">
                    {application.product.name}
                  </TableCell>
                  <TableCell className="pl-sm-24 capitalize" align="left">
                    {application.id}
                  </TableCell>
                  <TableCell className="pl-0 capitalize" align="left">
                    {parseJSON(application.created_at).toString().replace(RegExp("GMT.*"), "")}
                  </TableCell>
                  <TableCell className="pl-0 capitalize" align="left">
                    {parseJSON(application.updated_at).toString().replace(RegExp("GMT.*"), "")}
                  </TableCell>
                  <TableCell className="pl-0 capitalize">
                    {application.status.replace("CLIENT_ACTION_REQUIRED", "In Progress")}
                  </TableCell>
                  <TableCell className="pl-0">
                    <IconButton
                      color="primary"
                      className="mr-2"
                      onClick={() => this.handeViewClick(application.id)}
                    >
                      <Icon>chevron_right</Icon>
                    </IconButton>
                    <IconButton onClick={() => this.handeDeleteClick(application)}>
                      <Icon color="error">delete</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </Card>
        <ConfirmationDialog
          open={this.state.shouldShowConfirmationDialog}
          onConfirmDialogClose={this.handleDialogClose}
          onYesClick={this.handleConfirmationResponse}
          text="Are you sure to delete?"
        />
      </div>
      </React.Fragment>
    );
  }
}

export default SimpleForm;
