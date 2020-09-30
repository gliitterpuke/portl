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
  IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ConfirmationDialog } from "matx";
import { parseJSON } from "date-fns";
import localStorageService from "../../services/localStorageService"
import { withStyles } from "@material-ui/styles"

let user = localStorageService.getItem("auth_user")

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: 700,
    flexBasis: '33.33%',
    flexShrink: 0,
    alignSelf: "center",
    fontFamily: "Lato",
    // textTransform: "uppercase"
  },
  heading2: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 700,
    flexBasis: '33.33%',
    flexShrink: 0,
    alignSelf: "center",
    fontFamily: "Lato",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 700,
    fontFamily: "Lato",
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
class ClientForm extends Component {
  state = {
    appList: [],
  };

  componentDidMount() {
    this.setState({ appList: user.applications });
    this.setState({ showClientEditor: false });
  }

  handleViewClick = applicationId => {
    let user = localStorageService.getItem("auth_user")
    let secondstate = user.applications.find (application => application.id === applicationId);
    this.props.history.push({pathname: `/application/${applicationId}`, state: secondstate.id });
  }

  handleDeleteClick = application => {
    this.setState({ shouldShowConfirmationDialog: true, application });
  };

  handleConfirmationResponse = () => {
    let user = localStorageService.getItem('auth_user')
    let { application } = this.state;
    let close = {
      status: application.status,
      products: [ ]
    }
    this.setState({
      shouldShowConfirmationDialog: false
    });
    axios.put(`applications/${application.id}/close`, close).then(res => {
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
  };

  render() {
    const { classes } = this.props;
    let user = localStorageService.getItem("auth_user")
    let state = user.applications
    let isEmpty = user.applications.length === 0
    let isApp = user.applications.length > 0

    return (
      <React.Fragment>
      <div className="m-sm-30">
        <Card elevation={6} className="pricing__card px-20 pt-10 pb-10">
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
        <Card elevation={6} className="pricing__card px-20 pt-10 pb-10">
        <br /><br />
        <Grid container spacing={2}>
          <Grid item xs={12} lg={10} md={10}>
            <h7>Applications</h7>
          </Grid>
          {isApp && (
          <Grid item xs={12} lg={2} md={2}>
            <Link to={`/products`}>
              <Button color="primary" variant="contained">
                <span className={classes.iconalign}>Create New App</span>
              </Button>
            </Link>
          </Grid>
          )}
          <br/><br/><br/>
          {isEmpty && (
          <Grid item xs={12} lg={12} md={12}>
            <h5>No applications yet; create a new application!</h5>
            <br/><br/>
            <Link to={`/products`}>
              <Button color="primary" variant="contained">
                <span className="pl-2 capitalize">Get Started</span>
              </Button>
            </Link>
          </Grid>
          )}
        </Grid>

        <br/><br/>
        {state.map((application) => (
        <Accordion className={classes.title}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{application.products[0].name + ": " + application.id}</Typography>
            <Typography className={classes.secondaryHeading}>{application.status.replace("CLIENT_ACTION_REQUIRED", "In Progress")}</Typography>
              <div className={classes.iconalign}>
              <IconButton
                color="primary" 
                onClick={() => this.handleViewClick(application.id)}
              >
                <Icon>chevron_right</Icon>
              </IconButton>
              <IconButton onClick={() => this.handleDeleteClick(application)} >
                <Icon color="error">delete</Icon>
              </IconButton>
              </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.heading2}>{"Created At"}</Typography>
            <Typography className={classes.secondaryHeading}>{new Date(application.created_at+"Z").toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true})}</Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography className={classes.heading2}>{"Updated At"}</Typography>
            <Typography className={classes.secondaryHeading}>{new Date(application.updated_at+"Z").toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true})}</Typography>
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

export default withRouter(withStyles(styles)(ClientForm));
