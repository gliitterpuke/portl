import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import localStorageService from "../../services/localStorageService"
import { withStyles } from "@material-ui/styles"
import { newEvent } from "./CalendarService";
import { ConfirmationDialog, SimpleCard, Breadcrumb } from "matx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import {
    Typography,
    Grid,
    Button,
    Icon
} from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns";
import history from "../../../history"

let user = localStorageService.getItem("auth_user")

const styles = theme => ({
    root: {
      width: '75%',
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
  });

class Event extends Component {
  state = {
    starts_at: new Date(),
    ends_at: new Date(),
    user_ids: [  ],
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleDateChange = (date, name) => {
    this.setState({
      [name]: date
    });
  };

  handleFormSubmit = () => {
    this.setState({
      user_ids: [user.id, 1]
    })
    newEvent({
      ...this.state
    }).then(() => {
      alert('Consultation booked, redirecting you to your calendar')
      history.push('/calendar')
    });
  };

  render() {
    let user = localStorageService.getItem("auth_user")
    let { starts_at, ends_at } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
      <div className="upload-form m-sm-30">
      <SimpleCard className={classes.root}>
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: `New Event` }]} />
        </div>
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid container spacing={4}>
              <Grid item sm={12} xs={12}>
                <Typography variant="h6">Book your consultation</Typography>
              </Grid>
              <Grid item sm={6} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    margin="none"
                    id="mui-pickers-date"
                    label="Start"
                    inputVariant="standard"
                    type="text"
                    autoOk={true}
                    value={starts_at}
                    fullWidth
                    onChange={date => this.handleDateChange(date, "starts_at")}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item sm={6} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    margin="none"
                    id="mui-pickers-date"
                    label="End"
                    inputVariant="standard"
                    type="text"
                    autoOk={true}
                    value={ends_at}
                    fullWidth
                    onChange={date => this.handleDateChange(date, "ends_at")}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <div className="py-2" />
            <div className="flex justify-between items-center">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </div>
          </ValidatorForm>
      </SimpleCard>
      </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Event));
