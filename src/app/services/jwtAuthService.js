import axios from "axios";
import localStorageService from "./localStorageService";
import qs from "qs";
import history from "history.js";

class JwtAuthService {
  
  loginWithEmailAndPassword = (username, password) => {
    const requestBody = {
        username: username,
        password: password
      }
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    return axios.post(
        'http://127.0.0.1:8000/auth/token/',
        qs.stringify(requestBody),
        config
    ).then((response) => {
      this.setSession(response.data.access_token);
      this.setUser(response.data.data);
    })
  };
  
  // Save user to localstorage
  setUser = (user) => {    
    localStorageService.setItem('auth_user', user)
  }
  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user already logged in & app is reloaded
  loginWithToken = () => {
    const auth = {
      headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
    }
      return axios.get("users/me/", auth)
    .then((response) => {
      this.setUser(response.data)
      this.setSession(localStorage.getItem("access_token"))
      return response;
    })
     .catch(error => {
      this.setSession(null);
      this.removeUser();
    });
}

  logout = () => {
    this.setSession(null);
    this.removeUser();
  }

  // Set token to all http request header, so you don't need to attach everytime
  setSession = access_token => {
    if (access_token) {
      localStorage.setItem('access_token', access_token);
      axios.defaults.headers.common = {'Authorization': `Bearer ${access_token}`}
    } else {
      localStorage.removeItem('access_token');
      delete axios.defaults.headers.common["Authorization"];
    }
  };


  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem('auth_user');
  }
}

export default new JwtAuthService();