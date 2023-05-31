import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./MenuSidebarItem.module.scss";
import { NavLink } from "react-router-dom";
const cx = className.bind(styles);
const MenuSidebarItem = ({ icon, text, to }) => {
  return (
    <NavLink
      to={to}
      className={(nav) =>
        cx(
          "wrapper",
          to === "!#" ? "blocked" : "",
          nav.isActive ? "active" : ""
        )
      }
    >
      <div className={cx("icon")}>{icon}</div>
      <div className={cx("text")}>{text}</div>
      <div className={cx("notice-not-implement")}>NOT IMPLEMENTED</div>
    </NavLink>
  );
};

MenuSidebarItem.propTypes = {};

export default MenuSidebarItem;
