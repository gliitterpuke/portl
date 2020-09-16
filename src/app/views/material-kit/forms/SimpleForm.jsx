import React, { Component } from "react";
import axios from "axios"
import { Link, withRouter } from "react-router-dom";
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
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ConfirmationDialog } from "matx";
import { parseJSON } from "date-fns";
import localStorageService from "../../../services/localStorageService"
import history from "../../../../history"
import { withStyles } from "@material-ui/styles"

let user = localStorageService.getItem("auth_user")
if (user.role === "professional") {
  history.push('/professional')
}

let baseURL = "https://portl-dev.herokuapp.com/api/v1/"

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500,
    flexBasis: '33.33%',
    flexShrink: 0,
    alignSelf: "center"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexShrink: 0,
    alignSelf: "center"
  },
  iconalign: {
    textAlign: "right",
    width: "100%",
  },
  title: {
    '&:nth-child(odd)': { 
      backgroundColor: '#f2f2f2'
    }
  }
});
class SimpleForm extends Component {
  state = {
    appList: [],
  };

  componentDidMount() {
    this.setState({ appList: user.applications });
    this.setState({ showClientEditor: false });
  }

  handeViewClick = applicationId => {
    let user = localStorageService.getItem("auth_user")
    let secondstate = user.applications.find (application => application.id == applicationId);
    this.props.history.push({pathname: `/application/${applicationId}`, state: secondstate.id });
  }

  handeDeleteClick = application => {
    this.setState({ shouldShowConfirmationDialog: true, application });
  };

  handleConfirmationResponse = () => {
    let { application } = this.state;
    console.log(application)
    let status = application.status
    this.setState({
      shouldShowConfirmationDialog: false
    });
    axios.put(baseURL + `applications/${application.id}/close`, null, { params: {
      status
    }}).then(res => {
      alert('Application closed')
      user.applications[application.id] = res.data
      localStorageService.setItem("auth_user", user)
      window.location.reload()
    })
    .catch(error => {
      alert('Error; please try again later')
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

    this.setState({ birth_date });
  };
  toggleClientEditor = () => {
    this.setState({
      showClientEditor: !this.state.showClientEditor,
    });
//    this.forceUpdate()
  };

  render() {
    const { classes } = this.props;
    let user = localStorageService.getItem("auth_user")
    let state = user.applications

    return (
      <React.Fragment>
      <div className="m-sm-30">
        <Card elevation={6} className="pricing__card px-6 pt-2 pb-4">
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
        <Card elevation={6} className="pricing__card px-6 pt-2 pb-4">
        <br /><br />
        <Grid container spacing={2}>
          <Grid item xs={12} lg={10} md={10}>
            <Typography variant="h6">Applications</Typography>
          </Grid>
          <Grid item xs={12} lg={2} md={2}>
            <Link to={`/products`}>
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
      <div className="m-sm-30">
        <Card elevation={6} className="pricing__card px-6 pt-2 pb-4">
        <br /><br />
        <Grid container spacing={2}>
          <Grid item xs={12} lg={10} md={10}>
            <Typography variant="h6">Applications</Typography>
          </Grid>
          <Grid item xs={12} lg={2} md={2}>
            <Link to={`/products`}>
              <Button color="primary" variant="contained">
                <span className="pl-2 capitalize">Create New App</span>
              </Button>
            </Link>
          </Grid>
        </Grid>
        <br/><br/>
        {state.map((application) => (
        <Accordion className={classes.title}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{application.product.name + ": " + application.id}</Typography>
            <Typography className={classes.secondaryHeading}>{application.status.replace("CLIENT_ACTION_REQUIRED", "In Progress")}</Typography>
              <div className={classes.iconalign}>
              <IconButton
                color="primary" 
                onClick={() => this.handeViewClick(application.id)}
              >
                <Icon>chevron_right</Icon>
              </IconButton>
              <IconButton onClick={() => this.handeDeleteClick(application)} >
                <Icon color="error">delete</Icon>
              </IconButton>
              </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.heading}>{"Created At"}</Typography>
            <Typography className={classes.secondaryHeading}>{parseJSON(application.created_at).toString().replace(RegExp("GMT.*"), "")}</Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography className={classes.heading}>{"Updated At"}</Typography>
            <Typography className={classes.secondaryHeading}>{parseJSON(application.updated_at).toString().replace(RegExp("GMT.*"), "")}</Typography>
          </AccordionDetails>
        </Accordion>
        ))}
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

export default withRouter(withStyles(styles)(SimpleForm));
