import axios from "axios.js";

export const getContactById = id => {
  return axios.get("users/me/");
};
export const getRecentContact = id => {
  return axios.get("/api/chat/contacts/recent", { data: id });
};
export const getAllContact = currentUserId => {
  return axios.get("users/me/chats/", { data: currentUserId });
};
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
