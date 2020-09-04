import axios from "axios";
import localStorageService from "./localStorageService";
import qs from "qs";
import history from "history.js";
class JwtAuthService {

  // Dummy user object just for the demo
  defaultuser = {
    first_name: "First Name",
    middle_name: "Middle Name",
    last_name: "Last Name"
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
    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
    return axios.post(
        'https://portl-dev.herokuapp.com/token/',
        qs.stringify(requestBody),
        config
    ).then((response) => {
      console.log(response)
      this.setSession(response.data.access_token);
//      return axios.get("https://portl-dev.herokuapp.com/api/v1/users/me/", 
//      {headers: {Authorization:"Bearer " + localStorage.getItem("access_token")}},
//      )
//    }).then(data => {
      // Token is valid
      this.setUser(response.data.data);
    })
    .then(() => { 
      let newuser = localStorageService.getItem("auth_user")
      if (newuser.role === "client") {
      history.push({
        pathname: "/profile"
      })
      } else if (newuser.role === "professional") {
      history.push({
        pathname: "/professional"
      })
      }
    })
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
    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
      return axios.get("https://portl-dev.herokuapp.com/api/v1/users/me/", auth)
    .then((response) => {
      console.log(response)
      this.setUser(response.data)
      return response;
    })
     .catch(error => {
      const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
      if (window.location.href.match("/session/forgot-password")) {
        console.log(getLastItem(window.location.href))
      //  history.push(getLastItem(window.location.href))
      }
//      else 
//       console.log(window.location.href)
//      history.push('/session/signin')
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
