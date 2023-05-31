import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Dashboard.module.scss";
import logoImage from "../../assets/images/logoImage.png";
import Button from "../shares/Button";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useSelector } from "react-redux";
import { isAuthenticateSelector, usernameSelector } from "../../app/selector";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import { Link, Navigate } from "react-router-dom";
import {
  ACCESS_TOKEN_LOCALSTORAGE,
  REFRESH_TOKEN_LOCALSTORAGE,
} from "../../custom";
const cx = className.bind(styles);
const Dashboard = () => {
  const username = useSelector(usernameSelector);
  const isAuthenticated = useSelector(isAuthenticateSelector);
  const handleLogoutClick = () => {
    localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE);
    localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE);
    localStorage.removeItem("current_project");
    window.location.reload();
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("header-left")}>
          <div className={cx("logo")}>
            <img src={logoImage} width={28} />
            <div className={cx("logo-text")}>Jira</div>
          </div>
        </div>
        <div className={cx("header-right")}>
          <div className={cx("user-info")}>{username}</div>
          <div className={cx("login-logout")}>
            {isAuthenticated ? (
              <Button defaultButton onClick={handleLogoutClick}>
                Log out <BiLogOut size={18} color="red" />
              </Button>
            ) : (
              <Button defaultButton>
                <Link to={"/auth/login"}>
                  Login <BiLogIn size={18} color="blue" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className={cx("content")}>
        <SideBar />
        <Content />
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
