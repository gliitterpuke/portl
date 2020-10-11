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
import localStorageService from "../../services/localStorageService";
import { withStyles } from "@material-ui/styles";
import ReactJoyride, { ACTIONS, EVENTS, LIFECYCLE, STATUS } from "react-joyride";
import PropTypes from "prop-types";
import bunny from "../others/bunny.png"

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
    steps: [
      {
        target: ".edit-profile",
        content: "First off, let's edit your information",
        disableBeacon: true,
      },
      {
        target: ".create-app",
        content: "Start your first application!",
      },
    ],
    run: false
  };

  static propTypes = {
    joyride: PropTypes.shape({
      callback: PropTypes.func
    })
  };

  static defaultProps = {
    joyride: {}
  };

  handleClickStart = e => {
    e.preventDefault();
    this.setState({ run: true });
  };

  callback = (data) => {
    const { joyride } = this.props;
    const { type, index, lifecycle, action, step } = data;
    if (type === EVENTS.TOUR_END && this.state.run) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false });
    }

    if (action === 'next' || 'start' ) {
      document.getElementsByClassName(step.target.replace('.', ''))[0].scrollIntoView({
        block: "center",
        inline: "nearest"
      })
    } else {
      console.group(type);
      console.log(data); //eslint-disable-line no-console
      console.groupEnd();
    }
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
    this.setState({ showClientEditor: !this.state.showClientEditor, });
  };

  render() {
    const { classes } = this.props;
    const { run, steps } = this.state
    let user = localStorageService.getItem("auth_user")
    let state = user.applications
    let isEmpty = user.applications.length === 0
    let isApp = user.applications.length > 0

    return (
      <React.Fragment>
        <ReactJoyride
          continuous scrollToFirstStep showSkipButton run={run} steps={steps}
          styles={{ options: { zIndex: 10000 } }} callback={this.callback}
        />
      <div className="m-sm-30">
        <Card elevation={6} className="pricing__card px-20 pt-5 pb-5">
          <Grid container spacing={2}>
            <Grid item xs={4} md={2} className="hide-on-mobile">
              <img src={bunny} height={150}/>
            </Grid>
            <Grid item xs={8} md={10} className="align-center">
              <h5>Click here to start the tour</h5>
              <Button color="primary" variant="contained" onClick={this.handleClickStart}>Let's Go!</Button>
            </Grid>
          </Grid>
        </Card>
      </div>
        <div className="m-sm-30">
          <Card elevation={6} className="pricing__card px-20 pt-5 pb-5">
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
          <Card elevation={6} className="pricing__card px-20 pt-5 pb-5">
          <br /><br />
          <Grid container spacing={2}>
            <Grid item xs={12} lg={10} md={10}>
              <Typography variant="h6">Applications</Typography>
            </Grid>
            {isApp && (
            <Grid item xs={12} lg={2} md={2}>
              <Link to={`/products`}>
                <Button color="primary" variant="contained" className="create-app">
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
                  color="primary" onClick={() => this.handleViewClick(application.id)}
                >
                  <Icon>chevron_right</Icon>
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
