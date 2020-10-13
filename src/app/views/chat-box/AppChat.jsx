import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, useMediaQuery } from "@material-ui/core";
import {
  Breadcrumb,
  MatxSidenavContainer,
  MatxSidenav,
  MatxSidenavContent,
} from "matx";
import {
  getAllContact,
  sendNewMessage,
  getContactById,
  getChatRoomByContactId,
  newEvent
} from "./ChatService";
import ChatSidenav from "./ChatSidenav";
import ChatContainer from "./ChatContainer";
import { useTheme } from "@material-ui/core/styles";
import localStorageService from "../../services/localStorageService"
import axios from "axios.js"

const auth = { headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} }

const AppChat = () => {
  let user = localStorageService.getItem('auth_user')
  const chatBottomRef = document.querySelector("#chat-message-list");
  const [open, setOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    user
  });
  const [opponentUser, setOpponentUser] = useState(null);
  const [currentChatRoom, setCurrentChatRoom] = useState("");
  const [chatmessages, setChatMessages] = useState([])
  const [application, setApplication] = useState({});
  const [sender, setSender] = useState("")
  const [contactList, setContactList] = useState([]);
  const [recentContactList, setRecentContactList] = useState([]);
  const [appList, setAppList] = useState([]);
  const userRef = useRef(currentUser);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const updateRecentContactList = useCallback(() => {
    let { id } = userRef.current;
  }, []);

  useEffect(() => {
    let { id } = userRef.current;

    getContactById(id).then((data) => {
      setOpen(isMobile);
      setCurrentUser({ ...data.data });
    });

    getAllContact().then((data) => setAppList(data.data))
  }, [isMobile]);

  const handleContactClick = async (contactId) => {
    if (isMobile) toggleSidenav();
    const { data } = await getChatRoomByContactId(contactId)
      setChatMessages(data)
      setCurrentChatRoom(contactId);
      setOpponentUser(data.sender_id)
      scrollToBottom();
      
      let application = appList.find(application => application.id === contactId);
      setApplication(application)
      let owner = application.users.find(owner => owner.owner_id === user.id);
      setSender(owner.id)

    
  };

  const handleMessageSend = (message) => {
    let { id } = currentUser;

    if (currentChatRoom === "") return;
    sendNewMessage({
      chat_id: currentChatRoom,
      body: message,
      sender_id: sender,

    }).then((data) => {
    // find all chat users in current chatroom
      const chatUsers = []
      application.users.forEach(function(obj){
        chatUsers.push(obj.owner_id)
      })
    // remove self from list of users
      const index = chatUsers.indexOf(id);
      if(index > -1) {
        chatUsers.splice(index, 1);
      }
    // send notification to each recipient on message send
      chatUsers.forEach(function (item, index) {
        const notification ={
          title: "New Message",
          description: `from Application ${currentChatRoom}`,
          category: "message",
          notify_at: new Date(),
          go_to_path: "/messages",
          recipient_id: item,
        }
        newEvent(notification)
      })
      getChatRoomByContactId(currentChatRoom).then(({ data }) => {
          setChatMessages(data)
        }).then(() => {
          scrollToBottom()
        })
    });

    const poll = async () => {
      let response = await axios.get("chats/with-unread-messages/", auth)
      let message = await response;
      if (message.data.chats_with_unread_messages[0].find(msg => msg === currentChatRoom) === currentChatRoom) {
        const data = await getChatRoomByContactId(currentChatRoom)
        await setChatMessages(data.data);
        scrollToBottom()
        await poll ()
      }}
      poll()

  };

  const scrollToBottom = () => {
    if (chatBottomRef) {
      chatBottomRef.scrollTo({
        top: chatBottomRef.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const toggleSidenav = () => {
    setOpen(!open);
  };

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: "Chat" }]} />
      </div>
      <Card elevation={6}>
        <MatxSidenavContainer>
          <MatxSidenav width="230px" open={open} toggleSidenav={toggleSidenav}>
            <ChatSidenav
              currentUser={currentUser}
              appList={appList}
              handleContactClick={handleContactClick}
            />
          </MatxSidenav>
          <MatxSidenavContent>
            <ChatContainer
              id={currentUser?.id}
              opponentUser={opponentUser}
              appList={appList}
              chatmessages={chatmessages}
              currentChatRoom={currentChatRoom}
              handleMessageSend={handleMessageSend}
              toggleSidenav={toggleSidenav}
              sender={sender}
            />
          </MatxSidenavContent>
        </MatxSidenavContainer>
      </Card>
    </div>
  );
};

export default AppChat;
