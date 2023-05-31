import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Comment.module.scss";
import Avatar from "../Avatar";

const cx = className.bind(styles);
const Comment = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("avatar")}>
        <Avatar src={"https://i.ibb.co/6RJ5hq6/gaben.jpg"} width={36} />
      </div>
      <div className={cx("content")}>{children}</div>
    </div>
  );
};

Comment.propTypes = {};

export default Comment;
