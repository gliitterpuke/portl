import React from "react";
import ChatAvatar from "./ChatAvatar";
import Scrollbar from "react-perfect-scrollbar";
import { Divider } from "@material-ui/core";
import { format } from "date-fns";
import localStorageService from "../../services/localStorageService"

let baseURL = "https://portl-dev.herokuapp.com/api/v1/"
let user = localStorageService.getItem('auth_user')

const ChatSidenav = ({
  currentUser,
  appList = [],
  recentContactList = [],
  handleContactClick
}) => {
  return (
    <div className="chat-sidenav bg-default">
      <div className="chat-sidenav__topbar flex items-center h-56 px-4 bg-primary">
        {/* <ChatAvatar src={currentUser.avatar} status={currentUser.status} /> */}
        {user.role === "client" && (
        <h5 className="ml-4 whitespace-pre mb-0 font-medium text-18 text-white">
          {currentUser.client_profile.first_name + " " + currentUser.client_profile.last_name}
        </h5>
        )}
        {user.role === "professional" && (
        <h5 className="ml-4 whitespace-pre mb-0 font-medium text-18 text-white">
          {currentUser.professional_profile.first_name + " " + currentUser.professional_profile.last_name}
        </h5>
        )}
      </div>
      <Scrollbar className="chat-contact-list position-relative h-400">
        {/* {recentContactList.map((contact, index) => (
          <div
            onClick={() => handleContactClick(contact.id)}
            key={index}
            className="flex items-center p-4 cursor-pointer  gray-on-hover"
          >
            <ChatAvatar src={contact.avatar} status={contact.status} />
            <div className="pl-4">
              <p className="m-0">{contact.name}</p>
              <p className="m-0 text-muted">
                {format(
                  new Date(contact.lastChatTime).getTime(),
                  "MMMM dd, yyyy"
                )}
              </p>
            </div>
          </div>
        ))}
        <Divider /> */}
        {appList.map((contact, index) => (
          <div
            onClick={() => handleContactClick(contact.id)}
            key={index}
            className="flex items-center px-4 py-1 cursor-pointer  gray-on-hover"
          >
            {/* <ChatAvatar src={contact.avatar} status={contact.status} /> */}
            <div className="pl-4">
              <p>{contact.application_id}</p>
            </div>
          </div>
        ))}
      </Scrollbar>
    </div>
  );
};

export default ChatSidenav;
