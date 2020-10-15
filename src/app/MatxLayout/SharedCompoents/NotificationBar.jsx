import React from "react";
import {
  Icon,
  Badge,
  Card,
  Button,
  IconButton,
  Drawer,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ThemeProvider, useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useSelector } from "react-redux";
import axios from "axios.js"

const useStyles = makeStyles(({ palette, ...theme }) => ({
  notification: {
    width: "var(--sidenav-width)",
    "& .notification__topbar": {
      height: "var(--topbar-height)",
    },
  },
  notificationCard: {
    "&:hover": {
      "& .delete-button": {
        cursor: "pointer",
        display: "unset",
        right: 0,
        marginTop: 6,
        top: 0,
        zIndex: 2,
      },
      "& .card__topbar__time": {
        display: "none",
      },
    },
    "& .delete-button": {
      display: "none",
      position: "absolute",
      right: 0,
      marginTop: 9,
    },
    "& .card__topbar__button": {
      borderRadius: 15,
      opacity: 0.9,
    },
  },
}));

const NotificationBar = ({ container }) => {
  // Notifications badge
  const [numNotifications, setnumNotifications] = React.useState("");
  const [notificationDetails, setnotificationDetails] = React.useState([]);
  React.useEffect(() => {
    axios.get("users/me/notifications/").then((res)=> {
      setnumNotifications(res.data.length); 
      // setnotificationDetails(res.data);   
    })   
  });

  const [panelOpen, setPanelOpen] = React.useState(false);

  const theme = useTheme();
  const classes = useStyles();
  const { settings } = useSelector((state) => state.layout);

  const handleDrawerToggle = () => {
    if (!panelOpen) {
      axios.get("users/me/notifications/").then((res)=> {
        setnotificationDetails(res.data);   
      })   
    }
    setPanelOpen(!panelOpen);
  };
  function goToEvent(notification) {
    if (notification.category === "message") {
      deleteNotification(notification.id)
      setPanelOpen(!panelOpen);
    }
    else {
      setPanelOpen(!panelOpen);
    }
  }

  function deleteNotification (id) {
    axios.delete(`notifications/${id}`).then(res => {
      axios.get("users/me/notifications/").then((res)=> {
        setnotificationDetails(res.data);   
      }) 
    });
  };

  function deleteAllNotification() {
    axios.delete("users/me/notifications/").then(res => {
      axios.get("users/me/notifications/").then((res)=> {
        setnotificationDetails(res.data);   
      }) 
    });
  };

  const parentThemePalette = theme.palette;
  // console.log(parentThemePalette);
  return (
    <ThemeProvider theme={settings.themes[settings.activeTheme]}>
      <IconButton
        onClick={handleDrawerToggle}
        style={{
          color:
            parentThemePalette.type === "light"
              ? parentThemePalette.text.secondary
              : parentThemePalette.text.primary,
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
          keepMounted: true,
        }}
      >
        <div className={classes.notification}>
          <div className="notification__topbar elevation-z6 flex items-center p-4 mb-4">
            <Icon color="primary">notifications</Icon>
            <h5 className="ml-2 my-0 font-medium">Notifications</h5>
          </div>

          {notificationDetails.map((notification) => (
            <div
              key={notification.id}
              className={clsx("relative", classes.notificationCard)}
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
              <Link to={`${notification.go_to_path}`} onClick={() => goToEvent(notification)}>
                <Card className="mx-4 mb-6" elevation={3}>
                  <div className="card__topbar flex items-center justify-between p-2 bg-light-gray">
                    <div className="flex items-center">
                    {notification.category === "alert" && (
                      <div className="card__topbar__button flex items-center justify-between h-24 w-24 overflow-hidden">
                        <Icon
                          className="card__topbar__icon" fontSize="small" color={"error"}
                        >
                          {"notifications"}
                        </Icon>
                      </div>
                    )}
                    {notification.category === "message" && (
                      <div className="card__topbar__button flex items-center justify-between h-24 w-24 overflow-hidden">
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

export default NotificationBar;
