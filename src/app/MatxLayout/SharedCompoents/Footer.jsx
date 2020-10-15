import React from "react";
import { ThemeProvider, makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Toolbar, AppBar } from "@material-ui/core";
import { useSelector } from "react-redux";
import clsx from "clsx";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  footer: {
    minHeight: "var(--topbar-height)",
    "@media (max-width: 499px)": {
      display: "table",
      width: "100%",
      minHeight: "auto",
      padding: "1rem 0",
      "& .container": {
        flexDirection: "column !important",
        "& a": {
          margin: "0 0 16px !important",
        },
      },
    },
  },
  appbar: {
    zIndex: 96,
  },
}));

const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { settings } = useSelector(({ layout }) => layout);

  const footerTheme = settings.themes[settings.footer.theme] || theme;

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar color="primary" position="static" className={classes.appbar}>
        <Toolbar className={clsx("flex items-center", classes.footer)}>
          <div className="flex items-center container w-full">
            {/* <a
              href="https://github.com/uilibrary/matx-react"
              target="_blank"
              className="mr-2"
              rel="noopener noreferrer"
            >
              <Button variant="contained">Download Free version</Button>
            </a> */}
            <a href="https://portl.to">
              <Button variant="contained">
                Home
              </Button>
            </a>
            <a href="https://portl.to/contact">
              <Button variant="contained" color="secondary">
                Contact Us
              </Button>
            </a>
            <span className="m-auto"></span>
            <p className="m-0">
              © Portl 2020
            </p>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Footer;
