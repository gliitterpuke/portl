import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ClientFileViewer from "./ClientFileViewer.jsx";
import ProfessionalFileViewer from "./ProfessionalFileViewer.jsx";
import localStorageService from "../../services/localStorageService"
class FileViewer extends Component {

  render() {
    let user = localStorageService.getItem("auth_user")

    return (
      <React.Fragment>
      <div className="m-sm-30">
        {user.is_client === false && (
          <ProfessionalFileViewer/>
        )}
        {user.is_client === true && (
          <ClientFileViewer/>
        )}
      </div>
      </React.Fragment>
    );
  }
}

export default withRouter(FileViewer);
