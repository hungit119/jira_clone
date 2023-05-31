import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Line.module.scss";

const cx = className.bind(styles);
const Line = (props) => {
  return <div className={cx("wrapper")}></div>;
};

Line.propTypes = {};

export default Line;
