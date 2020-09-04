/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setUserData } from "../redux/actions/UserActions";
import { getNavigationByUser } from "../redux/actions/NavigationAction";
import jwtAuthService from "../services/jwtAuthService";
import localStorageService from "../services/localStorageService";
import history from "history.js";

const checkJwtAuth = async setUserData => {
  let user = await jwtAuthService.loginWithToken();
  if (window.location.href.match("http://localhost:8000/session/forgot-password/")) {
    alert("found?")
    history.push('/sessions/forgot-password')
  }
//  else if (user) setUserData(user);
//  console.log(window.location.href)
//    history.push({
//      pathname: "/session/signin"
//    });
  return user;
};

const Auth = ({ children, setUserData, getNavigationByUser }) => {
  setUserData(localStorageService.getItem("auth_user"));

  useEffect(() => {
    checkJwtAuth(setUserData);
    if (window.location.href.match("http://localhost:8000/session/forgot-password/")) {
      alert("found?")
      history.push('/sessions/forgot-password')
    }
 //   else if (!localStorage.getItem("access_token")) {
 //     history.push('/session/signin');
 //     console.log(localStorage)
 //     }
    getNavigationByUser();
  }, [setUserData, getNavigationByUser]);

  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = state => ({
  setUserData: PropTypes.func.isRequired,
  getNavigationByUser: PropTypes.func.isRequired,
  login: state.login
});

export default connect(mapStateToProps, { setUserData, getNavigationByUser })(
  Auth
);
