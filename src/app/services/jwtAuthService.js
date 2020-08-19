import axios from "axios";
import localStorageService from "./localStorageService";
import qs from "qs"

class JwtAuthService {

  // Dummy user object just for the demo
  user = {
    userId: "1",
    role: 'ADMIN',
    displayName: "Jason Alexander",
    username: "jasonalexander@gmail.com",
    photoURL: "/assets/images/face-6.jpg",
    age: 25,
    token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh"
  }

  // You need to send http request with email and passsword to your server in this method
  // Your server will return user object & a Token
  // User should have role property
  // You can define roles in app/auth/authRoles.js
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
        'https://portl-dev.herokuapp.com/token/',
        qs.stringify(requestBody),
        config
    ).then((response) => {
      // Login successful
      // Save token
      this.setSession(response.data.access_token);
      this.loginWithToken()
      return response;
    });
  };
  // Save user to localstorage
  setUser = (user) => {    
    localStorageService.setItem('auth_user', user);
  }
  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user already logged in & app is reloaded
  loginWithToken = () => {
    const auth = {
      headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
  }
    return axios.get("https://portl-dev.herokuapp.com/api/v1/users/me/", auth)
    .then((response) => {
      // Login successful
      // Save token
      this.setUser(response.data);
      return response;
    });
  };

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
