import axios from "axios";

// export const getContactById = id => {
//   return axios.get("/api/chat/contacts", { data: id });
// };
export const getContactById = id => {
  return axios.get("users/me/", { data: id });
};
export const getRecentContact = id => {
  return axios.get("/api/chat/contacts/recent", { data: id });
};
// export const getAllContact = currentUserId => {
//   return axios.get("/api/chat/contacts/all", { data: currentUserId });
// };
export const getAllContact = currentUserId => {
  return axios.get("users/me/chats/", { data: currentUserId });
};
// export const getChatRoomByContactId = (currentUser, contactId) => {
//   return axios.get("/api/chat/chat-room", { data: { currentUser, contactId } });
// };
export const getChatRoomByContactId = (appId) => {
  return axios.get(`chats/${appId}/recent-messages/`);
};
export const deleteMessage = message => {
  return axios.post("/api/chat/delete", message);
};
export const sendNewMessage = message => {
  return axios.post("messages/", message);
};
export const newEvent = message => {
  return axios.post("notifications/", message)
}
