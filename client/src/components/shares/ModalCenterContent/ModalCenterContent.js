import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import className from "classnames/bind";
import styles from "./ModalCenterContent.module.scss";
import Create from "../../layouts/components/IssueCreate";
import { useLocation, useNavigate } from "react-router-dom";
const cx = className.bind(styles);
const ModalCenterContent = ({
  popup,
  handleToggle,
  maxWidth,
  children,
  visible,
  queryParameter,
}) => {
  const modalRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const handleOnClickOutSide = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      navigate("/project/board");
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOnClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleOnClickOutSide);
    };
  }, []);

  return (
    <div className={cx("wrapper", popup ? "actived" : "")}>
      <div
        className={cx("content")}
        ref={modalRef}
        style={{ maxWidth: maxWidth }}
      >
        {children}
      </div>
    </div>
  );
};

ModalCenterContent.propTypes = {};

export default ModalCenterContent;
