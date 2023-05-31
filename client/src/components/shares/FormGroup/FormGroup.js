import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./FormGroup.module.scss";
const cx = className.bind(styles);
const FormGroup = ({ label, children, color, fontsize }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("label")} style={{ color, fontSize: fontsize }}>
        {label}
      </div>
      {children}
    </div>
  );
};

FormGroup.propTypes = {};

export default FormGroup;
