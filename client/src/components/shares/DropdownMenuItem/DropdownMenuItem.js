import React from "react";
import className from "classnames/bind";
import styles from "./DropdownMenuItem.module.scss";
const cx = className.bind(styles);

const DropdownMenuItem = ({ element, text }) => {
  return (
    <div className={cx("wrapper")}>
      {element}
      <span className={cx("menu-item-text")}>{text}</span>
    </div>
  );
};

export default DropdownMenuItem;
