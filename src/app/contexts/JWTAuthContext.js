import React, { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios.js";
import { MatxLoading } from "matx";
import qs from "qs";
import localStorageService from "../services/localStorageService"
import history from "../../history"

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (access_token) => {
  if (!access_token) {
    return false;
  }

  const decodedToken = jwtDecode(access_token);
  const currentTime = Date.now() / 1000;
  console.log(decodedToken);
  return decodedToken.exp > currentTime;
};

const setSession = (access_token) => {
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
  } else {
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const setUser = (user) => {
  localStorageService.setItem("auth_user", user);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (username, password) => {
    
    const response = await axios.post("http://127.0.0.1:8000/auth/token", qs.stringify({ username, password }));
    const { access_token, data } = response.data;
    
    setSession(access_token);
    setUser(data);

    dispatch({
      type: "LOGIN",
      payload: {
        data,
      },
    });
  };

  const register = async (email, password, is_client) => {
    const response = await axios.post("users/", {
      email,
      password,
      is_client,
    });

    setSession(access_token);

    const client = {
      given_names: "Jane",
      middle_name: "Marie",
      family_name: "Smith",
      birth_date: "1950-01-01",
      sex: "Female",
      owner_id: response.data.id,
      country_code: "cn"
    }
    await axios.post("clients/", client)
    axios.post(`email/send-activation-email/${email}`)

    const { access_token, data } = response.data;

    dispatch({
      type: "REGISTER",
      payload: {
        data,
      },
    });
  };

  const logout = () => {
    setSession(null);
    setUser(null)
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const access_token = window.localStorage.getItem("access_token");

        if (access_token && isValidToken(access_token)) {
          setSession(access_token);
          const response = await axios.get("users/me/");
          const user = response.data;
          setUser(user)

          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          history.push('/session/signin')

          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
