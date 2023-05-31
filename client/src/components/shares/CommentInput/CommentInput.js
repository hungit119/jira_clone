import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./CommentInput.module.scss";
import Button from "../Button";
const cx = className.bind(styles);

const CommentInput = (props) => {
  return (
    <div className={cx("wrapper")}>
      <textarea
        className={cx("text-area-comment")}
        placeholder={"Add a comment ..."}
      />
      <div className={cx("btn-group")}>
        <Button primary>Save</Button>
        <Button info>Cancel</Button>
      </div>
    </div>
  );
};

CommentInput.propTypes = {};

export default CommentInput;
