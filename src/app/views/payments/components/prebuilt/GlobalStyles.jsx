import React from "react"
import { Global, css } from "@emotion/core";

const GlobalStyles = () => (
  <>
    <Global
      styles={css`
        *,
        *:before,
        *:after {
          box-sizing: border-box;
        }
      `}
    />
    <Global
      styles={css`
        input,
        button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          outline: none;
          border-style: none;
        }
      `}
    />
    <Global
      styles={css`
        body,
        html {
          background-color: #6772e5;
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        }
      `}
    />
  </>
);

export default GlobalStyles;
