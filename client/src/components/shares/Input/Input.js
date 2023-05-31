import React, { useState } from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Input.module.scss";
const cx = className.bind(styles);
const Input = ({
  value,
  snow = false,
  forselect = false,
  placeholder,
  handleInputOnChange,
  selectRef,
  header = false,
  name,
  setformCreateIssue,
  formCreateIssue,
}) => {
  const classes = cx("wrapper", {
    [className]: className,
    snow,
    forselect,
    header,
  });
  return (
    <input
      value={value}
      onChange={handleInputOnChange}
      className={classes}
      placeholder={placeholder}
      ref={selectRef}
      name={name}
    />
  );
};

Input.propTypes = {};

export default Input;
