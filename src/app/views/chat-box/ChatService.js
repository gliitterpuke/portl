import axios from "axios";

let baseURL = "http://127.0.0.1:8000/api/v1/"

// export const getContactById = id => {
//   return axios.get("/api/chat/contacts", { data: id });
// };
export const getContactById = id => {
  return axios.get(baseURL + "users/me/", { data: id });
};
export const getRecentContact = id => {
  return axios.get("/api/chat/contacts/recent", { data: id });
};
// export const getAllContact = currentUserId => {
//   return axios.get("/api/chat/contacts/all", { data: currentUserId });
// };
export const getAllContact = currentUserId => {
  return axios.get(baseURL + "users/me/chats", { data: currentUserId });
};
// export const getChatRoomByContactId = (currentUser, contactId) => {
//   return axios.get("/api/chat/chat-room", { data: { currentUser, contactId } });
// };
export const getChatRoomByContactId = (appId) => {
  return axios.get(baseURL + `chats/${appId}/recent-messages/`);
};
export const deleteMessage = message => {
  return axios.post("/api/chat/delete", message);
};
// export const deleteMessage = message => {
//   return axios.post(baseURL + "messages/", message);
// };
// export const sendNewMessage = message => {
//   return axios.post("/api/chat/add", message);
// };
export const sendNewMessage = message => {
  return axios.post(baseURL + "messages/", message);
};
export const updateMessage = message => {
  return axios.post("/api/chat/update", message);
};
// export const updateMessage = message => {
//   return axios.put(baseURL + "/api/v1/messages/" + message_id, message);
// };
