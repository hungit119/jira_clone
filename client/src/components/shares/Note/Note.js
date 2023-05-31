import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Note.module.scss";
const cx = className.bind(styles);

const Note = ({ content }) => {
  return <div className={cx("note")}>{content}</div>;
};

Note.propTypes = {};

export default Note;
