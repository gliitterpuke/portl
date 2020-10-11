import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Calendar, Views, globalizeLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import CalendarHeader from "./CalendarHeader";
import * as ReactDOM from "react-dom";
import { Breadcrumb } from "matx";
import { exportAllEvents, exportFutureEvents, getAllEvents, updateEvent } from "./CalendarService";
import EventEditorDialog from "./EventEditorDialog";

import globalize from "globalize";

const localizer = globalizeLocalizer(globalize);

const DragAndDropCalendar = withDragAndDrop(Calendar);

let viewList = Object.keys(Views).map(key => Views[key]);
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
        // convert start + end time to js Date
        events.forEach(function (element, index) {
          events[index].starts_at = new Date(element.starts_at+"Z")
        }, events);
        events.forEach(function (element, index) {
          events[index].ends_at = new Date(element.ends_at+"Z")
        }, events)
        this.setState({ events });
      })
  };

  handleAllExport = event => {
    event.persist();
    exportAllEvents().then((blob) => {
      console.log(blob)
      let url = URL.createObjectURL(blob.data)
      let a = document.createElement('a');
      a.href = url;
      a.download = 'calendar.ics';
      a.click();
    })
  };

  handleFutureExport = event => {
    event.persist();
    exportFutureEvents().then((blob) => {
      console.log(blob)
      let url = URL.createObjectURL(blob.data)
      let a = document.createElement('a');
      a.href = url;
      a.download = 'calendar.ics';
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

        <Button color="primary" variant="contained" className="mb-4" onClick={this.handleAllExport}>
          Download All
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button color="secondary" variant="contained" className="mb-4" onClick={this.handleFutureExport}>
          Download Future Events
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
            startAccessor="starts_at"
            endAccessor="ends_at"
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
