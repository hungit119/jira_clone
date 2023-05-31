import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./ResultSearchIssue.module.scss";
import { BugIcon, StoryIcon, TaskIcon } from "../../../assets/icons/";
import { Link } from "react-router-dom";
const cx = className.bind(styles);
const ResultSearchIssue = ({ type, id, title, onClick }) => {
  return (
    <div className={cx("wrapper")} onClick={onClick}>
      <div className={cx("icon")}>
        {type === "task" ? (
          <TaskIcon size={26} />
        ) : type === "bug" ? (
          <BugIcon size={26} />
        ) : (
          <StoryIcon size={26} />
        )}
      </div>
      <div className={cx("body")}>
        <div className={cx("title")}>{title}</div>
        <div className={cx("type")}>
          {type}-{id}
        </div>
      </div>
    </div>
  );
};

ResultSearchIssue.propTypes = {};

export default ResultSearchIssue;
