import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Button.module.scss";

const cx = className.bind(styles);
const Button = ({
  className,
  info = false,
  selected = false,
  children,
  primary = false,
  defaultButton = false,
  mtl4 = false,
  onClick,
}) => {
  const classes = cx("wrapper", {
    [className]: className,
    info,
    selected,
    primary,
    defaultButton,
    mtl4,
  });
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

Button.propTypes = {};

export default Button;
