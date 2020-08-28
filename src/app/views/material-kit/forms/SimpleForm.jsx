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
import { SimpleCard } from "matx";
import { parse } from "date-fns";
import localStorageService from "../../../services/localStorageService"

const auth = {
  headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
}
let user = localStorageService.getItem("auth_user")
class SimpleForm extends Component {
  state = {
    appList: [],
  };

  componentDidMount() {
    axios.get("https://portl-dev.herokuapp.com/api/v1/users/me/", auth).then(res => this.setState({ appList: res.data.client_profile.applications }));
    this.setState({ showClientEditor: false });
  }

  handeViewClick = applicationId => {
    let state = user.client_profile.applications.find (application => application.id === applicationId);
    this.props.history.push({pathname: `/application/${applicationId}`, state: state });
  }

  handeDeleteClick = application => {
    this.setState({ shouldShowConfirmationDialog: true, application });
  };

  handleConfirmationResponse = () => {
    let { application } = this.state;
    deleteFile(application).then(res => {
      this.setState({
        appList: res.data,
        shouldShowConfirmationDialog: false
      });
    });
  };

  handleDialogClose = () => {
    this.setState({ shouldShowConfirmationDialog: false });
  };

  handleSubmit = event => {
  const data = {
    first_name: this.state.first_name,
    middle_name: this.state.middle_name,
    last_name: this.state.last_name,
    birth_date: this.state.birth_date,
    citizenship: this.state.citizenship,
    sex: this.state.sex,
    relationship_to_owner: "1",
    owner_id: user.id
  };
  axios.post("https://portl-dev.herokuapp.com/api/v1/client_profile/", data, auth).then(result => { 
    console.log(user)
    return result
   })
  }

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
  };

  render() {
    let {
      appList
    } = this.state;
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
              {appList.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="pl-sm-24 capitalize" align="left">
                    {application.program}
                  </TableCell>
                  <TableCell className="pl-sm-24 capitalize" align="left">
                    {application.id}
                  </TableCell>
                  <TableCell className="pl-0 capitalize" align="left">
                    {application.created_at}
                  </TableCell>
                  <TableCell className="pl-0 capitalize" align="left">
                    {application.updated_at}
                  </TableCell>
                  <TableCell className="pl-0 capitalize">
                    {application.status}
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
      </div>
      </React.Fragment>
    );
  }
}

export default SimpleForm;
