import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import localStorageService from "app/services/localStorageService";

const styles = theme => ({
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  wrapper: {
    width: "100%",
    height: "100vh"
  },
  inner: {
    flexDirection: "column",
    maxWidth: "320px"
  }
});

class NotFound extends Component {
  state = {};
  clickMe = () => {
    let user = localStorageService.getItem('auth_user')
    if (user.role === "client") {
      this.props.history.push('/profile')
    }
    else if (user.role === "professional") {
      this.props.history.push('/professional')
    }
    else {
      this.props.history.push('/session/signin')
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.flexCenter} ${classes.wrapper}`}>
        <div className={`${classes.flexCenter} ${classes.inner}`}>
          <img
            className="mb-8"
            src="/assets/images/illustrations/404.svg"
            alt=""
          />
          <Button
            className="capitalize"
            variant="contained"
            color="primary"
            onClick={this.clickMe}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NotFound);
