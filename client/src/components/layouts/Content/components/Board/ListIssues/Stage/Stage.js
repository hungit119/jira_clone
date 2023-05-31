import className from "classnames/bind";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIssues } from "../../../../../../../app/reducers/project/projectSlice";
import axiosInstance from "../../../../../../../utils/axiosInstance";
import Issue from "../../../../../../shares/Issue";
import styles from "./Stage.module.scss";
const cx = className.bind(styles);

const Stage = ({ header, status, status_client, children }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("title")}>{header}</div>
        <div className={cx("number")}>1</div>
      </div>
      <div className={cx("list")}>{children}</div>
    </div>
  );
};

Stage.propTypes = {};

export default Stage;
