import React, { Component } from "react";
import { Dialog, IconButton, Button, Icon, Grid, TextField } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { updateEvent, deleteEvent } from "./CalendarService";
import localStorageService from "../../services/localStorageService";
import { parseJSON } from "date-fns";
class EventEditorDialog extends Component {
  state = {
    starts_at: "",
    ends_at: "",
    user_ids: [  ],
    video_conference_link: "",
    phone_number: "",
    location: "Online"
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = () => {
    updateEvent({
      ...this.state
    }).then(() => {
      this.props.handleClose();
    });
  };

  handleDeleteEvent = () => {
    deleteEvent(this.state.id).then(() => {
      this.props.handleClose();
    });
  };

  handleDateChange = (date, name) => {
    this.setState({
      [name]: date
    });
  };


  componentDidMount() {
    this.setState({
      ...this.props.event
    });
  }

  render() {
    let { title, starts_at, ends_at, video_conference_link, phone_number, location } = this.state;
    let { open, handleClose } = this.props;
    let user = localStorageService.getItem('auth_user')
    
    return (
      <Dialog onClose={handleClose} open={open} maxWidth="xs" fullWidth={true}>
        <div className="flex justify-between items-center pl-4 pr-2 py-2 bg-primary">
          <h4 className="m-0 text-white">Add Events</h4>
          <IconButton onClick={handleClose}>
            <Icon className="text-white">clear</Icon>
          </IconButton>
        </div>
        {user.is_client === true && (
        <div className="p-4">
          <Grid container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextField
                label= "Title"
                value={title}
                InputProps={{ readOnly: true, }}
                fullWidth
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                label= "Start"
                value={parseJSON(starts_at).toString().replace(RegExp("GMT.*"), "")}
                InputProps={{ readOnly: true, }}
                fullWidth
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                label= "End"
                value={parseJSON(ends_at).toString().replace(RegExp("GMT.*"), "")}
                InputProps={{ readOnly: true, }}
                fullWidth
              />
            </Grid>
            {this.state.video_conference_link && (
            <Grid item sm={6} xs={12}>
              <TextField
                label= "Link"
                value={video_conference_link}
                InputProps={{ readOnly: true, }}
                fullWidth
                multiline
              />
            </Grid>
            )}
            {this.state.phone_number && (
            <Grid item sm={6} xs={12}>
              <TextField
                label= "Phone Number"
                value={phone_number}
                InputProps={{ readOnly: true, }}
                fullWidth
              />
            </Grid>
            )}
            {this.state.location && (
            <Grid item sm={6} xs={12}>
              <TextField
                label= "Location"
                value={location}
                InputProps={{ readOnly: true, }}
                fullWidth
                multiline
              />
            </Grid>
            )}
          </Grid>
        </div>
        )}

        {user.is_client === false && (
        <div className="p-4">
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <TextValidator
              className="mb-6 w-full" label="Title" onChange={this.handleChange} type="text"
              name="title"
              value={title}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <Grid container spacing={4}>
              <Grid item sm={6} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    margin="none"
                    id="mui-pickers-date"
                    label="Start date"
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
                    label="End date"
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
            <TextValidator
              className="mb-6 w-full" label="Link" onChange={this.handleChange} type="link"
              name="video_conference_link"
              value={video_conference_link}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextValidator
              className="mb-6 w-full" label="Phone Number" onChange={this.handleChange} type="number"
              name="phone_number"
              value={phone_number}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextValidator
              className="mb-6 w-full" label="Location" onChange={this.handleChange} type="text"
              name="location"
              value={location}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <div className="flex justify-between items-center">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button onClick={this.handleDeleteEvent}>
                <Icon className="mr-2 align-middle">delete</Icon>
                Delete
              </Button>
            </div>
          </ValidatorForm>
        </div>
        )}
      </Dialog>
    );
  }
}

export default EventEditorDialog;
