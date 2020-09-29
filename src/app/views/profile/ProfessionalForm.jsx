import React, { Component } from "react";
import axios from "axios"
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles"
import ProfessionalViewer from "./ProfessionalViewer";
import ProfessionalEditor from "./ProfessionalEditor";
import {
  Button,
  Icon,
  Grid,
  Card,
  Typography,
  IconButton,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ConfirmationDialog } from "matx";
import { parseJSON } from "date-fns";
import localStorageService from "../../services/localStorageService"
import history from "../../../history"

let user = localStorageService.getItem("auth_user")
let baseURL = "https://portl-dev.herokuapp.com/api/v1/"

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
class ProfessionalForm extends Component {
  state = {
    appList: [],
  };

  componentDidMount() {
    this.setState({ appList: user.applications });
    this.setState({ showProfessionalEditor: false });
    console.log(localStorage)
  }

  handeViewClick = applicationId => {
    let user = localStorageService.getItem("auth_user")
    let secondstate = user.applications.find (application => application.id == applicationId);
    console.log(this.props)
    this.props.history.push({pathname: `/application/${applicationId}`, state: secondstate.id });
  }

  handeDeleteClick = application => {
    this.setState({ shouldShowConfirmationDialog: true, application });
  };

  handleConfirmationResponse = () => {
    let { application } = this.state;
    let status = user.applications[application.id].status
 //   let state = user.applications.findIndex (application => application.id === this.props.location.state.id); 
    this.setState({
      shouldShowConfirmationDialog: false
    });
    console.log(application.id)
    axios.put(baseURL + `application/${application.id}/close`, null, { params: {
      status
    }}).then(res => {
      user.applications[application.id] = res.data
      localStorageService.setItem("auth_user", user)
      console.log(user.applications[application.id])
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
  toggleProfessionalEditor = () => {
    this.setState({
      showProfessionalEditor: !this.state.showProfessionalEditor,
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
      {this.state.showProfessionalEditor ? (
        <ProfessionalEditor
          toggleProfessionalEditor={this.toggleProfessionalEditor}
        />
      ) : (
        <ProfessionalViewer toggleProfessionalEditor={this.toggleProfessionalEditor} />
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

export default withRouter(withStyles(styles)(ProfessionalForm));
