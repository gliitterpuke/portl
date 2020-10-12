
import jwtAuthService from "../../services/jwtAuthService";
import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";
import localStorageService from "../../services/localStorageService";
import axios from "axios.js";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

export const setAuthLoadingStatus = (status = false) => {
  return (dispatch) =>
    dispatch({
      type: LOGIN_LOADING,
      data: status,
    });
};

export function loginWithEmailAndPassword({ username, password }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    jwtAuthService
      .loginWithEmailAndPassword(username, password)
      .then(user => {
        dispatch(setUserData(user))
            history.push('/profile') 
        
        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}

export function resetPassword({email}) {
  axios.post(`email/send-password-reset-email/${email}`)

  return (dispatch) => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD,
    });
  };
}