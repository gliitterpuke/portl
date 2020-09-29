import React, { Fragment } from "react";
import {
  IconButton,
  Icon,
  Divider,
  Fab,
  TextField,
  MenuItem
} from "@material-ui/core";
import { MatxMenu } from "matx";
import Scrollbar from "react-perfect-scrollbar";
import EmptyMessage from "./EmptyMessage";
import ChatAvatar from "./ChatAvatar";
import { getTimeDifference } from "utils";
import { parseJSON } from "date-fns";
import shortid from "shortid";

let baseURL = "https://portl-dev.herokuapp.com/api/v1/"

const ChatContainer = ({
  id: currentUserId,
  toggleSidenav,
  currentChatRoom,
  opponentUser,
  messageList = [],
  setBottomRef,
  handleMessageSend,
  chatmessages = [],
  sender
}) => {
  let [message, setMessage] = React.useState("");
  const sendMessageOnEnter = event => {
    if (event.key === "Enter" && !event.shiftKey) {
      message = message.trim();
      if (message !== "") handleMessageSend(message);
      setMessage("");
    }
  };
  return (
    <div className="chat-container flex-column position-relative">
      <div className="chat-container__topbar flex items-center justify-between p-1 bg-primary">
        <div className="flex items-center">
          <div className="show-on-mobile">
            <IconButton onClick={toggleSidenav}>
              <Icon className="text-white">short_text</Icon>
            </IconButton>
          </div>
          </div>
      </div>

      <Scrollbar
        containerRef={ref => {
          setBottomRef(ref);
        }}
        className="chat-message-list flex-grow position-relative"
      >
        {currentChatRoom === "" && (
          <div className="flex-column justify-center items-center h-full">
            <EmptyMessage />
            <p>Select an application</p>
          </div>
        )}
        {chatmessages.map((message, index) => (
          <div className="flex items-start px-4 py-3">
            <div className="ml-4">
              <p className="text-muted m-0 mb-2">{message.sender.display_name}</p>
              <div
                className={`px-4 py-2 mb-2 list__message ${
                  sender === message.sender_id
                    ? "bg-primary text-white"
                    : "bg-paper"
                }`}
              >
                <span className="whitespace-pre-wrap">{message.body}</span>
              </div>
              <small className="text-muted mb-0">
                {new Date(message.sent_at+"Z").toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true})}
              </small>
            </div>
          </div>
        ))}
        {/* <div ref={ref => setBottomRef(ref)} /> */}
      </Scrollbar>

      <Divider />

      {currentChatRoom !== "" && (
        <div className="flex items-center px-4 py-2">
          <TextField
            label="Type your message here*"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={sendMessageOnEnter}
            fullWidth
            multiline={true}
            rows={1}
            variant="outlined"
          />
          <div>
            <Fab
              onClick={() => {
                if (message.trim() !== "") handleMessageSend(message);
                setMessage("");
              }}
              color="primary"
              className="ml-4"
            >
              <Icon>send</Icon>
            </Fab>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
