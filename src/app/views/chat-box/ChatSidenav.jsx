import React from "react";
import ChatAvatar from "./ChatAvatar";
import Scrollbar from "react-perfect-scrollbar";
import { Divider } from "@material-ui/core";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import localStorageService from "../../services/localStorageService"

let user = localStorageService.getItem('auth_user')

const useStyles = makeStyles(({ palette, ...theme }) => ({
  chatSidenav: {
    borderRight: "1px solid rgba(0, 0, 0, 0.08)",
    height: 450,
  },
}));

const ChatSidenav = ({
  currentUser,
  appList,
  recentContactList = [],
  handleContactClick
}) => {
  const classes = useStyles();

  return (
    <div className={clsx("bg-default", classes.chatSidenav)}>
      <div className="chat-sidenav__topbar flex items-center h-56 px-4 bg-primary">
        {user.is_client === true && (
        <h5 className="ml-4 whitespace-pre mb-0 font-medium text-18 text-white">
          {user.client_profile.given_names + " " + user.client_profile.family_name}
        </h5>
        )}
        {user.is_client === false && (
        <h5 className="ml-4 whitespace-pre mb-0 font-medium text-18 text-white">
          {user.professional_profile.given_names + " " + user.professional_profile.family_name}
        </h5>
        )}
      </div>
      <Scrollbar className="relative h-full">
      {appList.map((contact, index) => (
          <div
            onClick={() => handleContactClick(contact.id)}
            key={index}
            className="flex items-center p-4 cursor-pointer  gray-on-hover"
          >
            <div className="pl-4">
              <p className="m-0">{`Application ${contact.application_id}`}</p>
            </div>
          </div>
        ))}
        <Divider />
      </Scrollbar>
    </div>
  );
};

export default ChatSidenav;
