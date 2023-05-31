import React from "react";
import className from "classnames/bind";
import styles from "./Status.module.scss";
const cx = className.bind(styles);
const Status = ({ children, value }) => {
  return (
    <div
      className={cx(
        "wrapper",
        value === "backlog"
          ? "backlog"
          : value === "selected"
          ? "selected"
          : value === "progress"
          ? "progress"
          : "done"
      )}
    >
      {children}
    </div>
  );
};

export default Status;
