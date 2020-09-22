
import jwtAuthService from "../../services/jwtAuthService";
import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";
import localStorageService from "../../services/localStorageService"

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

export function loginWithEmailAndPassword({ username, password }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    jwtAuthService
      .loginWithEmailAndPassword(username, password)
      .then(user => {
        dispatch(setUserData(user))
        let newuser = localStorageService.getItem('auth_user')
        if (newuser.role === "client") {
          history.push({
            pathname: "/profile"
          })
          } else if (newuser.role === "professional") {
          history.push({
            pathname: "/professional"
          })
          }
        

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

export function resetPassword({ username }) {
  return dispatch => {
    dispatch({
      payload: username,
      type: RESET_PASSWORD
    });
  };
}