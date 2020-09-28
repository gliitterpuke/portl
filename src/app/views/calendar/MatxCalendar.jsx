import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Calendar, Views, globalizeLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import CalendarHeader from "./CalendarHeader";
import * as ReactDOM from "react-dom";
import { Breadcrumb } from "matx";
import { getAllEvents, updateEvent } from "./CalendarService";
import EventEditorDialog from "./EventEditorDialog";

import globalize from "globalize";
import axios from "axios"

const localizer = globalizeLocalizer(globalize);

const DragAndDropCalendar = withDragAndDrop(Calendar);

let viewList = Object.keys(Views).map(key => Views[key]);

let baseURL = "http://127.0.0.1:8000/api/v1/"
class MatxCalendar extends Component {
  state = {
    events: [],
    shouldShowEventDialog: false,
    newEvent: null
  };

  constructor(props) {
    super(props);
    this.headerComponentRef = React.createRef();
  }

  componentDidMount() {
    this.updateCalendar();
  }

  updateCalendar = () => {
    getAllEvents()
      .then(res => res.data)
      .then(events => {
        this.setState({ events });
      });
  };

  handleExport = event => {
    event.persist();
    axios.get(baseURL + "users/me/calendar/", {responseType: 'blob'}).then((blob) => {
      console.log(blob)
      let url = URL.createObjectURL(blob.data)
      let a = document.createElement('a');
      a.href = url;
      blob.download = 'download';
      a.click();
    })
  };

  handleDialogClose = () => {
    this.setState({ shouldShowEventDialog: false });
    this.updateCalendar();
  };

  handleEventMove = event => {
    this.handleEventResize(event);
  };

  handleEventResize = event => {
    updateEvent(event).then(() => {
      this.updateCalendar();
    });
  };

  openNewEventDialog = ({ action, ...event }) => {
    if (action === "doubleClick") {
      this.setState({
        newEvent: event,
        shouldShowEventDialog: true
      });
    }
  };

  openExistingEventDialog = event => {
    this.setState({
      newEvent: event,
      shouldShowEventDialog: true
    });
  };

  render() {
    let { events, newEvent, shouldShowEventDialog } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Calendar" }]} />
        </div>

        <Button
          className="mb-4"
          variant="contained"
          color="secondary"
          onClick={() =>
            this.openNewEventDialog({
              action: "doubleClick",
              starts_at: new Date(),
              ends_at: new Date()
            })
          }
        >
          Add Event
        </Button>
        <Button color="primary" variant="contained" className="mb-4" onClick={this.handleExport}>
          Export
        </Button>
        <div className="h-full-screen flex-column">
          <div ref={this.headerComponentRef} />
          <DragAndDropCalendar
            selectable
            localizer={localizer}
            events={events}
            onEventDrop={this.handleEventMove}
            resizable
            onEventResize={this.handleEventResize}
            defaultView={Views.MONTH}
            defaultDate={new Date()}
            startAccessor="start"
            endAccessor="end"
            views={viewList}
            step={60}
            showMultiDayTimes
            components={{
              toolbar: props => {
                return this.headerComponentRef.current ? (
                  ReactDOM.createPortal(
                    <CalendarHeader {...props} />,
                    this.headerComponentRef.current
                  )
                ) : (
                  <div>Header component not found</div>
                );
              }
            }}
            // onNavigate={this.handleNavigate}
            onSelectEvent={event => {
              this.openExistingEventDialog(event);
            }}
            onSelectSlot={slotDetails => this.openNewEventDialog(slotDetails)}
          />
        </div>
        {shouldShowEventDialog && (
          <EventEditorDialog
            handleClose={this.handleDialogClose}
            open={shouldShowEventDialog}
            event={newEvent}
          />
        )}
      </div>
    );
  }
}

export default MatxCalendar;
