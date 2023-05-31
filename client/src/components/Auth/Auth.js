import React from "react";
import PropTypes from "prop-types";
import styles from "./Auth.module.scss";
import className from "classnames/bind";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { Navigate } from "react-router-dom";

const cx = className.bind(styles);
const Auth = ({ isAuthen }) => {
  return isAuthen ? (
    <>
      <Navigate to={`/dashboard/list-project`} />
    </>
  ) : (
    <div className={cx("wrapper")}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

Auth.propTypes = {};

export default Auth;
