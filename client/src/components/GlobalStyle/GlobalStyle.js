import React from "react";
import PropTypes from "prop-types";
import "./GlobalStyle.module.scss";
const GlobalStyle = ({ children }) => {
  return children;
};

GlobalStyle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStyle;
