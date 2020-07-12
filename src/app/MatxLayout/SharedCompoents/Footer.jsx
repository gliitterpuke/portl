import React from "react";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import { Button, Toolbar, AppBar } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Footer = ({ theme, settings }) => {
  const footerTheme = settings.themes[settings.footer.theme] || theme;
  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar color="primary" position="static">
        <Toolbar className="footer flex items-center">
          <div className="flex items-center container w-full">
            <a
              href="https://portl.to"
              target="_blank"
              className="mr-2"
            >
              <Button variant="contained">Homepage</Button>
            </a>
            <a href="https://portl.to/contact">
              <Button variant="contained" color="secondary">
                Contact Us
              </Button>
            </a>
            <span className="m-auto"></span>
            <p className="m-0">
              © <a href="http://portl.to">Portl 2020</a>
            </p>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

Footer.propTypes = {
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  settings: state.layout.settings
});

export default withStyles(
  {},
  { withTheme: true }
)(connect(mapStateToProps, {})(Footer));
