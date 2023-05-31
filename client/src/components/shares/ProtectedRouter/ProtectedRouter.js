import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ isAuthen, redirectPath, children }) => {
  if (!isAuthen) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

ProtectedRouter.propTypes = {
  isAuthen: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRouter;
