import axios from "axios";

export const GET_NOTIFICATION = "GET_NOTIFICATION";
export const CREATE_NOTIFICATION = "CREATE_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const DELETE_ALL_NOTIFICATION = "DELETE_ALL_NOTIFICATION";

export const getNotification = () => dispatch => {
  axios.get("https://portl-dev.herokuapp.com/api/v1/chats/with-unread-messages/").then(res => {
    dispatch({
      type: GET_NOTIFICATION,
      payload: res.data
    });
  });
};

export const deleteNotification = id => dispatch => {
  axios.delete(`http://127.0.0.1:8000/api/v1/notifications/${id}`).then(res => {
    this.forceUpdate()
    // dispatch({
    //   type: DELETE_NOTIFICATION,
    //   payload: res.data
    // });
  });
};

export const deleteAllNotification = () => dispatch => {
  axios.post("/api/notification/delete-all").then(res => {
    dispatch({
      type: DELETE_ALL_NOTIFICATION,
      payload: res.data
    });
  });
};

export const createNotification = notification => dispatch => {
  axios.post("/api/notification/add", { notification }).then(res => {
    dispatch({
      type: CREATE_NOTIFICATION,
      payload: res.data
    });
  });
};
