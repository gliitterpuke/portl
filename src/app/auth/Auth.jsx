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
  const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

  if (window.location.href.match("/session/forgot-password")) {
    history.push(getLastItem(window.location.href))
  }
  else if (window.location.href.match("/session/file")) {
    history.push(getLastItem(window.location.href))
  }
  else if (window.location.href.match("/session/signup")) {
    history.push(getLastItem(window.location.href))
  }
  // for demo
  else if (window.location.href.match("/session/demo")) {
    history.push(getLastItem(window.location.href))
  }
  else if (user) {setUserData(user)}
  else
    history.push({
      pathname: "/session/signin"
    });
  return user;
};

const Auth = ({ children, setUserData, getNavigationByUser }) => {
  setUserData(localStorageService.getItem("auth_user"));

  useEffect(() => {
    checkJwtAuth(setUserData);
    const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
    if (window.location.href.match("/session/forgot-password")) {
      history.push(getLastItem(window.location.href))
    }
    else if (window.location.href.match("/session/")) {
      history.push(getLastItem(window.location.href))
    }
    else if (window.location.href.match("/session/signup")) {
      history.push(getLastItem(window.location.href))
    }
    // for demo
    else if (window.location.href.match("/session/demo")) {
      history.push(getLastItem(window.location.href))
    }
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