import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ClientForm from "./ClientForm";
import ProfessionalForm from "./ProfessionalForm";
import localStorageService from "../../services/localStorageService"
class SimpleForm extends Component {

  render() {
    let user = localStorageService.getItem("auth_user")
    console.log(user)

    return (
      <React.Fragment>
      <div className="m-sm-30">
        {user.is_client === false && (
          <ProfessionalForm/>
        )}
        {user.is_client === true && (
          <ClientForm/>
        )}
      </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SimpleForm);
