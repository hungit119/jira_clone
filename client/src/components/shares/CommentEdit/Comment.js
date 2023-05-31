import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./CommentEdit.module.scss";
const cx = className.bind(styles);
const Comment = (props) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("name")}>Lord Gaben</div>
        <div className={cx("date")}>13 days ago</div>
      </div>
      <div className={cx("content")}>content</div>
      <div className={cx("btn-group")}>
        <div className={cx("btn-edit")}>Edit</div>
        <span style={{ margin: "0 4px" }}>&#8226;</span>
        <div className={cx("btn-delete")}>Delete </div>
      </div>
    </div>
  );
};

Comment.propTypes = {};

export default Comment;
