import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const Landing = ({ redirectPath }) => {
  return <Navigate to={redirectPath} />;
};

Landing.propTypes = {};

export default Landing;
