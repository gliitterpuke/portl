import React, { Component } from "react";
import { Card } from "@material-ui/core";
import {
  Breadcrumb,
  MatxSidenavContainer,
  MatxSidenav,
  MatxSidenavContent
} from "matx";
import {
  getAllContact,
  // getRecentContact,
  sendNewMessage,
  getContactById,
  getChatRoomByContactId,
  newEvent
} from "./ChatService";
import ChatSidenav from "./ChatSidenav";
import ChatContainer from "./ChatContainer";
import { isMobile } from "utils";
import localStorageService from "../../services/localStorageService";
import axios from "axios"

let baseURL = "https://portl-dev.herokuapp.com/api/v1/"
const auth = { headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} }
class AppChat extends Component {
  state = {
    currentUser: localStorageService.getItem('auth_user'),
    appList: [],
    recentContactList: [],
    messageList: [],
    chatmessages: [],
    currentChatRoom: "",
    opponentUser: null,
    open: false,
    sender: ""
  };

  bottomRef = React.createRef();

  componentDidMount() {
    let { id } = this.state.currentUser;
    getContactById().then(data => {
      this.setState({
        open: !isMobile(),
        currentUser: {
          ...data.data
        },
      });
    });
    getAllContact().then(data =>
      this.setState({ appList: [...data.data] })
    );

  }

  scrollToBottom = () => {
    this.bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  handleContactClick = contactId => {
    if (isMobile()) this.toggleSidenav();

    getContactById(contactId).then(({ data }) => {
    });
    getChatRoomByContactId(contactId).then(
      ({ data }) => {
        let { chatId, messageList, recentListUpdated, chatmessages } = data;

        this.setState(
          {
            currentChatRoom: contactId,
            opponentUser: data.sender_id,
            data
          },
          () => {
            this.bottomRef.scrollTop = 9999999999999;
          });
      }).then(() => {
      let application = this.state.appList.find (application => application.id === this.state.currentChatRoom);
      let owner = application.users.find (owner => owner.owner_id === this.state.currentUser.id)
      let sender = owner.id
      this.setState({
        sender: owner.id
      });
      });
  };

  handleMessageSend = message => {
    let { id } = this.state.currentUser;
    let { currentChatRoom, opponentUser } = this.state;

    if (currentChatRoom === "") return;
    sendNewMessage({
      chat_id: currentChatRoom,
      body: message,
      sender_id: this.state.sender,
    }).then(data => {
      const notification = {
        title: "New Message",
        description: `from Application ${currentChatRoom}`,
        category: "MESSAGE",
        notify_at: new Date(),
        go_to_path: "",
        recipient_id: 1
      }
      newEvent(notification)
      getChatRoomByContactId(currentChatRoom).then(
        ({ data }) => {
          let { chatmessages } = data;
          this.setState({ data }, () => {
              this.bottomRef.scrollTop = 9999999999999;
            });
        }
      );

      const poll = async () => {
        let response = await axios.get(baseURL + "chats/with-unread-messages/", auth)
        let message = await response;
        if (message.data.chats_with_unread_messages[0].find(msg => msg === currentChatRoom) === currentChatRoom) {
          getChatRoomByContactId(currentChatRoom).then(
            ({ data }) => {
              let { chatmessages } = data;
              this.setState(
                { data }, () => {
                  this.bottomRef.scrollTop = 9999999999999;
                }
              );
            }
          );
          await poll ()
        }
 
      }
      
      poll()
    })
  };

  setBottomRef = ref => {
    this.bottomRef = ref;
  };

  toggleSidenav = () => this.setState({ open: !this.state.open });

  render() {
    let {
      currentUser,
      appList,
      recentContactList,
      messageList,
      opponentUser,
      currentChatRoom,
      data,
      chatmessages,
      sender
    } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Messages" }]} />
        </div>
        <Card elevation={6}>
          <MatxSidenavContainer>
            <MatxSidenav
              width="230px"
              open={this.state.open}
              toggleSidenav={this.toggleSidenav}
            >
              <ChatSidenav
                currentUser={currentUser}
                appList={appList}
                handleContactClick={this.handleContactClick}
              />
            </MatxSidenav>
            <MatxSidenavContent>
              <ChatContainer
                id={currentUser.id}
                opponentUser={opponentUser}
                appList={appList}
                chatmessages={data}
                currentChatRoom={currentChatRoom}
                setBottomRef={this.setBottomRef}
                handleMessageSend={this.handleMessageSend}
                toggleSidenav={this.toggleSidenav}
                sender={sender}
              />
            </MatxSidenavContent>
          </MatxSidenavContainer>
        </Card>
      </div>
    );
  }
}

export default AppChat;
