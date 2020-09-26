import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ClientApplication from "./ClientApplication.jsx";
import ProfessionalApplication from "../Applications/ProfessionalApplication.jsx";
import localStorageService from "../../services/localStorageService"
class Application extends Component {

  render() {
    let user = localStorageService.getItem("auth_user")

    return (
      <React.Fragment>
      <div className="m-sm-30">
        {user.role === "professional" && (
          <ProfessionalApplication/>
        )}
        {user.role === "client" && (
          <ClientApplication/>
        )}
      </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Application);
