import React from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./Avatar.module.scss";
import LetteredAvatar from "react-lettered-avatar";
const cx = className.bind(styles);
const Avatar = ({
  width = 34,
  src,
  className,
  selected = false,
  username,
  onClick,
}) => {
  const classes = cx("wrapper", {
    [className]: className,
    selected,
  });
  return (
    <div className={cx(classes)} onClick={onClick}>
      {src !== "" ? (
        <img src={src} width={width} className={cx("image")} />
      ) : (
        <LetteredAvatar size={width} name={username} />
      )}
    </div>
  );
};

Avatar.propTypes = {};

export default Avatar;
