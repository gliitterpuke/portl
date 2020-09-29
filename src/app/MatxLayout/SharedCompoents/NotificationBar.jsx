import React from "react";
import {
  Icon,
  Badge,
  Card,
  Button,
  IconButton,
  Drawer
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getNotification,
} from "../../redux/actions/NotificationActions";
import axios from "axios"

const baseURL = "https://portl-dev.herokuapp.com/api/v1/"

const NotificationBar = props => {
  const {
    container,
    theme,
    settings,
  } = props;

  // Notifications badge
  const [numNotifications, setnumNotifications] = React.useState("");
  const [notificationDetails, setnotificationDetails] = React.useState([]);
  React.useEffect(() => {
    axios.get(baseURL + "users/me/notifications").then((res)=> {
      setnumNotifications(res.data.length); 
      // setnotificationDetails(res.data);   
    })   
  });
 

  const [panelOpen, setPanelOpen] = React.useState(false);

  function handleDrawerToggle() {
    if (!panelOpen) {
      axios.get(baseURL + "users/me/notifications").then((res)=> {
        setnotificationDetails(res.data);   
      })   
    }
    setPanelOpen(!panelOpen);
  }
  const parentThemePalette = theme.palette;

  function deleteNotification (id) {
    axios.delete(baseURL + `notifications/${id}`).then(res => {
      axios.get(baseURL + "users/me/notifications").then((res)=> {
        setnotificationDetails(res.data);   
      }) 
    });
  };

  function deleteAllNotification() {
    axios.delete(baseURL + "users/me/notifications/").then(res => {
      axios.get(baseURL + "users/me/notifications").then((res)=> {
        setnotificationDetails(res.data);   
      }) 
    });
  };

  return (
    <ThemeProvider theme={settings.themes[settings.activeTheme]}>
      <IconButton
        onClick={handleDrawerToggle}
        style={{
          color:
            parentThemePalette.type === "light"
              ? parentThemePalette.text.secondary
              : parentThemePalette.text.primary
        }}
      >
        <Badge color="secondary" badgeContent={numNotifications}>
          <Icon>notifications</Icon>
        </Badge>
      </IconButton>

      <Drawer
        width={"100px"}
        container={container}
        variant="temporary"
        anchor={"right"}
        open={panelOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
      >
        <div className="notification">
          <div className="notification__topbar flex items-center p-4 mb-4">
            <Icon color="primary">notifications</Icon>
            <h5 className="ml-2 my-0 font-medium">Notifications</h5>
          </div>

          {notificationDetails.map(notification => (
            <div
              key={notification.id}
              className="notification__card position-relative"
            >
              <IconButton
                size="small"
                className="delete-button bg-light-gray mr-6"
                onClick={() => deleteNotification(notification.id)}
              >
                <Icon className="text-muted" fontSize="small">
                  clear
                </Icon>
              </IconButton>
              <Link to={`/${notification.go_to_path}`} onClick={handleDrawerToggle}>
                <Card className="mx-4 mb-6" elevation={3}>
                  <div className="card__topbar flex items-center justify-between p-2 bg-light-gray">
                    <div className="flex items-center">
                      {notification.category === "alert" && (
                      <div className="card__topbar__button">
                        <Icon
                          className="card__topbar__icon" fontSize="small" color={"error"}
                        >
                          {"notifications"}
                        </Icon>
                      </div>
                      )}
                      {notification.category === "message" && (
                      <div className="card__topbar__button">
                        <Icon
                          className="card__topbar__icon" fontSize="small" color={"primary"}
                        >
                          {"chat"}
                        </Icon>
                      </div>
                      )}
                      <span className="ml-4 font-medium text-muted uppercase">
                        {notification.category}
                      </span>
                    </div>
                    <small className="card__topbar__time text-muted">
                      {new Date(notification.notify_at+"Z").toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true})}
                    </small>
                  </div>
                  <div className="px-4 pt-2 pb-4">
                    <p className="m-0">{notification.title}</p>
                    <small className="text-muted">
                      {notification.description}
                    </small>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
          {!!notificationDetails.length && (
            <div className="text-center">
              <Button onClick={deleteAllNotification}>
                Clear Notifications
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </ThemeProvider>
  );
};

NotificationBar.propTypes = {
  settings: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  getNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  deleteAllNotification: PropTypes.func.isRequired,
  notifications: state.notifications,
  settings: state.layout.settings
});

export default withStyles(
  {},
  { withTheme: true }
)(
  connect(mapStateToProps, {
    getNotification,
  })(NotificationBar)
);
